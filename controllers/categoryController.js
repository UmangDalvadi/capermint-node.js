import Category from '../models/category.js';

export const createCategory = async (req, res) => {
    const { name, parentCategory } = req.body;

    try {
        const category = new Category({ name, parentCategory });
        await category.save();
        res.redirect('/api/admin/categories');
    } catch (err) {
        console.error('Error creating category:', err.message);
        const categories = await Category.find().populate('parentCategory');
        res.render('admin/categories', { 
            categories,
            successMessage: '',
            errorMessage: 'Failed to create category: ' + err.message
        });
    }
};

export const listCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parentCategory');
        res.render('admin/categories', { 
            categories, 
            successMessage: '', 
            errorMessage: '' 
        });
    } catch (err) {
        console.error(err.message);
        res.render('admin/categories', { 
            categories: [], 
            successMessage: '', 
            errorMessage: 'Failed to retrieve categories' 
        });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, parentCategory } = req.body;

    try {
        const category = await Category.findByIdAndUpdate(
            id,
            { name, parentCategory },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully', category });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Failed to update category' });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};
