import express from "express";
import authController from "../../controllers/v1/auth-controller";

const router = express.Router();

router.post("/login", authController.generateAToken);
// router.post("/token/refresh", authController.refreshAccessToken);

export = router;
