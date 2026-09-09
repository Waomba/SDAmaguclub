// Ported from pages/bible_reader.php
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/:bookId/chapters/:chapter', async (req, res) => {
  const [[book]] = await pool.query('SELECT * FROM bible_books WHERE id = ?', [req.params.bookId]);
  if (!book) return res.status(404).json({ error: 'Book not found.' });
  const [verses] = await pool.query(
    'SELECT * FROM bible_verses WHERE book_id = ? AND chapter = ? ORDER BY verse ASC',
    [req.params.bookId, req.params.chapter]
  );
  res.json({ book, verses });
});

export default router;
