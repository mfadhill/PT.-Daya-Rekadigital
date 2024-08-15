import { Request, Response } from 'express';
import { createProduct } from '../services/productService';
import * as productService from '../services/productService';
import prisma from '../config/prisma';

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData = req.body;

        const product = await createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// export const getProducts = async (req: Request, res: Response) => {
//     try {
//         const products = await productService.getProducts();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ error: `Error fetching products: ${error}` });
//     }
// };

export const updateProductStock = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;

        // Pastikan quantity adalah angka
        if (typeof quantity !== 'number') {
            return res.status(400).json({ error: 'Quantity must be a number' });
        }

        // Panggil service untuk mengupdate stok
        const updatedProduct = await productService.updateProductStock(productId, -quantity);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: `Error updating product stock: ${error}` });
    }
};

// Endpoint untuk menambah stok produk jika perlu (misalnya, untuk restock)
export const restockProduct = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;

        // Pastikan quantity adalah angka
        if (typeof quantity !== 'number') {
            return res.status(400).json({ error: 'Quantity must be a number' });
        }

        // Panggil service untuk menambah stok
        const updatedProduct = await productService.updateProductStock(productId, quantity);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: `Error restocking product: ${error}` });
    }
};