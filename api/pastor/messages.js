// Ported from pages/connect_pastor.php and admin/pastor/PastorMessages.php —
// aligned to the pastors/pastor_messages schema in database/schema.sql
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.get('/contacts', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM pastors ORDER BY name ASC');
  res.json({ contacts: rows });
});

router.post('/contacts', requireAdmin, async (req, res) => {
  const { name, role, phone, email } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required.' });
  const [result] = await pool.query('INSERT INTO pastors (name, role, phone, email) VALUES (?, ?, ?, ?)', [name, role || null, phone || null, email || null]);
  res.status(201).json({ id: result.insertId });
});

router.delete('/contacts/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM pastors WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

router.post('/contacts/:id/messages', async (req, res) => {
  const { senderName, senderContact, message } = req.body;
  if (!senderName || !message) return res.status(400).json({ error: 'Name and message are required.' });
  await pool.query(
    'INSERT INTO pastor_messages (pastor_id, sender_name, sender_contact, message) VALUES (?, ?, ?, ?)',
    [req.params.id, senderName, senderContact || null, message]
  );
  res.status(201).json({ ok: true });
});

router.get('/messages', requireAdmin, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM pastor_messages ORDER BY created_at DESC');
  res.json({ messages: rows });
});

export default router;
