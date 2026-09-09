// Ported from api/members/index.php (list + create) and pages/members.php
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';
import profileRoute from './profile.js';
import searchRoute from './search.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  let sql = 'SELECT * FROM members';
  const params = [];
  if (q) { sql += ' WHERE full_name LIKE ?'; params.push(`%${q}%`); }
  sql += ' ORDER BY full_name ASC';
  const [rows] = await pool.query(sql, params);
  res.json({ members: rows });
});

router.post('/', requireAdmin, async (req, res) => {
  const { full_name, phone, email } = req.body;
  if (!full_name) return res.status(400).json({ error: 'Full name is required.' });
  const [result] = await pool.query(
    'INSERT INTO members (full_name, phone, email, membership_status, joined_date) VALUES (?, ?, ?, "active", CURDATE())',
    [full_name, phone || null, email || null]
  );
  res.status(201).json({ id: result.insertId });
});

router.use('/search', searchRoute);
router.use('/', profileRoute); // handles /:id GET/PUT/DELETE

export default router;
