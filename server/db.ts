import { env } from "@/lib/env.mjs";
import postgres from "postgres";

const sql = postgres({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME,
  ssl: false,
});

export default sql;
