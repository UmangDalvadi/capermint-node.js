import { Router } from 'express';
import {
    createCategory,
    listCategories,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/', adminMiddleware, listCategories);
router.post('/', adminMiddleware, createCategory);
router.put('/:id', adminMiddleware, updateCategory);
router.delete('/:id', adminMiddleware, deleteCategory);

export default router;
