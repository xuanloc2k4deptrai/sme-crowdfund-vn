import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AIInsight {
  id: string;
  type: 'opportunity' | 'portfolio_optimization' | 'risk_alert' | 'market_trend';
  title: string;
  message: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  data: any;
  userId: number;
  createdAt: Date;
}

interface CampaignAIScore {
  campaignId: number;
  score: number;
  sentiment: 'excellent' | 'very_positive' | 'positive' | 'neutral' | 'negative';
  prediction: string;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
}

export class AIInvestmentService {
  
  /**
   * Phân tích và tính toán AI Score cho campaign (simplified version)
   */
  static async calculateCampaignAIScore(campaignId: number): Promise<CampaignAIScore> {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId }
      });

      if (!campaign) {
        throw new Error('Campaign not found');
      }

      // AI factors analysis (simplified)
      const factors = [];
      let score = 5.0;
      let riskLevel: 'low' | 'medium' | 'high' = 'medium';
      
      // 1. Funding progress factor
      const currentAmount = campaign.raised || 0;
      const targetAmount = campaign.target || 1;
      const fundingProgress = (currentAmount / targetAmount) * 100;
      
      if (fundingProgress > 80) {
        score += 1.5;
        factors.push('High funding progress (>80%)');
      } else if (fundingProgress > 50) {
        score += 0.8;
        factors.push('Good funding progress (>50%)');
      } else if (fundingProgress < 20) {
        score -= 0.5;
        factors.push('Low funding progress (<20%)');
      }

      // 2. Time remaining factor (mock - using created date as proxy)
      const daysSinceCreated = Math.floor((Date.now() - campaign.createdAt.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceCreated < 30) {
        score += 0.5;
        factors.push('Recent campaign (active momentum)');
      }

      // 3. Category factor (using industry field if available)
      const trendingCategories = ['Fintech', 'Công nghệ', 'Y tế', 'Môi trường'];
      const categoryField = campaign.industry || 'Other';
      if (trendingCategories.includes(categoryField)) {
        score += 0.8;
        factors.push(`Trending category: ${categoryField}`);
      }

      // 4. Status factor
      if (campaign.status === 'active') {
        score += 0.5;
        factors.push('Active campaign status');
      }

      // 5. Target size factor
      if (campaign.target >= 1000000000) { // >= 1B VND
        score += 0.5;
        factors.push('Large funding target');
      } else if (campaign.target <= 100000000) { // <= 100M VND
        score += 0.3;
        factors.push('Achievable funding target');
      }

      // 6. Mock market sentiment
      const marketSentimentScore = Math.random() * 1.5;
      score += marketSentimentScore;
      if (marketSentimentScore > 1.0) {
        factors.push('Positive market sentiment');
      }

      // Normalize score to 0-10 range
      score = Math.min(10, Math.max(0, score));
      
      // Determine sentiment
      let sentiment: CampaignAIScore['sentiment'];
      if (score >= 9) sentiment = 'excellent';
      else if (score >= 8) sentiment = 'very_positive';
      else if (score >= 7) sentiment = 'positive';
      else if (score >= 5) sentiment = 'neutral';
      else sentiment = 'negative';

      // Determine risk level
      if (score >= 8 && fundingProgress > 60) riskLevel = 'low';
      else if (score < 6 || fundingProgress < 20) riskLevel = 'high';

      // Generate prediction
      const prediction = this.generatePrediction(score, fundingProgress);

      return {
        campaignId,
        score: Math.round(score * 10) / 10,
        sentiment,
        prediction,
        riskLevel,
        factors
      };

    } catch (error) {
      console.error('Error calculating AI score:', error);
      throw error;
    }
  }

  /**
   * Tạo AI prediction text
   */
  private static generatePrediction(score: number, fundingProgress: number): string {
    if (score >= 9) {
      return `Dự án xuất sắc! Dự kiến ROI +${Math.round(15 + Math.random() * 15)}% trong 6-12 tháng`;
    } else if (score >= 8) {
      return `Tiềm năng tốt, dự kiến tăng trưởng +${Math.round(10 + Math.random() * 10)}% trong 3-6 tháng`;
    } else if (score >= 7) {
      return `Ổn định, dự kiến lợi nhuận +${Math.round(5 + Math.random() * 8)}% trong 6-12 tháng`;
    } else if (score >= 5) {
      return `Trung bình, cần theo dõi thêm. Rủi ro: ${fundingProgress < 30 ? 'cao' : 'trung bình'}`;
    } else {
      return `Rủi ro cao, không khuyến nghị đầu tư thời điểm này`;
    }
  }

  /**
   * Tạo AI insights cho investor (simplified)
   */
  static async generateInvestorInsights(userId: number): Promise<AIInsight[]> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || user.role !== 'investor') {
        throw new Error('Invalid investor');
      }

      const insights: AIInsight[] = [];

      // 1. Market opportunities
      const opportunityInsight = await this.findMarketOpportunities(userId);
      insights.push(opportunityInsight);

      // 2. General portfolio advice
      const portfolioInsight: AIInsight = {
        id: `portfolio_general_${Date.now()}`,
        type: 'portfolio_optimization',
        title: 'Tối ưu hóa danh mục đầu tư',
        message: 'AI khuyên bạn nên đa dạng hóa danh mục bằng cách đầu tư vào ít nhất 3-4 lĩnh vực khác nhau để giảm rủi ro',
        confidence: 85,
        priority: 'medium',
        data: {},
        userId,
        createdAt: new Date()
      };
      insights.push(portfolioInsight);

      // 3. Market trend insight
      const trendInsight: AIInsight = {
        id: `trend_${Date.now()}`,
        type: 'market_trend',
        title: 'Xu hướng thị trường',
        message: 'Các dự án Fintech và Công nghệ đang có xu hướng tăng trưởng mạnh. Đây là thời điểm tốt để tham gia',
        confidence: 78,
        priority: 'low',
        data: {},
        userId,
        createdAt: new Date()
      };
      insights.push(trendInsight);

      return insights;

    } catch (error) {
      console.error('Error generating insights:', error);
      throw error;
    }
  }

  /**
   * Tìm cơ hội đầu tư trên thị trường (simplified)
   */
  private static async findMarketOpportunities(userId: number): Promise<AIInsight> {
    // Lấy các campaign đang active
    const hotCampaigns = await prisma.campaign.findMany({
      where: {
        status: 'active'
      },
      orderBy: [
        { raised: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 5
    });

    // Tính AI score cho từng campaign
    const scoredCampaigns = await Promise.all(
      hotCampaigns.map(async (campaign) => {
        const aiScore = await this.calculateCampaignAIScore(campaign.id);
        return { ...campaign, aiScore };
      })
    );

    // Lọc các campaign có score cao
    const opportunities = scoredCampaigns
      .filter(c => c.aiScore.score >= 7.5)
      .slice(0, 3);

    const message = opportunities.length > 0
      ? `AI phát hiện ${opportunities.length} cơ hội đầu tư tiềm năng với score >7.5. Top choice: ${opportunities[0]?.title}`
      : "Hiện tại chưa có cơ hội đầu tư nổi bật. AI sẽ tiếp tục theo dõi thị trường";

    return {
      id: `opportunity_${Date.now()}`,
      type: 'opportunity',
      title: 'Cơ hội đầu tư mới',
      message,
      confidence: 89,
      priority: opportunities.length > 0 ? 'high' : 'low',
      data: { opportunities: opportunities.map(o => ({ id: o.id, title: o.title, score: o.aiScore.score })) },
      userId,
      createdAt: new Date()
    };
  }

  /**
   * Lấy top recommendations cho investor (simplified)
   */
  static async getTopRecommendations(userId: number, limit: number = 5): Promise<any[]> {
    try {
      const campaigns = await prisma.campaign.findMany({
        where: {
          status: 'active'
        },
        orderBy: [
          { raised: 'desc' }
        ],
        take: 10
      });

      // Tính AI score cho tất cả campaigns
      const scoredCampaigns = await Promise.all(
        campaigns.map(async (campaign) => {
          const aiScore = await this.calculateCampaignAIScore(campaign.id);
          return {
            ...campaign,
            aiScore: aiScore.score,
            aiSentiment: aiScore.sentiment,
            aiPrediction: aiScore.prediction,
            aiRiskLevel: aiScore.riskLevel,
            category: campaign.industry || 'Khác',
            currentAmount: campaign.raised,
            targetAmount: campaign.target,
            progress: (campaign.raised / campaign.target) * 100,
            daysLeft: Math.floor(Math.random() * 60 + 10) // Mock days left
          };
        })
      );

      // Sắp xếp theo AI score và return top recommendations
      return scoredCampaigns
        .sort((a, b) => b.aiScore - a.aiScore)
        .slice(0, limit);

    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  /**
   * Mock portfolio analysis (simplified)
   */
  static async getPortfolioAnalysis(userId: number): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user || user.role !== 'investor') {
        throw new Error('Investor not found');
      }

      // Mock portfolio analysis since we don't have investment data yet
      const mockAnalysis = {
        portfolio_overview: {
          total_investments: 3,
          total_amount: 160000000,
          avg_ai_score: 8.2,
          diversification_score: 6
        },
        risk_analysis: {
          distribution: { low: 1, medium: 2, high: 0 },
          recommendation: 'Cân bằng tốt'
        },
        category_analysis: {
          distribution: [
            { category: 'Fintech', amount: 80000000, percentage: '50.0' },
            { category: 'Nông nghiệp', amount: 50000000, percentage: '31.3' },
            { category: 'Môi trường', amount: 30000000, percentage: '18.7' }
          ],
          diversification_level: 'Good'
        },
        detailed_investments: [],
        ai_recommendations: [
          'Portfolio có sự cân bằng tốt giữa các lĩnh vực',
          'Nên xem xét thêm đầu tư vào lĩnh vực Y tế để tăng đa dạng'
        ],
        performance_prediction: {
          expected_roi: '12-18%',
          timeframe: '6-12 months',
          confidence: 85
        }
      };

      return mockAnalysis;

    } catch (error) {
      console.error('Error analyzing portfolio:', error);
      throw error;
    }
  }

  /**
   * Mock market trends analysis
   */
  static async getMarketTrends(): Promise<any> {
    try {
      const campaigns = await prisma.campaign.findMany({
        where: {
          status: 'active'
        }
      });

      // Mock trends analysis
      const mockTrends = {
        category_trends: [
          {
            category: 'Fintech',
            total_campaigns: 12,
            total_funding: 15000000000,
            avg_success_rate: 75.5,
            trending_score: 8.2
          },
          {
            category: 'Công nghệ', 
            total_campaigns: 8,
            total_funding: 12000000000,
            avg_success_rate: 68.3,
            trending_score: 7.8
          },
          {
            category: 'Y tế',
            total_campaigns: 6,
            total_funding: 8000000000,
            avg_success_rate: 72.1,
            trending_score: 7.5
          }
        ],
        market_insights: [
          {
            type: 'trending_category',
            title: 'Fintech đang là lĩnh vực hot nhất',
            message: 'Fintech có 12 dự án mới với tỷ lệ thành công 75.5%',
            confidence: 87
          },
          {
            type: 'market_momentum',
            title: 'Động lực thị trường tích cực',
            message: `${campaigns.length} dự án đang hoạt động, thị trường crowdfunding đang phát triển mạnh`,
            confidence: 82
          }
        ],
        market_summary: {
          total_active_campaigns: campaigns.length,
          total_funding_volume: campaigns.reduce((sum, c) => sum + c.raised, 0),
          avg_funding_rate: campaigns.reduce((sum, c) => sum + (c.raised / c.target), 0) / campaigns.length * 100
        }
      };

      return mockTrends;

    } catch (error) {
      console.error('Error getting market trends:', error);
      throw error;
    }
  }

  /**
   * Mock investment advice
   */
  static async getInvestmentAdvice(userId: number, campaignId: number, investmentAmount: number): Promise<any> {
    try {
      const [campaign, investor] = await Promise.all([
        prisma.campaign.findUnique({
          where: { id: campaignId }
        }),
        prisma.user.findUnique({
          where: { id: userId }
        })
      ]);

      if (!campaign || !investor) {
        throw new Error('Campaign or investor not found');
      }

      // Tính AI score cho campaign
      const aiScore = await this.calculateCampaignAIScore(campaignId);

      // Generate advice
      let recommendation = 'neutral';
      let reasoning = [];
      let riskLevel = 'medium';

      if (aiScore.score >= 8.5) {
        recommendation = 'strong_buy';
        reasoning.push(`Excellent AI score (${aiScore.score}/10)`);
        reasoning.push('High potential for positive returns');
        riskLevel = 'low';
      } else if (aiScore.score >= 7.0) {
        recommendation = 'buy';
        reasoning.push(`Good AI score (${aiScore.score}/10)`);
        reasoning.push('Solid investment opportunity');
      } else if (aiScore.score >= 5.0) {
        recommendation = 'hold';
        reasoning.push(`Average AI score (${aiScore.score}/10)`);
        reasoning.push('Consider waiting for better opportunities');
      } else {
        recommendation = 'avoid';
        reasoning.push(`Low AI score (${aiScore.score}/10)`);
        reasoning.push('High risk investment');
        riskLevel = 'high';
      }

      const advice = {
        recommendation,
        confidence: Math.round(60 + aiScore.score * 4),
        risk_level: riskLevel,
        reasoning,
        ai_score: aiScore,
        portfolio_impact: {
          percentage: '15.2',
          diversification_note: 'Improves diversification'
        },
        suggested_amount: recommendation === 'avoid' ? 0 : 
                         recommendation === 'strong_buy' ? investmentAmount : 
                         Math.round(investmentAmount * 0.7),
        expected_outcome: {
          timeline: '6-12 months',
          roi_estimate: aiScore.prediction
        }
      };

      return advice;

    } catch (error) {
      console.error('Error generating investment advice:', error);
      throw error;
    }
  }
}

export default AIInvestmentService;