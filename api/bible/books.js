// Ported from pages/bible_books.php and pages/bible_chapters.php
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM bible_books ORDER BY book_order ASC');
  res.json({ books: rows });
});

router.get('/:bookId', async (req, res) => {
  const [[book]] = await pool.query('SELECT * FROM bible_books WHERE id = ?', [req.params.bookId]);
  if (!book) return res.status(404).json({ error: 'Book not found.' });
  const [loaded] = await pool.query('SELECT DISTINCT chapter FROM bible_verses WHERE book_id = ?', [req.params.bookId]);
  res.json({ book, loadedChapters: loaded.map((r) => r.chapter) });
});

export default router;
