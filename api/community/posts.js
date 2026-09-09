// Ported from community/feed.php — aligned to the posts/comments/reactions
// schema in database/schema.sql (image_filename, comments, reactions tables)
import { Router } from 'express';
import { pool } from '../lib/db.js';
import { requireLogin } from '../lib/auth.js';
import { upload, fileUrl } from '../lib/upload.js';

const router = Router();

router.get('/posts', async (req, res) => {
  const userId = req.session.userId || 0;
  const [posts] = await pool.query(`
    SELECT p.*, u.display_name, u.role,
           (SELECT COUNT(*) FROM reactions r WHERE r.post_id = p.id) AS reaction_count,
           EXISTS(SELECT 1 FROM reactions r WHERE r.post_id = p.id AND r.user_id = ?) AS reacted
    FROM posts p JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
  `, [userId]);

  for (const post of posts) {
    post.reacted = !!post.reacted;
    if (post.image_filename) post.image_url = fileUrl(req, post.image_filename);
    const [comments] = await pool.query(`
      SELECT c.id, c.content, u.display_name FROM comments c
      JOIN users u ON u.id = c.user_id
      WHERE c.post_id = ? ORDER BY c.created_at ASC
    `, [post.id]);
    post.comments = comments;
  }
  res.json({ posts });
});

router.post('/posts', requireLogin, upload.single('image'), async (req, res) => {
  const { content } = req.body;
  const [result] = await pool.query(
    'INSERT INTO posts (user_id, content, image_filename) VALUES (?, ?, ?)',
    [req.session.userId, content || '', req.file ? req.file.filename : null]
  );
  res.status(201).json({ id: result.insertId });
});

router.delete('/posts/:id', requireLogin, async (req, res) => {
  const [[post]] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  const isOwner = post.user_id === req.session.userId;
  const isAdmin = ['admin', 'super_admin'].includes(req.session.role);
  if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Not allowed.' });
  await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

router.post('/posts/:id/comments', requireLogin, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Comment cannot be empty.' });
  await pool.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [req.params.id, req.session.userId, content]);
  res.status(201).json({ ok: true });
});

router.post('/posts/:id/reactions', requireLogin, async (req, res) => {
  const [existing] = await pool.query('SELECT id FROM reactions WHERE post_id = ? AND user_id = ?', [req.params.id, req.session.userId]);
  if (existing.length) {
    await pool.query('DELETE FROM reactions WHERE id = ?', [existing[0].id]);
  } else {
    await pool.query("INSERT INTO reactions (post_id, user_id, type) VALUES (?, ?, 'like')", [req.params.id, req.session.userId]);
  }
  res.json({ ok: true });
});

export default router;
