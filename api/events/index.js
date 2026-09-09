// Ported from api/events/index.php and pages/events.php
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';
import detailsRoute from './details.js';
import participateRoute from './participate.js';
import attendanceRoute from './attendance.js';

const router = Router();

router.get('/', async (req, res) => {
  const [events] = await pool.query(`
    SELECT e.*, COUNT(p.id) AS participant_count
    FROM events e LEFT JOIN event_participants p ON p.event_id = e.id
    GROUP BY e.id ORDER BY e.event_datetime ASC
  `);
  res.json({ events });
});

router.post('/', requireAdmin, async (req, res) => {
  const { title, event_datetime, location, description } = req.body;
  if (!title || !event_datetime) return res.status(400).json({ error: 'Title and date/time are required.' });
  const [result] = await pool.query(
    'INSERT INTO events (title, event_datetime, location, description) VALUES (?, ?, ?, ?)',
    [title, event_datetime, location || null, description || null]
  );
  res.status(201).json({ id: result.insertId });
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

router.use('/', detailsRoute);
router.use('/', participateRoute);
router.use('/', attendanceRoute);

export default router;
