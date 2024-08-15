import { Transaction, Product } from '@prisma/client';

export interface FormattedTransaction {
    productName: string;
    quantity: number;
}

export interface FormattedCustomer {
    id: number;
    name: string;
    email: string;
    level: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
    transactions: FormattedTransaction[];
}
