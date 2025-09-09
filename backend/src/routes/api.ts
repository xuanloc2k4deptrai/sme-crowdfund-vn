import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { 
  getCampaigns, 
  getCampaignById, 
  createCampaign,
  updateCampaign,
  deleteCampaign 
} from '../controllers/campaignController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  console.log('🔄 Health check endpoint hit at:', new Date().toISOString());
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    message: 'Backend API is working!'
  });
});

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Campaign routes
router.get('/campaigns', getCampaigns);
router.get('/campaigns/:id', getCampaignById);
router.post('/campaigns', authMiddleware, createCampaign);
router.put('/campaigns/:id', authMiddleware, updateCampaign);
router.delete('/campaigns/:id', authMiddleware, deleteCampaign);

// User routes (Admin only)
router.get('/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  // Admin only route for user management
});

export default router;

/*
### Health check
GET http://localhost:5000/api/health

### Register user
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
*/