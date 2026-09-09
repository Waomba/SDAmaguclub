// Ported from api/members/search.php
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/', async (req, res) => {
  const q = req.query.q || '';
  const [rows] = await pool.query(
    'SELECT * FROM members WHERE full_name LIKE ? OR phone LIKE ? ORDER BY full_name ASC LIMIT 50',
    [`%${q}%`, `%${q}%`]
  );
  res.json({ members: rows });
});

export default router;
