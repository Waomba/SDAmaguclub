// Ported from admin/login.php
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../lib/db.js';

const router = Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  req.session.userId = user.id;
  req.session.role = user.role;
  res.json({ user: { id: user.id, username: user.username, display_name: user.display_name, role: user.role } });
});

export default router;
