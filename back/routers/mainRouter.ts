import express from "express";
import * as mainController from "../controllers/mainController";

const router = express.Router();

router.get("/dashboard", mainController.getDashboard);

export default router;
