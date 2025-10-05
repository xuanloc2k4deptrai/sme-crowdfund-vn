import React, { useState } from 'react';
import { Campaign, DailyFunding, Investor } from '../../types/businessDashboard';
import { InvestorList } from './InvestorList';

interface CampaignDetailsProps {
  campaign: Campaign;
  onUpdateCampaign: (campaignId: number) => void;
}

export const CampaignDetails: React.FC<CampaignDetailsProps> = ({ 
  campaign, 
  onUpdateCampaign 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'investors' | 'performance' | 'updates' | 'compliance'>('overview');
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN').format(date);
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

  const tabs = [
    { id: 'overview', label: '📊 Tổng quan', count: null },
    { id: 'investors', label: '👥 Nhà đầu tư', count: campaign.totalInvestors },
    { id: 'performance', label: '📈 Hiệu suất', count: null },
    { id: 'updates', label: '📢 Cập nhật', count: campaign.updates.length },
    { id: 'compliance', label: '⚖️ Tuân thủ', count: null }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{campaign.title}</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                {campaign.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(campaign.currentAmount)}
                </p>
                <p className="text-sm text-gray-500">Đã gọi được</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {campaign.percentage.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">Hoàn thành</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {campaign.totalInvestors}
                </p>
                <p className="text-sm text-gray-500">Nhà đầu tư</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {campaign.daysRemaining}
                </p>
                <p className="text-sm text-gray-500">Ngày còn lại</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 ml-6">
            <button 
              onClick={() => onUpdateCampaign(campaign.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              ✏️ Chỉnh sửa
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              📢 Đăng cập nhật
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              📊 Báo cáo
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{formatCurrency(campaign.currentAmount)}</span>
            <span>{formatCurrency(campaign.targetAmount)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(campaign.percentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
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

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Campaign Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Overview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">💰 Thông tin tài chính</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Mục tiêu:</dt>
                    <dd className="font-semibold">{formatCurrency(campaign.targetAmount)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Đã gọi được:</dt>
                    <dd className="font-semibold text-green-600">{formatCurrency(campaign.currentAmount)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Còn lại:</dt>
                    <dd className="font-semibold text-orange-600">{formatCurrency(campaign.targetAmount - campaign.currentAmount)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Đầu tư tối thiểu:</dt>
                    <dd>{formatCurrency(campaign.minimumInvestment)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Đầu tư trung bình:</dt>
                    <dd>{formatCurrency(campaign.averageInvestment)}</dd>
                  </div>
                </dl>
              </div>

              {/* Campaign Timeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">📅 Timeline</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Ngày bắt đầu:</dt>
                    <dd>{formatDate(campaign.startDate)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Ngày kết thúc:</dt>
                    <dd>{formatDate(campaign.endDate)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Ngày còn lại:</dt>
                    <dd className="font-semibold text-orange-600">{campaign.daysRemaining} ngày</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Loại đầu tư:</dt>
                    <dd className="capitalize">{campaign.investmentType}</dd>
                  </div>
                  {campaign.expectedROI && (
                    <div className="flex justify-between">
                      <dt className="text-gray-600">ROI dự kiến:</dt>
                      <dd className="text-purple-600 font-semibold">{campaign.expectedROI}%</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Marketing Metrics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">📊 Metrics tiếp thị</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{campaign.views.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Lượt xem</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{campaign.likes}</p>
                  <p className="text-sm text-gray-600">Lượt thích</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{campaign.shares}</p>
                  <p className="text-sm text-gray-600">Lượt chia sẻ</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{(campaign.conversionRate * 100).toFixed(2)}%</p>
                  <p className="text-sm text-gray-600">Tỷ lệ chuyển đổi</p>
                </div>
              </div>
            </div>

            {/* Recent Milestones */}
            <div>
              <h3 className="text-lg font-semibold mb-4">🎯 Các mốc quan trọng</h3>
              <div className="space-y-3">
                {campaign.milestones.slice(0, 3).map((milestone) => (
                  <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        milestone.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>Mục tiêu: {formatCurrency(milestone.targetAmount)}</span>
                      <span>Hạn: {formatDate(milestone.deadline)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'investors' && (
          <InvestorList
            investors={campaign.investors}
            campaignTitle={campaign.title}
            onInvestorClick={(investor) => setSelectedInvestor(investor)}
          />
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Daily Funding Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">📈 Biểu đồ gọi vốn hàng ngày</h3>
              <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-gray-500">Biểu đồ sẽ được hiển thị ở đây</p>
              </div>
            </div>

            {/* Investor Demographics */}
            <div>
              <h3 className="text-lg font-semibold mb-4">👥 Thống kê nhà đầu tư</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Theo độ tuổi</h4>
                  {campaign.investorDemographics.ageGroups.map((group) => (
                    <div key={group.range} className="flex justify-between mb-2">
                      <span className="text-sm">{group.range}</span>
                      <span className="text-sm font-medium">{group.count} ({group.percentage}%)</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Theo địa điểm</h4>
                  {campaign.investorDemographics.locations.slice(0, 5).map((location) => (
                    <div key={location.city} className="flex justify-between mb-2">
                      <span className="text-sm">{location.city}</span>
                      <span className="text-sm font-medium">{location.count} ({location.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">📢 Cập nhật dự án</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                ➕ Thêm cập nhật
              </button>
            </div>
            
            {campaign.updates.map((update) => (
              <div key={update.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{update.title}</h4>
                  <span className="text-sm text-gray-500">{formatDate(update.createdAt)}</span>
                </div>
                <p className="text-gray-700 mb-3">{update.content}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>👁️ {update.views} lượt xem</span>
                  <span>❤️ {update.likes} lượt thích</span>
                  <span>💬 {update.comments.length} bình luận</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">⚖️ Tuân thủ & Báo cáo</h3>
            
            {/* Compliance Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">✅ Hoàn thành</h4>
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-sm text-green-700">Báo cáo đã nộp</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">⏳ Đang chờ</h4>
                <p className="text-2xl font-bold text-yellow-600">1</p>
                <p className="text-sm text-yellow-700">Báo cáo cần nộp</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">❌ Quá hạn</h4>
                <p className="text-2xl font-bold text-red-600">0</p>
                <p className="text-sm text-red-700">Báo cáo quá hạn</p>
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h4 className="font-medium mb-3">📋 Tài liệu cần thiết</h4>
              <div className="space-y-2">
                {[
                  { name: 'Báo cáo tài chính Q3', status: 'completed', dueDate: '2024-10-15' },
                  { name: 'Báo cáo tiến độ dự án', status: 'pending', dueDate: '2024-11-01' },
                  { name: 'Thông báo cổ đông', status: 'completed', dueDate: '2024-09-30' },
                ].map((doc, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded">
                    <span className="font-medium">{doc.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Hạn: {doc.dueDate}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status === 'completed' ? 'Hoàn thành' : 'Chờ nộp'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};