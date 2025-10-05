import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../src/contexts/AuthContext';
import { mockCampaigns } from 'src/mocks/campaignMock';

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter();
  const { campaignId } = router.query;
  const { user, isLoggedIn } = useAuth();
  
  const [campaign, setCampaign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionId, setTransactionId] = useState<string>('');
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    if (campaignId) {
      // Simulate loading campaign data
      const foundCampaign = mockCampaigns.find(c => c.id === Number(campaignId));
      if (foundCampaign) {
        setCampaign(foundCampaign);
        
        // Generate a mock transaction ID
        const mockTransactionId = 'TXN' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);
        setTransactionId(mockTransactionId);
      }
      
      setIsLoading(false);
    } else {
      // No campaign ID, redirect to home
      router.push('/');
    }
  }, [campaignId, isLoggedIn, router]);
  
  if (isLoading || !campaign) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xác nhận giao dịch...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Thanh toán thành công | SME CrowdFund VN</title>
      </Head>
      
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-green-100 p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Thanh toán thành công!</h2>
              <p className="mt-2 text-gray-600">
                Cảm ơn bạn đã đầu tư vào dự án của chúng tôi
              </p>
            </div>
            
            {/* Transaction details */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Chi tiết giao dịch</h3>
              
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-gray-500">Mã giao dịch:</div>
                <div className="text-gray-900 font-medium">{transactionId}</div>
                
                <div className="text-gray-500">Dự án:</div>
                <div className="text-gray-900 font-medium">{campaign.name}</div>
                
                <div className="text-gray-500">Ngày giao dịch:</div>
                <div className="text-gray-900 font-medium">{new Date().toLocaleDateString('vi-VN')}</div>
                
                <div className="text-gray-500">Phương thức thanh toán:</div>
                <div className="text-gray-900 font-medium">Chuyển khoản ngân hàng</div>
                
                <div className="text-gray-500">Trạng thái:</div>
                <div className="text-green-600 font-medium">Thành công</div>
                
                <div className="text-gray-500">Nhà đầu tư:</div>
                <div className="text-gray-900 font-medium">{user?.name}</div>
              </div>
            </div>
            
            {/* Investment details */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Chi tiết đầu tư</h3>
              
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-gray-500">Số tiền đầu tư:</div>
                <div className="text-gray-900 font-medium">5,000,000 VNĐ</div>
                
                <div className="text-gray-500">ROI dự kiến:</div>
                <div className="text-gray-900 font-medium">{campaign.expectedROI}%</div>
                
                <div className="text-gray-500">Kỳ hạn:</div>
                <div className="text-gray-900 font-medium">{campaign.term} tháng</div>
                
                <div className="text-gray-500">Ngày hoàn vốn dự kiến:</div>
                <div className="text-gray-900 font-medium">
                  {new Date(Date.now() + campaign.term * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
            
            {/* Next steps */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Các bước tiếp theo</h3>
              
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  • Bạn sẽ nhận được email xác nhận giao dịch trong vòng 24 giờ tới.
                </p>
                <p>
                  • Khoản đầu tư của bạn sẽ được hiển thị trong danh mục đầu tư cá nhân.
                </p>
                <p>
                  • Bạn sẽ nhận được cập nhật thường xuyên về tiến độ của dự án qua email.
                </p>
                <p>
                  • Mọi thắc mắc về khoản đầu tư, vui lòng liên hệ với chúng tôi qua email: support@smecrowdfundvn.com
                </p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/dashboard"
                  className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Xem danh mục đầu tư
                </Link>
                <Link 
                  href="/campaigns"
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Khám phá thêm dự án
                </Link>
              </div>
            </div>
          </div>
          
          {/* Download receipt */}
          <div className="mt-6 text-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Tải biên lai
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
