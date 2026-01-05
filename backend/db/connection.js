import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

export const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

export const createClient = () => {
  return new Client(dbConfig);
};
