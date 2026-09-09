// Ported from pages/bible_search.php
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  if (!q) return res.json({ verses: [] });
  const [rows] = await pool.query(`
    SELECT v.*, b.name AS book_name FROM bible_verses v
    JOIN bible_books b ON b.id = v.book_id
    WHERE v.text LIKE ? LIMIT 100
  `, [`%${q}%`]);
  res.json({ verses: rows });
});

export default router;
