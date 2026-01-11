export const createBoard = async (req, res, next) => {
  try {
    const { title, description, is_public } = req.body;
    const userId = req.session.userId;

    const result = await client.query(
      `INSERT INTO boards (user_id, title, description, is_public) VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, title, description || null, is_public || false]
    );

    res.status(201).json({ board: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
