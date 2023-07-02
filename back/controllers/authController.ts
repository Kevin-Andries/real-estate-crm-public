import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import { getGoogleAuthUrl } from "../oauth/google.oauth";
import { getGithubAuthUrl } from "../oauth/github.oauth";
import { hash, compare } from "bcryptjs";
import AppError from "../utils/appError";
import {
	isRegisterFormValid,
	areLoginDetailsValid,
} from "../utils/validation/authValidation";
import setAuth from "../utils/setAuth";
import {
	createOneOAuthUserQuery,
	createOneUserFromOAuthQuery,
	getUserIdFromOAuthId,
	getOneUserWithEmailQuery,
	createOneUserWithEmail,
} from "../db/db";
import { verifyToken } from "../utils/jwt";
import formidable from "formidable";
import { IUserData } from "../utils/interfaces";

// TODO: add refresh token
// TODO: add email validation

export const loginWithGoogle = catchAsyncError(
	async (_, res: Response, _next: NextFunction) => {
		res.redirect(getGoogleAuthUrl());
	}
);

export const loginWithGithub = catchAsyncError(
	async (_, res: Response, _next: NextFunction) => {
		res.redirect(getGithubAuthUrl());
	}
);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const registerWithEmail = catchAsyncError(
	async (req: Request, res: Response, next: NextFunction) => {
		var form = new formidable.IncomingForm();

		form.parse(req, async (_err, fields: any, _files) => {
			// Validate register form
			if (!isRegisterFormValid(fields))
				return next(new AppError(400, "Invalid form"));

			//  Check if email is already taken
			let userFromDB: any = await getOneUserWithEmailQuery(fields.email);

			if (userFromDB) {
				return res.status(409).json({
					message: "Email address already in use",
					error: true,
				});
			}

			// Hash password
			fields.password = await hash(fields.password, 14);

			// save user in db
			let userDetails = await createOneUserWithEmail(
				fields.email,
				fields.firstname,
				fields.lastname,
				fields.password
			);

			let authObject = {
				userId: userDetails.user_id,
				email: userDetails.email,
				firstname: userDetails.firstname,
				lastname: userDetails.lastname,
				username: userDetails.firstname + userDetails.lastname,
			};

			// Send back token in a http only cookie
			setAuth(res, authObject);

			return res.status(201).json({
				message: "user created",
				error: false,
				data: userDetails,
			});
		});
	}
);

export const loginWithEmail = catchAsyncError(
	async (req: Request, res: Response, _next: NextFunction) => {
		var form = new formidable.IncomingForm();

		form.parse(req, async (_err, fields: any, _files) => {
			// Checking data
			if (!areLoginDetailsValid(fields))
				return _next(new AppError(400, "Invalid form"));

			// Checking if user exists
			let user = await getOneUserWithEmailQuery(fields.email);

			if (!user) {
				return res.status(403).json({
					message: "The user does not exist.",
					error: true,
				});
			}

			let authObject = {
				userId: user.user_id,
				email: user.email,
				firstname: user.firstname,
				lastname: user.lastname,
				username: user.firstname + user.lastname,
			};

			// check password
			compare(fields.password, user.pwd, function (_err, result) {
				if (result) {
					// Send back token in a http only cookie
					setAuth(res, authObject);

					return res.status(200).json({
						message: "Welcome home!",
						data: {
							user_id: user.user_id,
							email: user.email,
							account_type: user.account_type,
							firstname: user.firstname,
							lastname: user.lastname,
						},
						error: false,
					});
				}

				if (!result) {
					return res.status(401).json({
						message: "The email or the password seem wrong.",
						error: true,
					});
				}
			});
		});
	}
);
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const oAuthCallback = catchAsyncError(
	async (req: Request, res: Response) => {
		const userData = req.userData;

		// TODO: ask firstname, lastname and email on front and remove this mock data below
		userData.email = "john.doe@gmail.com";
		userData.firstname = "John";
		userData.lastname = "Doe";

		const { oAuthUserId, email, firstname, lastname, username }: IUserData =
			userData;

		// get user from db
		let userFromDB: any = await getUserIdFromOAuthId(oAuthUserId!);

		// if user doesn't exist in db, we create it
		if (!userFromDB) {
			userFromDB = await createOneUserFromOAuthQuery(
				email,
				firstname,
				lastname,
				username
			);
			await createOneOAuthUserQuery(oAuthUserId!, userFromDB.user_id);
		}

		// we use userData as the cookie payload
		// the user id to be sent to the client is not the oAuth one
		// but the one created in our DB
		userData.userId = userFromDB.user_id;

		// create token and cookie
		setAuth(res, userData);

		res.redirect(
			`http://localhost:3000/auth-callback?userData=${JSON.stringify(
				userData
			)}`
		);
	}
);

export const isLoggedIn = catchAsyncError(
	async (req: Request, res: Response) => {
		function unauthorized() {
			return res.sendStatus(401);
		}

		if (!req.cookies) {
			return unauthorized();
		}

		const token = req.cookies.jwt;

		if (!token || !verifyToken(token)) {
			return unauthorized();
		}

		return res.sendStatus(200);
	}
);

export const logout = catchAsyncError(async (_, res: Response) => {
	res.clearCookie("jwt");

	res.sendStatus(200);
});
