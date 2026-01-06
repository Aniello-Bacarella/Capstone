import express from "express";
import * as soundController from "../controllers/soundController.js";
import { requireAuth } from "../middleware/auth.js";
import { validateSoundUpload } from "../middleware/validation.js";

const router = express.Router();
