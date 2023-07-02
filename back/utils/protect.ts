import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwt";
import AppError from "./appError";
import { isUserData } from "./typeCheck";
import { userExists } from "../db/db";

/**
 * Middleware function to verify if the authorization token recevied in the cookie is valid.
 * @param req request object from express
 * @param _res response object from express
 * @param next next function from express
 */
export default async function protect(
	req: Request,
	_res: Response,
	next: NextFunction
) {
	let token;

	// get token from header or token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	// verify the token
	const userData = verifyToken(token);

	if (!userData || !isUserData(userData)) {
		return next(
			new AppError(
				401,
				"You are not logged in or your token is invalid. Please log in again."
			)
		);
	}

	// check if user exists in db
	// TODO: modify query to also check if the user account is active
	const user = await userExists(userData.userId);

	if (!user) {
		return next(
			new AppError(
				403,
				"Your account is disabled or has been deleted. Contact support for help."
			)
		);
	}

	req.userData = userData;
	next();
}
