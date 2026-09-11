// Ported from pages/gallery.php — aligned to the gallery_images schema
// (filename, date_added) in database/schema.sql
import { Router } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';
import { upload, fileUrl } from '../lib/upload.js';

const router = Router();
const uploadDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'uploads');

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM gallery_images ORDER BY date_added DESC');
  rows.forEach((r) => { r.url = fileUrl(req, r.filename); });
  res.json({ images: rows });
});

router.post('/', requireAdmin, upload.single('image'), async (req, res) => {
  const { caption } = req.body;
  if (!req.file) return res.status(400).json({ error: 'Image file is required.' });
  try {
    const [result] = await pool.query(
      'INSERT INTO gallery_images (filename, caption) VALUES (?, ?)',
      [req.file.filename, caption || '']
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    await fs.unlink(path.join(uploadDir, req.file.filename)).catch(() => {});
    console.error(error);
    res.status(500).json({ error: 'The image could not be saved.' });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const [[image]] = await pool.query('SELECT filename FROM gallery_images WHERE id = ?', [req.params.id]);
  await pool.query('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);
  if (image?.filename) await fs.unlink(path.join(uploadDir, image.filename)).catch(() => {});
  res.json({ ok: true });
});

export default router;
