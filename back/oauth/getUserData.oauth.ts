import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { getGoogleUserData } from "./google.oauth";
import { getGithubUserData } from "./github.oauth";

/**
 * Middleware function to request the unique ID of the user from the resource server based on the provider
 * e.g Google, GitHub, etc. Puts it in the req object to be available for the next middleware.
 * @param provider string that contains the name of the provider, e.g "google" or "github"
 * @param req request object from express
 * @param _res response object from express
 * @param next next function from express
 */
export default async function getOAuthId(
	provider: string,
	req: Request,
	_res: Response,
	next: NextFunction
) {
	const code = req.query.code as string;

	let getUserData: any;
	switch (provider) {
		case "google":
			getUserData = getGoogleUserData;
			break;
		case "github":
			getUserData = getGithubUserData;
			break;
		default:
			next(new AppError(400, "oauth provider not recognized"));
	}

	req.userData = await getUserData(code);

	next();
}
