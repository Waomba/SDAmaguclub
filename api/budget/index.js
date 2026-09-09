import { Router } from 'express';
import incomeRoute from './income.js';
import reportsRoute from './reports.js';

const router = Router();
router.use('/', incomeRoute);   // /transactions
router.use('/', reportsRoute);  // /summary, /categories, /accounts

export default router;
