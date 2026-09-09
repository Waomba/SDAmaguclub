// Ported from api/attendance/index.php and pages/attendance.php's per-event
// attendance-rate listing
import { Router } from 'express';
import { pool } from '../lib/db.js';
import recordRoute from './record.js';
import updateRoute from './update.js';
import statisticsRoute from './statistics.js';

const router = Router();

router.get('/events', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT e.id, e.title, e.event_datetime,
           COUNT(a.id) AS total_count,
           SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count
    FROM events e
    LEFT JOIN attendance a ON a.event_id = e.id
    GROUP BY e.id
    ORDER BY e.event_datetime DESC
  `);
  res.json({ events: rows });
});

router.get('/events/:eventId', async (req, res) => {
  const [[event]] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.eventId]);
  if (!event) return res.status(404).json({ error: 'Event not found.' });
  const [rows] = await pool.query(`
    SELECT m.id AS member_id, m.full_name, COALESCE(a.status, 'absent') AS status, a.id
    FROM members m
    LEFT JOIN attendance a ON a.member_id = m.id AND a.event_id = ?
    ORDER BY m.full_name ASC
  `, [req.params.eventId]);
  res.json({ event, rows });
});

router.get('/members/:memberId', async (req, res) => {
  const [[stats]] = await pool.query(`
    SELECT COUNT(*) AS total, SUM(CASE WHEN status='present' THEN 1 ELSE 0 END) AS present
    FROM attendance WHERE member_id = ?
  `, [req.params.memberId]);
  const rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : null;
  res.json({ rate });
});

router.use('/record', recordRoute);
router.use('/update', updateRoute);
router.use('/statistics', statisticsRoute);

export default router;
