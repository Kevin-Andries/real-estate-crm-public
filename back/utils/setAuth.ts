import { Response } from "express";
import { IUserData } from "./interfaces";
import { createToken } from "./jwt";
import setAuthCookie from "./setAuthCookie";

export default function setAuth(res: Response, payload: IUserData) {
	const token = createToken(payload);
	setAuthCookie(res, token);
}
