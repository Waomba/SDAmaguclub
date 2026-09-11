import pg from 'pg';
import 'dotenv/config';

// PostgreSQL connection pool. Set DB_HOST, DB_PORT, DB_USER, DB_PASS, and
// DB_NAME in api/.env for the local PostgreSQL or Supabase database.
export const pool = new pg.Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'postgres',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost'
    ? { rejectUnauthorized: false }
    : false,
});

// Keep the old array-shaped helper available to controllers that use it.
export const query = async (text, params) => {
  const result = await pool.query(text, params);
  return [result.rows, result.fields];
};
