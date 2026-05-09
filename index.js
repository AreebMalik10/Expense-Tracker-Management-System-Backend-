import express from 'express';
import mongoose from 'mongoose';
import logger from './src/config/logger.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import requestLogger from './src/middleware/requestLogger.js';
import cookieParser from 'cookie-parser';
import categoryRoutes from './src/routes/category.routes.js';
import transactionRoutes from './src/routes/transaction.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();    

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info('Connected to MongoDB successfully');
        })
    } catch(err) {
        logger.error(`Failed to start server: ${err.message}`);
    }
}

startServer();


