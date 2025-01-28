import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/databaseConfig.js'; 
import userRoutes from './routes/userRoutes.js'; 
import adminRoutes from './routes/adminRoutes.js'; 
import categoryRoutes from './routes/categoryRoutes.js'; 
import productRoutes from './routes/productRoutes.js'; 
import session from 'express-session'; 

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, 
    })
);

app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use(express.static('public')); 

await connectToDatabase();

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/categories', categoryRoutes);
app.use('/api/admin/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
