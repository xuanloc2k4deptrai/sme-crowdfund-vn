import express from 'express';
import { aiController } from '../controllers/aiController';

const router = express.Router();

console.log('🤖 AI Routes loaded');

// Market Trends - Test endpoint
router.get('/market-trends', (req, res) => {
  console.log('🔥 Market trends endpoint hit!');
  try {
    return aiController.getMarketTrends(req, res);
  } catch (error) {
    console.error('❌ Error in market trends:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI Investment Insights
router.get('/insights/:userId', aiController.getInvestorInsights.bind(aiController));

// Campaign AI Score
router.get('/campaign-score/:campaignId', aiController.getCampaignAIScore.bind(aiController));

// AI Recommendations
router.get('/recommendations/:userId', aiController.getRecommendations.bind(aiController));

// Portfolio Analysis
router.get('/portfolio-analysis/:userId', aiController.getPortfolioAnalysis.bind(aiController));

// Investment Advice
router.post('/investment-advice', aiController.getInvestmentAdvice.bind(aiController));

console.log('🤖 AI Routes setup complete');

export default router;