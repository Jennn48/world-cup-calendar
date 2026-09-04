import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

dotenv.config();

const db = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
  },
});

export default db;
