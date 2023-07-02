import { Response } from "express";

const NODE_ENV = process.env.NODE_ENV;

/**
 * Function that sets the auth cookie for a given request object.
 * The cookie is set to secure in prod environment, but not in dev, which allows
 * us to use http and not https in during development.
 * @param res response object from express
 * @param token auth JWT
 */
export default function setAuthCookie(res: Response, token: string) {
	res.cookie("jwt", token, {
		secure: NODE_ENV === "prod" ? true : false,
		httpOnly: true,
	});
}
