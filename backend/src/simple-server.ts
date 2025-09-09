import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for development
app.use(cors({
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
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'SME CrowdFund Backend is running',
        timestamp: new Date().toISOString() 
    });
});

// Mock auth endpoints for testing
app.post('/api/auth/register', (req, res) => {
    console.log('Register request:', req.body);
    res.json({
        success: true,
        message: 'User registered successfully',
        user: {
            id: '1',
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        },
        token: 'mock_token_' + Date.now()
    });
});

app.post('/api/auth/login', (req, res) => {
    console.log('Login request:', req.body);
    res.json({
        success: true,
        message: 'Login successful',
        user: {
            id: '1', 
            name: 'Test User',
            email: req.body.email,
            role: 'investor'
        },
        token: 'mock_token_' + Date.now()
    });
});

// Mock campaigns endpoint
app.get('/api/campaigns', (_req, res) => {
    res.json({
        success: true,
        campaigns: [
            {
                id: 1,
                title: 'TechStart Innovation 2024',
                summary: 'Nền tảng AI cho doanh nghiệp SME',
                target: 200000000,
                raised: 165000000,
                status: 'active'
            }
        ]
    });
});

// Error handling
app.use((error: any, _req: any, res: any, _next: any) => {
    console.error('Server error:', error);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: error.message 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 SME CrowdFund Backend Server
- URL:     http://localhost:${PORT}
- Health:  http://localhost:${PORT}/api/health
- Status:  Ready for connections
`);
});

export default app;
