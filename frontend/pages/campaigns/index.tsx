import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { mockCampaigns } from '../../src/mocks/campaignMock';
import ImageWithFallback from '../../src/components/ui/ImageWithFallback';
import Link from 'next/link';
import type { Campaign } from '../../src/types';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Mô phỏng việc tải dữ liệu từ API
    const loadData = () => {
      setTimeout(() => {
        setCampaigns(mockCampaigns);
        setIsLoading(false);
      }, 500);
    };
    
    loadData();
  }, []);
  
  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    if (filter === 'active') return campaign.status === 'active';
    if (filter === 'funded') return campaign.status === 'funded';
    if (filter === 'closed') return campaign.status === 'closed';
    return true;
  });
  
  return (
    <>
      <Head>
        <title>Dự án gọi vốn | SME CrowdFund VN</title>
        <meta name="description" content="Khám phá các dự án gọi vốn từ các doanh nghiệp vừa và nhỏ tại Việt Nam" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute left-0 top-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Gọi vốn hiện tại
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
              Khám phá dự án gọi vốn
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-blue-700/80">
              Đầu tư vào tương lai của các doanh nghiệp vừa và nhỏ tại Việt Nam
            </p>
            <p className="mt-3 text-blue-600 font-medium">
              📅 Cập nhật: {new Date().toLocaleDateString('vi-VN')}
            </p>
          </div>
          
          {/* Filter Tabs */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex bg-white rounded-full shadow-lg p-1.5 space-x-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === 'active' 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-green-50'
                }`}
              >
                Đang gọi vốn
              </button>
              <button
                onClick={() => setFilter('funded')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === 'funded' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                Đã đạt mục tiêu
              </button>
              <button
                onClick={() => setFilter('closed')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === 'closed' 
                    ? 'bg-gray-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Đã kết thúc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div 
                    key={item}
                    className="animate-pulse bg-white overflow-hidden shadow rounded-lg"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredCampaigns.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCampaigns.map((campaign) => {
                      // Support both old and new field names
                      const raised = campaign.raised ?? campaign.raisedAmount ?? 0;
                      const target = campaign.target ?? campaign.fundingGoal ?? 1;
                      const progress = Math.min((raised / target) * 100, 100);
                      const daysLeft = campaign.daysLeft ?? 0;
                      
                      return (
                        <Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
                          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                            {/* Image Section with 56 height (h-56 = 224px) */}
                            <div className="h-56 relative overflow-hidden">
                              <div className="w-full h-full relative">
                                <ImageWithFallback
                                  src={campaign.imageUrl || campaign.coverImage || '/images/business-meeting.jpg'}
                                  alt={(campaign.name || campaign.title || 'Campaign') + ' - ' + (campaign.category || campaign.industry || 'Project')}
                                  width={500}
                                  height={300}
                                  className="w-full h-full group-hover:scale-105 transition-transform duration-500 object-cover"
                                />
                              </div>
                              
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>
                              
                              {/* Category Badge - Top Left */}
                              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-navy-800 text-xs font-semibold px-3 py-1.5 rounded-full capitalize">
                                {campaign.category || campaign.industry}
                              </div>
                              
                              {/* Status Badge - Top Right */}
                              {campaign.status === 'active' && (
                                <div className="absolute top-4 right-4 bg-green-400 text-blue-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                  Đang gọi vốn
                                </div>
                              )}
                              {campaign.status === 'funded' && (
                                <div className="absolute top-4 right-4 bg-blue-400 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                  Đã đạt mục tiêu
                                </div>
                              )}
                              {campaign.status === 'closed' && (
                                <div className="absolute top-4 right-4 bg-gray-400 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                  Đã kết thúc
                                </div>
                              )}
                              
                              {/* Days Remaining - Bottom Right */}
                              <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                                {daysLeft > 0 ? `${daysLeft} ngày còn lại` : 'Kết thúc'}
                              </div>
                            </div>
                            
                            {/* Content Section */}
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {campaign.title || campaign.name}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4 min-h-[40px]">
                                {campaign.summary || campaign.shortDescription || 'Đầu tư vào dự án tiềm năng này'}
                              </p>
                              
                              {/* Progress Bar */}
                              <div className="mb-3">
                                <div className="flex justify-between items-center mb-2">
                                  <span className={`text-sm font-semibold ${
                                    progress >= 100 ? 'text-green-700' :
                                    progress >= 75 ? 'text-blue-700' :
                                    progress >= 50 ? 'text-yellow-700' :
                                    'text-orange-700'
                                  }`}>
                                    {progress.toFixed(0)}% đạt được
                                  </span>
                                  <span className="text-sm text-gray-500">{target.toLocaleString()} VNĐ</span>
                                </div>
                                <div className={`w-full rounded-full h-3 overflow-hidden ${
                                  progress >= 100 ? 'bg-green-100' :
                                  progress >= 75 ? 'bg-blue-100' :
                                  progress >= 50 ? 'bg-yellow-100' :
                                  'bg-orange-100'
                                }`}>
                                  <div 
                                    className={`h-3 rounded-full transition-all duration-500 shadow-sm ${
                                      progress >= 100 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                      progress >= 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                      progress >= 50 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                      'bg-gradient-to-r from-orange-500 to-orange-600'
                                    }`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {/* Stats Row */}
                              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Đã huy động</div>
                                  <div className="font-bold text-blue-600 text-lg">
                                    {raised.toLocaleString()} ₫
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-500 mb-1">Nhà đầu tư</div>
                                  <div className="font-bold text-gray-700 text-lg">
                                    {campaign.investors ?? campaign.investorCount ?? 0}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-xl text-gray-600 font-medium">Không tìm thấy dự án nào phù hợp với tiêu chí</p>
                    <p className="text-gray-500 mt-2">Hãy thử thay đổi bộ lọc hoặc quay lại sau</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
