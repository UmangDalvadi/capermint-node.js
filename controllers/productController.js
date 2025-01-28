import Product from '../models/product.js';
import Category from '../models/category.js';

export const createProduct = async (req, res) => {
    const { title, category, description, amount } = req.body;
    let imageString = '';

   
    if (req.file) {
       
        imageString = req.file.buffer.toString('base64');
    }

    try {
        const product = new Product({ title, category, description, amount, image: imageString });
        await product.save();

       
        const categories = await Category.find();
        const products = await Product.find().populate('category');

        res.render('admin/products', { 
            products, 
            categories, 
            successMessage: 'Product created successfully',
            errorMessage: ''
        });
    } catch (err) {
        console.error(err.message);
        
        const categories = await Category.find();
        const products = await Product.find().populate('category');
        res.render('admin/products', { 
            products,
            categories, 
            successMessage: '',
            errorMessage: 'Failed to create product: ' + err.message
        });
    }
};

export const listProducts = async (req, res) => {
    const { title } = req.query;

    try {
        const query = title ? { title: new RegExp(title, 'i') } : {};
        const products = await Product.find(query).populate('category');
        const categories = await Category.find(); 
        res.render('admin/products', { 
            products, 
            categories, 
            successMessage: '',
            errorMessage: ''
        });
    } catch (err) {
        console.error(err.message);
        res.render('admin/products', { 
            products: [], 
            categories: [], 
            successMessage: '', 
            errorMessage: 'Failed to retrieve products' 
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { image, title, category, description, amount } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { image, title, category, description, amount },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully', product });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Failed to update product' });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};

export const getProductDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('category');
        if (!product) {
            return res.status(404).render('admin/products', {
                products: [],
                categories: [],
                successMessage: '',
                errorMessage: 'Product not found'
            });
        }

        res.render('admin/productDetails', { product }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).render('admin/products', {
            products: [],
            categories: [],
            successMessage: '',
            errorMessage: 'Failed to retrieve product details'
        });
    }
};
