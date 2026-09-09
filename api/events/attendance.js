// Ported from api/events/attendance.php — convenience alias that forwards to
// the shared attendance endpoints under /attendance/events/:eventId
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/:id/attendance', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT m.id AS member_id, m.full_name, COALESCE(a.status, 'absent') AS status
    FROM members m
    LEFT JOIN attendance a ON a.member_id = m.id AND a.event_id = ?
    ORDER BY m.full_name ASC
  `, [req.params.id]);
  res.json({ rows });
});

export default router;
