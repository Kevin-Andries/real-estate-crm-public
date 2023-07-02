import { IUserData } from "./interfaces";

/**
 * Function that returns true or false, if the object passed as parameter is of type IUserData
 * (which is an interface)
 * @param obj the object we want to check
 * @returns true or false
 */
export function isUserData(obj: any): obj is IUserData {
	return "userId" in obj;
}
