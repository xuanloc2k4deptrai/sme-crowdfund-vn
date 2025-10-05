import apiClient from './apiClient';

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'portfolio_optimization' | 'risk_alert' | 'market_trend';
  title: string;
  message: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  data: any;
  time?: string;
}

export interface CampaignAIScore {
  campaignId: number;
  score: number;
  sentiment: 'excellent' | 'very_positive' | 'positive' | 'neutral' | 'negative';
  prediction: string;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
}

export interface AIRecommendation {
  id: number;
  title: string;
  aiScore: number;
  aiSentiment: string;
  aiPrediction: string;
  aiRiskLevel: string;
  category: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  investors: number;
  daysLeft?: number;
}

export interface PortfolioAnalysis {
  // Backend format
  totalValue?: number;
  totalInvested?: number;
  totalReturn?: number;
  returnPercentage?: number;
  activeInvestments?: number;
  completedInvestments?: number;
  avgInvestmentSize?: number;
  riskLevel?: string;
  diversificationScore?: number;
  monthlyReturns?: Array<{ month: string; return: number }>;
  industryBreakdown?: Array<{
    industry: string;
    value: number;
    percentage: number;
  }>;
  
  // Mock format  
  portfolio_overview?: {
    total_investments: number;
    total_amount: number;
    avg_ai_score: number;
    diversification_score: number;
  };
  risk_analysis?: {
    distribution: { [key: string]: number };
    recommendation: string;
  };
  category_analysis?: {
    distribution: Array<{
      category: string;
      amount: number;
      percentage: string;
    }>;
    diversification_level: string;
  };
  detailed_investments?: any[];
  ai_recommendations?: string[];
  performance_prediction?: {
    expected_roi: string;
    timeframe: string;
    confidence: number;
  };
}

export interface MarketTrends {
  category_trends: Array<{
    category: string;
    total_campaigns: number;
    total_funding: number;
    avg_success_rate: number;
    trending_score: number;
  }>;
  market_insights: Array<{
    type: string;
    title: string;
    message: string;
    confidence: number;
  }>;
  market_summary: {
    total_active_campaigns: number;
    total_funding_volume: number;
    avg_funding_rate: number;
  };
}

export interface InvestmentAdvice {
  recommendation: 'strong_buy' | 'buy' | 'hold' | 'avoid';
  confidence: number;
  risk_level: 'low' | 'medium' | 'high';
  reasoning: string[];
  ai_score: CampaignAIScore;
  portfolio_impact: {
    percentage: string;
    diversification_note: string;
  };
  suggested_amount: number;
  expected_outcome: {
    timeline: string;
    roi_estimate: string;
  };
}

class AIService {
  
  /**
   * Lấy AI insights cho investor
   */
  static async getInvestorInsights(userId: number): Promise<AIInsight[]> {
    try {
      const response = await apiClient.get(`/ai/insights/${userId}`);
      
      if (response.data.success) {
        return response.data.data.map((insight: any) => ({
          ...insight,
          time: insight.time || this.getTimeAgo(insight.createdAt)
        }));
      }
      
      throw new Error(response.data.message || 'Failed to get insights');
    } catch (error) {
      console.warn('AI API không khả dụng, sử dụng mock data:', error);
      // Return mock data if API fails - giờ đây luôn fallback về mock data
      return this.getMockInsights();
    }
  }

