// Ported from api/events/details.php and pages/event-details.php
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.get('/:id', async (req, res) => {
  const [[event]] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
  if (!event) return res.status(404).json({ error: 'Event not found.' });
  const [participants] = await pool.query(`
    SELECT m.id, m.full_name FROM event_participants p
    JOIN members m ON m.id = p.member_id
    WHERE p.event_id = ? ORDER BY m.full_name ASC
  `, [req.params.id]);
  res.json({ event, participants });
});

export default router;
