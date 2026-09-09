// Ported from pages/books_library.php, pages/book_chapters.php, pages/book_reader.php
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM library_books ORDER BY title ASC');
  res.json({ books: rows });
});

router.post('/', requireAdmin, async (req, res) => {
  const { title, author, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required.' });
  const [result] = await pool.query('INSERT INTO library_books (title, author, description) VALUES (?, ?, ?)', [title, author || null, description || null]);
  res.status(201).json({ id: result.insertId });
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM library_books WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

router.get('/:bookId/chapters', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM library_chapters WHERE book_id = ? ORDER BY chapter_number ASC', [req.params.bookId]);
  res.json({ chapters: rows });
});

router.post('/:bookId/chapters', requireAdmin, async (req, res) => {
  const { chapter_number, title, content } = req.body;
  const [result] = await pool.query(
    'INSERT INTO library_chapters (book_id, chapter_number, title, content) VALUES (?, ?, ?, ?)',
    [req.params.bookId, chapter_number, title, content]
  );
  res.status(201).json({ id: result.insertId });
});

router.get('/chapters/:chapterId', async (req, res) => {
  const [[chapter]] = await pool.query('SELECT * FROM library_chapters WHERE id = ?', [req.params.chapterId]);
  if (!chapter) return res.status(404).json({ error: 'Chapter not found.' });
  res.json({ chapter });
});

router.put('/chapters/:chapterId', requireAdmin, async (req, res) => {
  const { title, content } = req.body;
  await pool.query('UPDATE library_chapters SET title = ?, content = ? WHERE id = ?', [title, content, req.params.chapterId]);
  res.json({ ok: true });
});

export default router;
