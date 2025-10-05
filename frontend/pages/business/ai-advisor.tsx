import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AuthContext } from '../../src/contexts/AuthContext';
import Link from 'next/link';

interface BusinessQuery {
  businessType: string;
  fundingGoal: number;
  timeline: string;
  currentStage: string;
  challenges: string[];
  targetMarket: string;
}

interface BusinessAdvice {
  strategy: string;
  fundingApproach: string;
  marketingTips: string[];
  riskFactors: string[];
  successProbability: number;
  timeline: string;
  recommendedActions: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  competitiveAdvantage: string[];
}

const BusinessAIAdvisor = () => {
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  const router = useRouter();
  
  const [query, setQuery] = useState<BusinessQuery>({
    businessType: '',
    fundingGoal: 500000000,
    timeline: '6-12 months',
    currentStage: 'ideation',
    challenges: [],
    targetMarket: ''
  });
  
  const [advice, setAdvice] = useState<BusinessAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const businessTypes = [
    'Technology/Software',
    'Healthcare/MedTech',
    'FinTech',
    'E-commerce',
    'Green Energy',
    'AgriTech',
    'Education',
    'Manufacturing',
    'Food & Beverage',
    'Other'
  ];

  const businessStages = [
    'Ideation',
    'MVP Development',
    'Product Market Fit',
    'Early Traction',
    'Scaling',
    'Growth Stage'
  ];

  const commonChallenges = [
    'Tìm kiếm nhà đầu tư phù hợp',
    'Định giá công ty',
    'Phát triển sản phẩm',
    'Xây dựng team',
    'Marketing và customer acquisition',
    'Quản lý cash flow',
    'Legal và compliance',
    'Scaling operations'
  ];

  const targetMarkets = [
    'B2B Enterprise',
    'B2B SME',
    'B2C Consumer',
    'B2G Government',
    'Marketplace',
    'Mixed'
  ];

  const generateAdvice = async () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockAdvice: BusinessAdvice = {
        strategy: query.businessType === 'Technology/Software' 
          ? 'Agile development với MVP approach, focus vào product-market fit trước khi scale'
          : query.businessType === 'Green Energy'
          ? 'Leverage chính sách Net Zero 2050, partnership với government và tập đoàn lớn'
          : 'Market validation nhanh, lean startup methodology với customer-centric approach',
        
        fundingApproach: query.fundingGoal > 1000000000 
          ? 'Series A approach: Kết hợp equity crowdfunding với angel investors và VCs'
          : 'Seed funding: Crowdfunding + government grants + angel investors',
        
        marketingTips: [
          'Content marketing với focus vào thought leadership',
          'Social proof thông qua case studies và testimonials',
          'Partnership strategy với players lớn trong ecosystem',
          'Community building around product/service',
          'SEO và digital marketing optimization'
        ],
        
        riskFactors: [
          'Competition từ các player lớn',
          'Market timing có thể chưa phù hợp',
          'Regulatory changes có thể impact business model',
          'Team execution risk',
          'Technology risk và product development challenges'
        ],
        
        successProbability: query.currentStage === 'Early Traction' ? 78 : 
                           query.currentStage === 'MVP Development' ? 65 : 
                           query.currentStage === 'Ideation' ? 45 : 72,
        
        timeline: query.timeline,
        
        recommendedActions: {
          immediate: [
            'Validate business model với potential customers',
            'Build MVP hoặc improve existing product',
            'Recruit key team members',
            'Prepare detailed business plan'
          ],
          shortTerm: [
            'Launch pilot program với selected customers',
            'Establish key partnerships',
            'Build initial customer base',
            'Secure initial funding round'
          ],
          longTerm: [
            'Scale operations và expand market reach',
            'Develop advanced product features',
            'Expand team và build company culture',
            'Prepare for Series A funding'
          ]
        },
        
        competitiveAdvantage: [
          'First-mover advantage trong niche market',
          'Strong technical team với domain expertise',
          'Unique technology hoặc business model innovation',
          'Strategic partnerships với key players',
          'Strong brand và customer loyalty'
        ]
      };
      
      setAdvice(mockAdvice);
      setLoading(false);
    }, 3000);
  };

  const handleChallengeChange = (challenge: string, checked: boolean) => {
    if (checked) {
      setQuery(prev => ({
        ...prev,
        challenges: [...prev.challenges, challenge]
      }));
    } else {
      setQuery(prev => ({
        ...prev,
        challenges: prev.challenges.filter(c => c !== challenge)
      }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact'
    }).format(amount);
  };

  return (
    <>
      <Head>
        <title>AI Business Advisor - SME Crowdfunding</title>
        <meta name="description" content="Tư vấn kinh doanh thông minh với AI" />
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
                  🤖 AI Business Advisor
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
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Progress Indicator */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">AI Business Strategy Consultant</h2>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        s === step
                          ? 'bg-blue-600 text-white'
                          : s < step
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {s < step ? '✓' : s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Step 1: Business Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin cơ bản về doanh nghiệp</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Loại hình kinh doanh
                        </label>
                        <select
                          value={query.businessType}
                          onChange={(e) => setQuery(prev => ({ ...prev, businessType: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Chọn loại hình kinh doanh</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mục tiêu gọi vốn
                        </label>
                        <select
                          value={query.fundingGoal}
                          onChange={(e) => setQuery(prev => ({ ...prev, fundingGoal: parseInt(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={100000000}>100 triệu VNĐ</option>
                          <option value={500000000}>500 triệu VNĐ</option>
                          <option value={1000000000}>1 tỷ VNĐ</option>
                          <option value={2000000000}>2 tỷ VNĐ</option>
                          <option value={5000000000}>5 tỷ VNĐ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeline mong muốn
                        </label>
                        <select
                          value={query.timeline}
                          onChange={(e) => setQuery(prev => ({ ...prev, timeline: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="3-6 months">3-6 tháng</option>
                          <option value="6-12 months">6-12 tháng</option>
                          <option value="1-2 years">1-2 năm</option>
                          <option value="2+ years">2+ năm</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giai đoạn hiện tại
                        </label>
                        <select
                          value={query.currentStage}
                          onChange={(e) => setQuery(prev => ({ ...prev, currentStage: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {businessStages.map((stage) => (
                            <option key={stage} value={stage}>{stage}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!query.businessType}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium"
                    >
                      Tiếp theo →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Challenges & Target Market */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thách thức và thị trường mục tiêu</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Những thách thức chính bạn đang gặp phải?
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {commonChallenges.map((challenge) => (
                            <label key={challenge} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={query.challenges.includes(challenge)}
                                onChange={(e) => handleChallengeChange(challenge, e.target.checked)}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">{challenge}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thị trường mục tiêu
                        </label>
                        <select
                          value={query.targetMarket}
                          onChange={(e) => setQuery(prev => ({ ...prev, targetMarket: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Chọn thị trường mục tiêu</option>
                          {targetMarkets.map((market) => (
                            <option key={market} value={market}>{market}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md font-medium"
                    >
                      ← Quay lại
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={query.challenges.length === 0 || !query.targetMarket}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium"
                    >
                      Tiếp theo →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: AI Analysis */}
              {step === 3 && (
                <div className="space-y-6">
                  {!advice ? (
                    <div className="text-center">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Xác nhận thông tin</h3>
                        <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                          <p><strong>Loại hình:</strong> {query.businessType}</p>
                          <p><strong>Mục tiêu gọi vốn:</strong> {formatCurrency(query.fundingGoal)}</p>
                          <p><strong>Timeline:</strong> {query.timeline}</p>
                          <p><strong>Giai đoạn:</strong> {query.currentStage}</p>
                          <p><strong>Thị trường:</strong> {query.targetMarket}</p>
                          <p><strong>Thách thức:</strong> {query.challenges.join(', ')}</p>
                        </div>
                      </div>

                      {loading ? (
                        <div>
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-gray-600">AI đang phân tích và tạo strategy cho bạn...</p>
                          <p className="text-sm text-gray-500 mt-2">Quá trình này có thể mất 1-2 phút</p>
                        </div>
                      ) : (
                        <button
                          onClick={generateAdvice}
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium text-lg"
                        >
                          🤖 Tạo AI Strategy
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">🎯 AI Business Strategy</h3>
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                          Success Probability: <strong className="ml-1">{advice.successProbability}%</strong>
                        </div>
                      </div>

                      {/* Strategy Overview */}
                      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <h4 className="text-lg font-bold text-blue-900 mb-3">📋 Strategic Approach</h4>
                        <p className="text-blue-800">{advice.strategy}</p>
                      </div>

                      {/* Funding Approach */}
                      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                        <h4 className="text-lg font-bold text-green-900 mb-3">💰 Funding Strategy</h4>
                        <p className="text-green-800">{advice.fundingApproach}</p>
                      </div>

                      {/* Action Plans */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                          <h4 className="text-md font-bold text-orange-900 mb-3">🚀 Immediate (0-3 months)</h4>
                          <ul className="text-sm text-orange-800 space-y-1">
                            {advice.recommendedActions.immediate.map((action, index) => (
                              <li key={index}>• {action}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h4 className="text-md font-bold text-purple-900 mb-3">📈 Short-term (3-12 months)</h4>
                          <ul className="text-sm text-purple-800 space-y-1">
                            {advice.recommendedActions.shortTerm.map((action, index) => (
                              <li key={index}>• {action}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                          <h4 className="text-md font-bold text-indigo-900 mb-3">🎯 Long-term (1-2 years)</h4>
                          <ul className="text-sm text-indigo-800 space-y-1">
                            {advice.recommendedActions.longTerm.map((action, index) => (
                              <li key={index}>• {action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Marketing & Competitive Advantage */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                          <h4 className="text-md font-bold text-yellow-900 mb-3">📢 Marketing Tips</h4>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            {advice.marketingTips.map((tip, index) => (
                              <li key={index}>• {tip}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                          <h4 className="text-md font-bold text-red-900 mb-3">⚠️ Risk Factors</h4>
                          <ul className="text-sm text-red-800 space-y-1">
                            {advice.riskFactors.map((risk, index) => (
                              <li key={index}>• {risk}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
                          📄 Xuất báo cáo PDF
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium">
                          🚀 Bắt đầu campaign
                        </button>
                        <button 
                          onClick={() => {
                            setAdvice(null);
                            setStep(1);
                            setQuery({
                              businessType: '',
                              fundingGoal: 500000000,
                              timeline: '6-12 months',
                              currentStage: 'ideation',
                              challenges: [],
                              targetMarket: ''
                            });
                          }}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md font-medium"
                        >
                          🔄 Tư vấn mới
                        </button>
                      </div>
                    </div>
                  )}

                  {!loading && !advice && (
                    <div className="flex justify-start">
                      <button
                        onClick={() => setStep(2)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md font-medium"
                      >
                        ← Quay lại
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BusinessAIAdvisor;