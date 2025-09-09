import React, { useEffect, useState } from 'react';
import CampaignCard from '../../src/components/campaign/CampaignCard';
import { fetchCampaigns } from '../../src/services/campaignService';
import { Campaign } from '../../src/types';

const CampaignsPage = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        industry: '',
        fundingAmount: '',
        risk: '',
        type: ''
    });

    useEffect(() => {
        const loadCampaigns = async () => {
            try {
                setLoading(true);
                const data = await fetchCampaigns(filters);
                setCampaigns(data);
            } catch (err: any) {
                setError(err.message || 'Có lỗi xảy ra khi tải dự án');
            } finally {
                setLoading(false);
            }
        };

        loadCampaigns();
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    if (loading) return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600">Đang tải dự án...</p>
        </div>
    );
    
    if (error) return (
        <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 className="text-xl font-bold text-red-700 mb-2">Đã xảy ra lỗi</h2>
                <p className="text-red-600">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4 py-8">
            <h1 className="text-3xl font-bold text-navy-800 mb-6 text-center">Các Dự Án Đang Gọi Vốn</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-navy-700 mb-4">Tìm kiếm dự án</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lĩnh vực</label>
                        <select 
                            name="industry" 
                            value={filters.industry}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Tất cả lĩnh vực</option>
                            <option value="Công nghệ">Công nghệ</option>
                            <option value="Thực phẩm & Đồ uống">Thực phẩm & Đồ uống</option>
                            <option value="Bán lẻ">Bán lẻ</option>
                            <option value="Dịch vụ">Dịch vụ</option>
                            <option value="Sản xuất">Sản xuất</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số vốn tối thiểu</label>
                        <input 
                            type="number" 
                            name="fundingAmount" 
                            value={filters.fundingAmount}
                            onChange={handleFilterChange}
                            placeholder="VD: 100000000"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mức độ rủi ro</label>
                        <select 
                            name="risk" 
                            value={filters.risk}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Tất cả mức độ</option>
                            <option value="low">Thấp</option>
                            <option value="medium">Trung bình</option>
                            <option value="high">Cao</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loại đầu tư</label>
                        <select 
                            name="type" 
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Tất cả loại</option>
                            <option value="equity">Cổ phần</option>
                            <option value="debt">Trái phiếu</option>
                            <option value="donation">Gọi vốn cộng đồng</option>
                        </select>
                    </div>
                </div>
            </div>
            
            {campaigns.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Không tìm thấy dự án nào</h3>
                    <p className="text-gray-500 max-w-md">Không có dự án nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử điều chỉnh bộ lọc.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        <CampaignCard 
                            key={campaign.id}
                            id={campaign.id.toString()}
                            title={campaign.title}
                            description={campaign.description || campaign.summary || ''}
                            fundingGoal={campaign.target || campaign.fundingGoal || 0}
                            currentFunding={campaign.raised || campaign.currentAmount || 0}
                            imageUrl={campaign.imageUrl || '/images/default-campaign.jpg'}
                            daysLeft={30} // Mặc định 30 ngày
                            companyName={campaign.owner?.name || ''}
                            industry={campaign.industry || 'Khác'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CampaignsPage;