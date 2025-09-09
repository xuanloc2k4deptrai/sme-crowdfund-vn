import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../src/contexts/AuthContext';
import PrivateRoute from '../../src/components/auth/PrivateRoute';
import SmartAnalytics from '../../src/components/ai/SmartAnalytics';
import NotificationSystem from '../../src/components/ai/NotificationSystem';
import { Campaign } from '../../src/types';

const InvestorDashboard = () => {
  const auth = useContext(AuthContext);
  const { user } = auth || { user: null };
  const [investments, setInvestments] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<Campaign[]>([]);
  const [portfolio, setPortfolio] = useState({
    totalInvested: 125000000, // 125 triệu VND
    totalReturns: 15750000,   // 15.75 triệu VND (12.6% ROI)
    activeInvestments: 8,
    completedInvestments: 3
  });
  const [watchlist, setWatchlist] = useState<Campaign[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Chiến dịch TechStart đã hoàn thành mục tiêu 150%', time: '2 giờ trước' },
    { id: 2, type: 'info', message: 'Cơ hội đầu tư mới: EcoGreen - Năng lượng tái tạo', time: '5 giờ trước' },
    { id: 3, type: 'warning', message: 'Báo cáo quý của GreenTech sẽ được công bố vào ngày mai', time: '1 ngày trước' }
  ]);

  useEffect(() => {
    // Cập nhật dữ liệu dựa trên thông tin user
    if (user) {
      // Cá nhân hóa investments data
      setInvestments([
        {
          id: 1,
          campaignName: 'TechStart Innovation',
          industry: 'Công nghệ',
          investedAmount: 50000000,
          currentValue: 58500000,
          roi: 17.0,
          status: 'active',
          investedDate: '2024-08-15',
          expectedReturn: '24 tháng',
          riskLevel: 'medium',
          investorName: user.name || 'Nhà đầu tư'
        },
        {
          id: 2,
          campaignName: 'EcoFarm Organic',
          industry: 'Nông nghiệp',
          investedAmount: 30000000,
          currentValue: 32400000,
          roi: 8.0,
          status: 'active',
          investedDate: '2024-07-20',
          expectedReturn: '36 tháng',
          riskLevel: 'low',
          investorName: user.name || 'Nhà đầu tư'
        },
        {
          id: 3,
          campaignName: 'FoodTech Solutions',
          industry: 'F&B Tech',
          investedAmount: 45000000,
          currentValue: 39150000,
          roi: -13.0,
          status: 'completed',
          investedDate: '2024-06-10',
          expectedReturn: '18 tháng',
          riskLevel: 'high',
          investorName: user.name || 'Nhà đầu tư'
        }
      ]);

      // Mock recommendations với AI-powered personalization
      setRecommendations([
        {
          id: 101,
          title: 'GreenEnergy Solutions',
          summary: 'Giải pháp năng lượng tái tạo cho doanh nghiệp SME',
          description: 'Phát triển hệ thống pin mặt trời thông minh cho các doanh nghiệp vừa và nhỏ',
          target: 200000000,
          raised: 75000000,
          imageUrl: '/images/green-energy.jpg',
          industry: 'Năng lượng',
          riskLevel: 'medium',
          investors: 45,
          rating: 4.2,
          ownerId: 1,
          owner: { id: 1, name: 'Green Energy Co.', email: '' },
          status: 'active',
          createdAt: '2024-09-01',
          startDate: new Date('2024-09-01'),
          endDate: new Date('2025-03-01'),
          location: 'TP.HCM',
          type: 'equity'
        }
      ]);

      setWatchlist([
        {
          id: 102,
          title: 'HealthTech AI',
          summary: 'Ứng dụng AI trong chẩn đoán y tế',
          description: 'Phát triển hệ thống AI hỗ trợ bác sĩ chẩn đoán bệnh',
          target: 300000000,
          raised: 120000000,
          imageUrl: '/images/healthtech.jpg',
          industry: 'Y tế',
          riskLevel: 'high',
          investors: 32,
          rating: 4.5,
          ownerId: 2,
          owner: { id: 2, name: 'HealthTech Co.', email: '' },
          status: 'active',
          createdAt: '2024-08-15',
          startDate: new Date('2024-08-15'),
          endDate: new Date('2025-02-15'),
          location: 'Hà Nội',
          type: 'equity'
        }
      ]);

      // Cá nhân hóa notifications
      setNotifications([
        { id: 1, type: 'success', message: `Chúc mừng ${user.name}! Chiến dịch TechStart đã hoàn thành mục tiêu 150%`, time: '2 giờ trước' },
        { id: 2, type: 'info', message: `Cơ hội đầu tư mới dành cho ${user.name}: EcoGreen - Năng lượng tái tạo`, time: '5 giờ trước' },
        { id: 3, type: 'warning', message: 'Báo cáo quý của GreenTech sẽ được công bố vào ngày mai', time: '1 ngày trước' }
      ]);
    }
  }, [user]);

  // Cập nhật portfolio metrics dựa trên investments data
  useEffect(() => {
    if (investments.length > 0) {
      const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
      const currentTotalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
      const totalReturns = currentTotalValue - totalInvested;
      const activeInvestments = investments.filter(inv => inv.status === 'active').length;
      const completedInvestments = investments.filter(inv => inv.status === 'completed').length;
      
      setPortfolio({
        totalInvested,
        totalReturns,
        activeInvestments,
        completedInvestments
      });
    }
  }, [investments]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getROIColor = (roi: number) => {
    if (roi > 0) return 'text-green-600';
    if (roi < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRiskBadge = (risk: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    const labels = {
      low: 'Thấp',
      medium: 'Trung bình',
      high: 'Cao'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[risk as keyof typeof colors]}`}>
        {labels[risk as keyof typeof labels]}
      </span>
    );
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Chào mừng trở lại, {user?.name || 'Nhà đầu tư'}!
                </h1>
                <p className="text-gray-600">Theo dõi portfolio và khám phá cơ hội đầu tư mới</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Nhà đầu tư'}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'I'}
                    </span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Khám phá cơ hội
                </button>
                <NotificationSystem userRole="investor" userId={user?.id?.toString()} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng đầu tư</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio.totalInvested)}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lợi nhuận</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(portfolio.totalReturns)}</p>
                  <p className="text-sm text-green-600">+12.6% ROI</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đầu tư đang hoạt động</p>
                  <p className="text-2xl font-bold text-gray-900">{portfolio.activeInvestments}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đầu tư hoàn thành</p>
                  <p className="text-2xl font-bold text-gray-900">{portfolio.completedInvestments}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', name: 'Tổng quan', icon: '📊' },
                  { id: 'investments', name: 'Danh mục đầu tư', icon: '💼' },
                  { id: 'recommendations', name: 'Đề xuất AI', icon: '🤖' },
                  { id: 'watchlist', name: 'Quan tâm', icon: '👁️' },
                  { id: 'analytics', name: 'Phân tích AI', icon: '📈' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
                  <div className="space-y-4">
                    {[
                      {
                        type: 'investment',
                        title: 'Đầu tư vào TechStart Innovation',
                        amount: '+50,000,000 VND',
                        time: '2 ngày trước',
                        status: 'success'
                      },
                      {
                        type: 'return',
                        title: 'Lợi nhuận từ EcoFarm Organic',
                        amount: '+2,400,000 VND',
                        time: '1 tuần trước',
                        status: 'success'
                      },
                      {
                        type: 'update',
                        title: 'Báo cáo quý từ GreenTech',
                        amount: 'Tăng trưởng 15%',
                        time: '2 tuần trước',
                        status: 'info'
                      }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                        <p className={`font-semibold ${
                          activity.status === 'success' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {activity.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Thông báo</h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mb-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <p className="text-sm text-gray-900 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'investments' && (
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Danh mục đầu tư của bạn</h3>
                <p className="text-gray-600 mt-1">Theo dõi hiệu suất các khoản đầu tư</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chiến dịch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngành
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số tiền đầu tư
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá trị hiện tại
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ROI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rủi ro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {investments.map((investment) => (
                      <tr key={investment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{investment.campaignName}</div>
                            <div className="text-sm text-gray-500">Đầu tư: {investment.investedDate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {investment.industry}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(investment.investedAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(investment.currentValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-semibold ${getROIColor(investment.roi)}`}>
                            {investment.roi > 0 ? '+' : ''}{investment.roi}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRiskBadge(investment.riskLevel)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            investment.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {investment.status === 'active' ? 'Đang hoạt động' : 'Hoàn thành'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Đề xuất AI dành cho bạn</h3>
                    <p className="text-blue-100">Dựa trên lịch sử đầu tư và sở thích của bạn</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((campaign) => (
                  <div key={campaign.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{campaign.title}</h4>
                          <p className="text-sm text-gray-600">{campaign.industry}</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          AI Match: 95%
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.summary}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Mục tiêu:</span>
                          <span className="font-semibold">{formatCurrency(campaign.target)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Đã huy động:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(campaign.raised)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tiến độ:</span>
                          <span className="font-semibold text-blue-600">{Math.round((campaign.raised / campaign.target) * 100)}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getRiskBadge(campaign.riskLevel || 'medium')}
                          <span className="text-xs text-gray-500">{campaign.industry}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-red-500 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <Link href={`/campaigns/${campaign.id}`}>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                              Đầu tư ngay
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'watchlist' && (
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Danh sách quan tâm</h3>
                <p className="text-gray-600 mt-1">Các cơ hội đầu tư bạn đang theo dõi</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {watchlist.map((campaign) => (
                    <div key={campaign.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{campaign.title}</h4>
                          <p className="text-sm text-gray-600">{campaign.industry}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{campaign.summary}</p>
                      
                      <div className="flex justify-between text-sm mb-3">
                        <span>Tiến độ: {Math.round((campaign.raised / campaign.target) * 100)}%</span>
                        <span className="text-blue-600 font-medium">{campaign.industry}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link href={`/campaigns/${campaign.id}`} className="flex-1">
                          <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                            Xem chi tiết
                          </button>
                        </Link>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                          Bỏ theo dõi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <SmartAnalytics userRole="investor" />
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default InvestorDashboard;
