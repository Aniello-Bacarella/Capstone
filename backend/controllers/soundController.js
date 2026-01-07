import { createClient } from "../db/connection.js";

export const createSound = async (req, res, next) => {
  const client = createClient();

  try {
    await client.connect();

    const { title, filename, audio_data, mimetype, filesize, duration_ms } =
      req.body;
    const userId = req.session.userId;

    // convert base64 audio data to buffer for bytea storage

    const audioBuffer = Buffer.from(audio_data, "base64");

    const result = await client.query(
      `INSERT INTO sounds 
        (user_id, title, filename, audio_data, mimetype, filesize, duration_ms)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, user_id, title, filename, mimetype, filesize, duration_ms, created_at`,
      [
        userId,
        title,
        filename,
        audioBuffer,
        mimetype,
        filesize,
        duration_ms || null,
      ]
    );

    res.status(201).json({ sound: result.rows[0] });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};

export const getSounds = async (req, res, next) => {
  const client = createClient();

  try {
    await client.connect();

    const userId = req.session.userId;
    const { search } = req.query;

    let query = `SELECT id, user_id, title, filename, mimetype, filesize, duration_ms, created_at FROM sounds WHERE user_id = $1`;

    const params = [userId];
    if (search) {
      query += " AND title ILIKE $2";
      params.push(`%${search}%`);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    res.json({ sounds: result.rows });
  } catch (error) {
    next(error);
  }
};

export const getSound = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, user_id, title, filename, mimetype, filesize, duration_ms, created_at 
       FROM sounds 
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sound not found" });
    }

    res.json({ sound: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
