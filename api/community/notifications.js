// Ported from includes/notifications.php / community/notifications.php
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireLogin } from '../lib/auth.js';

const router = Router();

router.get('/notifications', requireLogin, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [req.session.userId]
  );
  res.json({ notifications: rows });
});

export default router;
