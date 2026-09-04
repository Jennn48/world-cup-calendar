import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
  },
});

export default db;
