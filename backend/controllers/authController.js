import { createClient } from "../db/connection.js";
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

export const login = async (req, res, next) => {
  const client = createClient();

  try {
    await client.connect();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    const validPassword = await comparePassword(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = user.id;
    req.session.email = user.email;
   req.session.save((err) => {
   if (err) {
   console.error('SESSION SAVE ERROR:', err);
   return next(err);
 }
  console.log('=== LOGIN SUCCESS ===');
  console.log('Session saved, ID:', req.sessionID);
  console.log('Session data:', req.session);
  console.log('Cookie will be:', req.session.cookie);
  sres.json({
   message: "Login successful",
   user: {
     id: user.id,
     email: user.email,
     display_name: user.display_name,
   },
 });
});
 } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logout successful" });
  });
};

export const getCurrentUser = async (req, res, next) => {
  const client = createClient();

  try {
    await client.connect();

    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const result = await client.query(
      "SELECT id, email, display_name FROM users WHERE id = $1",
      [req.session.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
};
