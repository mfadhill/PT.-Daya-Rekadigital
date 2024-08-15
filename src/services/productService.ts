import prisma from '../config/prisma';
import { Product } from '@prisma/client';

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    try {
        return await prisma.product.create({
            data: productData,
        });
    } catch (error) {
        throw new Error(`Error creating product: ${error}`);
    }
};


export const updateProductStock = async (productId: number, quantityChange: number): Promise<Product> => {
    try {
        // Temukan produk berdasarkan ID
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) throw new Error('Product not found');

        // Hitung stok baru
        const newStock = product.stock + quantityChange;

        // Pastikan stok tidak negatif
        if (newStock < 0) throw new Error('Insufficient stock');

        // Update stok produk
        return await prisma.product.update({
            where: { id: productId },
            data: { stock: newStock },
        });
    } catch (error) {
        throw new Error(`Error updating product stock: ${error}`);
    }
};