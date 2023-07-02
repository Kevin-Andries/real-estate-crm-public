import { exec } from "child_process";
import { Request, Response, NextFunction } from "express";
import formidable from "formidable";
import catchAsyncError from "../utils/catchAsyncError";
import {
	getOneEstateWithPicturesQuery,
	getAllEstateFromUserQuery,
	createEstateQuery,
	isPicturePublicQuery,
	userExists,
	incrementViewsCountQuery,
	getEstatesQuery,
	getPictureQuery,
} from "../db/db";
import fs from "fs";
import AppError from "../utils/appError";
import { validateCreateEstateForm } from "../utils/validation/estateValidation";
import { validateUpdateEstateForm } from "../utils/validation/estateUpdateValidation";
import printRed from "../utils/print";

// create an upload folder for pictures and move mock pictures inside
exec(`cd ${__dirname}/.. ; mkdir upload ; mkdir upload/estatePictures`);
exec(
	`cp ${__dirname}/../../mockEstatePictures/* ${__dirname}/../upload/estatePictures`
);

//! I had fun in this file creating the queries by hand, but it is better to use a query builder

export const getAllEstates = catchAsyncError(
	async (req: Request, res: Response) => {
		// Build query string from query params
		let queryString = "SELECT * FROM estate";
		const entries = Object.entries(req.query);
		let normalQueries;
		let specialQueries: any;

		const specialFields = [
			"price",
			"square_meters",
			"rooms",
			"bedrooms",
			"bathrooms",
			"floor_number",
			"apart_number",
		];

		const options = ["limit", "order", "page"];

		normalQueries = entries.filter(
			(query) =>
				!specialFields.includes(query[0].toLowerCase()) &&
				!options.includes(query[0].toLowerCase())
		);

		specialQueries = entries.filter(
			(query) =>
				specialFields.includes(query[0].toLowerCase()) &&
				!options.includes(query[0].toLowerCase())
		);

		// Handle normal queries
		if (normalQueries.length) {
			queryString += ` WHERE LOWER(${normalQueries[0][0]})=LOWER('${normalQueries[0][1]}')`;

			for (let i = 1; i < normalQueries.length; i++) {
				queryString += ` AND LOWER(${normalQueries[i][0]})=LOWER('${normalQueries[i][1]}')`;
			}
		}

		if (specialQueries.length) {
			const aux = specialQueries.filter(
				(query: any) =>
					query[0] !== "price" && query[0] !== "square_meters"
			);

			for (let i = 0; i < aux.length; i++) {
				// @ts-ignore
				const values = aux[i][1].split(",");

				if (values.length > 1) {
					let orConditions = "";

					values.forEach((value: string, index: number) => {
						if (index > 0) {
							orConditions += " OR ";
						}

						orConditions += `${aux[i][0]}=${value}`;
					});

					if (queryString.includes("WHERE")) {
						queryString += ` AND (${orConditions})`;
					} else {
						queryString += ` WHERE (${orConditions})`;
					}
				} else {
					if (queryString.includes("WHERE")) {
						queryString += ` AND ${aux[i][0]}=${aux[i][1]}`;
					} else {
						queryString += ` WHERE ${aux[i][0]}=${aux[i][1]}`;
					}
				}
			}

			// TODO: optimize price and square_meters as the code is same
			// Handle price
			if (req.query.price) {
				// @ts-ignore
				const price = req.query.price.split(",");

				for (let i = 0; i < price.length; i++) {
					const values = price[i].split("_");
					let operator;

					switch (values[0]) {
						case "gte":
							operator = ">=";
							break;
						case "gt":
							operator = ">";
							break;
						case "lte":
							operator = "<=";
							break;
						case "lt":
							operator = "<";
							break;
						default:
							operator = "=";
							break;
					}

					if (queryString.includes("WHERE")) {
						queryString += ` AND price${operator}${
							values[1] || values[0]
						}`;
					} else {
						queryString += ` WHERE price${operator}${
							values[1] || values[0]
						}`;
					}
				}
			}

			// Handle square_meters
			if (req.query.square_meters) {
				// @ts-ignore
				const squareMeters = req.query.square_meters.split(",");

				for (let i = 0; i < squareMeters.length; i++) {
					const values = squareMeters[i].split("_");
					let operator;

					switch (values[0]) {
						case "gte":
							operator = ">=";
							break;
						case "gt":
							operator = ">";
							break;
						case "lte":
							operator = "<=";
							break;
						case "lt":
							operator = "<";
							break;
						default:
							operator = "=";
							break;
					}

					if (queryString.includes("WHERE")) {
						queryString += ` AND square_meters${operator}${
							values[1] || values[0]
						}`;
					} else {
						queryString += ` WHERE square_meters${operator}${
							values[1] || values[0]
						}`;
					}
				}
			}
		}

		// Only query estate that are public and online
		if (queryString.includes("WHERE")) {
			queryString += " AND is_public=TRUE AND is_online=TRUE";
		} else {
			queryString += " WHERE is_public=TRUE AND is_online=TRUE";
		}

		// Handle ordering
		if (req.query.order) {
			// @ts-ignore
			const order = req.query.order.split(",");
			queryString += ` ORDER BY ${order[0]} ${order[1]}`;
		}

		// Add a limit to the query
		// queryString += ` LIMIT ${req.query.limit || 10}`;
		queryString += " LIMIT 10";

		const page = Math.round(parseInt(req.query.page as string));
		if (!isNaN(page) && page > 1) {
			queryString += ` OFFSET ${(page - 1) * 10}`;
		}

		printRed(queryString);

		try {
			const estates = await getEstatesQuery(queryString);
			res.json(estates);
		} catch (err) {
			// @ts-ignore
			console.log(err.toString());
			return res.status(400).json({
				message: "Incorrect query",
			});
		}
	}
);

