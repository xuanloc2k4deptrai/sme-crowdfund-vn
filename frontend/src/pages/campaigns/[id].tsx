import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../../contexts/AuthContext';
import { Campaign } from '../../types';
import { fetchCampaignById } from '../../services/campaignService';
import Button from '../../components/ui/Button';
import Head from 'next/head';
import ImageWithFallback from '../../components/ui/ImageWithFallback';

const CampaignPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  useEffect(() => {
    const loadCampaign = async () => {
      if (id) {
        try {
          const campaignId = parseInt(id as string);
          const data = await fetchCampaignById(campaignId);
          setCampaign(data);
        } catch (err: any) {
          setError(err.message || 'Không tìm thấy dự án');
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadCampaign();
  }, [id]);

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setInvestmentAmount(isNaN(value) ? 0 : value);
  };

  const handleInvest = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    // Mock investment functionality
    alert(`Investment of ${investmentAmount.toLocaleString()} VND submitted for campaign "${campaign?.title}"`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        Loading...
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Campaign not found'}
        </div>
      </div>
    );
  }

  const progressPercentage = Math.min(Math.round((campaign.raised / campaign.target) * 100), 100);

  // Get color scheme based on industry
  const getColorScheme = () => {
    if (campaign.industry === 'Nông nghiệp') {
      return {
        primary: 'bg-green-600',
        hover: 'hover:bg-green-700',
        light: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700'
      };
    } else if (campaign.industry === 'Y tế') {
      return {
        primary: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        light: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700'
      };
    } else {
      return {
        primary: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        light: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700'
      };
    }
  };

  const colorScheme = getColorScheme();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <>
      <Head>
        <title>{campaign.title} | SME CrowdFund VN</title>
        <meta name="description" content={campaign.summary} />
        <meta property="og:title" content={`${campaign.title} | SME CrowdFund VN`} />
        <meta property="og:description" content={campaign.summary} />
        <meta property="og:image" content={campaign.imageUrl} />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        <nav className="flex mb-5">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Trang chủ
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link href="/campaigns" className="text-gray-500 hover:text-blue-600">
                Dự án
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-blue-600 font-medium truncate max-w-[200px]">
              {campaign.title}
            </li>
          </ol>
        </nav>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              <ImageWithFallback
                src={campaign.imageUrl || ''}
                alt={campaign.title}
                className="w-full h-full"
                style={{ minHeight: '400px' }}
                fallbackType={campaign.industry === 'Technology' ? 'gradient' : campaign.industry === 'Food & Beverage' ? 'pattern' : 'business'}
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm text-navy-800 rounded-full capitalize text-sm font-medium">
                {campaign.type === 'equity' ? 'Cổ phần' : campaign.type === 'debt' ? 'Trái phiếu' : 'Tài trợ'}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-navy-800 rounded-full text-sm font-bold">
                {campaign.industry}
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex items-center mb-4">
                <div className={`px-2 py-1 ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} rounded text-xs font-semibold mr-2`}>
                  {campaign.status === 'active' ? 'Đang gọi vốn' : campaign.status === 'funded' ? 'Đã đủ vốn' : campaign.status === 'completed' ? 'Đã hoàn thành' : 'Đã hủy'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {campaign.location || 'Việt Nam'}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-3 text-blue-900">{campaign.title}</h1>
              <p className="text-gray-600 mb-6">{campaign.summary}</p>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tiến độ gọi vốn</div>
                    <div className="text-2xl font-bold text-blue-700">{progressPercentage}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Mục tiêu</div>
                    <div className="font-bold">{formatCurrency(campaign.target)} VND</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className={`${colorScheme.primary} h-3 rounded-full`} style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <div className="text-gray-600">Đã gọi được: <span className="font-medium">{formatCurrency(campaign.raised)} VND</span></div>
                  <div className="text-gray-600">{campaign.investors || 0} nhà đầu tư</div>
                </div>
              </div>
              
              {campaign.status === 'active' && (
                <div className="p-4 border rounded-lg bg-gray-50 mb-6">
                  <h3 className="text-lg font-medium mb-2">Invest in this campaign</h3>
                  <div className="flex">
                    <input 
                      type="number"
                      value={investmentAmount}
                      onChange={handleInvestmentChange}
                      placeholder="Enter amount (VND)"
                      min="10000"
                      className="border rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button 
                      onClick={handleInvest}
                      disabled={!investmentAmount || Number(investmentAmount) < 10000}
                      className="rounded-l-none"
                    >
                      Invest
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Minimum investment: 10,000 VND</p>
                </div>
              )}
              
              {campaign.status !== 'active' && (
                <div className="px-4 py-3 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded">
                  This campaign is currently {campaign.status}
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 border-t">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Chi tiết dự án</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Thông tin chung</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngành:</span>
                  <span className="font-medium">{campaign.industry || 'Khác'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loại hình:</span>
                  <span className="font-medium capitalize">
                    {campaign.type === 'equity' ? 'Cổ phần' : campaign.type === 'debt' ? 'Trái phiếu' : 'Tài trợ'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mức độ rủi ro:</span>
                  <span className={`font-medium ${
                    campaign.riskLevel === 'low' ? 'text-green-600' : 
                    campaign.riskLevel === 'medium' ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {campaign.riskLevel === 'low' ? 'Thấp' : 
                     campaign.riskLevel === 'medium' ? 'Trung bình' : 
                     'Cao'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa điểm:</span>
                  <span className="font-medium">{campaign.location || 'Việt Nam'}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Trạng thái gọi vốn</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số nhà đầu tư:</span>
                  <span className="font-medium">{campaign.investors || 0} người</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đánh giá:</span>
                  <span className="font-medium flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {campaign.rating?.toFixed(1) || '4.0'}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian còn lại:</span>
                  <span className="font-medium">
                    {campaign.endDate ? Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0} ngày
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đăng:</span>
                  <span className="font-medium">{new Date(campaign.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Đội ngũ</h3>
              <div className="space-y-3 text-sm max-h-40 overflow-y-auto">
                {campaign.teamMembers && campaign.teamMembers.length > 0 ? (
                  campaign.teamMembers.map((member, index) => (
                    <div key={index} className="border-b border-blue-100 pb-2 last:border-0">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-blue-700">{member.role}</div>
                      <div className="text-gray-600 text-xs">{member.bio}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Không có thông tin</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="prose prose-blue max-w-none">
            {campaign.description ? (
              <div dangerouslySetInnerHTML={{ __html: campaign.description }} />
            ) : campaign.summary}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPage;
