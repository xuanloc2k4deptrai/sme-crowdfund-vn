import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { mockCampaigns } from '../../src/mocks/campaignMock';
import { Campaign } from '../../src/types';
import Button from '../../src/components/ui/Button';
import Head from 'next/head';
import { AuthContext } from '../../src/contexts/AuthContext';
import ImageWithFallback from '../../src/components/ui/ImageWithFallback';
import PaymentModal from '../../src/components/payment/PaymentModal';

const CampaignPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useContext(AuthContext);
  const { user, isLoggedIn } = auth || { user: null, isLoggedIn: false };
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'investors' | 'comments'>('overview');
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  
  // Hàm xác định màu sắc cho thanh gọi vốn dựa trên tiến độ
  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500'; // Đã đạt mục tiêu
    if (percentage >= 75) return 'bg-blue-500';   // Gần đạt mục tiêu
    if (percentage >= 50) return 'bg-blue-600';   // Đã đạt nửa đường
    if (percentage >= 25) return 'bg-amber-500';  // Đang tiến triển
    return 'bg-red-500';                         // Mới bắt đầu
  };

  // Payment handlers
  const handlePaymentSuccess = (transactionId: string) => {
    setPaymentSuccess(true);
    setPaymentMessage(`Đầu tư thành công! Mã giao dịch: ${transactionId}`);
    
    // Update campaign data (in real app, this would refetch from API)
    if (campaign) {
      setCampaign({
        ...campaign,
        raised: campaign.raised + investmentAmount,
        investors: (campaign.investors || 0) + 1
      });
    }
    
    // Show success message for 5 seconds
    setTimeout(() => {
      setPaymentSuccess(false);
      setPaymentMessage('');
    }, 5000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentMessage(error);
    // Show error message for 5 seconds
    setTimeout(() => {
      setPaymentMessage('');
    }, 5000);
  };
  
  // Tính trạng thái thời gian còn lại
  const calculateTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const timeDiff = end.getTime() - now.getTime();
    
    if (timeDiff <= 0) return { days: 0, hours: 0, minutes: 0 };
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

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
          }, 1000);
        } catch (err: any) {
          setError(err.message || 'Có lỗi xảy ra khi tải dự án');
          setLoading(false);
        }
      }
    };
    
    loadCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(amount);
  };

  const progressPercentage = (campaign.raised / campaign.target) * 100;
  const timeRemaining = calculateTimeRemaining(
    typeof campaign.endDate === 'string' ? campaign.endDate : campaign.endDate?.toISOString() || '2024-12-31'
  );

  return (
    <>
      <Head>
        <title>{campaign.title || campaign.name} | SME CrowdFund VN</title>
        <meta name="description" content={campaign.summary || campaign.shortDescription} />
      </Head>

      {/* Payment Success/Error Messages */}
      {paymentMessage && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${
          paymentSuccess ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {paymentSuccess ? '✅' : '❌'}
            </span>
            <span>{paymentMessage}</span>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {campaign && user && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          campaign={campaign}
          user={{
            id: String(user.id || '1'),
            email: user.email || '',
            name: user.name || ''
          }}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Trang chủ
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/campaigns" className="text-gray-500 hover:text-gray-700">
                  Dự án
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-700 truncate max-w-xs">
                {campaign.title || campaign.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.industry && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {campaign.industry}
                  </span>
                )}
                {campaign.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {campaign.category}
                  </span>
                )}
                {campaign.location && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {campaign.location}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {campaign.title || campaign.name}
              </h1>

              <div className="relative aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden" style={{ height: '450px' }}>
                <ImageWithFallback
                  src={campaign.imageUrl || campaign.coverImage || '/images/business-meeting.jpg'}
                  alt={campaign.title || campaign.name || 'Campaign image'}
                  className="w-full h-full object-cover"
                  width={800}
                  height={450}
                />
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tiến độ gọi vốn</span>
                  <span className="text-gray-900 font-medium">{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(progressPercentage)}`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Đã gọi được: <span className="font-medium text-green-600">{formatCurrency(campaign.raised)}</span></span>
                  <span>Mục tiêu: <span className="font-medium text-blue-600">{formatCurrency(campaign.target)}</span></span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`${
                      activeTab === 'overview'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Tổng quan
                  </button>
                  <button
                    onClick={() => setActiveTab('updates')}
                    className={`${
                      activeTab === 'updates'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => setActiveTab('investors')}
                    className={`${
                      activeTab === 'investors'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Nhà đầu tư
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`${
                      activeTab === 'comments'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Bình luận
                  </button>
                </nav>
              </div>

              <div className="prose max-w-none">
                {activeTab === 'overview' && (
                  <div>
                    <h2>Về dự án</h2>
                    <div dangerouslySetInnerHTML={{ __html: campaign.description || campaign.fullDescription || '' }} />
                    
                    {campaign.businessModel && (
                      <>
                        <h2 className="mt-6">Mô hình kinh doanh</h2>
                        <p>{campaign.businessModel}</p>
                      </>
                    )}
                    
                    {campaign.team && (
                      <>
                        <h2 className="mt-6">Đội ngũ</h2>
                        <p>{campaign.team}</p>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div>
                    <h2>Cập nhật dự án</h2>
                    <p>Chưa có cập nhật nào từ dự án này.</p>
                  </div>
                )}

                {activeTab === 'investors' && (
                  <div>
                    <h2>Danh sách nhà đầu tư</h2>
                    <p>Có {campaign.investors || 0} nhà đầu tư đã tham gia dự án này.</p>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div>
                    <h2>Bình luận</h2>
                    <p>Chưa có bình luận nào cho dự án này.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Investment Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formatCurrency(campaign.raised)}
                  </div>
                  <div className="text-sm text-gray-500">
                    đã gọi được từ mục tiêu {formatCurrency(campaign.target)}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số nhà đầu tư:</span>
                    <span className="font-medium">{campaign.investors || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian còn lại:</span>
                    <span className="font-medium">{timeRemaining.days} ngày</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (!isLoggedIn) {
                      router.push('/login');
                      return;
                    }
                    setIsPaymentModalOpen(true);
                  }}
                  disabled={campaign.status === 'closed' || campaign.status === 'cancelled'}
                  className={`w-full justify-center ${
                    campaign.status === 'active' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {!isLoggedIn 
                    ? 'Đăng nhập để đầu tư'
                    : campaign.status === 'active' 
                    ? '🔒 Đầu tư bảo mật' 
                    : campaign.status === 'funded'
                    ? 'Đã đạt mục tiêu'
                    : 'Dự án đã đóng'}
                </Button>

                {campaign.status === 'active' && (
                  <>
                    <div className="mt-4 text-xs text-center text-gray-500">
                      Số tiền đầu tư tối thiểu là 100,000 VNĐ
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center text-sm text-green-700">
                        <span className="mr-2">🔒</span>
                        <div>
                          <div className="font-medium">Thanh toán bảo mật</div>
                          <div className="text-xs">Mã hóa AES-256 • 2FA • AI Fraud Detection</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Cập nhật gần đây */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cập nhật: {new Date().toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPage;
