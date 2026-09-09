// Ported from api/events/participate.php
import { Router } from 'express';
import { pool } from '../lib/db.js';

const router = Router();

router.post('/:id/participate', async (req, res) => {
  const { fullName, phone } = req.body;
  if (!fullName) return res.status(400).json({ error: 'Your name is required.' });

  // Find or create a lightweight member record for the participant, mirroring
  // the original PHP's "walk-up" participant flow (no login required).
  let memberId;
  const [existing] = await pool.query('SELECT id FROM members WHERE full_name = ? LIMIT 1', [fullName]);
  if (existing.length) {
    memberId = existing[0].id;
  } else {
    const [result] = await pool.query(
      'INSERT INTO members (full_name, phone, membership_status) VALUES (?, ?, "active")',
      [fullName, phone || null]
    );
    memberId = result.insertId;
  }

  await pool.query(
    'INSERT IGNORE INTO event_participants (event_id, member_id) VALUES (?, ?)',
    [req.params.id, memberId]
  );
  res.json({ ok: true });
});

export default router;
