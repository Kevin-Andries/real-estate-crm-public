import express from "express";
import * as estateController from "../controllers/estateController";
import protect from "../utils/protect";

const router = express.Router();

router
	.route("/")
	.post(protect, estateController.createEstate)
	.get(estateController.getAllEstates);

router.route("/me").get(protect, estateController.getAllEstateFromMe);
// TODO: the route below
//router.route("/me/:estateId").get(protect, estateController.getEstateFromMe);

router.get("/all/:userId", estateController.getAllEstateFromUser);

router
	.route("/:estateId")
	.get(estateController.getEstate)
	// .put(estateController.updateOneEstate)
	.delete(estateController.deleteOneEstate);

router
	.route("/:estateId/picture/:pictureId")
	.get(estateController.getEstatePicture);

export default router;
