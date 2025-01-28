import { Router } from "express";
const router = Router();
import { register, login, viewProfile, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, viewProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;
 