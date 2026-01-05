import { createClient } from "../db/connection.ks";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

export const register = async (req, res, next) => {
  const client = createClient();

  try {
    await client.connect();
    const { email, password, display_name } = req.body;

    const existingUser = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const password_hash = await hashPassword(password);

    const result = await client.query(
      "INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name",
      [email, password_hash, display_name]
    );

    const user = result.rows[0];

    req.session.userId = user.id;
    req.session.email = user.email;

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};
