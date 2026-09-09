// Wires together community/posts.php, community/groups.php + group.php,
// community/messages.php + chat.php, and community/notifications.php
import { Router } from 'express';
import postsRoute from './posts.js';
import groupsRoute from './groups.js';
import messagesRoute from './messages.js';
import notificationsRoute from './notifications.js';

const router = Router();
router.use('/', postsRoute);
router.use('/', groupsRoute);
router.use('/', messagesRoute);
router.use('/', notificationsRoute);

export default router;
