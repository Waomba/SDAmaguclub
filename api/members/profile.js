// Ported from api/members/profile.php and pages/member-profile.php
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const router = Router();

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM members WHERE id = ?', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Member not found.' });
  res.json({ member: rows[0] });
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { full_name, phone, email, membership_status, notes } = req.body;
  await pool.query(
    'UPDATE members SET full_name=?, phone=?, email=?, membership_status=?, notes=? WHERE id=?',
    [full_name, phone || null, email || null, membership_status || 'active', notes || null, req.params.id]
  );
  res.json({ ok: true });
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM members WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

export default router;
