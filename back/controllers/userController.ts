import { Request, Response, NextFunction } from "express";
import { getOneUserQuery } from "../db/db";
import catchAsyncError from "../utils/catchAsyncError";

export const getUser = catchAsyncError(
	async (req: Request, res: Response, _next: NextFunction) => {
		const user = await getOneUserQuery(req.params.id);

		if (!user) {
			return res.sendStatus(404);
		}

		res.json(user);
	}
);

export const verifyRecaptchaToken = catchAsyncError(
	async (req: Request, res: Response, _next: NextFunction) => {
		let url = `https://www.google.com/recaptcha/api/siteverify?secret=xxx&response=${req.body.token}`;

		console.log("url", url);
		fetch(url)
			.then((response) => response.json())
			.then((google_response: any) => {
				console.log("res", google_response);
				// google_response is the object return by
				// google as a response
				if (google_response.success == true) {
					// if captcha is verified
					return res
						.status(200)
						.json({ error: false, response: "Successful" });
				} else {
					// if captcha is not verified
					return res
						.status(401)
						.send({ error: true, response: "Failed" });
				}
			})
			.catch((error) => {
				// Some error while verify captcha
				return res.status(500).json({ error: true });
			});
	}
);
