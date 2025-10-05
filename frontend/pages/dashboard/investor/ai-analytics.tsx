import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthContext } from '../../../src/contexts/AuthContext';
import Link from 'next/link';

interface MarketTrend {
  sector: string;
  growth: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  prediction: string;
  confidence: number;
}

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
}

const AIMarketIntelligence = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace('/login');
    } else if (user.role !== 'investor') {
      router.replace('/dashboard');
    } else {
      setLoading(false);
      loadMarketData();
    }
  }, [isLoggedIn, user, router]);

  const loadMarketData = async () => {
    // Mock market data
    setMarketTrends([
      {
        sector: 'Fintech',
        growth: 23.5,
        sentiment: 'bullish',
        prediction: 'Tăng trường mạnh trong Q4 2024',
        confidence: 87
      },
      {
        sector: 'Healthcare',
        growth: 18.2,
        sentiment: 'bullish',
        prediction: 'Tiềm năng lớn với AI integration',
        confidence: 82
      },
      {
        sector: 'E-commerce',
        growth: 15.8,
        sentiment: 'neutral',
        prediction: 'Ổn định với tăng trưởng vừa phải',
        confidence: 75
      },
      {
        sector: 'Green Energy',
        growth: 31.2,
        sentiment: 'bullish',
        prediction: 'Bùng nổ với chính sách mới',
        confidence: 91
      },
      {
        sector: 'Education Tech',
        growth: 12.4,
        sentiment: 'neutral',
        prediction: 'Phục hồi sau dịch',
        confidence: 68
      }
    ]);

    setMarketInsights([
      {
        id: '1',
        title: 'Boom Fintech Việt Nam',
        description: 'AI dự báo Fintech VN sẽ tăng trưởng 200% trong 2 năm tới nhờ chuyển đổi số',
        impact: 'high',
        timeframe: '6-24 tháng'
      },
      {
        id: '2',
        title: 'Đầu tư Green Energy tăng vọt',
        description: 'Chính sách Net Zero 2050 tạo cơ hội đầu tư khổng lồ cho năng lượng xanh',
        impact: 'high',
        timeframe: '12-36 tháng'
      },
      {
        id: '3',
        title: 'Healthcare Tech phục hồi',
        description: 'Xu hướng chăm sóc sức khỏe từ xa tạo động lực cho các startup y tế',
        impact: 'medium',
        timeframe: '3-12 tháng'
      }
    ]);
  };

  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'bullish': return 'text-green-600 bg-green-100';
      case 'bearish': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải AI Market Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Market Intelligence - SME Crowdfunding</title>
        <meta name="description" content="Phân tích thị trường thông minh với AI" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard/investor" className="text-blue-600 hover:text-blue-800">
                  ← Quay lại Dashboard
                </Link>
                <span className="text-gray-300">|</span>
                <h1 className="text-lg font-semibold text-gray-900 flex items-center">
                  📊 AI Market Intelligence
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  AI Active
                </div>
                <span className="text-sm text-gray-700">Chào {user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Market Overview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 AI Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Market Sentiment</h3>
                  <span className="text-2xl">📈</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">Bullish</div>
                <p className="text-sm text-gray-600">AI dự báo thị trường SME tích cực trong 6 tháng tới</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Top Sector</h3>
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">Green Energy</div>
                <p className="text-sm text-gray-600">Tăng trưởng dự kiến +31.2% nhờ chính sách mới</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">AI Confidence</h3>
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                <p className="text-sm text-gray-600">Độ tin cậy trung bình của AI predictions</p>
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Sector Analysis</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">AI-Powered Sector Predictions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {marketTrends.map((trend, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-medium text-gray-900">{trend.sector}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(trend.sentiment)}`}>
                          {trend.sentiment.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Growth Prediction</p>
                          <p className="text-2xl font-bold text-green-600">+{trend.growth}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">AI Confidence</p>
                          <p className="text-2xl font-bold text-blue-600">{trend.confidence}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Prediction</p>
                          <p className="text-sm text-gray-900">{trend.prediction}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 AI Market Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {marketInsights.map((insight) => (
                <div key={insight.id} className="bg-white rounded-lg shadow border-l-4 border-purple-500 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                      {insight.impact.toUpperCase()} IMPACT
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Timeframe: {insight.timeframe}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/campaigns" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-lg shadow text-center">
              <div className="text-xl font-semibold mb-2">🔍 Explore Opportunities</div>
              <p className="text-sm opacity-90">Tìm hiểu các dự án phù hợp với market trends</p>
            </Link>
            
            <Link href="/ai-investment-advisor" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-lg shadow text-center">
              <div className="text-xl font-semibold mb-2">🤖 AI Advisor</div>
              <p className="text-sm opacity-90">Nhận tư vấn đầu tư cá nhân hóa</p>
            </Link>
            
            <Link href="/dashboard/investor" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-lg shadow text-center">
              <div className="text-xl font-semibold mb-2">📊 Back to Dashboard</div>
              <p className="text-sm opacity-90">Quay lại dashboard chính</p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default AIMarketIntelligence;