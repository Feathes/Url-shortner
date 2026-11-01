import express from "express";
import { createUrl, fetchUrl,getAllUrl } from "../controllers/createUrl.controller.js";
import { protect, optionalAuth } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/", optionalAuth, createUrl);
router.get("/", protect, getAllUrl);
router.get("/:shortcode", fetchUrl);

export default router