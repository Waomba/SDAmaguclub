// Ported from community/register.php
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../lib/db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { username, displayName, password, confirmPassword } = req.body;
  if (!username || !displayName || !password) return res.status(400).json({ error: 'All fields are required.' });
  if (password !== confirmPassword) return res.status(400).json({ error: 'Passwords do not match.' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
  if (existing.length) return res.status(409).json({ error: 'That username is already taken.' });

  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (username, display_name, password_hash, role) VALUES (?, ?, ?, ?)',
    [username, displayName, hash, 'member']
  );
  req.session.userId = result.insertId;
  req.session.role = 'member';
  res.status(201).json({ user: { id: result.insertId, username, display_name: displayName, role: 'member' } });
});

export default router;
