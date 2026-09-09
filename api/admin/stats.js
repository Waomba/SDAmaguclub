// Ported from admin/dashboard.php's stat tiles — aligned to
// budget_transactions.is_income in database/schema.sql
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.get('/stats', requireAdmin, async (req, res) => {
  const [[{ memberCount }]] = await pool.query('SELECT COUNT(*) AS memberCount FROM members');
  const [[{ eventCount }]] = await pool.query('SELECT COUNT(*) AS eventCount FROM events WHERE event_datetime >= NOW()');
  const [[{ postCount }]] = await pool.query('SELECT COUNT(*) AS postCount FROM posts');
  const [[totals]] = await pool.query(`
    SELECT COALESCE(SUM(CASE WHEN is_income = 1 THEN amount ELSE 0 END),0) AS income,
           COALESCE(SUM(CASE WHEN is_income = 0 THEN amount ELSE 0 END),0) AS expense
    FROM budget_transactions
  `);
  res.json({ memberCount, eventCount, postCount, balance: totals.income - totals.expense });
});

export default router;
