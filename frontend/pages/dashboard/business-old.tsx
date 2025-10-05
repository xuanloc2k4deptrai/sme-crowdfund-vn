import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthContext } from '../../src/contexts/AuthContext';
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

const BusinessDashboard = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(true);
  const [aiInsights, setAiInsights] = useState<BusinessAIInsight[]>([]);
  const [campaignPerformance, setCampaignPerformance] = useState<CampaignPerformance[]>([]);
  const [businessInsights, setBusinessInsights] = useState<BusinessInsights | null>(null);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace('/login');
    } else if (user.role !== 'business') {
      router.replace('/dashboard');
    } else {
      setLoading(false);
      loadBusinessAIData();
    }
  }, [isLoggedIn, user, router]);

  const loadBusinessAIData = async () => {
    setLoadingAI(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock AI insights for business
      setAiInsights([
        {
          id: '1',
          type: 'campaign_optimization',
          title: 'Tối ưu chiến dịch gọi vốn',
          message: 'AI phát hiện thời điểm tối ưu để đăng bài: 8-10h sáng và 19-21h tối có engagement cao hơn 45%',
          confidence: 89,
          priority: 'high',
          actionable: true,
          time: '1 giờ trước'
        },
        {
          id: '2',
          type: 'funding_strategy',
          title: 'Chiến lược gọi vốn thông minh',
          message: 'Nên điều chỉnh mục tiêu gói đầu tư: thêm gói 50M VNĐ sẽ thu hút thêm 35% nhà đầu tư cá nhân',
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
        }
      ]);

      // Mock campaign performance
      setCampaignPerformance([
        {
          campaignId: 101,
          title: 'BioHarvest - Nông nghiệp thông minh',
          aiScore: 8.7,
          performanceIndex: 87,
          investorEngagement: 73,
          conversionRate: 24.5,
          suggestions: [
            'Tăng video demo sản phẩm',
            'Thêm testimonial từ khách hàng',
            'Cập nhật milestone progress'
          ],
          estimatedCompletion: '15 ngày'
        },
        {
          campaignId: 102,
          title: 'EcoPackaging - Bao bì sinh học',
          aiScore: 7.9,
          performanceIndex: 82,
          investorEngagement: 68,
          conversionRate: 19.8,
          suggestions: [
            'Làm rõ competitive advantage',
            'Bổ sung case study',
            'Tối ưu pricing strategy'
          ],
          estimatedCompletion: '23 ngày'
        }
      ]);

      // Mock business insights
      setBusinessInsights({
        marketPosition: 8.2,
        competitiveAdvantage: [
          'Strong tech innovation',
          'Experienced founding team',
          'Strategic partnerships',
          'Sustainable business model'
        ],
        growthPotential: 9.1,
        fundingOptimization: {
          currentStrategy: 'Equity-based crowdfunding',
          aiRecommendation: 'Mixed equity + reward-based approach',
          potentialIncrease: 34
        }
      });

      setLoadingAI(false);
    }, 1500);
  };

  // Business AI Campaign Optimizer
  const runCampaignOptimizer = async () => {
    setLoadingAI(true);
    setShowOptimizer(true);
    
    setTimeout(() => {
      const mockOptimization = {
        currentPerformance: 73,
        optimizedPerformance: 89,
        recommendations: [
          {
            category: 'Content Strategy',
            current: 'Text-heavy descriptions',
            recommended: 'Video + infographic approach',
            impact: '+23% engagement',
            effort: 'Medium'
          },
          {
            category: 'Pricing Strategy',
            current: 'Fixed investment packages',
            recommended: 'Flexible + early bird pricing',
            impact: '+18% conversions',
            effort: 'Low'
          },
          {
            category: 'Communication',
            current: 'Weekly updates',
            recommended: 'AI-timed personalized updates',
            impact: '+31% investor satisfaction',
            effort: 'High'
          },
          {
            category: 'Target Audience',
            current: 'General investors',
            recommended: 'Segment-specific campaigns',
            impact: '+15% reach efficiency',
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
    }, 2500);
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

  if (loading) {
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
      <Head>
        <title>AI-Powered Business Dashboard - SME Crowdfunding</title>
        <meta name="description" content="Quản lý doanh nghiệp thông minh với AI" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  SME Crowdfund
                </Link>
                <span className="text-gray-300">|</span>
                <h1 className="text-lg font-semibold text-gray-900 flex items-center">
                  🏢 AI Business Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  AI Active
                </div>
                <Link href="/business/ai-advisor" className="text-sm text-gray-600 hover:text-gray-900">
                  AI Business Advisor
                </Link>
                <span className="text-sm text-gray-700">Chào {user?.name}</span>
                <button
                  onClick={() => router.push('/logout')}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* AI Business Intelligence */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                🧠 AI Business Intelligence
                {loadingAI && <div className="ml-3 animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>}
              </h2>
              <button 
                onClick={loadBusinessAIData}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                🔄 Refresh AI Data
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiInsights.length > 0 ? aiInsights.map((insight) => (
                <div key={insight.id} className="bg-white rounded-lg shadow-md border-l-4 border-purple-500 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getAIInsightIcon(insight.type)}</span>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className="text-xs font-medium text-green-600">{insight.confidence}%</span>
                          {getPriorityBadge(insight.priority)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{insight.message}</p>
                  
                  <div className="flex items-center justify-between">
                    {insight.actionable ? (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Áp dụng ngay
                      </button>
                    ) : (
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Xem chi tiết
                      </button>
                    )}
                    <span className="text-xs text-gray-500">{insight.time}</span>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-8">
                  <div className="text-gray-500">
                    {loadingAI ? 'Đang tải AI insights...' : 'Chưa có AI insights. Tạo campaign để nhận phân tích từ AI.'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Business Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan doanh nghiệp AI-Enhanced</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Tổng vốn huy động</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(businessStats.totalRaised)}</p>
                    <p className="text-xs text-green-600">🤖 AI tối ưu: +{businessStats.aiOptimizationGain}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Tỷ lệ thành công</p>
                    <p className="text-2xl font-bold text-blue-600">{businessStats.successRate}%</p>
                    <p className="text-xs text-gray-500">Cao hơn trung bình 32%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Campaigns đang chạy</p>
                    <p className="text-2xl font-bold text-orange-600">{businessStats.activeCampaigns}</p>
                    <p className="text-xs text-gray-500">AI score trung bình: 8.3/10</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Thời gian gọi vốn TB</p>
                    <p className="text-2xl font-bold text-purple-600">{businessStats.avgFundingTime} ngày</p>
                    <p className="text-xs text-purple-600">🎯 AI target: 35 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions AI */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động thông minh - AI Powered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/campaigns/create" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-lg shadow transition-all duration-200 relative">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-medium">AI Campaign Builder</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">🧠 Smart</span>
                </div>
              </Link>
              
              <button 
                onClick={runCampaignOptimizer}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-lg shadow transition-all duration-200"
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">AI Campaign Optimizer</span>
                </div>
              </button>
              
              <Link href="/dashboard/business/market-analysis" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-lg shadow transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">AI Market Analysis</span>
                </div>
              </Link>
              
              <Link href="/business/ai-advisor" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-4 rounded-lg shadow transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">AI Business Advisor</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Campaign Performance AI */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      📊 AI Campaign Performance
                    </h3>
                    <button onClick={loadBusinessAIData} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      🔄 Refresh
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {campaignPerformance.length > 0 ? (
                    <div className="space-y-6">
                      {campaignPerformance.map((campaign) => (
                        <div key={campaign.campaignId} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-medium text-gray-900">{campaign.title}</h4>
                            <span className="text-lg font-bold text-blue-600">AI Score: {campaign.aiScore}/10</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Performance Index</p>
                              <p className="text-2xl font-bold text-green-600">{campaign.performanceIndex}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Investor Engagement</p>
                              <p className="text-2xl font-bold text-blue-600">{campaign.investorEngagement}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Conversion Rate</p>
                              <p className="text-2xl font-bold text-purple-600">{campaign.conversionRate}%</p>
                            </div>
                          </div>

                          <div className="bg-blue-50 rounded-lg p-3 mb-3">
                            <h5 className="text-sm font-medium text-blue-900 mb-2">🤖 AI Suggestions:</h5>
                            <ul className="text-sm text-blue-800 space-y-1">
                              {campaign.suggestions.map((suggestion, index) => (
                                <li key={index}>• {suggestion}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Estimated completion: <strong>{campaign.estimatedCompletion}</strong>
                            </span>
                            <Link href={`/campaigns/${campaign.campaignId}/optimize`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              🎯 Optimize Now →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">
                        {loadingAI ? 'Đang phân tích campaigns...' : 'Chưa có campaign nào. Tạo campaign đầu tiên để nhận AI analysis.'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Business AI Insights */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    🚀 AI Business Insights
                  </h3>
                </div>
                <div className="p-6">
                  {businessInsights ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Market Position</h4>
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-bold text-green-600">{businessInsights.marketPosition}/10</div>
                          <div className="text-xs text-gray-600">Strong position</div>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Growth Potential</h4>
                        <div className="text-2xl font-bold text-purple-600">{businessInsights.growthPotential}/10</div>
                        <div className="text-xs text-gray-600">Excellent prospects</div>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">🤖 AI Funding Optimization</h4>
                        <p className="text-sm text-gray-700 mb-2">{businessInsights.fundingOptimization.aiRecommendation}</p>
                        <div className="text-lg font-bold text-orange-600">+{businessInsights.fundingOptimization.potentialIncrease}% potential increase</div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Competitive Advantages</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {businessInsights.competitiveAdvantage.map((advantage, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-gray-500 text-sm">
                        {loadingAI ? 'Đang phân tích business...' : 'Chưa có insights. AI đang phân tích dữ liệu.'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* AI Campaign Optimizer Modal */}
        {showOptimizer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  🤖 AI Campaign Optimizer
                </h2>
                <button 
                  onClick={() => setShowOptimizer(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {loadingAI ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">AI đang phân tích và tối ưu campaigns của bạn...</p>
                  </div>
                ) : optimizationResult ? (
                  <div className="space-y-6">
                    {/* Performance Comparison */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance Improvement</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Current Performance</p>
                          <p className="text-3xl font-bold text-orange-600">{optimizationResult.currentPerformance}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Optimized Performance</p>
                          <p className="text-3xl font-bold text-green-600">{optimizationResult.optimizedPerformance}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">AI Confidence</p>
                          <p className="text-3xl font-bold text-blue-600">{optimizationResult.confidenceScore}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Projected Results */}
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Projected Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Funding Increase</p>
                          <p className="text-2xl font-bold text-green-600">{optimizationResult.projectedResults.fundingIncrease}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Time Reduction</p>
                          <p className="text-2xl font-bold text-blue-600">{optimizationResult.projectedResults.timeReduction}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Investor Growth</p>
                          <p className="text-2xl font-bold text-purple-600">{optimizationResult.projectedResults.investorGrowth}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Optimization Recommendations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {optimizationResult.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">{rec.category}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                rec.effort === 'Low' ? 'bg-green-100 text-green-800' :
                                rec.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {rec.effort} effort
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-gray-600">Current: </span>
                                <span className="text-gray-900">{rec.current}</span>
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
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                          Xuất báo cáo
                        </button>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                          Áp dụng tối ưu hóa
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BusinessDashboard;