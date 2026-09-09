import { Router } from 'express';
import booksRoute from './books.js';
import chaptersRoute from './chapters.js';
import versesRoute from './verses.js';

const router = Router();
router.use('/books', booksRoute);
router.use('/books', chaptersRoute);
router.use('/', versesRoute);

export default router;
