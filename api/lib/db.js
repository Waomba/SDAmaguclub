// Ported from includes/db.php's PDO connection setup, using mysql2's promise
// pool instead of PDO.
import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'magusdaclub',
  waitForConnections: true,
  connectionLimit: 10,
});
