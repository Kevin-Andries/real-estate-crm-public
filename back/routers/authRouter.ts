import express from "express";
import * as authController from "../controllers/authController";
import getOAuthId from "../oauth/getUserData.oauth";

const router = express.Router();

// oAuth
router.get("/login/google", authController.loginWithGoogle);
router.get("/login/github", authController.loginWithGithub);
router.get(
	"/login/google-callback",
	getOAuthId.bind(this, "google"),
	authController.oAuthCallback
);
router.get(
	"/login/github-callback",
	getOAuthId.bind(this, "github"),
	authController.oAuthCallback
);

// Email-password auth
router.post("/register", authController.registerWithEmail);
router.post("/login", authController.loginWithEmail);

// Others
router.get("/is-logged-in", authController.isLoggedIn);
router.get("/logout", authController.logout);

export default router;
