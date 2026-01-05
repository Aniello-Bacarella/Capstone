import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import soundRoutes from "./routes/sounds.js";
import boardRoutes from "./routes/boards.js";

dotenv.config();
