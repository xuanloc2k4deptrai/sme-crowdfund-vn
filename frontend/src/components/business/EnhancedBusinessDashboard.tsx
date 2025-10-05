import React, { useState, useEffect } from 'react';
import { Campaign, Investor, BusinessAnalytics } from '../../types/businessDashboard';
import { InvestorList } from './InvestorList';
import { CampaignDetails } from './CampaignDetails';

interface EnhancedBusinessDashboardProps {
  user: any;
}

export const EnhancedBusinessDashboard: React.FC<EnhancedBusinessDashboardProps> = ({ user }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [analytics, setAnalytics] = useState<BusinessAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'overview' | 'campaigns' | 'analytics' | 'investors'>('overview');

  // Mock data for demonstration
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: 1,
        title: "Startup Công nghệ AI FinTech",
        description: "Nền tảng thanh toán thông minh sử dụng AI để phân tích rủi ro và tối ưu hóa giao dịch",
        targetAmount: 5000000000,
        currentAmount: 3250000000,
        percentage: 65,
        totalInvestors: 127,
        daysRemaining: 45,
        status: "active",
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-12-15'),
        minimumInvestment: 10000000,
        averageInvestment: 25590551,
        investmentType: "equity",
        expectedROI: 25,
        views: 15420,
        likes: 892,
        shares: 156,
        conversionRate: 0.082,
        milestones: [
          {
            id: 1,
            title: "Phát triển MVP",
            description: "Hoàn thành sản phẩm tối thiểu khả thi",
            targetAmount: 1000000000,
            currentAmount: 1000000000,
            deadline: new Date('2024-08-31'),
            status: "completed"
          },
          {
            id: 2,
            title: "Beta Testing",
            description: "Thử nghiệm beta với 100 khách hàng đầu tiên",
            targetAmount: 2000000000,
            currentAmount: 1500000000,
            deadline: new Date('2024-11-30'),
            status: "in_progress"
          }
        ],
        investors: [
          {
            id: 1,
            name: "Nguyễn Văn An",
            email: "nguyenvanan@email.com",
            investmentAmount: 50000000,
            investmentDate: new Date('2024-09-15'),
            investmentType: "equity" as const,
            status: "active" as const,
            investorType: "individual" as const,
            verified: true,
            totalInvestments: 3,
            portfolio: ["tech", "fintech"],
            riskProfile: "moderate" as const,
            location: "TP.HCM",
            phone: "0901234567",
            age: 35,
            occupation: "Kỹ sư phần mềm"
          },
          {
            id: 2,
            name: "Công ty Dragon Capital",
            email: "investments@dragoncapital.vn",
            investmentAmount: 500000000,
            investmentDate: new Date('2024-09-10'),
            investmentType: "equity" as const,
            status: "active" as const,
            investorType: "institutional" as const,
            verified: true,
            totalInvestments: 25,
            portfolio: ["tech", "fintech", "healthcare"],
            riskProfile: "aggressive" as const,
            location: "Hà Nội",
            phone: "0243456789",
            age: null,
            occupation: "Quỹ đầu tư"
          }
        ],
        investorDemographics: {
          ageGroups: [
            { range: "18-25", count: 15, percentage: 12 },
            { range: "26-35", count: 45, percentage: 35 },
            { range: "36-45", count: 38, percentage: 30 },
            { range: "46-55", count: 22, percentage: 17 },
            { range: "55+", count: 7, percentage: 6 }
          ],
          locations: [
            { city: "TP.HCM", count: 52, percentage: 41 },
            { city: "Hà Nội", count: 35, percentage: 28 },
            { city: "Đà Nẵng", count: 18, percentage: 14 },
            { city: "Cần Thơ", count: 12, percentage: 9 },
            { city: "Khác", count: 10, percentage: 8 }
          ],
          investmentSizes: [
            { range: "10-50M", count: 65, percentage: 51 },
            { range: "50-100M", count: 35, percentage: 28 },
            { range: "100-500M", count: 20, percentage: 16 },
            { range: "500M+", count: 7, percentage: 5 }
          ],
          investorTypes: [
            { type: "Cá nhân", count: 89, percentage: 70 },
            { type: "Tổ chức", count: 25, percentage: 20 },
            { type: "Nhà đầu tư chuyên nghiệp", count: 13, percentage: 10 }
          ]
        },
        updates: [
          {
            id: 1,
            title: "Hoàn thành milestone đầu tiên",
            content: "Chúng tôi vui mừng thông báo đã hoàn thành việc phát triển MVP với đầy đủ tính năng cốt lõi...",
            createdAt: new Date('2024-09-01'),
            views: 1250,
            likes: 89,
            comments: [
              { id: 1, author: { name: "Nhà đầu tư A" }, content: "Tuyệt vời!", createdAt: new Date() }
            ]
          }
        ],
        dailyFunding: [],
        category: "Technology",
        comments: 5,
        documents: [],
        marketingMetrics: {
          organicTraffic: 1245,
          socialMediaReach: 8930,
          emailEngagement: 0.34,
          referralSources: [
            { source: "Facebook", visitors: 245, conversions: 12 },
            { source: "Google", visitors: 189, conversions: 23 }
          ],
          conversionFunnel: {
            visitors: 1500,
            signups: 180,
            investments: 127,
            conversionRate: 0.082
          }
        }
      }
    ];

    const mockAnalytics: BusinessAnalytics = {
      totalFundsRaised: 8750000000,
      totalInvestors: 342,
      activeCampaigns: 3,
      completedCampaigns: 2,
      totalCampaigns: 5,
      averageROI: 22.5,
      successRate: 0.8,
      monthlyGrowth: 0.15,
      topPerformingCampaigns: [1, 2, 3],
      investorRetentionRate: 0.73,
      averageCampaignDuration: 90,
      averageFundingTime: 75,
      totalViews: 45680,
      conversionRate: 0.075,
      monthlyTrends: [
        { month: "Jan", fundsRaised: 1200000000, newInvestors: 45, campaignsLaunched: 2 },
        { month: "Feb", fundsRaised: 1800000000, newInvestors: 67, campaignsLaunched: 1 },
        { month: "Mar", fundsRaised: 2100000000, newInvestors: 89, campaignsLaunched: 3 }
      ],
      industryBenchmarks: {
        averageSuccessRate: 0.65,
        averageFundingTime: 85,
        averageTargetAmount: 2000000000
      }
    };

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      funded: 'bg-blue-100 text-blue-800',
      closed: 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const handleUpdateCampaign = (campaignId: number) => {
    // Redirect to campaign edit page
    window.location.href = `/campaigns/edit/${campaignId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  🏢 Dashboard Doanh nghiệp
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý chiến dịch gọi vốn và theo dõi nhà đầu tư
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  ➕ Tạo chiến dịch mới
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                  📊 Xuất báo cáo
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: '📋 Tổng quan', count: null },
                  { id: 'campaigns', label: '🎯 Chiến dịch', count: campaigns.length },
                  { id: 'analytics', label: '📈 Phân tích', count: null },
                  { id: 'investors', label: '👥 Nhà đầu tư', count: analytics?.totalInvestors }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setViewMode(tab.id as any)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      viewMode === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== null && (
                      <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'overview' && analytics && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng vốn huy động</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(analytics.totalFundsRaised)}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    💰
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  +{(analytics.monthlyGrowth * 100).toFixed(1)}% so với tháng trước
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng nhà đầu tư</p>
                    <p className="text-2xl font-bold text-blue-600">{analytics.totalInvestors}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    👥
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tỷ lệ giữ chân: {(analytics.investorRetentionRate * 100).toFixed(1)}%
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Chiến dịch đang chạy</p>
                    <p className="text-2xl font-bold text-purple-600">{analytics.activeCampaigns}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    🎯
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tỷ lệ thành công: {(analytics.successRate * 100).toFixed(1)}%
                </p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ROI trung bình</p>
                    <p className="text-2xl font-bold text-orange-600">{analytics.averageROI}%</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    📊
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tỷ lệ chuyển đổi: {(analytics.conversionRate * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Active Campaigns Overview */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">🎯 Chiến dịch đang hoạt động</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {campaigns.filter(c => c.status === 'active').map((campaign) => (
                    <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-500">Đã gọi được</p>
                              <p className="font-semibold text-green-600">{formatCurrency(campaign.currentAmount)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Tiến độ</p>
                              <p className="font-semibold">{campaign.percentage.toFixed(1)}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Nhà đầu tư</p>
                              <p className="font-semibold text-blue-600">{campaign.totalInvestors}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Còn lại</p>
                              <p className="font-semibold text-orange-600">{campaign.daysRemaining} ngày</p>
                            </div>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(campaign.percentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="ml-6 flex space-x-2">
                          <button 
                            onClick={() => setSelectedCampaign(campaign)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm"
                          >
                            👁️ Xem chi tiết
                          </button>
                          <button 
                            onClick={() => handleUpdateCampaign(campaign.id)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm"
                          >
                            ✏️ Chỉnh sửa
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Investors */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">👥 Nhà đầu tư gần đây</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {campaigns[0]?.investors.slice(0, 5).map((investor) => (
                    <div key={investor.id} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          {investor.investorType === 'institutional' ? '🏢' : '👤'}
                        </div>
                        <div>
                          <p className="font-medium">{investor.name}</p>
                          <p className="text-sm text-gray-600">{investor.investorType === 'institutional' ? 'Tổ chức' : 'Cá nhân'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(investor.investmentAmount)}</p>
                        <p className="text-sm text-gray-500">{investor.investmentDate.toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">🎯 Quản lý chiến dịch</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                ➕ Tạo chiến dịch mới
              </button>
            </div>

            <div className="grid gap-6">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{campaign.title}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600">{campaign.description}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedCampaign(campaign)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      👁️ Xem chi tiết
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Mục tiêu</p>
                      <p className="font-semibold">{formatCurrency(campaign.targetAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Đã gọi được</p>
                      <p className="font-semibold text-green-600">{formatCurrency(campaign.currentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tiến độ</p>
                      <p className="font-semibold">{campaign.percentage.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nhà đầu tư</p>
                      <p className="font-semibold text-blue-600">{campaign.totalInvestors}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Còn lại</p>
                      <p className="font-semibold text-orange-600">{campaign.daysRemaining} ngày</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(campaign.percentage, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>👁️ {campaign.views.toLocaleString()} lượt xem</span>
                    <span>❤️ {campaign.likes} lượt thích</span>
                    <span>📊 Chuyển đổi: {(campaign.conversionRate * 100).toFixed(2)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'investors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">👥 Quản lý nhà đầu tư</h2>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                📤 Xuất danh sách
              </button>
            </div>

            {campaigns.length > 0 && (
              <InvestorList
                investors={campaigns.flatMap(c => c.investors)}
                campaignTitle="Tất cả chiến dịch"
                onInvestorClick={(investor) => console.log('Selected investor:', investor)}
              />
            )}
          </div>
        )}

        {viewMode === 'analytics' && analytics && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">📈 Phân tích kinh doanh</h2>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">💼 Hiệu suất tổng thể</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tỷ lệ thành công:</dt>
                    <dd className="font-semibold text-green-600">{(analytics.successRate * 100).toFixed(1)}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">ROI trung bình:</dt>
                    <dd className="font-semibold text-blue-600">{analytics.averageROI}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Thời gian TB:</dt>
                    <dd className="font-semibold">{analytics.averageCampaignDuration} ngày</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">📊 Marketing</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tổng lượt xem:</dt>
                    <dd className="font-semibold">{analytics.totalViews.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tỷ lệ chuyển đổi:</dt>
                    <dd className="font-semibold text-purple-600">{(analytics.conversionRate * 100).toFixed(2)}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tăng trưởng hàng tháng:</dt>
                    <dd className="font-semibold text-green-600">+{(analytics.monthlyGrowth * 100).toFixed(1)}%</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">👥 Nhà đầu tư</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tỷ lệ giữ chân:</dt>
                    <dd className="font-semibold text-orange-600">{(analytics.investorRetentionRate * 100).toFixed(1)}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tổng số:</dt>
                    <dd className="font-semibold">{analytics.totalInvestors}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Hoạt động:</dt>
                    <dd className="font-semibold text-green-600">{Math.round(analytics.totalInvestors * analytics.investorRetentionRate)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Charts placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">📈 Tăng trưởng vốn huy động</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Biểu đồ tăng trưởng</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">🎯 Hiệu suất chiến dịch</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Biểu đồ hiệu suất</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Chi tiết chiến dịch</h2>
              <button 
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <CampaignDetails 
              campaign={selectedCampaign}
              onUpdateCampaign={handleUpdateCampaign}
            />
          </div>
        </div>
      )}
    </div>
  );
};