import { Router } from 'express';
import { adminLogin, adminLogout } from '../controllers/adminController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { check, validationResult } from 'express-validator';

const router = Router();

router.get('/login', (req, res) => res.render('admin/login', { errorMessage: '' }));
router.post('/login', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('admin/login', { errorMessage: 'Username and password are required' });
    }
    next();
}, adminLogin);
router.get('/logout', adminLogout);

router.get('/dashboard', adminMiddleware, (req, res) => {
    res.render('admin/dashboard', { admin: req.admin.username });
});

export default router;
