import jwt from "jsonwebtoken";
import { IUserData } from "./interfaces";

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Helper function to create/sign a JWT
 * @param payload data of the user
 * @returns the signed JWT
 */
export function createToken(payload: IUserData) {
	return jwt.sign(payload, JWT_SECRET);
}

/**
 * Helper function to verify a JWT
 * @param token
 * @returns the payload or throws an error
 */
export function verifyToken(token: string) {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (_) {
		return null;
	}
}
