// Ported from admin/budget/BudgetReports.php and pages/church_budget.php's
// summary — aligned to budget_transactions' is_income/category_id columns.
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.get('/summary', async (req, res) => {
  const [[totals]] = await pool.query(`
    SELECT
      COALESCE(SUM(CASE WHEN is_income = 1 THEN amount ELSE 0 END), 0) AS totalIncome,
      COALESCE(SUM(CASE WHEN is_income = 0 THEN amount ELSE 0 END), 0) AS totalExpense
    FROM budget_transactions
  `);
  const [categories] = await pool.query(`
    SELECT c.name, SUM(t.amount) AS total FROM budget_transactions t
    JOIN budget_categories c ON c.id = t.category_id
    WHERE t.is_income = 0
    GROUP BY c.id ORDER BY total DESC
  `);
  res.json({
    totalIncome: totals.totalIncome,
    totalExpense: totals.totalExpense,
    balance: totals.totalIncome - totals.totalExpense,
    categoryBreakdown: categories,
  });
});

router.get('/categories', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM budget_categories ORDER BY name ASC');
  res.json({ categories: rows });
});

router.post('/categories', requireAdmin, async (req, res) => {
  const { name, isIncome } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required.' });
  const [result] = await pool.query('INSERT INTO budget_categories (name, is_income) VALUES (?, ?)', [name, isIncome ? 1 : 0]);
  res.status(201).json({ id: result.insertId });
});

router.delete('/categories/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM budget_categories WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

router.get('/accounts', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM budget_accounts ORDER BY name ASC');
  res.json({ accounts: rows });
});

router.post('/accounts', requireAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required.' });
  const [result] = await pool.query('INSERT INTO budget_accounts (name) VALUES (?)', [name]);
  res.status(201).json({ id: result.insertId });
});

router.delete('/accounts/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM budget_accounts WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
