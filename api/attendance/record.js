// Ported from admin/attendance/RecordAttendance.php
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.post('/', requireAdmin, async (req, res) => {
  const { eventId, rows } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    for (const r of rows) {
      await conn.query(
        `INSERT INTO attendance (event_id, member_id, status) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [eventId, r.memberId, r.status]
      );
    }
    await conn.commit();
    res.json({ ok: true });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: 'Could not save attendance.' });
  } finally {
    conn.release();
  }
});

export default router;
