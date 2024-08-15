import { Request, Response } from 'express';
import { createCustomer } from '../services/customerService';
import * as customerService from '../services/customerService';
import prisma from '../config/prisma';
import { Customer } from '@prisma/client';

export const addCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const customerData = req.body;
        const customer = await createCustomer(customerData);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await customerService.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customers' });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const customer = await customerService.getCustomerById(parseInt(req.params.id, 10));
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customer' });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const customer = await customerService.updateCustomer(parseInt(req.params.id, 10), req.body);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Error updating customer' });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        await customerService.deleteCustomer(parseInt(req.params.id, 10));
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting customer' });
    }
};

// export const getCustomerDetail = async (req: Request, res: Response) => {
//     try {
//         const customerId = parseInt(req.params.id, 10);
//         const customer = await customerService.getCustomerDetails(customerId);

//         if (customer) {
//             res.status(200).json(customer);
//         } else {
//             res.status(404).json({ error: 'Customer not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching customer details' });
//     }
// };

export const getCustomerDetail = async (req: Request, res: Response): Promise<void> => {
    try {
        const customerId = parseInt(req.params.id, 10);
        
        // Validasi ID
        if (isNaN(customerId)) {
            res.status(400).json({ error: 'Invalid customer ID' });
            return;
        }

        // Ambil detail customer
        const customer = await customerService.getCustomerDetails(customerId);

        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        console.error('Error fetching customer details:', error); // Logging for debugging
        res.status(500).json({ error: 'Error fetching customer details' });
    }
};