// Ported from pages/gallery.php — aligned to the gallery_images schema
// (filename, date_added) in database/schema.sql
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';
import { upload, fileUrl } from '../lib/upload.js';

const router = Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM gallery_images ORDER BY date_added DESC');
  rows.forEach((r) => { r.url = fileUrl(req, r.filename); });
  res.json({ images: rows });
});

router.post('/', requireAdmin, upload.single('image'), async (req, res) => {
  const { caption, album } = req.body;
  if (!req.file) return res.status(400).json({ error: 'Image file is required.' });
  const [result] = await pool.query(
    'INSERT INTO gallery_images (filename, caption, album) VALUES (?, ?, ?)',
    [req.file.filename, caption || '', album || '']
  );
  res.status(201).json({ id: result.insertId });
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