  /**
   * Lấy AI score cho campaign
   */
  static async getCampaignAIScore(campaignId: number): Promise<CampaignAIScore> {
    try {
      const response = await apiClient.get(`/ai/campaign-score/${campaignId}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to get campaign score');
    } catch (error) {
      console.error('Error getting campaign AI score:', error);
      // Return mock score if API fails
      return {
        campaignId,
        score: 7.5 + Math.random() * 2,
        sentiment: 'positive',
        prediction: `Dự kiến tăng trưởng +${Math.round(8 + Math.random() * 12)}% trong 6-12 tháng`,
        riskLevel: 'medium',
        factors: ['Moderate market potential', 'Good team track record']
      };
    }
  }

  /**
   * Lấy AI recommendations
   */
  static async getAIRecommendations(userId: number, limit: number = 5): Promise<AIRecommendation[]> {
    try {
      const response = await apiClient.get(`/ai/recommendations/${userId}?limit=${limit}`);
      
      if (response.data.success) {
        return response.data.data.map((campaign: any) => ({
          id: campaign.id,
          title: campaign.title,
          aiScore: campaign.aiScore,
          aiSentiment: campaign.aiSentiment,
          aiPrediction: campaign.aiPrediction,
          aiRiskLevel: campaign.aiRiskLevel,
          category: campaign.category || 'Khác',
          currentAmount: campaign.raised || 0,
          targetAmount: campaign.target || 0,
          progress: campaign.target ? ((campaign.raised || 0) / campaign.target) * 100 : 0,
          investors: campaign.investors || 0,
          daysLeft: campaign.endDate ? Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : undefined
        }));
      }
      
      throw new Error(response.data.message || 'Failed to get recommendations');
    } catch (error) {
      console.warn('AI Recommendations API không khả dụng, sử dụng mock data:', error);
      // Return mock data if API fails
      return this.getMockRecommendations();
    }
  }

  /**
   * Lấy portfolio analysis
   */
  static async getPortfolioAnalysis(userId: number): Promise<PortfolioAnalysis> {
    try {
      const response = await apiClient.get(`/ai/portfolio-analysis/${userId}`);
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to get portfolio analysis');
    } catch (error) {
      console.warn('Portfolio Analysis API không khả dụng, sử dụng mock data:', error);
      return this.getMockPortfolioAnalysis();
    }
  }

  /**
   * Lấy market trends
   */
  static async getMarketTrends(): Promise<MarketTrends> {
    try {
      const response = await apiClient.get('/ai/market-trends');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to get market trends');
    } catch (error) {
      console.error('Error getting market trends:', error);
      return this.getMockMarketTrends();
    }
  }

  /**
   * Lấy investment advice
   */
  static async getInvestmentAdvice(userId: number, campaignId: number, investmentAmount: number): Promise<InvestmentAdvice> {
    try {
      const response = await apiClient.post('/ai/investment-advice', {
        userId,
        campaignId,
        investmentAmount
      });
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error(response.data.message || 'Failed to get investment advice');
    } catch (error) {
      console.error('Error getting investment advice:', error);
      return this.getMockInvestmentAdvice(campaignId, investmentAmount);
    }
  }

  // Helper methods
  private static getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  }

  // Mock data methods for fallback
  private static getMockInsights(): AIInsight[] {
    return [
      {
        id: '1',
        type: 'portfolio_optimization',
        title: 'Portfolio đang tăng trượng tốt',
        message: 'Danh mục đầu tư của bạn đang có xu hướng tăng trưởng ổn định với ROI dự kiến 12-15% trong 6 tháng tới. AI khuyến nghị duy trì chiến lược hiện tại.',
        confidence: 85,
        priority: 'medium',
        data: {},
        time: '2 giờ trước'
      },
      {
        id: '2',
        type: 'opportunity',
        title: 'Cơ hội đa dạng hóa',
        message: 'AI phát hiện 3 dự án tiềm năng trong lĩnh vực Y tế và Fintech có thể giúp đa dạng hóa danh mục của bạn với rủi ro được kiểm soát.',
        confidence: 78,
        priority: 'medium',
        data: {},
        time: '5 giờ trước'
      },
      {
        id: '3',
        type: 'market_trend',
        title: 'Xu hướng thị trường tích cực',
        message: 'Thị trường SME Việt Nam đang có xu hướng phục hồi mạnh. AI dự báo các dự án công nghệ và y tế sẽ có hiệu suất tốt trong Q1 2024.',
        confidence: 92,
        priority: 'high',
        data: {},
        time: 'Vừa cập nhật'
      }
    ];
  }

  private static getMockRecommendations(): AIRecommendation[] {
    return [
      {
        id: 201,
        title: 'SmartCity IoT - Thành phố thông minh',
        aiScore: 8.9,
        aiSentiment: 'very_positive',
        aiPrediction: 'Dự kiến tăng trưởng +22% trong 6 tháng',
        aiRiskLevel: 'medium',
        category: 'Công nghệ',
        currentAmount: 3400000000,
        targetAmount: 5000000000,
        progress: 68.0,
        investors: 142,
        daysLeft: 35
      },
      {
        id: 202,
        title: 'HealthTech AI - Chẩn đoán thông minh',
        aiScore: 8.5,
        aiSentiment: 'positive',
        aiPrediction: 'Tiềm năng lớn, dự kiến ROI 35-45%',
        aiRiskLevel: 'high',
        category: 'Y tế',
        currentAmount: 2100000000,
        targetAmount: 3500000000,
        progress: 60.0,
        investors: 89,
        daysLeft: 28
      }
    ];
  }

  private static getMockPortfolioAnalysis(): PortfolioAnalysis {
    return {
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
        'Nên xem xét thêm đầu tư vào lĩnh vực Y tế'
      ],
      performance_prediction: {
        expected_roi: '12-18%',
        timeframe: '6-12 months',
        confidence: 85
      }
    };
  }

  private static getMockMarketTrends(): MarketTrends {
    return {
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
        }
      ],
      market_insights: [
        {
          type: 'trending_category',
          title: 'Fintech đang là lĩnh vực hot nhất',
          message: 'Fintech có 12 dự án mới với tỷ lệ thành công 75.5%',
          confidence: 87
        }
      ],
      market_summary: {
        total_active_campaigns: 45,
        total_funding_volume: 45000000000,
        avg_funding_rate: 72.3
      }
    };
  }

  private static getMockInvestmentAdvice(campaignId: number, amount: number): InvestmentAdvice {
    const score = 7 + Math.random() * 2;
    return {
      recommendation: score >= 8 ? 'buy' : score >= 7 ? 'hold' : 'avoid',
      confidence: Math.round(70 + score * 3),
      risk_level: score >= 8 ? 'low' : 'medium',
      reasoning: [
        `AI score: ${score.toFixed(1)}/10`,
        'Phù hợp với profile đầu tư của bạn',
        'Thị trường đang có xu hướng tích cực'
      ],
      ai_score: {
        campaignId,
        score,
        sentiment: 'positive',
        prediction: `Dự kiến ROI +${Math.round(10 + Math.random() * 15)}%`,
        riskLevel: 'medium',
        factors: []
      },
      portfolio_impact: {
        percentage: '15.2',
        diversification_note: 'Improves diversification'
      },
      suggested_amount: Math.round(amount * 0.8),
      expected_outcome: {
        timeline: '6-12 months',
        roi_estimate: `+${Math.round(8 + Math.random() * 12)}%`
      }
    };
  }
}

export default AIService;