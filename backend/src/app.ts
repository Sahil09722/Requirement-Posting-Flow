import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import requirementRoutes from './routes/requirement.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Routes
app.use('/api/requirements', requirementRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
