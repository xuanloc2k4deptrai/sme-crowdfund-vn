import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthContext } from '../../../src/contexts/AuthContext';
import Link from 'next/link';

interface MarketOpportunity {
  sector: string;
  growth: number;
  demandIndex: number;
  competitionLevel: 'low' | 'medium' | 'high';
  fundingPotential: number;
  timeframe: string;
  keyFactors: string[];
}

interface CompetitorAnalysis {
  name: string;
  fundingStage: string;
  totalRaised: number;
  uniqueAdvantage: string;
  threatLevel: 'low' | 'medium' | 'high';
}

interface FundingTrends {
  period: string;
  averageAmount: number;
  successRate: number;
  trendDirection: 'up' | 'down' | 'stable';
}

const BusinessMarketAnalysis = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [marketOpportunities, setMarketOpportunities] = useState<MarketOpportunity[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorAnalysis[]>([]);
  const [fundingTrends, setFundingTrends] = useState<FundingTrends[]>([]);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.replace('/login');
    } else if (user.role !== 'business') {
      router.replace('/dashboard');
    } else {
      setLoading(false);
      loadMarketData();
    }
  }, [isLoggedIn, user, router]);

  const loadMarketData = async () => {
    // Mock market opportunities
    setMarketOpportunities([
      {
        sector: 'Fintech',
        growth: 45.2,
        demandIndex: 89,
        competitionLevel: 'high',
        fundingPotential: 92,
        timeframe: 'Q4 2024 - Q2 2025',
        keyFactors: ['Digital payment adoption', 'Banking sector digitization', 'Government support']
      },
      {
        sector: 'Healthcare Tech',
        growth: 38.7,
        demandIndex: 94,
        competitionLevel: 'medium',
        fundingPotential: 87,
        timeframe: 'Q1 2025 - Q4 2025',
        keyFactors: ['Aging population', 'Remote healthcare demand', 'AI integration']
      },
      {
        sector: 'Green Energy',
        growth: 52.1,
        demandIndex: 91,
        competitionLevel: 'low',
        fundingPotential: 95,
        timeframe: 'Now - Q3 2025',
        keyFactors: ['Net Zero 2050 commitment', 'ESG investment trend', 'Government incentives']
      },
      {
        sector: 'AgriTech',
        growth: 29.4,
        demandIndex: 76,
        competitionLevel: 'low',
        fundingPotential: 83,
        timeframe: 'Q2 2025 - Q1 2026',
        keyFactors: ['Smart farming adoption', 'Food security concerns', 'Climate change adaptation']
      }
    ]);

    // Mock competitor analysis
    setCompetitors([
      {
        name: 'TechStart Pro',
        fundingStage: 'Series A',
        totalRaised: 850000000,
        uniqueAdvantage: 'Strong B2B partnerships',
        threatLevel: 'high'
      },
      {
        name: 'Innovation Hub',
        fundingStage: 'Seed',
        totalRaised: 120000000,
        uniqueAdvantage: 'First-mover advantage',
        threatLevel: 'medium'
      },
      {
        name: 'Future Solutions',
        fundingStage: 'Pre-seed',
        totalRaised: 45000000,
        uniqueAdvantage: 'Unique technology stack',
        threatLevel: 'low'
      }
    ]);

    // Mock funding trends
    setFundingTrends([
      {
        period: 'Q3 2024',
        averageAmount: 450000000,
        successRate: 73,
        trendDirection: 'up'
      },
      {
        period: 'Q2 2024',
        averageAmount: 380000000,
        successRate: 68,
        trendDirection: 'up'
      },
      {
        period: 'Q1 2024',
        averageAmount: 320000000,
        successRate: 65,
        trendDirection: 'stable'
      }
    ]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: amount >= 1000000000 ? 'compact' : 'standard'
    }).format(amount);
  };

  const getCompetitionColor = (level: string) => {
    switch(level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getThreatColor = (level: string) => {
    switch(level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch(direction) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải AI Market Analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Market Analysis - Business Dashboard</title>
        <meta name="description" content="Phân tích thị trường thông minh cho doanh nghiệp" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard/business" className="text-blue-600 hover:text-blue-800">
                  ← Quay lại Dashboard
                </Link>
                <span className="text-gray-300">|</span>
                <h1 className="text-lg font-semibold text-gray-900 flex items-center">
                  📊 AI Market Analysis
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Market Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Market Temperature</h3>
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">Hot</div>
                <p className="text-sm text-gray-600">Thị trường đang rất sôi động với nhiều cơ hội</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Best Opportunity</h3>
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">Green Energy</div>
                <p className="text-sm text-gray-600">Tăng trưởng dự kiến +52.1% với competition thấp</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Funding Activity</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">+18%</div>
                <p className="text-sm text-gray-600">Tăng trưởng funding so với quarter trước</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">AI Confidence</h3>
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">91%</div>
                <p className="text-sm text-gray-600">Độ tin cậy của AI market predictions</p>
              </div>
            </div>
          </div>

          {/* Market Opportunities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Market Opportunities</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {marketOpportunities.map((opportunity, index) => (
                <div key={index} className="bg-white rounded-lg shadow border-l-4 border-blue-500 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{opportunity.sector}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCompetitionColor(opportunity.competitionLevel)}`}>
                      {opportunity.competitionLevel.toUpperCase()} Competition
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Growth Potential</p>
                      <p className="text-2xl font-bold text-green-600">+{opportunity.growth}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Demand Index</p>
                      <p className="text-2xl font-bold text-blue-600">{opportunity.demandIndex}/100</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Funding Potential</p>
                      <p className="text-2xl font-bold text-purple-600">{opportunity.fundingPotential}/100</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Timeframe</p>
                      <p className="text-sm font-medium text-gray-900">{opportunity.timeframe}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Success Factors:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {opportunity.keyFactors.map((factor, factorIndex) => (
                        <li key={factorIndex} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Funding Trends */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 Funding Trends</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quarterly Funding Analysis</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {fundingTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{getTrendIcon(trend.trendDirection)}</span>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{trend.period}</h4>
                          <p className="text-sm text-gray-600">Average funding amount</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(trend.averageAmount)}</div>
                        <div className="text-sm text-gray-600">Success rate: {trend.successRate}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🏁 Competitor Analysis</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">AI-Powered Competitive Intelligence</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {competitors.map((competitor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-medium text-gray-900">{competitor.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getThreatColor(competitor.threatLevel)}`}>
                          {competitor.threatLevel.toUpperCase()} threat
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Funding Stage</p>
                          <p className="font-medium text-gray-900">{competitor.fundingStage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Raised</p>
                          <p className="font-bold text-green-600">{formatCurrency(competitor.totalRaised)}</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded p-3">
                        <p className="text-sm text-blue-900">
                          <strong>Advantage:</strong> {competitor.uniqueAdvantage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI Strategic Recommendations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🎯</span>
                  <h3 className="text-lg font-bold text-gray-900">Immediate Action</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Launch Green Energy campaign now. Market conditions are optimal with low competition and high government support.
                </p>
                <div className="bg-white rounded p-3">
                  <p className="text-sm text-green-800">
                    <strong>Expected ROI:</strong> 127% higher than average
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">⏰</span>
                  <h3 className="text-lg font-bold text-gray-900">Strategic Timing</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Plan HealthTech campaign for Q1 2025. Market demand will peak with new healthcare regulations.
                </p>
                <div className="bg-white rounded p-3">
                  <p className="text-sm text-purple-800">
                    <strong>Optimal Window:</strong> January - March 2025
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">⚠️</span>
                  <h3 className="text-lg font-bold text-gray-900">Market Risk</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Avoid Fintech space in Q4 2024. High competition and market saturation detected.
                </p>
                <div className="bg-white rounded p-3">
                  <p className="text-sm text-orange-800">
                    <strong>Risk Level:</strong> High for new entrants
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">💡</span>
                  <h3 className="text-lg font-bold text-gray-900">Innovation Opportunity</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Consider AgriTech pivot. Growing market with minimal competition and strong government backing.
                </p>
                <div className="bg-white rounded p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Success Probability:</strong> 83% based on AI analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/campaigns/create" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-lg shadow text-center">
              <div className="text-xl font-semibold mb-2">🚀 Start Campaign</div>
              <p className="text-sm opacity-90">Tạo campaign dựa trên AI insights</p>
            </Link>
            
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-lg shadow text-center">
              <div className="text-xl font-semibold mb-2">📊 Deep Analysis</div>
              <p className="text-sm opacity-90">Nhận phân tích chi tiết hơn</p>
            </button>
            
            <Link href="/dashboard/business" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-lg shadow text-center">
              <div className="text-xl font-semibold mb-2">🏠 Back to Dashboard</div>
              <p className="text-sm opacity-90">Quay lại business dashboard</p>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default BusinessMarketAnalysis;