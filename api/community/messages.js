// Ported from community/messages.php (conversation list) and community/chat.php
// (thread) — aligned to the unified `messages` table in database/schema.sql,
// filtered to recipient_id IS NOT NULL (direct messages, as opposed to
// group_id-keyed group messages handled in groups.js).
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireLogin } from '../lib/auth.js';

const router = Router();

router.get('/messages', requireLogin, async (req, res) => {
  const userId = req.session.userId;
  const [rows] = await pool.query(`
    SELECT u.id AS other_id, u.display_name,
           (SELECT body FROM messages m
            WHERE m.recipient_id IS NOT NULL
              AND ((m.sender_id = u.id AND m.recipient_id = ?) OR (m.sender_id = ? AND m.recipient_id = u.id))
            ORDER BY m.created_at DESC LIMIT 1) AS last_body
    FROM users u
    WHERE u.id != ? AND EXISTS (
      SELECT 1 FROM messages m
      WHERE m.recipient_id IS NOT NULL
        AND ((m.sender_id = u.id AND m.recipient_id = ?) OR (m.sender_id = ? AND m.recipient_id = u.id))
    )
  `, [userId, userId, userId, userId, userId]);
  res.json({ conversations: rows });
});

router.get('/messages/:withUserId', requireLogin, async (req, res) => {
  const userId = req.session.userId;
  const other = req.params.withUserId;
  const [messages] = await pool.query(`
    SELECT * FROM messages
    WHERE recipient_id IS NOT NULL
      AND ((sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?))
    ORDER BY created_at ASC
  `, [userId, other, other, userId]);
  res.json({ messages });
});

router.post('/messages/:withUserId', requireLogin, async (req, res) => {
  const { body } = req.body;
  if (!body) return res.status(400).json({ error: 'Message cannot be empty.' });
  await pool.query('INSERT INTO messages (sender_id, recipient_id, body) VALUES (?, ?, ?)', [req.session.userId, req.params.withUserId, body]);
  res.status(201).json({ ok: true });
});

export default router;
