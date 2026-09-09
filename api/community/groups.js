// Ported from community/groups.php and community/group.php — aligned to the
// groups_table/messages schema in database/schema.sql (group chat uses the
// same unified `messages` table as direct messages, keyed by group_id).
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireLogin } from '../lib/auth.js';

const router = Router();

router.get('/groups', async (req, res) => {
  const userId = req.session.userId || 0;
  const [groups] = await pool.query(`
    SELECT g.*, (SELECT COUNT(*) FROM group_members gm WHERE gm.group_id = g.id) AS member_count,
           EXISTS(SELECT 1 FROM group_members gm WHERE gm.group_id = g.id AND gm.user_id = ?) AS is_member
    FROM groups_table g ORDER BY g.name ASC
  `, [userId]);
  groups.forEach((g) => { g.is_member = !!g.is_member; });
  res.json({ groups });
});

router.get('/groups/:id', requireLogin, async (req, res) => {
  const [[group]] = await pool.query('SELECT * FROM groups_table WHERE id = ?', [req.params.id]);
  if (!group) return res.status(404).json({ error: 'Group not found.' });
  res.json({ group });
});

router.post('/groups', requireLogin, async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Group name is required.' });
  const [result] = await pool.query('INSERT INTO groups_table (name, description, created_by) VALUES (?, ?, ?)', [name, description || null, req.session.userId]);
  await pool.query('INSERT INTO group_members (group_id, user_id) VALUES (?, ?)', [result.insertId, req.session.userId]);
  res.status(201).json({ id: result.insertId });
});

router.post('/groups/:id/join', requireLogin, async (req, res) => {
  await pool.query('INSERT IGNORE INTO group_members (group_id, user_id) VALUES (?, ?)', [req.params.id, req.session.userId]);
  res.json({ ok: true });
});

router.post('/groups/:id/leave', requireLogin, async (req, res) => {
  await pool.query('DELETE FROM group_members WHERE group_id = ? AND user_id = ?', [req.params.id, req.session.userId]);
  res.json({ ok: true });
});

router.get('/groups/:id/messages', requireLogin, async (req, res) => {
  const [messages] = await pool.query(`
    SELECT m.id, m.body, m.created_at, m.sender_id, u.display_name
    FROM messages m JOIN users u ON u.id = m.sender_id
    WHERE m.group_id = ? ORDER BY m.created_at ASC
  `, [req.params.id]);
  res.json({ messages });
});

router.post('/groups/:id/messages', requireLogin, async (req, res) => {
  const { body } = req.body;
  if (!body) return res.status(400).json({ error: 'Message cannot be empty.' });
  await pool.query('INSERT INTO messages (sender_id, group_id, body) VALUES (?, ?, ?)', [req.session.userId, req.params.id, body]);
  res.status(201).json({ ok: true });
});

export default router;
