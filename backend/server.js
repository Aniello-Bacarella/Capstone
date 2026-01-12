import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple"
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

import authRoutes from "./routes/auth.js";
import soundsRoutes from "./routes/sounds.js";
import boardsRoutes from "./routes/boards.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

const PgStore = pgSession(session);
const pgPool = new pg.Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

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

// Test endpoint to verify session works
app.get('/api/test-session', (req, res) => {
 console.log('TEST SESSION - Before set');
 console.log('Session ID:', req.sessionID);
 console.log('Session:', req.session);
 req.session.test = 'hello';
 req.session.save((err) => {
   if (err) {
     console.error('TEST SESSION SAVE ERROR:', err);
     return res.status(500).json({ error: err.message });
   }
   console.log('TEST SESSION - After save');
   console.log('Session ID:', req.sessionID);
   console.log('Session:', req.session);
   res.json({
     message: 'Session test',
     sessionID: req.sessionID,
     session: req.session
   });
 });
});

// Debug middleware
app.use((req, res, next) => {
 console.log('=== REQUEST ===');
 console.log('URL:', req.url);
 console.log('Method:', req.method);
 console.log('Session ID:', req.sessionID);
 console.log('Session data:', req.session);
 next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sounds", soundsRoutes);
app.use("/api/boards", boardsRoutes);

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
