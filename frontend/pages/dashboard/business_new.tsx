import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../src/contexts/AuthContext';
import PrivateRoute from '../../src/components/auth/PrivateRoute';
import SmartAnalytics from '../../src/components/ai/SmartAnalytics';
import NotificationSystem from '../../src/components/notifications/NotificationSystem';
import { Campaign } from '../../src/types';

const BusinessDashboard = () => {
  const auth = useContext(AuthContext);
  const { user } = auth || { user: null };
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [businessMetrics, setBusinessMetrics] = useState({
    totalRaised: 450000000, // 450 triệu VND
    activeCampaigns: 3,
    completedCampaigns: 2,
    totalInvestors: 127,
    avgRaiseTime: 45, // days
    successRate: 85 // percentage
  });
  const [recentActivity, setRecentActivity] = useState([
    { type: 'investment', investor: 'Nguyễn Văn A', amount: 25000000, campaign: 'TechStart 2024', time: '2 giờ trước' },
    { type: 'milestone', campaign: 'EcoFarm Project', milestone: 'Đạt 75% mục tiêu', time: '1 ngày trước' },
    { type: 'investor', investor: 'Trần Thị B', amount: 15000000, campaign: 'GreenTech', time: '2 ngày trước' },
    { type: 'update', campaign: 'AI Healthcare', update: 'Báo cáo tiến độ Q3', time: '3 ngày trước' }
  ]);
  const [pendingTasks, setPendingTasks] = useState([
    { id: 1, task: 'Cập nhật báo cáo tài chính Q3', campaign: 'TechStart 2024', deadline: '2024-09-15', priority: 'high' },
    { id: 2, task: 'Trả lời câu hỏi từ nhà đầu tư', campaign: 'EcoFarm Project', deadline: '2024-09-12', priority: 'medium' },
    { id: 3, task: 'Chuẩn bị milestone báo cáo', campaign: 'GreenTech', deadline: '2024-09-20', priority: 'low' }
  ]);

  useEffect(() => {
    // Mock data cho campaigns
    setCampaigns([
      {
        id: 1,
        title: 'TechStart Innovation 2024',
        summary: 'Nền tảng AI cho doanh nghiệp SME',
        description: 'Phát triển nền tảng AI giúp doanh nghiệp SME tự động hóa quy trình kinh doanh',
        target: 200000000,
        raised: 165000000,
        imageUrl: '/images/techstart.jpg',
        industry: 'Công nghệ',
        riskLevel: 'medium',
        investors: 67,
        rating: 4.5,
        ownerId: 1,
        owner: { id: 1, name: 'TechStart Co.', email: '' },
        status: 'active',
        createdAt: '2024-08-01',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-12-01'),
        location: 'TP.HCM',
        type: 'equity'
      },
      {
        id: 2,
        title: 'EcoFarm Organic Solutions',
        summary: 'Nông nghiệp hữu cơ thông minh',
        description: 'Hệ thống nông nghiệp hữu cơ sử dụng IoT và AI',
        target: 150000000,
        raised: 112500000,
        imageUrl: '/images/ecofarm.jpg',
        industry: 'Nông nghiệp',
        riskLevel: 'low',
        investors: 42,
        rating: 4.3,
        ownerId: 1,
        owner: { id: 1, name: 'EcoFarm Co.', email: '' },
        status: 'active',
        createdAt: '2024-07-15',
        startDate: new Date('2024-07-15'),
        endDate: new Date('2024-11-15'),
        location: 'Đà Lạt',
        type: 'debt'
      },
      {
        id: 3,
        title: 'GreenTech Energy',
        summary: 'Giải pháp năng lượng tái tạo',
        description: 'Phát triển hệ thống pin mặt trời cho gia đình',
        target: 300000000,
        raised: 172500000,
        imageUrl: '/images/greentech.jpg',
        industry: 'Năng lượng',
        riskLevel: 'medium',
        investors: 18,
        rating: 4.1,
        ownerId: 1,
        owner: { id: 1, name: 'GreenTech Co.', email: '' },
        status: 'active',
        createdAt: '2024-09-01',
        startDate: new Date('2024-09-01'),
        endDate: new Date('2025-01-01'),
        location: 'Hà Nội',
        type: 'equity'
      }
    ]);

    // Mock data cho recent activity  
    setRecentActivity([
      {
        type: 'investment',
        investor: 'Nguyễn Văn A',
        amount: 50000000,
        campaign: 'TechStart Innovation 2024',
        time: '2 giờ trước'
      },
      {
        type: 'milestone',
        milestone: 'Hoàn thành MVP',
        campaign: 'TechStart Innovation 2024',
        time: '1 ngày trước'
      },
      {
        type: 'investor',
        investor: 'Trần Thị B',
        amount: 30000000,
        campaign: 'EcoFarm Solutions',
        time: '2 ngày trước'
      }
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    const labels = {
      active: 'Đang hoạt động',
      pending: 'Chờ duyệt',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    const labels = {
      high: 'Cao',
      medium: 'Trung bình',
      low: 'Thấp'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
        {labels[priority as keyof typeof labels]}
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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Doanh nghiệp</h1>
                <p className="text-gray-600">Quản lý chiến dịch gọi vốn của bạn</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/campaigns/create">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    + Tạo chiến dịch mới
                  </button>
                </Link>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                  Tải báo cáo
                </button>
                <NotificationSystem userRole="business" userId={user?.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng vốn huy động</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(businessMetrics.totalRaised)}</p>
                  <p className="text-sm text-green-600">+15% so với tháng trước</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chiến dịch đang hoạt động</p>
                  <p className="text-2xl font-bold text-gray-900">{businessMetrics.activeCampaigns}</p>
                  <p className="text-sm text-blue-600">Tổng cộng {businessMetrics.activeCampaigns + businessMetrics.completedCampaigns} chiến dịch</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng nhà đầu tư</p>
                  <p className="text-2xl font-bold text-gray-900">{businessMetrics.totalInvestors}</p>
                  <p className="text-sm text-purple-600">Tăng {Math.round(businessMetrics.totalInvestors * 0.1)} nhà đầu tư mới</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tỷ lệ thành công</p>
                  <p className="text-2xl font-bold text-gray-900">{businessMetrics.successRate}%</p>
                  <p className="text-sm text-orange-600">Thời gian TB: {businessMetrics.avgRaiseTime} ngày</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  { id: 'campaigns', name: 'Chiến dịch', icon: '🚀' },
                  { id: 'investors', name: 'Nhà đầu tư', icon: '👥' },
                  { id: 'analytics', name: 'Phân tích AI', icon: '📈' },
                  { id: 'tasks', name: 'Công việc', icon: '✅' }
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
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'investment' ? 'bg-green-100' :
                          activity.type === 'milestone' ? 'bg-blue-100' :
                          activity.type === 'investor' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          {activity.type === 'investment' && '💰'}
                          {activity.type === 'milestone' && '🎯'}
                          {activity.type === 'investor' && '👤'}
                          {activity.type === 'update' && '📝'}
                        </div>
                        <div className="flex-1">
                          {activity.type === 'investment' && (
                            <div>
                              <p className="font-medium text-gray-900">
                                {activity.investor} đã đầu tư {formatCurrency(activity.amount || 0)}
                              </p>
                              <p className="text-sm text-gray-600">vào chiến dịch {activity.campaign}</p>
                            </div>
                          )}
                          {activity.type === 'milestone' && (
                            <div>
                              <p className="font-medium text-gray-900">{activity.milestone}</p>
                              <p className="text-sm text-gray-600">Chiến dịch: {activity.campaign}</p>
                            </div>
                          )}
                          {activity.type === 'investor' && (
                            <div>
                              <p className="font-medium text-gray-900">
                                Nhà đầu tư mới: {activity.investor}
                              </p>
                              <p className="text-sm text-gray-600">
                                Đầu tư {formatCurrency(activity.amount || 0)} vào {activity.campaign}
                              </p>
                            </div>
                          )}
                          {activity.type === 'update' && (
                            <div>
                              <p className="font-medium text-gray-900">{activity.update}</p>
                              <p className="text-sm text-gray-600">Chiến dịch: {activity.campaign}</p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions & Tasks */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Hành động nhanh</h3>
                  <div className="space-y-3">
                    <Link href="/campaigns/create">
                      <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition text-left">
                        🚀 Tạo chiến dịch mới
                      </button>
                    </Link>
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition text-left">
                      📊 Cập nhật báo cáo
                    </button>
                    <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition text-left">
                      💬 Tương tác nhà đầu tư
                    </button>
                    <button className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition text-left">
                      📈 Xem phân tích
                    </button>
                  </div>
                </div>

                {/* Pending Tasks */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">Công việc cần làm</h3>
                  <div className="space-y-3">
                    {pendingTasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-gray-900 flex-1 pr-2">{task.task}</p>
                          {getPriorityBadge(task.priority)}
                        </div>
                        <p className="text-xs text-gray-600">{task.campaign}</p>
                        <p className="text-xs text-gray-500 mt-1">Hạn: {task.deadline}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700">
                    Xem tất cả công việc
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Chiến dịch của bạn</h3>
                      <p className="text-gray-600 mt-1">Quản lý và theo dõi tiến độ các chiến dịch</p>
                    </div>
                    <Link href="/campaigns/create">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        + Tạo mới
                      </button>
                    </Link>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{campaign.title}</h4>
                            {getStatusBadge(campaign.status)}
                          </div>
                          
                          <p className="text-gray-600 mb-4">{campaign.summary}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Mục tiêu</p>
                              <p className="font-semibold">{formatCurrency(campaign.target)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Đã huy động</p>
                              <p className="font-semibold text-green-600">{formatCurrency(campaign.raised)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Nhà đầu tư</p>
                              <p className="font-semibold">{campaign.investors} người</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Tiến độ</p>
                              <p className="font-semibold text-blue-600">{Math.round((campaign.raised / campaign.target) * 100)}%</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-6">
                          <Link href={`/campaigns/${campaign.id}`}>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                              Xem chi tiết
                            </button>
                          </Link>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                            Chỉnh sửa
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                            Phân tích
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Quản lý nhà đầu tư</h3>
                
                {/* Investor Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">127</div>
                    <div className="text-sm text-gray-600">Tổng nhà đầu tư</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">89</div>
                    <div className="text-sm text-gray-600">Nhà đầu tư hoạt động</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{formatCurrency(3550000)}</div>
                    <div className="text-sm text-gray-600">Đầu tư TB/người</div>
                  </div>
                </div>

                {/* Top Investors */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nhà đầu tư
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số tiền đầu tư
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Chiến dịch tham gia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ngày tham gia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: 'Nguyễn Văn A', amount: 50000000, campaigns: 3, joinDate: '2024-08-15', email: 'nguyenvana@email.com' },
                        { name: 'Trần Thị B', amount: 35000000, campaigns: 2, joinDate: '2024-07-20', email: 'tranthib@email.com' },
                        { name: 'Lê Văn C', amount: 25000000, campaigns: 1, joinDate: '2024-09-01', email: 'levanc@email.com' },
                        { name: 'Phạm Thị D', amount: 40000000, campaigns: 3, joinDate: '2024-06-10', email: 'phamthid@email.com' }
                      ].map((investor, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                  {investor.name.charAt(0)}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{investor.name}</div>
                                <div className="text-sm text-gray-500">{investor.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(investor.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {investor.campaigns} chiến dịch
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {investor.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">Xem</button>
                            <button className="text-green-600 hover:text-green-900">Liên hệ</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <SmartAnalytics userRole="business" />
          )}

          {activeTab === 'tasks' && (
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Quản lý công việc</h3>
                <p className="text-gray-600 mt-1">Theo dõi và hoàn thành các nhiệm vụ quan trọng</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition">
                      <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{task.task}</h4>
                            <p className="text-sm text-gray-600 mt-1">Chiến dịch: {task.campaign}</p>
                            <p className="text-xs text-gray-500 mt-1">Hạn chót: {task.deadline}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(task.priority)}
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Hoàn thành
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    + Thêm công việc mới
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default BusinessDashboard;
