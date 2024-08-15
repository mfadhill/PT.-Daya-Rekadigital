import { Router } from 'express';
import { addProduct } from '../controllers/productController';
import * as productController from '../controllers/productController';


const router = Router();


router.post('/', addProduct);
router.patch('/restock', productController.restockProduct);
router.patch('/update-stock', productController.updateProductStock);

export default router;
