import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/category.js'; 
import connectToDatabase from '../config/databaseConfig.js';

dotenv.config();
const addCategories = async () => {
    await connectToDatabase();

    try {
        await Category.deleteMany({});

        const cloths = new Category({ name: "Cloths" });
        const mens = new Category({ name: "Men's Clothing", parentCategory: cloths._id });
        const tshirt = new Category({ name: "T-Shirts", parentCategory: mens._id });
        const roundNeck = new Category({ name: "Round Neck T-Shirt", parentCategory: tshirt._id });

        await cloths.save();
        await mens.save();
        await tshirt.save();
        await roundNeck.save();

        console.log('Categories added successfully');
    } catch (error) {
        console.error('Error adding categories:', error);
    } finally {
        mongoose.connection.close();
    }
};

addCategories(); 