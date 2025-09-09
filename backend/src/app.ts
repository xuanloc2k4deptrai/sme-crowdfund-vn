import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/api';

const app = express();

// CORS configuration for development
const corsOptions = {
  origin: (origin: any, callback: any) => {
    // Allow all localhost ports in development
    if (!origin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Root route
app.get('/', (_req, res) => {
    console.log('🏠 Root endpoint accessed at:', new Date().toISOString());
    res.json({ 
        message: 'SME CrowdFund VN API is running',
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        port: process.env.PORT || 5000,
        status: 'Server is working correctly!'
    });
});

// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', apiRoutes);

export default app;