// Ported from pages/find_church.php and pages/church_profile.php — aligned
// to the church_profile/churches schema in database/schema.sql
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';
import { upload, fileUrl } from '../lib/upload.js';

const router = Router();

// "Our church" profile — single-row table (id always 1)
router.get('/profile', async (req, res) => {
  const [[profile]] = await pool.query('SELECT * FROM church_profile WHERE id = 1');
  if (profile && profile.logo_filename) profile.logo_url = fileUrl(req, profile.logo_filename);
  res.json(profile || {});
});

router.post('/profile', requireAdmin, upload.single('logo'), async (req, res) => {
  const { name, address, phone } = req.body;
  const fields = { name, address: address || null, phone: phone || null };
  if (req.file) fields.logo_filename = req.file.filename;

  const [[existing]] = await pool.query('SELECT id FROM church_profile WHERE id = 1');
  if (existing) {
    const sets = Object.keys(fields).map((k) => `${k} = ?`).join(', ');
    await pool.query(`UPDATE church_profile SET ${sets} WHERE id = 1`, Object.values(fields));
  } else {
    await pool.query(
      'INSERT INTO church_profile (id, name, address, phone, logo_filename) VALUES (1, ?, ?, ?, ?)',
      [name, address || null, phone || null, fields.logo_filename || null]
    );
  }
  const [[updated]] = await pool.query('SELECT * FROM church_profile WHERE id = 1');
  if (updated && updated.logo_filename) updated.logo_url = fileUrl(req, updated.logo_filename);
  res.json(updated);
});

// Directory of other/nearby churches (pages/find_church.php)
router.get('/directory', async (req, res) => {
  const search = String(req.query.q || '').trim();
  let sql = 'SELECT * FROM churches';
  const params = [];
  if (search) {
    sql += ' WHERE name LIKE ? OR address LIKE ? OR phone LIKE ? OR service_times LIKE ?';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }
  sql += ' ORDER BY name ASC';
  const [rows] = await pool.query(sql, params);
  res.json({ churches: rows });
});

router.post('/directory', requireAdmin, async (req, res) => {
  const { name, address, phone, service_times, latitude, longitude } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required.' });
  const [result] = await pool.query(
    'INSERT INTO churches (name, address, phone, service_times, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)',
    [name, address || null, phone || null, service_times || null, latitude === '' ? null : latitude || null, longitude === '' ? null : longitude || null]
  );
  res.status(201).json({ id: result.insertId });
});

router.delete('/directory/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM churches WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
