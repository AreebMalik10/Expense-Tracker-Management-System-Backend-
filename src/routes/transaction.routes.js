import express from 'express';
import { createTransaction, getTransactions, deleteTransaction } from '../controllers/transaction.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/', authenticate, createTransaction);
router.get('/', authenticate, getTransactions);
router.delete('/:id', authenticate, deleteTransaction);

export default router;