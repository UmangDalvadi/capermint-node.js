import { Router } from 'express';
import {
    createProduct,
    listProducts,
    updateProduct,
    deleteProduct,
    getProductDetails
} from '../controllers/productController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import upload from '../middleware/multerConfig.js';

const router = Router();

router.get('/', adminMiddleware, listProducts);
router.post('/', adminMiddleware, upload.single('image'), createProduct);
router.get('/:id', adminMiddleware, getProductDetails);
router.put('/:id', adminMiddleware, updateProduct);
router.delete('/:id', adminMiddleware, deleteProduct);

export default router;
