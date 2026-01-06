import express from "express";
import * as soundController from "../controllers/soundController.js";
import { requireAuth } from "../middleware/auth.js";
import { validateSoundUpload } from "../middleware/validation.js";

const router = express.Router();

//api endpoints for sounds
router.use(requireAuth);

router.post("/", validateSoundUpload, soundsController.createSound);
router.get("/", soundsController.getSounds);
router.get("/:id", soundsController.getSound);
router.get("/:id/audio", soundsController.getAudioData);
router.patch("/:id", soundsController.updateSound);
router.delete("/:id", soundsController.deleteSound);

export default router;
