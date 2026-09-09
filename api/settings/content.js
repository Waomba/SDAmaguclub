// Ported from pages/pathfinders.php (pathfinders_info table) and
// pages/website.php (no dedicated table in the original schema — stored as
// an app_settings row, same pattern as theme).
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.get('/pathfinders', async (req, res) => {
  const [[row]] = await pool.query('SELECT content FROM pathfinders_info WHERE id = 1');
  res.json({ content: row?.content || '' });
});

router.post('/pathfinders', requireAdmin, async (req, res) => {
  await pool.query(
    'INSERT INTO pathfinders_info (id, content) VALUES (1, ?) ON DUPLICATE KEY UPDATE content = VALUES(content)',
    [req.body.content || '']
  );
  res.json({ ok: true });
});

router.get('/website', async (req, res) => {
  const [[row]] = await pool.query("SELECT setting_value FROM app_settings WHERE setting_key = 'website_content'");
  res.json({ content: row?.setting_value || '' });
});

router.post('/website', requireAdmin, async (req, res) => {
  await pool.query(
    "INSERT INTO app_settings (setting_key, setting_value) VALUES ('website_content', ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
    [req.body.content || '']
  );
  res.json({ ok: true });
});

export default router;
