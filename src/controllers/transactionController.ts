import { Request, Response } from 'express';
import { createTransaction } from '../services/transactionService';

export const createTransactionController = async (req: Request, res: Response) => {
    const { customerId, productId, quantity } = req.body;

    if (!customerId || !productId || !quantity) {
        return res.status(400).json({ error: 'customerId, productId, and quantity are required' });
    }

    try {
        const transaction = await createTransaction(customerId, productId, quantity);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction could not be created' });
        }

        return res.status(201).json(transaction);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