export const getAllEstateFromMe = catchAsyncError(
	async (req: Request, res: Response) => {
		const estates = await getAllEstateFromUserQuery(
			req.userData.userId!,
			true
		);

		res.json(estates);
	}
);

export const getAllEstateFromUser = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		const userId = req.params.userId;

		// check if user exists
		const user = await userExists(userId);

		if (!user) {
			return next(new AppError(404, "This user does not exist"));
		}

		// Create estate in db
		const estates = await getAllEstateFromUserQuery(userId, false);

		res.json(estates);
	}
);

export const createEstate = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		// TODO: use sharp to resize/compress pictures
		const uploadDir = `${__dirname}/../upload/estatePictures`;
		const form = formidable({
			multiples: true,
			uploadDir,
		});

		// parse form data with formidable
		const formData: any = await new Promise((resolve, reject) => {
			form.parse(req, (err, fields, files) => {
				if (err) {
					reject(err);
				}

				resolve({
					...fields,
					pictures: Object.values(files).map((pic: any) => ({
						idOnDisk: pic.newFilename,
					})),
				});
			});
		});

		// function to delete pictures on disk in case of error
		function deleteEstatePictures() {
			formData.pictures.forEach((pictureIdOnDisk: string) => {
				fs.unlink(`${uploadDir}/${pictureIdOnDisk}`, (err) => {
					if (err) {
						console.log(
							`Error while trying to delete picture: ${pictureIdOnDisk}`,
							err
						);
					}
				});
			});
		}

		// use Joi to validate form
		const formError = validateCreateEstateForm(formData);
		if (formError) {
			deleteEstatePictures();
			return next(new AppError(400, formError.message.replace(/"/g, "")));
		}

		// add userId from auth token to the formData
		formData.ownerId = req.userData.userId;

		// Create estate in db
		const estateId = await createEstateQuery(
			formData,
			deleteEstatePictures
		);

		res.status(201).json({
			message: "Estate successfully created",
			estateId,
		});
	}
);

export const getEstate = catchAsyncError(
	async (req: Request, res: Response) => {
		const estateId = req.params.estateId;

		// Create estate in db
		const estate = await getOneEstateWithPicturesQuery(estateId);

		if (
			!estate ||
			estate.is_public === "false" ||
			estate.is_online === "false"
		) {
			return res.sendStatus(404);
		}

		res.json(estate);
	}
);

export const getEstatePicture = catchAsyncError(
	async (req: Request, res: Response) => {
		const estateId = req.params.estateId;
		const pictureId = req.params.pictureId;

		// check if estate is public
		const [isPublic, isOnline, pictureIdOnDisk] = await getPictureQuery(
			estateId,
			pictureId
		);

		const url = `${__dirname}/../upload/estatePictures/${pictureIdOnDisk}`;

		if (!isOnline || !isPublic || !fs.existsSync(url)) {
			return res.sendStatus(404);
		}

		const stream = fs.createReadStream(url);
		stream.pipe(res);
	}
);

// TODO
// export const updateOneEstate = catchAsyncError(
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		const form = formidable({
// 			multiples: true
// 		});

// 		// parse form data with formidable
// 		const formData: any = await new Promise((resolve, reject) => {
// 			form.parse(req, (err, fields, files) => {
// 				if (err) {
// 					reject(err);
// 				}

// 				resolve({...fields});
// 			});
// 		});

// 		// use Joi to validate form
// 		const formError = validateUpdateEstateForm(formData);
// 		if (formError) {
// 			return next(new AppError(400, formError.message.replace(/"/g, "")));
// 		}

// 		// Update estate in db
// 		const estateId = await updateEstateQuery(formData);

// 		res.status(201).json({
// 			message: "Estate successfully updated",
// 			estateId,
// 		});

// 	}
// );

// TODO
export const deleteOneEstate = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {}
);

// TODO
export const deleteEstatePicture = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {}
);
