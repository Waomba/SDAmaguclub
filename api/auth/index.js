// Wires together auth/login.js, auth/register.js, auth/logout.js (each mirrors
// one PHP endpoint) plus /me, /forgot-password, /reset-password which the
// original app handled via $_SESSION checks rather than dedicated pages.
import { Router } from 'express';
import { pool } from '../lib/db.js';
import loginRoute from './login.js';
import registerRoute from './register.js';
import logoutRoute from './logout.js';

const router = Router();

router.use('/login', loginRoute);
router.use('/register', registerRoute);
router.use('/logout', logoutRoute);

router.get('/me', async (req, res) => {
  if (!req.session.userId) return res.json({ user: null });
  const [rows] = await pool.query('SELECT id, username, display_name, role FROM users WHERE id = ?', [req.session.userId]);
  res.json({ user: rows[0] || null });
});

// The original app had no self-service reset flow (admins were seeded
// directly into the DB) — these are minimal stand-ins wired for the
// ForgotPassword/ResetPassword pages added to match the target structure.
router.post('/forgot-password', async (req, res) => {
  // No email service configured; acknowledge without revealing whether the account exists.
  res.json({ ok: true });
});

router.post('/reset-password', async (req, res) => {
  res.status(501).json({ error: 'Password reset is not configured for this deployment. Ask a super admin to reset your password directly.' });
});

export default router;
