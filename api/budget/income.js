// Ported from pages/church_budget.php + pages/add_budget_transaction.php —
// aligned to budget_transactions' category_id/account_id/is_income columns
// in database/schema.sql. Exposed to the frontend as type: 'income'|'expense'
// and category/account names for simplicity (resolved here).
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.get('/transactions', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT t.id, t.amount, t.note, t.txn_date, t.is_income,
           IF(t.is_income = 1, 'income', 'expense') AS type,
           c.name AS category, a.name AS account
    FROM budget_transactions t
    LEFT JOIN budget_categories c ON c.id = t.category_id
    LEFT JOIN budget_accounts a ON a.id = t.account_id
    ORDER BY t.txn_date DESC, t.id DESC
  `);
  res.json({ transactions: rows });
});

router.post('/transactions', requireAdmin, async (req, res) => {
  const { type, amount, category, note, txn_date, account } = req.body;
  if (!type || !amount || !txn_date) return res.status(400).json({ error: 'Type, amount, and date are required.' });

  let categoryId = null;
  if (category) {
    const [[row]] = await pool.query('SELECT id FROM budget_categories WHERE name = ?', [category]);
    categoryId = row?.id || null;
  }
  let accountId = null;
  if (account) {
    const [[row]] = await pool.query('SELECT id FROM budget_accounts WHERE name = ?', [account]);
    accountId = row?.id || null;
  }

  const [result] = await pool.query(
    'INSERT INTO budget_transactions (amount, category_id, account_id, note, txn_date, is_income) VALUES (?, ?, ?, ?, ?, ?)',
    [amount, categoryId, accountId, note || '', txn_date, type === 'income' ? 1 : 0]
  );
  res.status(201).json({ id: result.insertId });
});

router.delete('/transactions/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM budget_transactions WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
