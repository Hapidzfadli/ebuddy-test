import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/userRoutes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send('EBUDDY Backend API is running!');
});

export default app;