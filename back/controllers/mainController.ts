import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../utils/catchAsyncError";

export const getDashboard = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		// TODO: send back three main properties (sorted by prices?)
		res.json({});
	}
);
