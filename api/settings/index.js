import { Router } from 'express';
import themeRoute from './theme.js';
import contentRoute from './content.js';
import sabbathRoute from './sabbath.js';
import usersRoute from './users.js';

const router = Router();
router.use('/', themeRoute);
router.use('/', contentRoute);
router.use('/', sabbathRoute);
router.use('/', usersRoute);

export default router;
