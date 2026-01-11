import { createClient } from "../db/connection.js";

export const createBoard = async (req, res, next) => {
  const client = createClient();
  try {
    await client.connect();
    const { title, description, is_public } = req.body;
    const userId = req.session.userId;

    const result = await client.query(
      "INSERT INTO boards (user_id, title, description, is_public) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, description || null, is_public || false]
    );

    res.status(201).json({ board: result.rows[0] });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};

export const getBoards = async (req, res, next) => {
  const client = createClient();
  try {
    await client.connect();
    const userId = req.session.userId;

    const result = await client.query(
      "SELECT * FROM boards WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json({ boards: result.rows });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};

export const updateBoard = async (req, res, next) => {
  const client = createClient();
  try {
    await client.connect();
    const { id } = req.params;
    const { title, description, is_public } = req.body;
    const userId = req.session.userId;

    const checkOwnership = await client.query(
      "SELECT id FROM boards WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (checkOwnership.rows.length === 0) {
      return res.status(404).json({ error: "Board not found or unauthorized" });
    }

    const result = await client.query(
      "UPDATE boards SET title = COALESCE($1, title), description = COALESCE($2, description), is_public = COALESCE($3, is_public) WHERE id = $4 RETURNING *",
      [title, description, is_public, id]
    );

    res.json({ board: result.rows[0] });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};

export const deleteBoard = async (req, res, next) => {
  const client = createClient();
  try {
    await client.connect();
    const { id } = req.params;
    const userId = req.session.userId;

    const result = await client.query(
      "DELETE FROM boards WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Board not found or unauthorized" });
    }

    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};

export const addSoundToBoard = async (req, res, next) => {
  const client = createClient();
  try {
    await client.connect();
    const { boardId, soundId } = req.params;
    const userId = req.sessions.userId;

    const board = await client.query(
      "SELECT id FROM boards WHERE id = $1 AND user_id = $2",
      [boardId, userId]
    );

    if (board.rows.length === 0) {
      return res.status(404).json({ error: "Board not found or unauthorized" });
    }

    const positionResult = await client.query(
      "SELECT COALESCE(MAX(position), 0) + 1 as next_position FROM board_sounds WHERE board_id = $1",
      [boardId]
    );

    const position = positionResult.rows[0].next_position;

    await client.query(
      "INSERT INTO board_sounds (board_id, sound_id, position) VALUES ($1, $2, $3)",
      [(boardId, soundId, position)]
    );

    res.status(201).json({ message: "Sound added to board", position });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(404).json({ error: "Sound not found" });
    }
    next(error);
  } finally {
    await client.end();
  }
};

export const removeSoundFromBoard = async (req, res, next) => {
  const client = createClient();
  try {
    await client.connect();
    const { boardId, soundId } = req.params;
    const userId = req.session.userId;

    const board = await client.query(
      "SELECT id FROM boards WHERE id = $1 AND user_id = $2",
      [boardId, userId]
    );

    if (board.rows.length === 0) {
      return res.status(404).json({ error: "Board not found or unauthorized" });
    }

    const result = await client.query(
      "DELETE FROM board_sounds WHERE board_id = $1 AND sound_id = $2 RETURNING id",
      [boardId, soundId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sound not in board" });
    }
    res.json({ message: "Sound removed from board" });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};
