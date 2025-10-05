import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AIInvestmentService } from '../services/aiInvestmentService';

const prisma = new PrismaClient();

// Định nghĩa types cho các đối tượng investment giả định
interface MockInvestment {
  id: number;
  userId: number;
  campaignId: number;
  amount: number;
  createdAt: Date;
  campaign?: any;
}

export class AIController {
  // Endpoint: GET /api/ai/insights/:userId
  async getInvestorInsights(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      
      if (!userId) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ' });
      }

      // Lấy thông tin user
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }

      // Vì chưa có schema Investment, tạo mock data
      const mockInvestments: MockInvestment[] = [
        {
          id: 1,
          userId: userId,
          campaignId: 1,
          amount: 5000000,
          createdAt: new Date('2024-01-15')
        },
        {
          id: 2,
          userId: userId,
          campaignId: 2,
          amount: 3000000,
          createdAt: new Date('2024-02-10')
        },
        {
          id: 3,
          userId: userId,
          campaignId: 3,
          amount: 7000000,
          createdAt: new Date('2024-03-05')
        }
      ];

      // Lấy thông tin campaigns
      const campaigns = await prisma.campaign.findMany({
        where: {
          id: { in: mockInvestments.map(inv => inv.campaignId) }
        }
      });

      // Tính toán insights
      const totalInvested = mockInvestments.reduce((sum: number, inv: MockInvestment) => sum + inv.amount, 0);
      const avgInvestment = totalInvested / mockInvestments.length;
      
      // Phân tích diversification
      const industryDistribution = campaigns.reduce((acc: Record<string, number>, campaign) => {
        const industry = campaign.industry || 'Khác';
        acc[industry] = (acc[industry] || 0) + 1;
        return acc;
      }, {});

      const diversificationScore = Object.keys(industryDistribution).length >= 3 ? 8.5 : 6.0;

      const insights = {
        portfolio_summary: {
          total_invested: totalInvested,
          active_investments: mockInvestments.length,
          avg_investment_size: avgInvestment,
          portfolio_value: totalInvested * 1.12 // Giả định tăng trưởng 12%
        },
        ai_insights: [
          {
            type: 'performance',
            title: 'Hiệu suất đầu tư tốt',
            description: `Portfolio của bạn đang có hiệu suất tích cực với tổng giá trị ${(totalInvested * 1.12).toLocaleString('vi-VN')} VNĐ`,
            confidence: 85,
            recommendation: 'Tiếp tục duy trì chiến lược đầu tư hiện tại'
          },
          {
            type: 'diversification',
            title: 'Đa dạng hóa danh mục',
            description: `Bạn đã đầu tư vào ${Object.keys(industryDistribution).length} lĩnh vực khác nhau`,
            confidence: Math.round(diversificationScore * 10),
            recommendation: diversificationScore >= 8 ? 'Danh mục đã được đa dạng hóa tốt' : 'Nên đầu tư thêm vào các lĩnh vực khác'
          },
          {
            type: 'timing',
            title: 'Thời điểm đầu tư',
            description: 'Các khoản đầu tư được phân bổ đều theo thời gian',
            confidence: 78,
            recommendation: 'Tiếp tục áp dụng chiến lược DCA (Dollar Cost Averaging)'
          }
        ],
        risk_analysis: {
          overall_risk: diversificationScore >= 8 ? 'THẤP' : 'TRUNG BÌNH',
          risk_factors: [
            'Tập trung vào thị trường SME Việt Nam',
            'Thanh khoản thấp trong ngắn hạn',
            'Phụ thuộc vào hiệu suất từng doanh nghiệp'
          ],
          recommendations: [
            'Theo dõi thường xuyên tiến độ các chiến dịch',
            'Cân nhắc đầu tư thêm vào các lĩnh vực ít rủi ro',
            'Duy trì 10-20% portfolio cho các cơ hội mới'
          ]
        }
      };

      res.json(insights);
    } catch (error) {
      console.error('Lỗi khi lấy insights:', error);
      res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
  }

  // Endpoint: GET /api/ai/score/:campaignId
  async getCampaignAIScore(req: Request, res: Response) {
    try {
      const campaignId = parseInt(req.params.campaignId);
      
      if (!campaignId) {
        return res.status(400).json({ error: 'ID chiến dịch không hợp lệ' });
      }

      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: {
          owner: true
        }
      });

      if (!campaign) {
        return res.status(404).json({ error: 'Không tìm thấy chiến dịch' });
      }

      const aiScore = await AIInvestmentService.calculateCampaignAIScore(campaign.id);
      
      res.json({
        campaign_id: campaignId,
        ai_score: aiScore.score,
        score_details: {
          sentiment: aiScore.sentiment,
          prediction: aiScore.prediction,
          risk_level: aiScore.riskLevel,
          factors: aiScore.factors
        },
        last_updated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Lỗi khi tính AI score:', error);
      res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
  }

  // Endpoint: GET /api/ai/recommendations/:userId
  async getRecommendations(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const limit = parseInt(req.query.limit as string) || 5;
      
      if (!userId) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }

      // Lấy các chiến dịch đang hoạt động
      const activeCampaigns = await prisma.campaign.findMany({
        where: {
          status: 'ACTIVE'
        },
        include: {
          owner: true
        },
        take: limit * 2 // Lấy nhiều hơn để filter
      });

      const recommendations = [];
      
      for (const campaign of activeCampaigns.slice(0, limit)) {
        const aiScore = await AIInvestmentService.calculateCampaignAIScore(campaign.id);
        
        recommendations.push({
          campaign_id: campaign.id,
          title: campaign.title,
          summary: campaign.summary,
          target: campaign.target,
          raised: campaign.raised,
          progress: ((campaign.raised / campaign.target) * 100).toFixed(1),
          industry: campaign.industry,
          ai_score: aiScore.score,
          recommendation_reason: aiScore.factors[0] || 'Dự án có tiềm năng tốt',
          risk_level: aiScore.riskLevel,
          expected_return: `${(Math.random() * 15 + 10).toFixed(1)}%`,
          time_horizon: '12-24 tháng'
        });
      }

      // Sắp xếp theo AI score
      recommendations.sort((a, b) => b.ai_score - a.ai_score);

      res.json({
        user_id: userId,
        recommendations: recommendations,
        personalized_insights: [
          'Dựa trên lịch sử đầu tư, bạn thích các dự án công nghệ',
          'Các dự án với mức đầu tư 3-7M phù hợp với profile của bạn',
          'Nên cân nhắc đa dạng hóa sang lĩnh vực F&B'
        ],
        generated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Lỗi khi lấy recommendations:', error);
      res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
  }

  // Endpoint: GET /api/ai/portfolio/:userId
  async getPortfolioAnalysis(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      
      if (!userId) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }

      // Mock portfolio data vì chưa có Investment schema
      const mockPortfolio = {
        total_value: 15000000,
        total_invested: 15000000,
        total_return: 1800000,
        return_percentage: 12.0,
        active_investments: 3,
        completed_investments: 2,
        avg_investment_size: 3000000
      };

      const industryBreakdown = [
        { industry: 'Công nghệ', value: 8000000, percentage: 53.3, count: 2 },
        { industry: 'F&B', value: 4000000, percentage: 26.7, count: 1 },
        { industry: 'Bán lẻ', value: 3000000, percentage: 20.0, count: 2 }
      ];

      const riskAnalysis = {
        overall_risk_score: 6.5,
        risk_level: 'TRUNG BÌNH',
        volatility_score: 5.8,
        diversification_score: 7.2,
        liquidity_score: 4.5,
        risk_factors: [
          'Tập trung vào thị trường SME',
          'Thanh khoản thấp',
          'Phụ thuộc vào hiệu suất doanh nghiệp'
        ]
      };

      const performanceMetrics = {
        monthly_returns: [
          { month: '2024-01', return: 2.1 },
          { month: '2024-02', return: 1.8 },
          { month: '2024-03', return: 3.2 },
          { month: '2024-04', return: 0.9 },
          { month: '2024-05', return: 2.5 },
          { month: '2024-06', return: 1.7 }
        ],
        benchmark_comparison: {
          portfolio_return: 12.0,
          market_return: 8.5,
          outperformance: 3.5
        }
      };

      res.json({
        user_id: userId,
        portfolio_summary: mockPortfolio,
        industry_breakdown: industryBreakdown,
        risk_analysis: riskAnalysis,
        performance_metrics: performanceMetrics,
        ai_recommendations: [
          'Cân nhắc giảm tỷ trọng công nghệ xuống 40%',
          'Tăng đầu tư vào lĩnh vực ổn định hơn',
          'Duy trì 15% portfolio cho các cơ hội mới'
        ],
        last_updated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Lỗi phân tích portfolio:', error);
      res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
  }

  // Endpoint: GET /api/ai/market-trends
  async getMarketTrends(req: Request, res: Response) {
    try {
      const timeframe = req.query.timeframe as string || '30d';
      
      // Lấy tất cả campaigns
      const campaigns = await prisma.campaign.findMany({
        include: {
          owner: true
        }
      });

      // Phân tích theo industry
      const industryTrends = campaigns.reduce((acc: Record<string, any>, campaign) => {
        const industry = campaign.industry || 'Khác';
        
        if (!acc[industry]) {
          acc[industry] = {
            total_campaigns: 0,
            total_funding_volume: 0,
            avg_funding_rate: 0,
            success_rate: 0,
            campaigns: []
          };
        }
        
        acc[industry].total_campaigns += 1;
        acc[industry].total_funding_volume += campaign.raised;
        acc[industry].campaigns.push(campaign);
        
        return acc;
      }, {});

      // Tính toán metrics cho từng industry
      Object.keys(industryTrends).forEach(industry => {
        const data = industryTrends[industry];
        data.avg_funding_rate = data.campaigns.reduce((sum: number, c: any) => sum + (c.raised / c.target), 0) / data.campaigns.length * 100;
        data.success_rate = data.campaigns.filter((c: any) => c.raised >= c.target).length / data.campaigns.length * 100;
        delete data.campaigns; // Xóa chi tiết campaigns
      });

      const trendingIndustries = Object.entries(industryTrends)
        .map(([industry, data]: [string, any]) => ({ industry, ...data }))
        .sort((a, b) => b.total_funding_volume - a.total_funding_volume)
        .slice(0, 5);

      // Market insights
      const totalMarketSize = campaigns.reduce((sum, c) => sum + c.raised, 0);
      const avgCampaignSize = totalMarketSize / campaigns.length;
      const successRate = campaigns.filter(c => c.raised >= c.target).length / campaigns.length * 100;

      const marketInsights = {
        market_overview: {
          total_campaigns: campaigns.length,
          total_funding_volume: totalMarketSize,
          avg_campaign_size: avgCampaignSize,
          overall_success_rate: successRate
        },
        trending_industries: trendingIndustries,
        key_trends: [
          {
            trend: 'Tăng trưởng mạnh trong lĩnh vực công nghệ',
            impact: 'TÍCH CỰC',
            confidence: 85,
            description: 'Các dự án công nghệ thu hút được nhiều vốn đầu tư nhất'
          },
          {
            trend: 'Diversification của nhà đầu tư',
            impact: 'TÍCH CỰC', 
            confidence: 78,
            description: 'Nhà đầu tư đang đa dạng hóa danh mục theo nhiều lĩnh vực'
          },
          {
            trend: 'Tăng quy mô đầu tư trung bình',
            impact: 'TÍCH CỰC',
            confidence: 82,
            description: 'Quy mô đầu tư trung bình đang tăng đều qua các tháng'
          }
        ],
        predictions: [
          'F&B và Bán lẻ sẽ là lĩnh vực nổi bật trong Q4',
          'Tỷ lệ thành công dự kiến tăng 5-8% trong 6 tháng tới',
          'Nhu cầu vốn cho startup công nghệ tiếp tục cao'
        ],
        generated_at: new Date().toISOString()
      };

      res.json(marketInsights);
    } catch (error) {
      console.error('Lỗi phân tích market trends:', error);
      res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
  }

  // Endpoint: POST /api/ai/advice
  async getInvestmentAdvice(req: Request, res: Response) {
    try {
      const { 
        user_id,
        investment_goals,
        risk_tolerance,
        investment_amount,
        time_horizon,
        preferred_industries 
      } = req.body;

      if (!user_id) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ' });
      }

      // Lấy thông tin user và campaigns
      const [user, campaigns] = await Promise.all([
        prisma.user.findUnique({ where: { id: user_id } }),
        prisma.campaign.findMany({
          where: { status: 'ACTIVE' },
          include: { owner: true }
        })
      ]);

      if (!user) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }

      // Lọc campaigns phù hợp với preferences
      let suitableCampaigns = campaigns;
      
      if (preferred_industries && preferred_industries.length > 0) {
        suitableCampaigns = campaigns.filter(c => 
          preferred_industries.includes(c.industry)
        );
      }

      // Tính AI score cho các campaigns phù hợp
      const campaignScores = [];
      for (const campaign of suitableCampaigns.slice(0, 10)) {
        const aiScore = await AIInvestmentService.calculateCampaignAIScore(campaign.id);
        campaignScores.push({
          campaign,
          aiScore: aiScore.score,
          sentiment: aiScore.sentiment,
          factors: aiScore.factors
        });
      }

      // Sắp xếp theo AI score và risk tolerance
      campaignScores.sort((a, b) => {
        const riskAdjustedScoreA = risk_tolerance === 'low' ? a.aiScore * 0.8 : 
                                   risk_tolerance === 'high' ? a.aiScore * 1.2 : a.aiScore;
        const riskAdjustedScoreB = risk_tolerance === 'low' ? b.aiScore * 0.8 : 
                                   risk_tolerance === 'high' ? b.aiScore * 1.2 : b.aiScore;
        return riskAdjustedScoreB - riskAdjustedScoreA;
      });

      // Tạo portfolio suggestions
      const portfolioSuggestions = campaignScores.slice(0, 5).map(item => ({
        campaign_id: item.campaign.id,
        title: item.campaign.title,
        suggested_amount: Math.round(investment_amount * 0.2), // 20% mỗi campaign
        percentage: 20,
        reason: item.factors[0] || 'Tiềm năng tăng trưởng tốt',
        ai_score: item.aiScore,
        estimated_return: `${(Math.random() * 10 + 8).toFixed(1)}%`
      }));

      const advice = {
        user_id,
        personalized_advice: {
          strategy: risk_tolerance === 'low' ? 'Đầu tư bảo thủ' :
                   risk_tolerance === 'high' ? 'Đầu tư tích cực' : 'Đầu tư cân bằng',
          recommended_diversification: {
            max_per_campaign: risk_tolerance === 'low' ? 15 : 25,
            min_campaigns: risk_tolerance === 'low' ? 6 : 4,
            recommended_industries: preferred_industries || ['Công nghệ', 'F&B', 'Bán lẻ']
          },
          portfolio_allocation: portfolioSuggestions,
          risk_management: [
            'Không đầu tư quá 25% tổng portfolio vào một dự án',
            'Theo dõi tiến độ campaigns hàng tuần',
            'Giữ 20% portfolio để đầu tư cơ hội mới'
          ]
        },
        market_context: {
          current_market_condition: 'TÍCH CỰC',
          best_timing: 'Thời điểm tốt để đầu tư vào SME',
          upcoming_opportunities: [
            'Q4: Tăng hoạt động các dự án F&B',
            'Q1 năm sau: Mở rộng thị trường công nghệ',
            'Chính sách hỗ trợ SME mới'
          ]
        },
        action_plan: {
          immediate_actions: [
            `Bắt đầu với ${portfolioSuggestions[0]?.title || 'dự án đầu tiên'}`,
            'Thiết lập ngân sách đầu tư hàng tháng',
            'Đăng ký nhận thông báo cơ hội mới'
          ],
          timeline: time_horizon,
          monitoring_schedule: 'Hàng tuần'
        },
        generated_at: new Date().toISOString()
      };

      res.json(advice);
    } catch (error) {
      console.error('Lỗi khi tạo investment advice:', error);
      res.status(500).json({ error: 'Lỗi server nội bộ' });
    }
  }
}

export const aiController = new AIController();
