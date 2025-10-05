import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const PaymentDemoPage: React.FC = () => {
  const router = useRouter();
  const { provider, txn, amount } = router.query;
  const [step, setStep] = useState<'loading' | 'form' | 'processing' | 'success' | 'error'>('loading');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Simulate loading payment gateway
    const timer = setTimeout(() => {
      setStep('form');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (step === 'success') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Send message to parent window if opened in popup
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'PAYMENT_SUCCESS', 
                transactionId: txn,
                amount: amount 
              }, '*');
            }
            window.close();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, txn, amount]);

  const handlePayment = () => {
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  const getProviderInfo = (provider: string) => {
    const providers: Record<string, {
      name: string;
      logo: string;
      color: string;
      description: string;
    }> = {
      vnpay: {
        name: 'VNPay',
        logo: '🏦',
        color: 'from-blue-600 to-blue-700',
        description: 'Cổng thanh toán VNPay'
      },
      momo: {
        name: 'MoMo',
        logo: '💳',
        color: 'from-pink-600 to-pink-700',
        description: 'Ví điện tử MoMo'
      },
      zalopay: {
        name: 'ZaloPay',
        logo: '⚡',
        color: 'from-blue-500 to-blue-600',
        description: 'Ví điện tử ZaloPay'
      },
      vietqr: {
        name: 'VietQR',
        logo: '📱',
        color: 'from-green-600 to-green-700',
        description: 'Thanh toán QR Code'
      },
      stripe: {
        name: 'Stripe',
        logo: '💎',
        color: 'from-purple-600 to-purple-700',
        description: 'Stripe Payment Gateway'
      }
    };
    
    return providers[provider] || providers.vnpay;
  };

  const providerInfo = getProviderInfo(provider as string);
  const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(Number(amount) || 0);

  return (
    <>
      <Head>
        <title>{providerInfo.name} - Cổng thanh toán demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${providerInfo.color} shadow-lg`}>
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{providerInfo.logo}</div>
              <div>
                <h1 className="text-2xl font-bold text-white">{providerInfo.name}</h1>
                <p className="text-blue-100">{providerInfo.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Loading */}
          {step === 'loading' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Đang khởi tạo thanh toán</h2>
              <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
            </div>
          )}

          {/* Payment Form */}
          {step === 'form' && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Transaction Info */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Mã giao dịch</p>
                    <p className="font-mono text-sm text-gray-900">{txn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Số tiền</p>
                    <p className="text-2xl font-bold text-blue-600">{formattedAmount}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Xác nhận thanh toán
                </h2>

                {/* Mock payment form based on provider */}
                {provider === 'vnpay' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số thẻ
                      </label>
                      <input
                        type="text"
                        placeholder="xxxx xxxx xxxx xxxx"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="9704 0000 0000 0018"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tháng/Năm
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue="03/07"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {provider === 'momo' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại MoMo
                      </label>
                      <input
                        type="tel"
                        placeholder="0987654321"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        defaultValue="0987654321"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã PIN MoMo
                      </label>
                      <input
                        type="password"
                        placeholder="••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        defaultValue="123456"
                      />
                    </div>
                  </div>
                )}

                {provider === 'vietqr' && (
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-xl p-8 mb-4">
                      <div className="text-8xl mb-4">📱</div>
                      <p className="text-gray-600">Quét mã QR bằng ứng dụng ngân hàng</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Mở ứng dụng ngân hàng và quét mã QR để thanh toán
                      </p>
                    </div>
                  </div>
                )}

                {(provider === 'zalopay' || provider === 'stripe') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="demo@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="demo123"
                      />
                    </div>
                  </div>
                )}

                {/* Security notice */}
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-green-600 text-xl">🔒</div>
                    <div>
                      <h4 className="font-medium text-green-800">Bảo mật SSL</h4>
                      <p className="text-sm text-green-700">
                        Giao dịch của bạn được mã hóa và bảo vệ bởi công nghệ bảo mật tiên tiến
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => window.close()}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handlePayment}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r ${providerInfo.color} text-white rounded-lg hover:opacity-90 transition-opacity font-medium`}
                  >
                    Xác nhận thanh toán
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Processing */}
          {step === 'processing' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">{providerInfo.logo}</div>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Đang xử lý thanh toán</h2>
              <p className="text-gray-600 mb-4">
                Đang kết nối với {providerInfo.name}...
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Vui lòng không đóng cửa sổ này
                </p>
              </div>
            </div>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Thanh toán thành công!</h2>
              <p className="text-gray-600 mb-6">
                Giao dịch <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{txn}</span> đã được xử lý thành công
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Số tiền đã thanh toán:</span>
                  <span className="font-bold text-green-800">{formattedAmount}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Cửa sổ này sẽ tự động đóng sau {countdown} giây
              </p>

              <button
                onClick={() => window.close()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Đóng cửa sổ
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-gray-500 text-sm">
          <p>🔒 Demo Payment Gateway - Chỉ dành cho mục đích demo</p>
          <p className="mt-1">Powered by SME Crowdfund Platform</p>
        </div>
      </div>
    </>
  );
};

export default PaymentDemoPage;