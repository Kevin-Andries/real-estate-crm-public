import pg from "pg";
import fs from "fs";
import { snakeCase } from "snake-case";
//import { IEstate, IEstatePictures } from "../utils/interfaces";
import {
	isCacheInitialized,
	initializeCache,
	getEstateFromCache,
	getPictureEstateFromCache,
	getUserFromCache,
	setEstateInCache,
	setUserInCache,
} from "./cache";
import printRed from "../utils/print";

// TODO: check if node-pg is used correctly (client, pool, etc).
// TODO: Maybe replace Pool.query by client.query verywhere (what about transactions and release?) Maybe migrate to prisma later
// TODO: Also, when server is on for a long time and connected to heroku db, connection terminates unexpectedly (same for redis)
// TODO: update pg and redis together in a transactionnal way (maybe with pg transaction to rollback in the catch block)

// Initialize connection to db
// TODO: secure with SSL for prod
const Pool =
	process.env.DB_TYPE === "local"
		? new pg.Pool()
		: new pg.Pool({ ssl: { rejectUnauthorized: false } });

let client: pg.PoolClient;

Pool.connect()
	.then(async (c) => {
		console.log("Connected to DB");
		client = c;

		// Initialize cache
		try {
			if ((await isCacheInitialized()) === "true") {
				console.log("Cache already initialized");
				return;
			}

			console.log("INITIALIZING CACHE");

			const promises = [];
			promises.push(
				new Promise((resolve) => {
					client.query("SELECT * FROM usr").then((res) => {
						res.rows.forEach((row) => (row.type = "user"));
						resolve(res.rows);
					});
				})
			);
			promises.push(
				new Promise((resolve) => {
					client.query("SELECT * FROM estate").then((res) => {
						res.rows.forEach((row) => (row.type = "estate"));
						resolve(res.rows);
					});
				})
			);
			promises.push(
				new Promise((resolve) => {
					client.query("SELECT * FROM estate_picture").then((res) => {
						res.rows.forEach((row) => (row.type = "estatePicture"));
						resolve(res.rows);
					});
				})
			);

			// TODO: this is not caught by the try/catch if fails!!??
			const dataFromDB = await Promise.all(promises);

			initializeCache(dataFromDB.flat()).then((_) =>
				console.log("Cache successfully initialized")
			);
		} catch (err) {
			printRed("Error while initializating cache. ENDING PROGRAM");
			process.exit(1);
		}
	})
	.catch((err) => {
		printRed("Error connecting to DB. ENDING PROGRAM");
		console.log(err);
		process.exit(1);
	});

/**
 *
 * @param path path to sql file containing queries
 * @returns an object containing all the sql queries
 */
function parseSqlQueriesFile(path: string): any {
	const queries = fs
		.readFileSync(path)
		.toString()
		.split("\n\n")
		.map((el) => el.replace(/\n/g, " ").replace(/\t/g, ""));

	return queries
		.map((query) => {
			// TODO: extract using a regex and not magic number of indexes
			// TODO: handle deprecation of substr
			const queryName = query.substr(2, query.indexOf("*/") - 2).trim();
			const queryStr = query.substr(query.indexOf("*/") + 2).trim();

			return {
				[queryName]: queryStr,
			};
		})
		.reduce((acc: any, curr: any) => {
			const val = Object.entries(curr);
			return { ...acc, [val[0][0]]: val[0][1] };
		}, {});
}

// List of all the PostgreSQL queries needed in the API
const Queries = parseSqlQueriesFile(`${__dirname}/../../sql/queries.sql`);

// Function to handle databse errors in the error controller
function handleDatabaseErrors(err: any) {
	err.appErrorType = "PG-ERROR";
	throw err;
}

/**
 * Get an user based on its id
 * @param userId
 * @returns a promise which resolves to the data
 */
export async function getOneUserQuery(userId: string) {
	// return await Pool.query(Queries.getOneUser, [userId])
	// 	.then((res) => res.rows[0])
	// 	.catch(handleDatabaseErrors);

	const user = await getUserFromCache(userId);

	if (!user) {
		return;
	}

	delete user.pwd;
	delete user.is_active;

	return user;
}

/**
 * Get an user based on its email address
 * @param email
 * @returns a promise which resolve to the data
 */
export async function getOneUserWithEmailQuery(email: string) {
	return await Pool.query(Queries.getOneUserWithEmail, [email])
		.then((res: any) => res.rows[0])
		.catch(handleDatabaseErrors);
}

