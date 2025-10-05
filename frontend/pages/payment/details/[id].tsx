import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../../src/contexts/AuthContext';

const PaymentDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isLoggedIn } = useAuth();
  
  const [payment, setPayment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    
    if (id) {
      // Mock payment data based on ID
      // In a real app, you would fetch this from your API
      const mockPayment = {
        id: id as string,
        campaignId: 1,
        campaignName: "TechLink AI - Nền tảng hỗ trợ khách hàng",
        amount: 5000000,
        date: "2023-11-15T14:30:00",
        status: "completed",
        paymentMethod: "bank",
        bankName: "Vietcombank",
        bankAccount: "1023456789",
        bankOwner: "Công ty Cổ phần SME CrowdFund VN",
        bankBranch: "Hồ Chí Minh",
        expectedReturn: 5500000,
        expectedReturnDate: "2024-05-15",
        transactionReference: "VCB123456789",
        investorName: user?.name || "Nhà đầu tư",
        investorEmail: user?.email || "investor@example.com",
        note: "Đầu tư vào dự án TechLink AI"
      };
      
      setPayment(mockPayment);
      setIsLoading(false);
    }
  }, [id, isLoggedIn, router, user]);
  
  if (isLoading || !payment) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin giao dịch...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Chi tiết giao dịch | SME CrowdFund VN</title>
      </Head>
      
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-6">
            <button 
              onClick={() => router.back()}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Chi tiết giao dịch</h1>
                <div>
                  {payment.status === 'completed' && (
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Đã hoàn thành
                    </span>
                  )}
                  {payment.status === 'processing' && (
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Đang xử lý
                    </span>
                  )}
                  {payment.status === 'failed' && (
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Thất bại
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Transaction info */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin giao dịch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <div className="text-gray-500">Mã giao dịch</div>
                    <div className="mt-1 text-gray-900 font-medium">{payment.id}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Ngày giao dịch</div>
                    <div className="mt-1 text-gray-900">
                      {new Date(payment.date).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Phương thức thanh toán</div>
                    <div className="mt-1 text-gray-900">
                      {payment.paymentMethod === 'bank' && 'Chuyển khoản ngân hàng'}
                      {payment.paymentMethod === 'eWallet' && 'Ví điện tử'}
                      {payment.paymentMethod === 'card' && 'Thẻ tín dụng/ghi nợ'}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Số tiền</div>
                    <div className="mt-1 text-gray-900 font-medium">{payment.amount.toLocaleString()} VNĐ</div>
                  </div>
                  {payment.transactionReference && (
                    <div>
                      <div className="text-gray-500">Mã tham chiếu</div>
                      <div className="mt-1 text-gray-900">{payment.transactionReference}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin dự án</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-gray-500">Tên dự án</div>
                    <div className="mt-1">
                      <Link href={`/campaigns/${payment.campaignId}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                        {payment.campaignName}
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <div className="text-gray-500">Lợi nhuận dự kiến</div>
                      <div className="mt-1 text-gray-900">{payment.expectedReturn.toLocaleString()} VNĐ</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Ngày hoàn vốn dự kiến</div>
                      <div className="mt-1 text-gray-900">
                        {new Date(payment.expectedReturnDate).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {payment.paymentMethod === 'bank' && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Chi tiết ngân hàng</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div>
                      <div className="text-gray-500">Ngân hàng</div>
                      <div className="mt-1 text-gray-900">{payment.bankName}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Số tài khoản</div>
                      <div className="mt-1 text-gray-900">{payment.bankAccount}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Chủ tài khoản</div>
                      <div className="mt-1 text-gray-900">{payment.bankOwner}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Chi nhánh</div>
                      <div className="mt-1 text-gray-900">{payment.bankBranch}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Thông tin người đầu tư</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <div className="text-gray-500">Họ tên</div>
                    <div className="mt-1 text-gray-900">{payment.investorName}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Email</div>
                    <div className="mt-1 text-gray-900">{payment.investorEmail}</div>
                  </div>
                </div>
              </div>
              
              {payment.note && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Ghi chú</h2>
                  <div className="text-sm text-gray-900">{payment.note}</div>
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Tải biên lai
                </button>
                <button
                  type="button"
                  onClick={() => router.push(`/campaigns/${payment.campaignId}`)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Xem chi tiết dự án
                </button>
              </div>
            </div>
          </div>
          
          {/* Support */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Nếu bạn có bất kỳ câu hỏi nào về giao dịch này, vui lòng liên hệ với chúng tôi qua</p>
            <p className="mt-1">
              <a href="mailto:support@smecrowdfundvn.com" className="text-blue-600 hover:text-blue-800">support@smecrowdfundvn.com</a> hoặc hotline <a href="tel:+84901234567" className="text-blue-600 hover:text-blue-800">090 123 4567</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailsPage;
