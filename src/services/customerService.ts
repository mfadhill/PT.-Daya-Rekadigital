import prisma from '../config/prisma';
// import { Customer } from '@prisma/client';
import { Customer } from '@prisma/client';

export const createCustomer = async (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
    try {
        return await prisma.customer.create({
            data: customerData,
        });
    } catch (error) {
        throw new Error(`Error creating customer: ${error}`);
    }
};

export const getAllCustomers = async (): Promise<Customer[]> => {
    try {
        return await prisma.customer.findMany();
    } catch (error) {
        throw new Error(`Error fetching customers: ${error}`);
    }
};

// Fungsi untuk mendapatkan customer berdasarkan ID
export const getCustomerById = async (id: number): Promise<Customer | null> => {
    try {
        return await prisma.customer.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Error fetching customer by ID: ${error}`);
    }
};

// Fungsi untuk memperbarui customer berdasarkan ID
export const updateCustomer = async (
    id: number,
    data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Customer> => {
    try {
        return await prisma.customer.update({
            where: { id },
            data,
        });
    } catch (error) {
        throw new Error(`Error updating customer: ${error}`);
    }
};

// Fungsi untuk menghapus customer berdasarkan ID
export const deleteCustomer = async (id: number): Promise<Customer> => {
    try {
        return await prisma.customer.delete({
            where: { id },
        });
    } catch (error) {
        throw new Error(`Error deleting customer: ${error}`);
    }
};


export const getCustomerDetails = async (id: number) => {
    return await prisma.customer.findUnique({
        where: { id },
        include: {
            transactions: {
                include: {
                    product: true, // Include product details in the transactions
                },
            },
        },
    });
};

export const getTotalPriceForCustomer = async (customerId: number) => {

    const transactions = await prisma.transaction.findMany({
        where: { customerId: customerId },
    });
    const totalPrice = transactions.reduce((acc, transaction) => acc + transaction.totalPrice, 0);
    return totalPrice;
};