/** Check if user exists in db
 * @param userId
 * @returns a promise which resolves to a boolean
 */
export async function userExists(userId: string): Promise<any> {
	// return await Pool.query(Queries.userExists, [userId])
	// 	.then((res) => res.rows[0])
	// 	.catch(handleDatabaseErrors);

	return await getUserFromCache(userId);
}

/**
 * Get an user id based on oauth id
 * @param oauthId
 * @returns a promise which resolves to the data
 */
export async function getUserIdFromOAuthId(oauthId: number | string) {
	return await Pool.query(Queries.getUserIdFromOAuthId, [oauthId])
		.then((res: any) => res.rows[0])
		.catch(handleDatabaseErrors);
}

/**
 * Create an user that logged in with oAuth
 * @returns a promise which resolves to the data
 */
export async function createOneUserFromOAuthQuery(
	email: string,
	firstname: string,
	lastname: string,
	username: string
) {
	return await Pool.query(Queries.createOneUserFromOAuth, [
		email,
		firstname,
		lastname,
		username,
	])
		.then(async (res: any) => {
			const user = res.rows[0];
			await setUserInCache(user);
			return user;
		})
		.catch(handleDatabaseErrors);
}

/**
 * Create an user using the regular registration method
 * @param email, account type, first name, last name
 * @returns a promise which resolve to the data
 */
export async function createOneUserWithEmail(
	email: string,
	firstname: string,
	lastname: string,
	password: string
) {
	return await Pool.query(Queries.createOneUserWithEmail, [
		email,
		firstname,
		lastname,
		password,
	])
		.then((res: any) => res.rows[0])
		.catch(handleDatabaseErrors);
}

/**
 * Create an user
 * @param oauthId, userId
 * @returns a promise which resolves to the data
 */
export async function createOneOAuthUserQuery(oauthId: string, userId: string) {
	return await Pool.query(Queries.createOneOAuthUser, [oauthId, userId])
		.then((res) => res.rows[0])
		.catch(handleDatabaseErrors);
}

// !! this function is never used
/**
 * Get an estate based on the estate id
 * @deprecated
 * @param estateId
 * @returns a promise which resolves to the data
 */
export async function getOneEstateQuery(estateId: string) {
	return await Pool.query(Queries.getOneEstate, [estateId])
		.then((res) => res.rows[0])
		.catch(handleDatabaseErrors);
}

/**
 * Returns if the picture of an estate is publi<c or not
 * @param pictureId
 * @returns a promise which resolves to the data
 */
export async function isPicturePublicQuery(pictureId: string): Promise<any> {
	return await Pool.query(Queries.isPicturePublic, [pictureId])
		.then((res) => (res.rowCount === 0 ? false : res.rows[0]))
		.catch(handleDatabaseErrors);
}

/**
 * Returns if the picture of an estate is publi<c or not
 * @param pictureId
 * @returns a promise which resolves to the data
 */
export async function getPictureQuery(
	estateId: string,
	pictureId: string
): Promise<any> {
	// return await Pool.query(Queries.getPictureIdOnDisk, [pictureId])
	// 	.then((res) => (res.rowCount === 0 ? false : res.rows[0]))
	// 	.catch(handleDatabaseErrors);

	return await getPictureEstateFromCache(estateId, pictureId);
}

/**
 * Increment view count of an estate
 * @param estateId
 */
export async function incrementViewsCountQuery(estateId: string) {
	return await Pool.query(Queries.incrementViewsCount, [estateId]).catch(
		handleDatabaseErrors
	);
}

/**
 * Get an estate with all its pictures based on the estate id
 * @param estateId
 * @returns a promise which resolve to the data
 */
export async function getOneEstateWithPicturesQuery(estateId: string) {
	// return await Pool.query(Queries.getOneEstateWithPictures, [estateId])
	// 	.then((res) => res.rows[0])
	// 	.catch(handleDatabaseErrors);

	incrementViewsCountQuery(estateId);
	const estateRedis = await getEstateFromCache(estateId);

	return estateRedis;
}

/**
 * Get estates from the db. Limit to 100
 * @returns a promise which resolve to the data
 */
export async function getEstatesQuery(queryString: string) {
	return await Pool.query(queryString)
		.then((res: any) => res.rows)
		.catch(handleDatabaseErrors);
}

/**
 * Get all estates, with pictures, from an user, based on his id
 * @param userId
 * @returns a promise which resolves to the data
 */
