import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BusinessAIInsight {
  id: string;
  type: 'campaign_optimization' | 'market_opportunity' | 'funding_strategy' | 'performance_alert';
  title: string;
  message: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  time: string;
}

interface CampaignPerformance {
  campaignId: number;
  title: string;
  aiScore: number;
  performanceIndex: number;
  investorEngagement: number;
  conversionRate: number;
  suggestions: string[];
  estimatedCompletion: string;
}

interface BusinessInsights {
  marketPosition: number;
  competitiveAdvantage: string[];
  growthPotential: number;
  fundingOptimization: {
    currentStrategy: string;
    aiRecommendation: string;
    potentialIncrease: number;
  };
}

interface AIBusinessDashboardProps {
  user: any;
  onSwitchToEnhanced?: () => void;
}

export const AIBusinessDashboard: React.FC<AIBusinessDashboardProps> = ({ user }) => {
  const [loadingAI, setLoadingAI] = useState(true);
  const [aiInsights, setAiInsights] = useState<BusinessAIInsight[]>([]);
  const [campaignPerformance, setCampaignPerformance] = useState<CampaignPerformance[]>([]);
  const [businessInsights, setBusinessInsights] = useState<BusinessInsights | null>(null);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  useEffect(() => {
    loadBusinessAIData();
  }, []);

  const loadBusinessAIData = async () => {
    setLoadingAI(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock AI insights for business với thêm thông tin kết nối Enhanced Dashboard
      setAiInsights([
        {
          id: '1',
          type: 'campaign_optimization',
          title: 'Tối ưu chiến dịch gọi vốn',
          message: 'AI phát hiện thời điểm tối ưu để đăng bài: 8-10h sáng và 19-21h tối có engagement cao hơn 45%. Xem chi tiết trong Enhanced Dashboard.',
          confidence: 89,
          priority: 'high',
          actionable: true,
          time: '1 giờ trước'
        },
        {
          id: '2',
          type: 'funding_strategy',
          title: 'Chiến lược gọi vốn thông minh',
          message: 'Nên điều chỉnh mục tiêu gói đầu tư: thêm gói 50M VNĐ sẽ thu hút thêm 35% nhà đầu tư cá nhân. Quản lý nhà đầu tư trong Enhanced Dashboard.',
          confidence: 82,
          priority: 'medium',
          actionable: true,
          time: '3 giờ trước'
        },
        {
          id: '3',
          type: 'market_opportunity',
          title: 'Cơ hội thị trường mới',
          message: 'Xu hướng đầu tư vào Green Tech tăng 127% - đây là thời điểm vàng để launch campaign liên quan',
          confidence: 94,
          priority: 'high',
          actionable: false,
          time: '5 giờ trước'
        },
        {
          id: '4',
          type: 'performance_alert',
          title: 'Cảnh báo hiệu suất nhà đầu tư',
          message: 'Phát hiện 23 nhà đầu tư tiềm năng chưa được tiếp cận hiệu quả. Sử dụng Enhanced Dashboard để quản lý investor outreach.',
          confidence: 76,
          priority: 'medium',
          actionable: true,
          time: '2 giờ trước'
        }
      ]);

      // Mock campaign performance với thêm thông tin
      setCampaignPerformance([
        {
          campaignId: 101,
          title: 'Startup AI FinTech',
          aiScore: 87,
          performanceIndex: 92,
          investorEngagement: 78,
          conversionRate: 23.5,
          suggestions: [
            'Tăng tần suất updates để boost engagement',
            'Điều chỉnh pricing strategy cho gói đầu tư',
            'Sử dụng Enhanced Dashboard để track investor behavior'
          ],
          estimatedCompletion: '45 ngày'
        },
        {
          campaignId: 102,
          title: 'Green Energy Solutions',
          aiScore: 94,
          performanceIndex: 88,
          investorEngagement: 85,
          conversionRate: 31.2,
          suggestions: [
            'Tận dụng trend Green Tech để marketing',
            'Tạo partnership với environmental organizations',
            'Phân tích investor demographics trong Enhanced Dashboard'
          ],
          estimatedCompletion: '28 ngày'
        },
        {
          campaignId: 103,
          title: 'E-commerce Platform',
          aiScore: 72,
          performanceIndex: 65,
          investorEngagement: 58,
          conversionRate: 18.3,
          suggestions: [
            'Cần update business model presentation',
            'Thêm customer testimonials và case studies',
            'Review investor feedback trong Enhanced Dashboard'
          ],
          estimatedCompletion: '67 ngày'
        }
      ]);

      // Mock business insights
      setBusinessInsights({
        marketPosition: 73,
        competitiveAdvantage: [
          'AI-driven investment analysis',
          'Vietnamese market expertise',
          'Enhanced investor management platform',
          'Comprehensive analytics dashboard'
        ],
        growthPotential: 85,
        fundingOptimization: {
          currentStrategy: 'Basic investor communication',
          aiRecommendation: 'AI-powered investor segmentation với Enhanced Dashboard',
          potentialIncrease: 34
        }
      });

      const mockOptimization = {
        status: 'completed',
        recommendations: [
          {
            category: 'Timing Strategy',
            current: 'Random posting schedule',
            recommended: 'AI-optimized 8-10AM & 7-9PM',
            impact: '+45% engagement',
            effort: 'Low'
          },
          {
            category: 'Investment Packages',
            current: '3 standard tiers',
            recommended: '5 tiers with 50M VNĐ sweet spot',
            impact: '+35% individual investors',
            effort: 'Medium'
          },
          {
            category: 'Investor Management',
            current: 'Manual tracking',
            recommended: 'Enhanced Dashboard với automated CRM',
            impact: '+42% investor satisfaction',
            effort: 'Low'
          },
          {
            category: 'Analytics & Reporting',
            current: 'Basic metrics',
            recommended: 'Enhanced Dashboard với comprehensive analytics',
            impact: '+38% data-driven decisions',
            effort: 'Low'
          },
          {
            category: 'Campaign Management',
            current: 'Single view tracking',
            recommended: 'Enhanced Dashboard multi-campaign management',
            impact: '+28% operational efficiency',
            effort: 'Medium'
          }
        ],
        projectedResults: {
          fundingIncrease: '34%',
          timeReduction: '18 days',
          investorGrowth: '+127 investors'
        },
        confidenceScore: 91
      };
      
      setOptimizationResult(mockOptimization);
      setLoadingAI(false);
    }, 2000);
  };

  // Mock business stats
  const businessStats = {
    totalRaised: 650000000,
    totalCampaigns: 5,
    activeCampaigns: 2,
    successRate: 87.5,
    avgFundingTime: 42,
    aiOptimizationGain: 23.4
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getAIInsightIcon = (type: string) => {
    switch(type) {
      case 'campaign_optimization': return '🎯';
      case 'market_opportunity': return '🚀';
      case 'funding_strategy': return '💡';
      case 'performance_alert': return '📊';
      default: return '🤖';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[priority as keyof typeof styles]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  if (loadingAI) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải AI business intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">🤖 AI Business Intelligence</h1>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Powered by AI
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/campaigns/create-advanced" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                  🎯 Pro Campaign Builder
                </Link>
                <div className="text-sm text-gray-600">
                  Chào mừng, <span className="font-medium">{user?.name || user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Business Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Tổng vốn đã huy động</p>
                  <p className="text-2xl font-bold">{formatCurrency(businessStats.totalRaised)}</p>
                  <p className="text-blue-200 text-xs mt-1">+15% so với tháng trước</p>
                </div>
                <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                  💰
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Tỷ lệ thành công</p>
                  <p className="text-2xl font-bold">{businessStats.successRate}%</p>
                  <p className="text-green-200 text-xs mt-1">Above industry average</p>
                </div>
                <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
                  📈
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">AI Optimization Gain</p>
                  <p className="text-2xl font-bold">+{businessStats.aiOptimizationGain}%</p>
                  <p className="text-purple-200 text-xs mt-1">Enhanced Dashboard ready</p>
                </div>
                <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
                  🤖
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">🧠 AI Insights & Recommendations</h2>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowOptimizer(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  🚀 AI Optimizer
                </button>
                <Link href="/dashboard/business?view=enhanced" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                  🏢 Enhanced Dashboard
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight) => (
                <div 
                  key={insight.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getAIInsightIcon(insight.type)}</span>
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        {getPriorityBadge(insight.priority)}
                      </div>
                      <p className="text-gray-700 mb-3 text-sm">{insight.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{insight.time}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-600">
                            Độ tin cậy: <span className="font-medium text-blue-600">{insight.confidence}%</span>
                          </span>
                          {insight.actionable && (
                            <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-xs">
                              Áp dụng
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Performance và Business Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Campaign Performance */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">📊 AI Campaign Performance</h2>
                <Link href="/dashboard/business?view=enhanced&tab=campaigns" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Xem tất cả →
                </Link>
              </div>
              <div className="space-y-4">
                {campaignPerformance.map((campaign) => (
                  <div key={campaign.campaignId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          AI Score: {campaign.aiScore}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Performance</p>
                        <p className="font-bold text-green-600">{campaign.performanceIndex}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Engagement</p>
                        <p className="font-bold text-blue-600">{campaign.investorEngagement}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Conversion</p>
                        <p className="font-bold text-purple-600">{campaign.conversionRate}%</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-700">Top AI Suggestions:</p>
                      {campaign.suggestions.slice(0, 2).map((suggestion, index) => (
                        <p key={index} className="text-xs text-gray-600 pl-4">• {suggestion}</p>
                      ))}
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">ETA: {campaign.estimatedCompletion}</span>
                      <Link href={`/dashboard/business?view=enhanced&campaign=${campaign.campaignId}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                        Chi tiết →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Insights */}
            {businessInsights && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">💡 Business Intelligence</h2>
                  <Link href="/dashboard/business?view=enhanced&tab=analytics" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Full Analytics →
                  </Link>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Market Position</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${businessInsights.marketPosition}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-blue-600">{businessInsights.marketPosition}%</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Competitive Advantages</h3>
                    <div className="space-y-2">
                      {businessInsights.competitiveAdvantage.slice(0, 3).map((advantage, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm text-gray-700">{advantage}</span>
                        </div>
                      ))}
                      {businessInsights.competitiveAdvantage.length > 3 && (
                        <Link href="/dashboard/business?view=enhanced&tab=analytics" className="text-blue-600 hover:text-blue-800 text-sm">
                          +{businessInsights.competitiveAdvantage.length - 3} more...
                        </Link>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Growth Potential</h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${businessInsights.growthPotential}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-green-600">{businessInsights.growthPotential}%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">AI Funding Optimization</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-600">Current:</span>
                        <p className="text-sm">{businessInsights.fundingOptimization.currentStrategy}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600">AI Recommendation:</span>
                        <p className="text-sm font-medium text-blue-700">{businessInsights.fundingOptimization.aiRecommendation}</p>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Potential increase:</span>
                        <span className="font-bold text-green-600 ml-1">+{businessInsights.fundingOptimization.potentialIncrease}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">⚡ Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/campaigns/create-advanced" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-lg transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="font-semibold">Create Pro Campaign</h3>
                    <p className="text-blue-100 text-sm">AI-guided campaign builder</p>
                  </div>
                </div>
              </Link>
              
              <Link href="/dashboard/business?view=enhanced&tab=investors" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-lg transition-all">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <h3 className="font-semibold">Manage Investors</h3>
                    <p className="text-green-100 text-sm">Enhanced CRM dashboard</p>
                  </div>
                </div>
              </Link>
              
              <button 
                onClick={() => setShowOptimizer(true)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-lg transition-all"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <h3 className="font-semibold">AI Optimizer</h3>
                    <p className="text-purple-100 text-sm">Get optimization insights</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* AI Optimizer Modal */}
        {showOptimizer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">🚀 AI Business Optimizer</h2>
                <button 
                  onClick={() => setShowOptimizer(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                {optimizationResult && (
                  <div className="space-y-6">
                    {/* Results Summary */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-bold text-green-900 mb-3">✅ Optimization Results</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{optimizationResult.projectedResults.fundingIncrease}</p>
                          <p className="text-sm text-green-700">Funding Increase</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{optimizationResult.projectedResults.timeReduction}</p>
                          <p className="text-sm text-blue-700">Time Reduction</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{optimizationResult.projectedResults.investorGrowth}</p>
                          <p className="text-sm text-purple-700">Investor Growth</p>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <span className="text-sm text-gray-600">AI Confidence: </span>
                        <span className="font-bold text-green-600">{optimizationResult.confidenceScore}%</span>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4">📋 AI Recommendations</h3>
                      <div className="space-y-4">
                        {optimizationResult.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                rec.effort === 'Low' ? 'bg-green-100 text-green-800' :
                                rec.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {rec.effort} Effort
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Current: </span>
                                <span className="text-gray-800">{rec.current}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Recommended: </span>
                                <span className="text-blue-600 font-medium">{rec.recommended}</span>
                              </div>
                              <div className="bg-green-50 rounded p-2">
                                <span className="text-green-800 font-medium">{rec.impact}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                      <button 
                        onClick={() => setShowOptimizer(false)}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
                      >
                        Đóng
                      </button>
                      <div className="space-x-3">
                        <Link href="/dashboard/business?view=enhanced" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                          Enhanced Dashboard
                        </Link>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                          Áp dụng tối ưu hóa
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};