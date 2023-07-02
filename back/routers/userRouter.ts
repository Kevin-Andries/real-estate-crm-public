import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/:id", userController.getUser);
router.post('/verifyRecaptchaToken', userController.verifyRecaptchaToken)

export default router;
