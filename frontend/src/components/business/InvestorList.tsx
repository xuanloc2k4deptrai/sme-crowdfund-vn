import React, { useState } from 'react';
import { Investor } from '../../types/businessDashboard';

interface InvestorListProps {
  investors: Investor[];
  campaignTitle: string;
  onInvestorClick: (investor: Investor) => void;
}

export const InvestorList: React.FC<InvestorListProps> = ({ 
  investors, 
  campaignTitle, 
  onInvestorClick 
}) => {
  const [sortBy, setSortBy] = useState<'amount' | 'date' | 'name'>('amount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'institutional'>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN').format(date);
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {status === 'active' && '✅ Hoạt động'}
        {status === 'pending' && '⏳ Chờ xử lý'}
        {status === 'completed' && '✅ Hoàn thành'}
        {status === 'cancelled' && '❌ Đã hủy'}
      </span>
    );
  };

  const getInvestorTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return '👤';
      case 'institutional': return '🏢';
      case 'accredited': return '⭐';
      default: return '👤';
    }
  };

  const sortedAndFilteredInvestors = investors
    .filter(investor => filterType === 'all' || investor.investorType === filterType)
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'amount':
          aValue = a.investmentAmount;
          bValue = b.investmentAmount;
          break;
        case 'date':
          aValue = new Date(a.investmentDate).getTime();
          bValue = new Date(b.investmentDate).getTime();
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalInvestment = investors.reduce((sum, investor) => sum + investor.investmentAmount, 0);
  const averageInvestment = totalInvestment / investors.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          👥 Danh sách nhà đầu tư - {campaignTitle}
        </h3>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Tổng số NĐT</p>
            <p className="text-2xl font-bold text-blue-900">{investors.length}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Tổng đầu tư</p>
            <p className="text-xl font-bold text-green-900">{formatCurrency(totalInvestment)}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Đầu tư TB</p>
            <p className="text-xl font-bold text-purple-900">{formatCurrency(averageInvestment)}</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-orange-600 font-medium">Cá nhân / Tổ chức</p>
            <p className="text-xl font-bold text-orange-900">
              {investors.filter(i => i.investorType === 'individual').length} / {investors.filter(i => i.investorType === 'institutional').length}
            </p>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sắp xếp:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="amount">Số tiền</option>
              <option value="date">Ngày đầu tư</option>
              <option value="name">Tên</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Loại NĐT:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="all">Tất cả</option>
              <option value="individual">Cá nhân</option>
              <option value="institutional">Tổ chức</option>
            </select>
          </div>
        </div>
      </div>

      {/* Investor List */}
      <div className="space-y-3">
        {sortedAndFilteredInvestors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Chưa có nhà đầu tư nào</p>
          </div>
        ) : (
          sortedAndFilteredInvestors.map((investor) => (
            <div
              key={investor.id}
              onClick={() => onInvestorClick(investor)}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {investor.avatar ? (
                      <img src={investor.avatar} alt={investor.name} className="w-12 h-12 rounded-full" />
                    ) : (
                      investor.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  
                  {/* Investor Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{investor.name}</h4>
                      <span className="text-lg">{getInvestorTypeIcon(investor.investorType)}</span>
                      {getStatusBadge(investor.status)}
                    </div>
                    <p className="text-sm text-gray-600">{investor.email}</p>
                    {investor.location && (
                      <p className="text-sm text-gray-500">📍 {investor.location}</p>
                    )}
                  </div>
                </div>

                {/* Investment Details */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(investor.investmentAmount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(investor.investmentDate)}
                  </p>
                  {investor.equityPercentage && (
                    <p className="text-sm text-blue-600">
                      {investor.equityPercentage.toFixed(2)}% cổ phần
                    </p>
                  )}
                  {investor.expectedReturn && (
                    <p className="text-sm text-purple-600">
                      ROI: {investor.expectedReturn.toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              {investor.notes && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">💬 {investor.notes}</p>
                </div>
              )}
              
              {investor.previousInvestments && investor.previousInvestments > 0 && (
                <div className="mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    📊 {investor.previousInvestments} dự án trước đó
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Export Options */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Hiển thị {sortedAndFilteredInvestors.length} / {investors.length} nhà đầu tư
          </p>
          <div className="flex space-x-2">
            <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
              📤 Xuất Excel
            </button>
            <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
              📧 Gửi email hàng loạt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};