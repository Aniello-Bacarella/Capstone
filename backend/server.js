import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

import authRoutes from "./routes/auth.js";
import soundsRoutes from "./routes/sounds.js";
import boardsRoutes from "./routes/boards.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const PgStore = pgSession(session);
const pgPool = new pg.Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Increase payload size limit for large audio files (10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Session configuration
app.use(
 session({
   store: new PgStore({
     pool: pgPool,
     tableName: 'session',
     createTableIfMissing: true
   }),
   secret: process.env.SESSION_SECRET || "your-secret-key-change-this",
   resave: false,
   saveUninitialized: false,
   cookie: {
     secure: process.env.NODE_ENV === 'production',
     httpOnly: true,
     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
     maxAge: 24 * 60 * 60 * 1000
   }
 })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sounds", soundsRoutes);
app.use("/api/boards", boardsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Handle payload too large
  if (err.type === "entity.too.large") {
    return res
      .status(413)
      .json({ error: "File too large. Maximum size is 10MB." });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {});
