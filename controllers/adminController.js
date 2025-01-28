import Admin from '../models/admin.js';

export const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.render('admin/login', { errorMessage: 'Username and password are required' });
    }

    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.render('admin/login', { errorMessage: 'Invalid credentials' });
        }

        req.session.adminId = admin._id;
        res.redirect('/api/admin/dashboard');
    } catch (err) {
        console.error(err.message);
        res.render('admin/login', { errorMessage: 'Server error, please try again later' });
    }
};

export const adminLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/api/admin/login');
    });
};
