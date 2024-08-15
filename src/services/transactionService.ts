import { PrismaClient, Transaction, Product } from '@prisma/client';

const prisma = new PrismaClient();

export const createTransaction = async (
    customerId: number,
    productId: number,
    quantity: number
): Promise<Transaction | null> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new Error('Product not found');
        }
        const totalPrice = product.price * quantity;
        const transaction = await prisma.transaction.create({
            data: {
                customerId,
                productId,
                quantity,
                totalPrice,
                transactionDate: new Date(),
            },
        });

        return transaction;
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
    }
};

