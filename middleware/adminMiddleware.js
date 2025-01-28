import Admin from '../models/admin.js';

const adminMiddleware = async (req, res, next) => {
    if (req.session && req.session.adminId) {
        const admin = await Admin.findById(req.session.adminId);
        if (admin) {
            req.admin = admin;
            return next();
        }
    }
    res.redirect('/api/admin/login');
};

export default adminMiddleware;
