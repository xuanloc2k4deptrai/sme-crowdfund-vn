import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthContext } from '../src/contexts/AuthContext';
import Link from 'next/link';
import AIService, { InvestmentAdvice } from '../src/services/aiService';

interface InvestmentQuery {
  campaignId: number;
  campaignTitle: string;
  investmentAmount: number;
  timeframe: string;
  riskTolerance: 'low' | 'medium' | 'high';
  objectives: string[];
}

const AIInvestmentAdvisor = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  
  const [query, setQuery] = useState<InvestmentQuery>({
    campaignId: 0,
    campaignTitle: '',
    investmentAmount: 10000000,
    timeframe: '6-12 months',
    riskTolerance: 'medium',
    objectives: []
  });
  
  const [advice, setAdvice] = useState<InvestmentAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const mockCampaigns = [
    { id: 101, title: 'BioHarvest - Nông nghiệp thông minh', category: 'Nông nghiệp' },
    { id: 102, title: 'EcoPackaging - Bao bì sinh học', category: 'Môi trường' },
    { id: 103, title: 'FinTech Hub - Thanh toán số', category: 'Fintech' },
    { id: 201, title: 'SmartCity IoT - Thành phố thông minh', category: 'Công nghệ' },
    { id: 202, title: 'HealthTech AI - Chẩn đoán thông minh', category: 'Y tế' }
  ];

  const investmentObjectives = [
    'Tăng trưởng vốn dài hạn',
    'Thu nhập thụ động',
    'Đa dạng hóa danh mục',
    'Đầu tư có tác động xã hội',
    'Đầu tư công nghệ mới',
    'Hỗ trợ SME Việt Nam'
  ];

  const handleGetAdvice = async () => {
    if (!user || !query.campaignId || !query.investmentAmount) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      const aiAdvice = await AIService.getInvestmentAdvice(
        user.id, 
        query.campaignId, 
        query.investmentAmount
      );
      setAdvice(aiAdvice);
      setStep(3);
    } catch (error) {
      console.error('Error getting AI advice:', error);
      alert('Có lỗi xảy ra khi lấy AI advice');
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch(recommendation) {
      case 'strong_buy': return 'text-green-600 bg-green-50';
      case 'buy': return 'text-blue-600 bg-blue-50';
      case 'hold': return 'text-yellow-600 bg-yellow-50';
      case 'avoid': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRecommendationLabel = (recommendation: string) => {
    switch(recommendation) {
      case 'strong_buy': return '🚀 Mua mạnh';
      case 'buy': return '✅ Nên mua';
      case 'hold': return '⏳ Chờ xem';
      case 'avoid': return '❌ Tránh đầu tư';
      default: return '❓ Không xác định';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cần đăng nhập</h1>
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Đăng nhập để sử dụng AI Investment Advisor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Investment Advisor - SME Crowdfunding</title>
        <meta name="description" content="Nhận tư vấn đầu tư thông minh từ AI" />
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
                  🧠 AI Investment Advisor
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard/investor" className="text-sm text-gray-600 hover:text-gray-900">
                  ← Back to Dashboard
                </Link>
                <span className="text-sm text-gray-700">Chào {user?.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Chọn dự án</span>
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Thông tin đầu tư</span>
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
              <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">AI Advice</span>
              </div>
            </div>
          </div>

          {/* Step 1: Choose Campaign */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Chọn dự án muốn đầu tư</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCampaigns.map((campaign) => (
                  <div 
                    key={campaign.id}
                    onClick={() => {
                      setQuery({...query, campaignId: campaign.id, campaignTitle: campaign.title});
                      setStep(2);
                    }}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      query.campaignId === campaign.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{campaign.category}</p>
                    <div className="mt-3 flex items-center">
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                        🤖 AI Score: {(7 + Math.random() * 2).toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Investment Details */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Thông tin đầu tư</h2>
                <button 
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Quay lại
                </button>
              </div>

              <div className="space-y-6">
                {/* Selected Campaign */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900">Dự án đã chọn:</h3>
                  <p className="text-blue-800">{query.campaignTitle}</p>
                </div>

                {/* Investment Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền muốn đầu tư
                  </label>
                  <input
                    type="number"
                    value={query.investmentAmount}
                    onChange={(e) => setQuery({...query, investmentAmount: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1000000"
                    step="1000000"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Tương đương: {formatCurrency(query.investmentAmount)}
                  </p>
                </div>

                {/* Investment Timeframe */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời gian đầu tư mong muốn
                  </label>
                  <select
                    value={query.timeframe}
                    onChange={(e) => setQuery({...query, timeframe: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="3-6 months">3-6 tháng</option>
                    <option value="6-12 months">6-12 tháng</option>
                    <option value="1-2 years">1-2 năm</option>
                    <option value="2+ years">2+ năm</option>
                  </select>
                </div>

                {/* Risk Tolerance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Mức độ chấp nhận rủi ro
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['low', 'medium', 'high'].map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setQuery({...query, riskTolerance: risk as any})}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          query.riskTolerance === risk
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">
                            {risk === 'low' ? '🛡️' : risk === 'medium' ? '⚖️' : '🚀'}
                          </div>
                          <div className="font-medium">
                            {risk === 'low' ? 'Thấp' : risk === 'medium' ? 'Trung bình' : 'Cao'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Investment Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Mục tiêu đầu tư (chọn nhiều)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {investmentObjectives.map((objective) => (
                      <label key={objective} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={query.objectives.includes(objective)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setQuery({...query, objectives: [...query.objectives, objective]});
                            } else {
                              setQuery({...query, objectives: query.objectives.filter(o => o !== objective)});
                            }
                          }}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{objective}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGetAdvice}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      🧠 AI đang phân tích...
                    </div>
                  ) : (
                    '🧠 Nhận AI Investment Advice'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: AI Advice */}
          {step === 3 && advice && (
            <div className="space-y-6">
              {/* Recommendation Summary */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center mb-6">
                  <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${getRecommendationColor(advice.recommendation)}`}>
                    {getRecommendationLabel(advice.recommendation)}
                  </div>
                  <p className="text-gray-600 mt-2">Độ tin cậy: {advice.confidence}%</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{advice.ai_score.score}/10</div>
                    <div className="text-sm text-gray-600">AI Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(advice.suggested_amount)}</div>
                    <div className="text-sm text-gray-600">Số tiền đề xuất</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{advice.expected_outcome.roi_estimate}</div>
                    <div className="text-sm text-gray-600">ROI dự kiến</div>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🧠 Phân tích chi tiết từ AI</h3>
                
                {/* AI Reasoning */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Lý do AI đưa ra khuyến nghị:</h4>
                  <ul className="space-y-2">
                    {advice.reasoning.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portfolio Impact */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Tác động đến danh mục:</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      Chiếm <strong>{advice.portfolio_impact.percentage}%</strong> tổng danh mục
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{advice.portfolio_impact.diversification_note}</p>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Đánh giá rủi ro:</h4>
                  <div className={`p-4 rounded-lg ${
                    advice.risk_level === 'low' ? 'bg-green-50 text-green-800' :
                    advice.risk_level === 'medium' ? 'bg-yellow-50 text-yellow-800' :
                    'bg-red-50 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">
                        {advice.risk_level === 'low' ? '🛡️' : advice.risk_level === 'medium' ? '⚖️' : '⚠️'}
                      </span>
                      <span className="font-medium">
                        Mức rủi ro: {advice.risk_level === 'low' ? 'Thấp' : advice.risk_level === 'medium' ? 'Trung bình' : 'Cao'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expected Outcome */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">📈 Kết quả kỳ vọng:</h4>
                  <p className="text-blue-800">
                    {advice.expected_outcome.roi_estimate} trong {advice.expected_outcome.timeline}
                  </p>
                  <p className="text-blue-700 text-sm mt-1">{advice.ai_score.prediction}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  ← Thay đổi thông tin
                </button>
                <Link
                  href={`/campaigns/${query.campaignId}`}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                >
                  Đầu tư ngay →
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AIInvestmentAdvisor;