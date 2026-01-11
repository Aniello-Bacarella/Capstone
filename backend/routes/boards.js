import express from "express";
import * as boardsController from "../controllers/boardsController.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBoardInput } from "../middleware/validation.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", validateBoardInput, boardsController.createBoard);
router.get("/", boardsController.getBoards);
router.get("/:id", boardsController.getBoard);
router.patch("/:id", boardsController.updateBoard);
router.delete("/:id", boardsController.deleteBoard);
router.post("/:boardId/sounds/:soundId", boardsController.addSoundToBoard);
router.delete(
  "/:boardId/sounds/:soundId",
  boardsController.removeSoundFromBoard
);

export default router;
