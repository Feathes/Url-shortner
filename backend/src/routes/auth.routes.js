import express from "express";
import { createUser, loginUser, logoutUser, getProfile } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/logout", protect, logoutUser);
router.get("/profile", protect, getProfile)

export default router
