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

// AI Mock Endpoints để test
app.get('/api/ai/insights/:userId', (_req, res) => {
    res.json({
        success: true,
        data: [
            {
                type: 'performance',
                title: 'Portfolio đang tăng trưởng tốt',
                description: 'Danh mục đầu tư của bạn đã tăng 12% trong 3 tháng qua',
                confidence: 85,
                recommendation: 'Tiếp tục duy trì chiến lược hiện tại',
                time: '2 giờ trước',
                createdAt: new Date().toISOString()
            },
            {
                type: 'diversification',
                title: 'Cơ hội đa dạng hóa',
                description: 'Nên cân nhắc đầu tư thêm vào lĩnh vực F&B',
                confidence: 78,
                recommendation: 'Khám phá 2-3 dự án F&B mới',
                time: '5 giờ trước',
                createdAt: new Date().toISOString()
            }
        ]
    });
});

app.get('/api/ai/recommendations/:userId', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 5;
    
    res.json({
        success: true,
        data: [
            {
                id: 1,
                title: 'Startup AI Analytics cho SME',
                aiScore: 8.5,
                aiSentiment: 'very_positive',
                aiPrediction: 'Tăng trưởng mạnh trong 12 tháng tới',
                aiRiskLevel: 'low',
                category: 'Công nghệ',
                raised: 85000000,
                target: 150000000,
                investors: 127,
                endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                title: 'Chuỗi F&B Healthy Food',
                aiScore: 7.8,
                aiSentiment: 'positive',
                aiPrediction: 'Triển vọng tốt với thị trường F&B',
                aiRiskLevel: 'medium',
                category: 'F&B',
                raised: 120000000,
                target: 200000000,
                investors: 89,
                endDate: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                title: 'Platform E-commerce địa phương',
                aiScore: 7.2,
                aiSentiment: 'positive',
                aiPrediction: 'Cơ hội mở rộng trong Q4',
                aiRiskLevel: 'medium',
                category: 'Bán lẻ',
                raised: 65000000,
                target: 120000000,
                investors: 156,
                endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString()
            }
        ].slice(0, limit)
    });
});

app.get('/api/ai/portfolio-analysis/:userId', (_req, res) => {
    res.json({
        success: true,
        data: {
            totalValue: 15000000,
            totalInvested: 15000000,
            totalReturn: 1800000,
            returnPercentage: 12.0,
            activeInvestments: 3,
            completedInvestments: 2,
            avgInvestmentSize: 3000000,
            riskLevel: 'MEDIUM',
            diversificationScore: 7.5,
            monthlyReturns: [
                { month: '2024-01', return: 2.1 },
                { month: '2024-02', return: 1.8 },
                { month: '2024-03', return: 3.2 },
                { month: '2024-04', return: 0.9 },
                { month: '2024-05', return: 2.5 },
                { month: '2024-06', return: 1.7 }
            ],
            industryBreakdown: [
                { industry: 'Công nghệ', value: 8000000, percentage: 53.3 },
                { industry: 'F&B', value: 4000000, percentage: 26.7 },
                { industry: 'Bán lẻ', value: 3000000, percentage: 20.0 }
            ]
        }
    });
});

app.get('/api/ai/market-trends', (_req, res) => {
    res.json({
        success: true,
        data: {
            trending_industries: [
                { industry: 'Công nghệ', growth: 15.3, total_funding: 25000000000 },
                { industry: 'F&B', growth: 12.8, total_funding: 18000000000 },
                { industry: 'Bán lẻ', growth: 8.5, total_funding: 12000000000 }
            ],
            key_trends: [
                'Tăng trưởng mạnh trong lĩnh vực công nghệ',
                'Diversification của nhà đầu tư',
                'Tăng quy mô đầu tư trung bình'
            ]
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
🚀 SME CrowdFund Backend Server
- URL:     http://localhost:${PORT}
- Health:  http://localhost:${PORT}/api/health
- AI:      http://localhost:${PORT}/api/ai/market-trends
- Status:  Ready for connections (with AI Mock Endpoints)
`);
});

export default app;
