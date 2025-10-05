import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CampaignComparisonPage: React.FC = () => {
  const router = useRouter();

  const features = [
    {
      feature: 'Thời gian hoàn thành',
      quick: '5-10 phút',
      pro: '30-60 phút',
      quickIcon: '⚡',
      proIcon: '⏰'
    },
    {
      feature: 'Số bước thực hiện',
      quick: '1 trang đơn giản',
      pro: '6 bước wizard',
      quickIcon: '1️⃣',
      proIcon: '6️⃣'
    },
    {
      feature: 'Validation & Bảo mật',
      quick: 'Cơ bản',
      pro: 'Nghiêm ngặt + Chống XSS/SQL Injection',
      quickIcon: '🔒',
      proIcon: '🛡️'
    },
    {
      feature: 'Thông tin tài chính',
      quick: 'Mục tiêu gọi vốn cơ bản',
      pro: 'Phân tích chi tiết: ROI, Term, Risk Level',
      quickIcon: '💰',
      proIcon: '📊'
    },
    {
      feature: 'Mô hình kinh doanh',
      quick: 'Mô tả ngắn',
      pro: 'Business Model Canvas chi tiết',
      quickIcon: '📝',
      proIcon: '📋'
    },
    {
      feature: 'Tài liệu hỗ trợ',
      quick: 'Ảnh bìa + 1-2 file',
      pro: 'Pitch Deck + Giấy phép + Báo cáo tài chính',
      quickIcon: '📎',
      proIcon: '📚'
    },
    {
      feature: 'Milestones',
      quick: 'Không có',
      pro: 'Có hệ thống milestone tracking',
      quickIcon: '❌',
      proIcon: '✅'
    },
    {
      feature: 'Tuân thủ pháp luật',
      quick: 'Cơ bản',
      pro: 'Kiểm tra tuân thủ đầy đủ',
      quickIcon: '⚖️',
      proIcon: '🏛️'
    },
    {
      feature: 'AI Insights',
      quick: 'Không có',
      pro: 'AI đánh giá dự án + Recommendations',
      quickIcon: '❌',
      proIcon: '🤖'
    },
    {
      feature: 'Tỷ lệ thành công',
      quick: '60-70%',
      pro: '85-95%',
      quickIcon: '📈',
      proIcon: '🚀'
    }
  ];

  const quickPros = [
    'Nhanh chóng, phù hợp cho startup giai đoạn đầu',
    'Ít phức tạp, dễ sử dụng',
    'Phù hợp với dự án nhỏ (<500M VNĐ)',
    'Có thể nâng cấp lên Pro sau'
  ];

  const proPros = [
    'Tỷ lệ được duyệt cao hơn 40%',
    'Thu hút nhà đầu tư chuyên nghiệp',
    'Tuân thủ đầy đủ quy định pháp luật',
    'AI hỗ trợ tối ưu hóa chiến lược',
    'Hệ thống milestone chuyên nghiệp',
    'Bảo mật cấp enterprise'
  ];

  const recommendations = [
    {
      title: 'Chọn Quick Campaign khi:',
      conditions: [
        'Dự án ở giai đoạn MVP/prototype',
        'Mục tiêu gọi vốn < 500 triệu VNĐ',
        'Cần test market nhanh',
        'Startup mới thành lập'
      ],
      icon: '⚡',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      title: 'Chọn Pro Campaign khi:',
      conditions: [
        'Có business plan chi tiết',
        'Mục tiêu gọi vốn > 500 triệu VNĐ',
        'Muốn thu hút investor chuyên nghiệp',
        'Có đầy đủ tài liệu pháp lý',
        'Cần tuân thủ nghiêm ngặt quy định'
      ],
      icon: '🚀',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    }
  ];

  return (
    <>
      <Head>
        <title>So sánh Quick vs Pro Campaign | SME CrowdFund VN</title>
        <meta name="description" content="So sánh hai phương thức tạo dự án gọi vốn: Quick Campaign và Pro Campaign" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="mr-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Chọn phương thức tạo dự án</h1>
                  <p className="text-gray-600">So sánh Quick Campaign vs Pro Campaign</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Quick Campaign Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">⚡</span>
                <div>
                  <h2 className="text-2xl font-bold">Quick Campaign</h2>
                  <p className="text-blue-100">Tạo dự án nhanh chóng</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {quickPros.map((pro, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-200 mr-2">•</span>
                    <span className="text-sm">{pro}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/campaigns/create"
                className="block w-full bg-white text-blue-600 text-center py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                🚀 Bắt đầu Quick Campaign
              </Link>
            </div>

            {/* Pro Campaign Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🚀</span>
                <div>
                  <h2 className="text-2xl font-bold">Pro Campaign</h2>
                  <p className="text-green-100">Tạo dự án chuyên nghiệp</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {proPros.slice(0, 4).map((pro, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-200 mr-2">•</span>
                    <span className="text-sm">{pro}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/campaigns/create-advanced"
                className="block w-full bg-white text-green-600 text-center py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                🏆 Bắt đầu Pro Campaign
              </Link>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h2 className="text-xl font-semibold text-gray-900">So sánh chi tiết</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tính năng
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quick Campaign
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pro Campaign
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {features.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{feature.feature}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-2xl mr-2">{feature.quickIcon}</span>
                          <span className="text-sm text-gray-600">{feature.quick}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-2xl mr-2">{feature.proIcon}</span>
                          <span className="text-sm text-gray-600">{feature.pro}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {recommendations.map((rec, index) => (
              <div key={index} className={`${rec.bgColor} border ${rec.borderColor} rounded-xl p-6`}>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{rec.icon}</span>
                  <h3 className={`text-lg font-semibold ${rec.textColor}`}>{rec.title}</h3>
                </div>
                <ul className="space-y-2">
                  {rec.conditions.map((condition, condIndex) => (
                    <li key={condIndex} className={`flex items-start text-sm ${rec.textColor}`}>
                      <span className="mr-2">•</span>
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📈 Thống kê thành công</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2,450</div>
                <div className="text-sm text-gray-600">Quick Campaigns</div>
                <div className="text-xs text-gray-500">Hoàn thành trong 2024</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">1,890</div>
                <div className="text-sm text-gray-600">Pro Campaigns</div>
                <div className="text-xs text-gray-500">Hoàn thành trong 2024</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">72%</div>
                <div className="text-sm text-gray-600">Quick Success Rate</div>
                <div className="text-xs text-gray-500">Tỷ lệ thành công</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">94%</div>
                <div className="text-sm text-gray-600">Pro Success Rate</div>
                <div className="text-xs text-gray-500">Tỷ lệ thành công</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sẵn sàng bắt đầu?</h2>
            <p className="text-gray-600 mb-8">Chọn phương thức phù hợp với dự án của bạn</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/campaigns/create"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                ⚡ Quick Campaign
                <span className="ml-2 text-sm opacity-75">(5-10 phút)</span>
              </Link>
              
              <Link
                href="/campaigns/create-advanced"
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                🚀 Pro Campaign
                <span className="ml-2 text-sm opacity-75">(30-60 phút)</span>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              💡 Bạn có thể nâng cấp từ Quick lên Pro bất cứ lúc nào
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignComparisonPage;