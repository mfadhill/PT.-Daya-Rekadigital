import { Router } from 'express';
import { addCustomer } from '../controllers/customerController';
import { getAllCustomers } from '../controllers/customerController';
import { getCustomerById } from '../controllers/customerController';
import { getCustomerDetail } from '../controllers/customerController';
import { updateCustomer } from '../controllers/customerController';
import { deleteCustomer } from '../controllers/customerController';

const router = Router();
router.post('/', addCustomer);
// router.post('/customer', addCustomers);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.get('/detail/:id', getCustomerDetail);
router.put('/:id', updateCustomer);
router.delete(':id', deleteCustomer);

export default router;
