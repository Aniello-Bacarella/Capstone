import express from "express";
import * as authController from "../controllers/authController.js";
import { validateRegistration } from "../middleware/validation.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", validateRegistration, authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.getCurrentUser);

export default router;
