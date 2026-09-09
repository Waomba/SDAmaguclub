// Ported from admin/logout.php
import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

export default router;
