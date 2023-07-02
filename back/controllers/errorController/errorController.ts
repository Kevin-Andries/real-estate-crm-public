import { Request, Response, NextFunction } from "express";
import printRed from "../../utils/print";
import handleDatabaseErrors from "./dbErrors";

export default function (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	if (err.isOperational) {
		res.status(err.code).json({
			message: err.message,
		});
	} else if (err.appErrorType === "PG-ERROR") {
		handleDatabaseErrors(err, res);
	} else {
		// In this case, we couldn't figure out the type of error
		// This situation is very bad
		printRed(err);
		res.status(500).json({
			message: "shit happens",
		});
	}
}
