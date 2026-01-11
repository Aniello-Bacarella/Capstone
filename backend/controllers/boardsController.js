export const createBoard = async (req, res, next) => {
  try {
    const { title, description, is_public } = req.body;
    const userId = req.session.userId;

    const result = await client.query(
      "INSERT INTO boards (user_id, title, description, is_public) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, title, description || null, is_public || false]
    );

    res.status(201).json({ board: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const getBoards = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    const result = await client.query(
      "SELECT * FROM boards WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json({ boards: result.rows });
  } catch (error) {
    next(error);
  }
};

export const updateBoard = async (req, res, next) => {
  try {
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
  }
};

export const deleteBoard = async (req, res, next) => {
  try {
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
  }
};
