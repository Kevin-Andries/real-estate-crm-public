import { Response } from "express";
import printRed from "../../utils/print";

export default function handleDatabaseErrors(err: any, res: Response) {
	printRed("DB-ERROR\n" + err.toString());

	// TODO: find out why this error code is almost always used by PG
	if ((err.code = "42804")) {
		res.status(400).json({
			message: "Incorrect data type",
		});
	} else {
		res.status(400).json({
			message: "Incorrect data",
		});
	}
}
