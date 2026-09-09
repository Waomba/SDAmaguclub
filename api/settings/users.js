// Ported from admin/settings/Users.php (super-admin only account management)
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../lib/db.js';
import { requireSuperAdmin } from '../lib/auth.js';

const router = Router();

router.get('/users', requireSuperAdmin, async (req, res) => {
  const [rows] = await pool.query("SELECT id, username, display_name, role FROM users WHERE role IN ('admin','super_admin') ORDER BY display_name ASC");
  res.json({ users: rows });
});

router.post('/users', requireSuperAdmin, async (req, res) => {
  const { username, displayName, password, role } = req.body;
  if (!username || !displayName || !password) return res.status(400).json({ error: 'All fields are required.' });
  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (username, display_name, password_hash, role) VALUES (?, ?, ?, ?)',
    [username, displayName, hash, role || 'admin']
  );
  res.status(201).json({ id: result.insertId });
});

router.put('/users/:id/role', requireSuperAdmin, async (req, res) => {
  await pool.query('UPDATE users SET role = ? WHERE id = ?', [req.body.role, req.params.id]);
  res.json({ ok: true });
});

router.delete('/users/:id', requireSuperAdmin, async (req, res) => {
  await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
