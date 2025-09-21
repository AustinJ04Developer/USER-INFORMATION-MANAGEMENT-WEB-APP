import express from 'express';
import cors from 'cors';
import userRoutes from './User/Routes';
import { connectDB } from './Database/connectDB';
import { globalErrorHandler } from './Utilities/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(globalErrorHandler);

// Connect to DB on startup
connectDB();

export default app;
