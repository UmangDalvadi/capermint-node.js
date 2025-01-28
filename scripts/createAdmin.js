import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/admin.js';
import connectToDatabase from '../config/databaseConfig.js';

dotenv.config();

const createAdmin = async () => {
    await connectToDatabase();

    const admin = new Admin({
        username: 'admin',
        password: 'admin123'
    });

    await admin.save();
    console.log('Admin user created');
    mongoose.connection.close();
};

createAdmin().catch(err => {
    console.error(err);
    mongoose.connection.close();
}); 