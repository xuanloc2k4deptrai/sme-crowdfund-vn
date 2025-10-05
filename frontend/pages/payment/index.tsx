import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../src/contexts/AuthContext';
import { mockCampaigns } from '../../src/mocks/campaignMock';
import Link from 'next/link';

const PaymentPage: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const { campaignId, amount } = router.query;
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Campaign data
  const [campaign, setCampaign] = useState<any>(null);
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/payment');
      return;
    } 
    
    if (user?.role !== 'investor') {
      router.push('/dashboard');
      return;
    }
    
    if (campaignId) {
      // Load campaign data
      const campaign = mockCampaigns.find(c => c.id === Number(campaignId));
      if (campaign) {
        setCampaign(campaign);
        
        // Set initial investment amount if provided in query
        if (amount) {
          setInvestmentAmount(String(amount));
        }
      }
      
      setIsLoading(false);
    } else {
      // No campaign ID provided, redirect to campaigns page
      router.push('/campaigns');
    }
  }, [isLoggedIn, user, router, campaignId, amount]);
  
  // Handle form input changes
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentAmount(e.target.value);
    
    // Clear error when changed
    if (errors.amount) {
      setErrors({
        ...errors,
        amount: ''
      });
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!investmentAmount) {
      newErrors.amount = 'Vui lòng nhập số tiền đầu tư';
    } else {
      const amount = parseFloat(investmentAmount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Số tiền đầu tư phải lớn hơn 0';
      } else if (amount < 1000000) {
        newErrors.amount = 'Số tiền đầu tư tối thiểu là 1,000,000 VNĐ';
      }
    }
    
    if (!acceptTerms) {
      newErrors.terms = 'Bạn phải đồng ý với điều khoản và điều kiện';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, you would submit to your API here
      // const response = await apiClient.post('/payments', {
      //   campaignId,
      //   amount: parseFloat(investmentAmount),
      //   paymentMethod
      // });
      
      setSubmitSuccess(true);
      
      // Redirect to success page after success
      setTimeout(() => {
        router.push('/payment/success?campaignId=' + campaignId);
      }, 2000);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrors({
        ...errors,
        submit: 'Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại sau.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading || !campaign) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Thanh toán đầu tư | SME CrowdFund VN</title>
      </Head>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">Thanh toán đầu tư</h1>
              <p className="mt-2 text-gray-600">
                Hoàn tất giao dịch đầu tư của bạn
              </p>
            </div>
            
            {submitSuccess ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Thanh toán đang được xử lý! Đang chuyển hướng đến trang xác nhận...
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Thông tin dự án */}
                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin dự án</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{campaign.shortDescription}</p>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Mục tiêu gọi vốn:</span>
                          <span className="text-sm font-medium">{campaign.fundingGoal?.toLocaleString()} VNĐ</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Đã gọi được:</span>
                          <span className="text-sm font-medium">{campaign.raisedAmount?.toLocaleString()} VNĐ</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">Thời gian còn lại:</span>
                          <span className="text-sm font-medium">{campaign.daysLeft} ngày</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-500">ROI dự kiến:</span>
                          <span className="text-sm font-medium">{campaign.expectedROI}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Kỳ hạn:</span>
                          <span className="text-sm font-medium">{campaign.term} tháng</span>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Link href={`/campaigns/${campaign.id}`} className="text-blue-600 text-sm hover:text-blue-800">
                          Xem chi tiết dự án
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Form thanh toán */}
                <div className="md:col-span-2">
                  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-10">
                    {errors.submit && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">
                              {errors.submit}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-6">
                      {/* Số tiền đầu tư */}
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                          Số tiền đầu tư (VNĐ) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={investmentAmount}
                          onChange={handleAmountChange}
                          min="1000000"
                          step="100000"
                          className={`w-full px-4 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.amount ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Nhập số tiền đầu tư (tối thiểu 1,000,000 VNĐ)"
                        />
                        {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
                        <p className="mt-1 text-xs text-gray-500">Số tiền đầu tư tối thiểu là 1,000,000 VNĐ</p>
                      </div>
                      
                      {/* Phương thức thanh toán */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Phương thức thanh toán</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              id="bank"
                              name="paymentMethod"
                              type="radio"
                              value="bank"
                              checked={paymentMethod === 'bank'}
                              onChange={() => setPaymentMethod('bank')}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="bank" className="ml-3 block text-sm text-gray-700">
                              Chuyển khoản ngân hàng
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="eWallet"
                              name="paymentMethod"
                              type="radio"
                              value="eWallet"
                              checked={paymentMethod === 'eWallet'}
                              onChange={() => setPaymentMethod('eWallet')}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="eWallet" className="ml-3 block text-sm text-gray-700">
                              Ví điện tử (MoMo, ZaloPay, VNPay)
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="card"
                              name="paymentMethod"
                              type="radio"
                              value="card"
                              checked={paymentMethod === 'card'}
                              onChange={() => setPaymentMethod('card')}
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="card" className="ml-3 block text-sm text-gray-700">
                              Thẻ tín dụng / Thẻ ghi nợ
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hiển thị thông tin thanh toán theo phương thức */}
                      <div className="bg-gray-50 rounded-md p-4">
                        {paymentMethod === 'bank' && (
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-800">Thông tin chuyển khoản</h4>
                            <p className="text-sm">Ngân hàng: <span className="font-medium">Vietcombank</span></p>
                            <p className="text-sm">Chủ tài khoản: <span className="font-medium">Công ty Cổ phần SME CrowdFund VN</span></p>
                            <p className="text-sm">Số tài khoản: <span className="font-medium">1023456789</span></p>
                            <p className="text-sm">Chi nhánh: <span className="font-medium">Hồ Chí Minh</span></p>
                            <p className="text-sm text-gray-500 italic">Nội dung chuyển khoản: <span className="font-medium">{user?.name} - Đầu tư {campaign.name}</span></p>
                          </div>
                        )}
                        
                        {paymentMethod === 'eWallet' && (
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-800">Chọn ví điện tử</h4>
                            <div className="grid grid-cols-3 gap-2">
                              <button
                                type="button"
                                className="border border-gray-300 rounded-md p-3 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <img src="/images/payments/momo.png" alt="MoMo" className="h-8 mx-auto" />
                              </button>
                              <button
                                type="button"
                                className="border border-gray-300 rounded-md p-3 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <img src="/images/payments/zalopay.png" alt="ZaloPay" className="h-8 mx-auto" />
                              </button>
                              <button
                                type="button"
                                className="border border-gray-300 rounded-md p-3 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <img src="/images/payments/vnpay.png" alt="VNPay" className="h-8 mx-auto" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 italic">Bạn sẽ được chuyển hướng đến trang thanh toán của ví điện tử</p>
                          </div>
                        )}
                        
                        {paymentMethod === 'card' && (
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-800">Thông tin thẻ</h4>
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm text-gray-700 mb-1">Số thẻ</label>
                              <input
                                type="text"
                                id="cardNumber"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="1234 5678 9012 3456"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expDate" className="block text-sm text-gray-700 mb-1">Ngày hết hạn</label>
                                <input
                                  type="text"
                                  id="expDate"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <label htmlFor="cvv" className="block text-sm text-gray-700 mb-1">CVV</label>
                                <input
                                  type="text"
                                  id="cvv"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="123"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="cardHolder" className="block text-sm text-gray-700 mb-1">Tên chủ thẻ</label>
                              <input
                                type="text"
                                id="cardHolder"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="NGUYEN VAN A"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Tổng kết thanh toán */}
                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Tóm tắt thanh toán</h3>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Số tiền đầu tư:</span>
                          <span className="font-medium">{investmentAmount ? parseInt(investmentAmount).toLocaleString() : 0} VNĐ</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Phí giao dịch:</span>
                          <span className="font-medium">0 VNĐ</span>
                        </div>
                        <div className="flex justify-between mb-2 text-lg font-bold">
                          <span>Tổng cộng:</span>
                          <span>{investmentAmount ? parseInt(investmentAmount).toLocaleString() : 0} VNĐ</span>
                        </div>
                      </div>
                      
                      {/* Điều khoản */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              name="terms"
                              type="checkbox"
                              checked={acceptTerms}
                              onChange={(e) => {
                                setAcceptTerms(e.target.checked);
                                if (errors.terms) {
                                  setErrors({ ...errors, terms: '' });
                                }
                              }}
                              className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${errors.terms ? 'border-red-500' : ''}`}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className={`font-medium ${errors.terms ? 'text-red-700' : 'text-gray-700'}`}>
                              Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">điều khoản và điều kiện</a> và hiểu rõ về rủi ro đầu tư
                            </label>
                            {errors.terms && <p className="mt-1 text-sm text-red-500">{errors.terms}</p>}
                          </div>
                        </div>
                      </div>
                      
                      {/* Nút submit */}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => router.back()}
                          className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 mr-4"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Đang xử lý...
                            </>
                          ) : 'Xác nhận thanh toán'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
