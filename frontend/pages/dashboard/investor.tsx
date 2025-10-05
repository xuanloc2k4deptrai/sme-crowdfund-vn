import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthContext } from '../../src/contexts/AuthContext';
import Link from 'next/link';
import AIService, { AIInsight, AIRecommendation, PortfolioAnalysis } from '../../src/services/aiService';

const InvestorDashboard = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [portfolioAnalysis, setPortfolioAnalysis] = useState<PortfolioAnalysis | null>(null);
  const [loadingAI, setLoadingAI] = useState(true);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  
  useEffect(() => {
    console.log('Investor Dashboard - User:', user);
    console.log('Investor Dashboard - isLoggedIn:', isLoggedIn);
    
    if (!isLoggedIn || !user) {
      console.log('No user or not logged in, redirecting to login');
      router.replace('/login');
    } else if (user.role !== 'investor' && user.userType !== 'investor') {
      console.log('User role/userType not investor:', user.role, user.userType);
      // If user is business, redirect to business dashboard
      if (user.role === 'business' || user.userType === 'business') {
        console.log('Redirecting business to business dashboard');
        router.replace('/dashboard/business');
      } else {
        // Otherwise go to general dashboard
        router.replace('/dashboard');
      }
    } else {
      console.log('Investor user authenticated, loading dashboard');
      setLoading(false);
      loadAIData();
    }
  }, [isLoggedIn, user, router]);

  // Load AI data
  const loadAIData = async () => {
    if (!user) return;
    
    setLoadingAI(true);
    try {
      const [insights, recommendations, analysis] = await Promise.all([
        AIService.getInvestorInsights(user.id),
        AIService.getAIRecommendations(user.id, 3),
        AIService.getPortfolioAnalysis(user.id)
      ]);
      
      setAiInsights(insights);
      setAiRecommendations(recommendations);
      setPortfolioAnalysis(analysis);
    } catch (error) {
      console.error('Error loading AI data:', error);
    } finally {
      setLoadingAI(false);
    }
  };

  // AI Portfolio Optimization function
  const runPortfolioOptimizer = async () => {
    if (!user) return;
    
    setLoadingAI(true);
    setShowOptimizer(true);
    
    // Simulate AI optimization analysis
    setTimeout(() => {
      const mockOptimization = {
        currentScore: 7.8,
        optimizedScore: 8.9,
        recommendations: [
          {
            action: 'Reduce',
            sector: 'Technology',
            current: 45,
            recommended: 35,
            reason: 'Giảm rủi ro tập trung trong công nghệ'
          },
          {
            action: 'Increase',
            sector: 'Healthcare',
            current: 15,
            recommended: 25,
            reason: 'Tăng exposure trong lĩnh vực y tế đang phát triển'
          },
          {
            action: 'Add',
            sector: 'Green Energy',
            current: 0,
            recommended: 15,
            reason: 'Thêm vào portfolio để đa dạng hóa'
          }
        ],
        projectedROI: {
          current: '12.4%',
          optimized: '16.8%'
        },
        riskReduction: '23%'
      };
      
      setOptimizationResult(mockOptimization);
      setLoadingAI(false);
    }, 2000);
  };

  // Portfolio stats from real data
  const portfolioStats = portfolioAnalysis ? {
    totalInvested: portfolioAnalysis.totalInvested || portfolioAnalysis.totalValue || 180000000,
    totalReturns: (portfolioAnalysis.totalInvested || portfolioAnalysis.totalValue || 180000000) * 1.24,
    totalROI: portfolioAnalysis.returnPercentage || 24.4,
    activeInvestments: portfolioAnalysis.activeInvestments || 3,
    aiScore: 8.5, // Mock AI score since not in response
    diversificationScore: portfolioAnalysis.diversificationScore || 7.5
  } : {
    totalInvested: 180000000,
    totalReturns: 224000000,
    totalROI: 24.4,
    activeInvestments: 8,
    aiScore: 8.4,
    diversificationScore: 7.5
  };

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getAIInsightIcon = (type: string) => {
    switch(type) {
      case 'opportunity': return '🎯';
      case 'portfolio_optimization': return '⚡';
      case 'risk_alert': return '🚨';
      case 'market_trend': return '📊';
      default: return '🤖';
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (!priority) {
      priority = 'medium'; // Default value
    }
    
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };

    const safePriority = priority.toLowerCase() as keyof typeof styles;
    const styleClass = styles[safePriority] || styles.medium;

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styleClass}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const getRiskBadge = (risk: string) => {
    const styles = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      low: 'Rủi ro thấp',
      medium: 'Rủi ro trung bình',
      high: 'Rủi ro cao'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[risk as keyof typeof styles]}`}>
        {labels[risk as keyof typeof labels]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải AI investment data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI-Powered Investor Dashboard - SME Crowdfunding</title>
        <meta name="description" content="Quản lý danh mục đầu tư thông minh với AI" />
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
                  🤖 AI Investor Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  AI Active
                </div>
                <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
                  AI Investment Advisor
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
          {/* AI Investment Insights */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                🧠 AI Investment Intelligence
                {loadingAI && <div className="ml-3 animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>}
              </h2>
              <button 
                onClick={loadAIData}
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
                          {getPriorityBadge(insight.priority || 'medium')}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{insight.message}</p>
                  
                  <div className="flex items-center justify-between">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Xem chi tiết
                    </button>
                    <span className="text-xs text-gray-500">{insight.time}</span>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-8">
                  <div className="text-gray-500">
                    {loadingAI ? 'Đang tải AI insights...' : 'Chưa có AI insights. Hãy đầu tư để nhận được phân tích từ AI.'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan danh mục đầu tư AI-Enhanced</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Tổng vốn đầu tư</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolioStats.totalInvested)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Giá trị hiện tại</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(portfolioStats.totalReturns)}</p>
                    <p className="text-xs text-gray-500">🤖 AI dự báo: +8% tháng tới</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">ROI tổng thể</p>
                    <p className="text-2xl font-bold text-green-600">+{portfolioStats.totalROI.toFixed(1)}%</p>
                    <p className="text-xs text-purple-600">🎯 AI target: +30%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">AI Portfolio Score</p>
                    <p className="text-2xl font-bold text-indigo-600">{portfolioStats.aiScore}/10</p>
                    <p className="text-xs text-gray-500">Excellent diversification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions with AI */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động thông minh - AI Powered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/campaigns" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-lg shadow transition-all duration-200 relative">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="font-medium">AI Project Discovery</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">🧠 Smart</span>
                </div>
              </Link>
              
              <button 
                onClick={runPortfolioOptimizer}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-lg shadow transition-all duration-200"
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">AI Portfolio Optimizer</span>
                </div>
              </button>
              
              <Link href="/dashboard/investor/ai-analytics" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-lg shadow transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">AI Market Intelligence</span>
                </div>
              </Link>
              
              <Link href="/ai-investment-advisor" className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-4 rounded-lg shadow transition-all duration-200">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">AI Personal Advisor</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Portfolio Analysis */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      💼 AI Portfolio Analysis
                    </h3>
                    <button onClick={loadAIData} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      🔄 Refresh
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {portfolioAnalysis ? (
                    <div className="space-y-6">
                      {/* Category Distribution */}
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">Phân bổ theo lĩnh vực</h4>
                        <div className="space-y-2">
                          {(portfolioAnalysis.industryBreakdown || portfolioAnalysis.category_analysis?.distribution || []).map((category: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{category.industry || category.category}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${category.percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
                              </div>
                            </div>
                          ))}
                          {(!portfolioAnalysis.industryBreakdown && !portfolioAnalysis.category_analysis?.distribution) && (
                            <div className="text-sm text-gray-500">Đang tải dữ liệu phân bổ...</div>
                          )}
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-3">🤖 AI Recommendations</h4>
                        <div className="space-y-2">
                          {['Cân nhắc giảm tỷ trọng công nghệ xuống 40%', 'Tăng đầu tư vào lĩnh vực ổn định hơn', 'Duy trì 15% portfolio cho các cơ hội mới'].map((rec, index) => (
                            <div key={index} className="bg-blue-50 rounded-lg p-3">
                              <p className="text-sm text-blue-800">• {rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance Prediction */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="text-md font-medium text-green-900 mb-2">📈 AI Performance Prediction</h4>
                        <p className="text-sm text-green-800">
                          Dự kiến ROI: <strong>12-15%</strong> trong 12 tháng tới
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          Độ tin cậy: 85%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500">
                        {loadingAI ? 'Đang phân tích portfolio...' : 'Chưa có dữ liệu portfolio. Hãy đầu tư để nhận phân tích AI.'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI Hot Picks */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    🔥 AI Hot Picks
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {aiRecommendations.length > 0 ? aiRecommendations.map((campaign) => (
                      <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{campaign.title}</h4>
                          <p className="text-xs text-gray-600">{campaign.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-purple-600">🤖 AI Score: {campaign.aiScore}/10</span>
                            <span className="text-xs text-green-600">ROI dự kiến: +{Math.round(campaign.aiScore * 2)}%</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{campaign.progress.toFixed(0)}% hoàn thành</span>
                            <span>{campaign.daysLeft} ngày còn lại</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-green-600 h-1.5 rounded-full"
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded p-2 mb-3">
                          <p className="text-xs text-blue-800">
                            🧠 <strong>AI:</strong> {campaign.aiPrediction}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          {getRiskBadge(campaign.aiRiskLevel)}
                          <Link href={`/campaigns/${campaign.id}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                            🎯 AI Invest
                          </Link>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-4">
                        <div className="text-gray-500 text-sm">
                          {loadingAI ? 'Đang tìm kiếm cơ hội...' : 'Chưa có recommendations. AI đang phân tích thị trường.'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link href="/campaigns" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      🤖 Xem tất cả AI Recommendations →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* AI Portfolio Optimizer Modal */}
        {showOptimizer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  🤖 AI Portfolio Optimizer
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
                    <p className="text-gray-600">AI đang phân tích và tối ưu portfolio của bạn...</p>
                  </div>
                ) : optimizationResult ? (
                  <div className="space-y-6">
                    {/* Score Comparison */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Score Improvement</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Current Score</p>
                          <p className="text-3xl font-bold text-orange-600">{optimizationResult.currentScore}/10</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Optimized Score</p>
                          <p className="text-3xl font-bold text-green-600">{optimizationResult.optimizedScore}/10</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Risk Reduction</p>
                          <p className="text-3xl font-bold text-blue-600">-{optimizationResult.riskReduction}</p>
                        </div>
                      </div>
                    </div>

                    {/* ROI Projection */}
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Projection</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Current Projected ROI</p>
                          <p className="text-2xl font-bold text-gray-700">{optimizationResult.projectedROI.current}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Optimized Projected ROI</p>
                          <p className="text-2xl font-bold text-green-600">{optimizationResult.projectedROI.optimized}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
                      <div className="space-y-4">
                        {optimizationResult.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                rec.action === 'Reduce' ? 'bg-red-100 text-red-800' :
                                rec.action === 'Increase' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {rec.action}
                              </span>
                              <span className="text-lg font-semibold text-gray-900">{rec.sector}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                              <div>
                                <p className="text-sm text-gray-600">Current: {rec.current}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Recommended: {rec.recommended}%</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{rec.reason}</p>
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
                          Áp dụng đề xuất
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

export default InvestorDashboard;