export async function getAllEstateFromUserQuery(userId: string, me: boolean) {
	const estates: any = await Pool.query(
		Queries[me ? "getAllEstateFromMe" : "getAllEstateFromUser"],
		[userId]
	)
		.then((res) => res.rows)
		.catch(handleDatabaseErrors);

	let promises = [];
	for (let i = 0; i < estates.length; i++) {
		estates[i].pictures = [];
		promises[i] = Pool.query(Queries.getOneEstatePictures, [
			estates[i].estate_id,
		]);
	}

	const pictures = await Promise.all(promises)
		.then((res) => res.map((result) => result.rows))
		.catch(handleDatabaseErrors);

	for (let i = 0; i < pictures!.length; i++) {
		const tmp: any = pictures![i];

		for (let j = 0; j < tmp.length; j++) {
			const estateAux = estates.find(
				(estate: any) =>
					estate.estate_id.toString() === tmp[j].estate_id.toString()
			);

			estateAux.pictures.push(tmp[j]);
		}
	}

	return estates;
}

/**
 * Create an estate for a given user
 * @param estate An object with the estate data
 * @returns a promise
 */

export async function createEstateQuery(
	// estate: IEstate & IEstatePictures,
	estate: any,
	errorCb: Function
) {
	let estateId: string;
	try {
		await client.query("BEGIN");

		// upload estate
		estateId = await client
			.query(Queries.createEstate, [
				estate.ownerId,
				estate.estateName,
				estate.isPublic,
				estate.isOnline,
				estate.rentOrSell,
				estate.price,
				estate.rooms,
				estate.bedrooms,
				estate.bathrooms,
				estate.description,
				estate.squareMeters,
				estate.country,
				estate.city,
				estate.street,
				estate.streetNumber,
				estate.postcode,
				estate.floorNumber,
				estate.apartNumber,
			])
			.then((res: any) => res.rows[0].estate_id)
			.catch(handleDatabaseErrors);

		// upload pictures
		const promises: Promise<any>[] = [];

		estate.pictures.forEach((picture: any) => {
			promises.push(
				client.query(Queries.createPicture, [
					estateId,
					picture.idOnDisk,
				])
			);
		});

		// add picture id from DB into objects before inserting it into cache
		(await Promise.all(promises)).forEach((insertion, i) => {
			estate.pictures[i].pictureId = insertion.rows[0].picture_id;
		});

		// transform camelCase into snake_case before inserting into cache
		Object.keys(estate).forEach((key) => {
			const snakeKey = snakeCase(key);

			if (!estate[snakeKey]) {
				estate[snakeKey] = estate[key];
				delete estate[key];
			}
		});

		await setEstateInCache(estate, estateId);
		await client.query("COMMIT");
	} catch (err) {
		client.query("ROLLBACK");
		errorCb();
		throw err;
	} finally {
		// TODO: this creates a bug because node-pg is not used correctly
		client.release();
	}

	return estateId;
}

// /**
//  * Update an estate for a given user
//  * @param An object with the estate data
//  * @param userId the id of the user
//  * @returns a promise
//  */

//  export async function updateEstateQuery(
// 	{
// 		estate_id,
// 		isPublic,
// 		isOnline,
// 		rentOrSell,
// 		rooms,
// 		bedrooms,
// 		bathrooms,
// 		price,
// 		estateName,
// 		country,
// 		city,
// 		street,
// 		streetNumber,
// 		postcode,
// 		floorNumber,
// 		apartNumber,
// 		squareMeters,
// 		description,
// 	}: UpdateEstate,
// ) {
// 	let row: any
// 	try {
// 		await client.query("BEGIN");

// 		// upload estate
// 		row = await client
// 			.query(Queries.updateEstate, [
// 				estate_id,
// 				estateName,
// 				isPublic,
// 				isOnline,
// 				rentOrSell,
// 				price,
// 				rooms,
// 				bedrooms,
// 				bathrooms,
// 				description,
// 				squareMeters,
// 				country,
// 				city,
// 				street,
// 				streetNumber,
// 				postcode,
// 				floorNumber,
// 				apartNumber,
// 			])
// 			.then((res: any) => res.rows[0].estate_id)
// 			.catch(handleDatabaseErrors);

// 		await client.query("COMMIT");
// 		await client.release()
// 	} catch (err) {
// 		client.query("ROLLBACK");
// 		throw err;
// 	} finally {
// 		// TODO: this creates a bug
// 		client.release();
// 	}

// 	return row;
// }
