import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  performance: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    insights: string[];
  };
  recommendations: {
    type: 'warning' | 'success' | 'info';
    title: string;
    description: string;
    actionItems: string[];
  }[];
  predictions: {
    nextMonth: number;
    confidence: number;
    factors: string[];
  };
}

interface SmartAnalyticsProps {
  userRole: 'investor' | 'business';
  data?: any;
}

const SmartAnalytics: React.FC<SmartAnalyticsProps> = ({ userRole, data }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeInsight, setActiveInsight] = useState(0);

  useEffect(() => {
    // Simulate AI analytics processing
    const timer = setTimeout(() => {
      if (userRole === 'investor') {
        setAnalytics({
          performance: {
            score: 78,
            trend: 'up',
            insights: [
              'Danh mục đầu tư của bạn có hiệu suất vượt trội so với thị trường 12%',
              'Chiến lược đa dạng hóa ngành nghề đang mang lại kết quả tích cực',
              'Thời điểm đầu tư vào các startup công nghệ đang rất thuận lợi'
            ]
          },
          recommendations: [
            {
              type: 'success',
              title: 'Cơ hội đầu tư tiềm năng',
              description: 'AI phát hiện 3 chiến dịch phù hợp với portfolio của bạn',
              actionItems: [
                'Xem xét đầu tư vào GreenTech Energy (Match: 95%)',
                'Tăng allocation cho ngành công nghệ lên 15%',
                'Giảm rủi ro bằng cách phân tán investment timeline'
              ]
            },
            {
              type: 'warning',
              title: 'Cảnh báo rủi ro',
              description: 'Concentration risk cao ở ngành công nghệ (45% portfolio)',
              actionItems: [
                'Cân nhắc rebalance sang các ngành khác',
                'Set stop-loss cho các investment có ROI âm',
                'Diversify sang real estate hoặc commodities'
              ]
            }
          ],
          predictions: {
            nextMonth: 8.5,
            confidence: 82,
            factors: [
              'Trend tăng trưởng startup trong Q4',
              'Government incentives cho SME',
              'Market sentiment tích cực'
            ]
          }
        });
      } else {
        setAnalytics({
          performance: {
            score: 85,
            trend: 'up',
            insights: [
              'Tỷ lệ chuyển đổi từ visitor sang investor của bạn cao hơn average 25%',
              'Chiến dịch có storytelling mạnh thu hút được investor quality cao',
              'Timing launch chiến dịch trùng với peak investment season'
            ]
          },
          recommendations: [
            {
              type: 'success',
              title: 'Tối ưu hóa chiến dịch',
              description: 'AI gợi ý cách tăng funding velocity cho chiến dịch hiện tại',
              actionItems: [
                'Đăng update progress mỗi tuần để maintain momentum',
                'Leverage social proof từ các investor hiện tại',
                'Tạo urgency với limited-time bonus cho early investors'
              ]
            },
            {
              type: 'info',
              title: 'Insight về investor behavior',
              description: 'Phân tích pattern đầu tư của target audience',
              actionItems: [
                'Peak investment time: 10-11AM và 7-9PM',
                'Investor prefer video content hơn text 3x',
                'Q&A sessions tăng conversion rate 40%'
              ]
            }
          ],
          predictions: {
            nextMonth: 15.2,
            confidence: 88,
            factors: [
              'Current funding velocity',
              'Seasonal investment patterns',
              'Industry growth trends'
            ]
          }
        });
      }
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [userRole]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg animate-spin">
              <div className="w-full h-full flex items-center justify-center text-white">
                🤖
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* AI Performance Score */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              🤖
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Analytics Dashboard</h3>
              <p className="text-purple-100">Phân tích thông minh được cung cấp bởi AI</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{analytics.performance.score}</div>
            <div className="text-sm text-purple-100">Performance Score</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">
                {analytics.performance.trend === 'up' ? '📈' : 
                 analytics.performance.trend === 'down' ? '📉' : '📊'}
              </span>
              <span className="font-medium">Trend Analysis</span>
            </div>
            <p className="text-purple-100 text-sm">
              {analytics.performance.trend === 'up' ? 'Tích cực' : 
               analytics.performance.trend === 'down' ? 'Giảm' : 'Ổn định'}
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">🎯</span>
              <span className="font-medium">Prediction</span>
            </div>
            <p className="text-purple-100 text-sm">
              {analytics.predictions.nextMonth}% tăng trưởng dự kiến
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">🔮</span>
              <span className="font-medium">Confidence</span>
            </div>
            <p className="text-purple-100 text-sm">
              {analytics.predictions.confidence}% độ tin cậy
            </p>
          </div>
        </div>
      </div>

      {/* Smart Insights */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>💡</span>
          <span>Smart Insights</span>
        </h3>
        
        <div className="space-y-3">
          {analytics.performance.insights.map((insight, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all ${
                activeInsight === index 
                  ? 'bg-blue-50 border-blue-500' 
                  : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
              }`}
              onClick={() => setActiveInsight(index)}
            >
              <div className="flex items-start space-x-3">
                <span className="text-xl mt-1">
                  {index === 0 ? '🎯' : index === 1 ? '📊' : '💡'}
                </span>
                <p className="text-gray-900">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>🚀</span>
          <span>AI Recommendations</span>
        </h3>
        
        <div className="space-y-4">
          {analytics.recommendations.map((rec, index) => (
            <div 
              key={index}
              className={`border rounded-lg p-4 ${
                rec.type === 'success' ? 'border-green-200 bg-green-50' :
                rec.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl">
                  {rec.type === 'success' ? '✅' :
                   rec.type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-gray-700 text-sm mb-3">{rec.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-800">Hành động được đề xuất:</p>
                    <ul className="space-y-1">
                      {rec.actionItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Model */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>🔮</span>
          <span>AI Predictions</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                +{analytics.predictions.nextMonth}%
              </div>
              <div className="text-gray-600 mb-4">
                {userRole === 'investor' ? 'ROI dự kiến tháng tới' : 'Tăng trưởng funding dự kiến'}
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBackground(analytics.predictions.confidence)} ${getScoreColor(analytics.predictions.confidence)}`}>
                {analytics.predictions.confidence}% Confidence
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Các yếu tố ảnh hưởng:</h4>
            <div className="space-y-2">
              {analytics.predictions.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Lưu ý:</span> Dự đoán dựa trên machine learning model 
                được training từ {userRole === 'investor' ? '10,000+ investor profiles' : '5,000+ campaign data points'}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Center */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>⚡</span>
          <span>Quick Actions</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userRole === 'investor' ? (
            <>
              <button className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium text-gray-900">Tối ưu Portfolio</div>
                <div className="text-sm text-gray-600">AI sẽ rebalance theo khuyến nghị</div>
              </button>
              
              <button className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-medium text-gray-900">Tìm cơ hội mới</div>
                <div className="text-sm text-gray-600">Scan các campaign phù hợp</div>
              </button>
              
              <button className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-left">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium text-gray-900">Risk Analysis</div>
                <div className="text-sm text-gray-600">Đánh giá chi tiết rủi ro</div>
              </button>
            </>
          ) : (
            <>
              <button className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium text-gray-900">Boost Campaign</div>
                <div className="text-sm text-gray-600">AI optimization cho funding</div>
              </button>
              
              <button className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left">
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium text-gray-900">Target Investors</div>
                <div className="text-sm text-gray-600">AI matching với investors</div>
              </button>
              
              <button className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-left">
                <div className="text-2xl mb-2">📈</div>
                <div className="font-medium text-gray-900">Growth Strategy</div>
                <div className="text-sm text-gray-600">Lộ trình scale business</div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartAnalytics;
