import express from "express";
import * as soundsController from "../controllers/soundController.js";
import { requireAuth } from "../middleware/auth.js";
import { validateSoundUpload } from "../middleware/validation.js";

const router = express.Router();

//api endpoints for sounds
router.use(requireAuth);

router.post("/", validateSoundUpload, soundsController.createSound);
router.get("/", soundsController.getSounds);

export default router;
