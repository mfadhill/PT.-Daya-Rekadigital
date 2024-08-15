import { Router } from 'express';
import { createTransactionController } from '../controllers/transactionController';

const router = Router();

router.post('/transaction', createTransactionController);

export default router;
