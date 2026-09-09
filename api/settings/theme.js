// Ported from pages/settings.php's theme radio + app_setting()/set_app_setting()
// helpers — aligned to app_settings' setting_key/setting_value columns.
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/theme', async (req, res) => {
  const [[row]] = await pool.query("SELECT setting_value FROM app_settings WHERE setting_key = 'theme'");
  res.json({ theme: row?.setting_value || 'light' });
});

router.post('/theme', async (req, res) => {
  const { theme } = req.body;
  await pool.query(
    "INSERT INTO app_settings (setting_key, setting_value) VALUES ('theme', ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
    [theme]
  );
  res.json({ ok: true });
});

export default router;
