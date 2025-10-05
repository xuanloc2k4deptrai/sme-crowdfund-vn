import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { mockCampaigns } from 'src/mocks/campaignMock';
import { Campaign } from 'src/types';
import Button from 'src/components/ui/Button';
import Head from 'next/head';
import ImageWithFallback from 'src/components/ui/ImageWithFallback';

const CampaignPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'vision' | 'business' | 'team' | 'funding'>('vision');
  
  useEffect(() => {
    const loadCampaign = async () => {
      if (id) {
        try {
          // Mô phỏng việc tải dữ liệu từ API
          setTimeout(() => {
            const campaignId = parseInt(id as string);
            const foundCampaign = mockCampaigns.find(c => c.id === campaignId);
            if (foundCampaign) {
              setCampaign(foundCampaign);
            } else {
              setError('Không tìm thấy dự án');
            }
            setLoading(false);
          }, 500);
        } catch (err: any) {
          setError(err.message || 'Không tìm thấy dự án');
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
    router.push(`/payment?campaignId=${campaign?.id}&amount=${investmentAmount}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Không tìm thấy dự án'}
        </div>
        <button 
          onClick={() => router.push('/campaigns')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Quay lại danh sách dự án
        </button>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{campaign.title}</h1>
              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorScheme.light} ${colorScheme.text}`}>
                  {campaign.industry}
                </span>
                {campaign.status === 'active' ? (
                  <span className="inline-flex items-center ml-3 px-3 py-0.5 rounded-full text-sm font-medium bg-green-50 text-green-700">
                    Đang gọi vốn
                  </span>
                ) : (
                  <span className="inline-flex items-center ml-3 px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Đã kết thúc
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-6 relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={campaign.imageUrl ?? ''}
                alt={campaign.title}
                className="w-full h-full object-cover"
                width={800}
                height={450}
              />
            </div>
            
            <div className="mt-3">
              <p className="text-lg text-gray-500">{campaign.shortDescription}</p>
              <p className="text-sm text-blue-600 mt-2">Cập nhật: {new Date().toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900">Đầu tư vào dự án</h2>

              <div className="mt-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-1">
                  <span>Tiến độ gọi vốn</span>
                  <span>{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-b border-gray-200 py-4">
                  <div>
                    <p className="text-sm text-gray-500">Đã gọi được</p>
                    <p className="font-medium text-gray-900">{formatCurrency(campaign.raised)} VNĐ</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mục tiêu</p>
                    <p className="font-medium text-gray-900">{formatCurrency(campaign.target)} VNĐ</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Thời gian còn lại</p>
                    <p className="font-medium text-gray-900">{campaign.daysLeft ?? 0} ngày</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="investment" className="block text-sm font-medium text-gray-700">
                      Số tiền đầu tư (VNĐ)
                    </label>
                    <span className="text-sm text-blue-600 font-semibold">Tối thiểu: 1,000,000 VNĐ</span>
                  </div>
                  <input
                    type="number"
                    id="investment"
                    name="investment"
                    min="1000000"
                    step="1000000"
                    value={investmentAmount}
                    onChange={handleInvestmentChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                  
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[5000000, 10000000, 25000000, 50000000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setInvestmentAmount(amount)}
                        className={`py-2 px-4 border ${
                          investmentAmount === amount 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        } rounded-md text-sm font-medium focus:outline-none`}
                      >
                        {(amount / 1000000)}M
                      </button>
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    disabled={campaign.status !== 'active'}
                    onClick={handleInvest}
                    className="mt-6 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                  >
                    {campaign.status === 'active' ? '🚀 Đầu tư ngay' : 'Dự án đã kết thúc'}
                  </button>
                </div>

                <div className="mt-6">
                  <div className="flex items-center">
                    <ImageWithFallback
                      className="h-10 w-10 rounded-full"
                      src={campaign.companyLogo ?? ''}
                      alt={campaign.companyName ?? ''}
                      width={40}
                      height={40}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{campaign.companyName}</p>
                      <p className="text-sm text-gray-500">{campaign.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chi tiết dự án */}
        <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Chi tiết dự án</h2>
              
              {/* Tabs */}
              <div className="mt-6 border-b border-gray-200">
                <div className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('vision')}
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'vision' 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Tầm nhìn & Sứ mệnh
                  </button>
                  <button
                    onClick={() => setActiveTab('business')}
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'business' 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Mô hình kinh doanh
                  </button>
                  <button
                    onClick={() => setActiveTab('team')}
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'team' 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Đội ngũ
                  </button>
                  <button
                    onClick={() => setActiveTab('funding')}
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'funding' 
                        ? 'border-blue-500 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Kế hoạch sử dụng vốn
                  </button>
                </div>
              </div>
              
              <div className="mt-6 prose prose-blue text-gray-500">
                {activeTab === 'vision' && (
                  <div>
                    <p>{campaign.fullDescription}</p>
                    <p>{campaign.vision}</p>
                  </div>
                )}
                
                {activeTab === 'business' && (
                  <div>
                    <p>{campaign.businessModel}</p>
                  </div>
                )}
                
                {activeTab === 'team' && (
                  <div>
                    <p>{campaign.team}</p>
                  </div>
                )}
                
                {activeTab === 'funding' && (
                  <div>
                    <p>{campaign.fundingPlan}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 lg:mt-0">
            <h2 className="text-xl font-bold text-gray-900">Thông tin đầu tư</h2>

            <div className="mt-4">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Hình thức đầu tư</p>
                <p className="text-sm font-medium">{campaign.investmentType}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">ROI dự kiến</p>
                <p className="text-sm font-medium">{campaign.expectedROI ?? 0}%</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Kỳ hạn</p>
                <p className="text-sm font-medium">{campaign.term ?? 0} tháng</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Rủi ro</p>
                <p className="text-sm font-medium">{campaign.riskLevel ?? 'Trung bình'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPage;
