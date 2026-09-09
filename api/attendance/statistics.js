// Ported from admin/attendance/AttendanceReports.php
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT e.id, e.title,
           COUNT(a.id) AS total_count,
           SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count
    FROM events e LEFT JOIN attendance a ON a.event_id = e.id
    GROUP BY e.id ORDER BY e.event_datetime DESC
  `);
  res.json({ events: rows });
});

export default router;
