import { config } from "dotenv";
import { Pool } from "pg";
config();

export const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DBPORT || "5432"),
});
