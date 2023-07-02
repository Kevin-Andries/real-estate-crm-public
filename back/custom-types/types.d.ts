/**
 * Extends Express req object type definition to add our own userData.
 * That way, it prevents type error when we want to set it during auth.
 */
declare namespace Express {
	export interface Request {
		userData: import("../utils/interfaces").IUserData;
	}
}
