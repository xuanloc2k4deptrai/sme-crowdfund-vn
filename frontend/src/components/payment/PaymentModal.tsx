import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { securePaymentClient, PaymentRequest, PaymentResponse } from '../../services/securePaymentClient';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: number;
    title: string;
    name?: string;
    target: number;
    raised: number;
  };
  user: {
    id: string;
    email: string;
    name: string;
  };
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  campaign,
  user,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [amount, setAmount] = useState<number>(1000000); // 1 triệu VND mặc định
  const [paymentMethod, setPaymentMethod] = useState<'vnpay' | 'momo' | 'zalopay' | 'vietqr' | 'stripe'>('vnpay');
  const [loading, setLoading] = useState(false);
  const [providerStatus, setProviderStatus] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState<'input' | 'processing' | 'redirect'>('input');
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  const minInvestment = 100000; // 100k VND
  const maxInvestment = campaign.target - campaign.raised;

  useEffect(() => {
    if (isOpen) {
      // DEMO MODE: Hardcode all providers as available
      // TODO: Uncomment below when backend is deployed
      setProviderStatus({
        vnpay: true,
        momo: true,
        zalopay: true,
        vietqr: true,
        stripe: true
      });

      // Listen for payment success messages from popup
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'PAYMENT_SUCCESS') {
          onPaymentSuccess(event.data.transactionId);
          onClose();
        }
      };

      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
      };
      
      /* PRODUCTION CODE (uncomment when backend ready):
      const fetchProviderStatus = async () => {
        try {
          const status = await securePaymentClient.getProviderStatus();
          setProviderStatus(status);
        } catch (error) {
          console.error('Failed to fetch provider status:', error);
          setProviderStatus({
            vnpay: true,
            momo: true,
            zalopay: true,
            vietqr: true,
            stripe: true
          });
        }
      };
      fetchProviderStatus();
      */
    }
  }, [isOpen]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const paymentMethods = [
    { 
      id: 'vnpay', 
      name: 'VNPay', 
      icon: '🏦', 
      description: 'Thanh toán qua ngân hàng nội địa',
      available: providerStatus.vnpay !== false
    },
    { 
      id: 'momo', 
      name: 'MoMo', 
      icon: '📱', 
      description: 'Ví điện tử MoMo',
      available: providerStatus.momo !== false
    },
    { 
      id: 'zalopay', 
      name: 'ZaloPay', 
      icon: '💳', 
      description: 'Ví điện tử ZaloPay',
      available: providerStatus.zalopay !== false
    },
    { 
      id: 'vietqr', 
      name: 'VietQR', 
      icon: '📲', 
      description: 'Quét mã QR thanh toán',
      available: providerStatus.vietqr !== false
    },
    { 
      id: 'stripe', 
      name: 'Stripe', 
      icon: '💎', 
      description: 'Thẻ tín dụng quốc tế',
      available: providerStatus.stripe !== false
    }
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ''));
    setAmount(isNaN(value) ? 0 : value);
  };

  const handlePayment = async () => {
    if (amount < minInvestment) {
      onPaymentError(`Số tiền đầu tư tối thiểu là ${formatCurrency(minInvestment)}`);
      return;
    }

    if (amount > maxInvestment) {
      onPaymentError(`Số tiền đầu tư không được vượt quá ${formatCurrency(maxInvestment)}`);
      return;
    }

    setLoading(true);
    setStep('processing');

    try {
      // DEMO MODE: Redirect to internal demo payment page
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockTransactionId = 'SECURE_TXN_' + Date.now();
      const mockResponse: PaymentResponse = {
        success: true,
        transactionId: mockTransactionId,
        message: '🔒 Chuyển hướng đến cổng thanh toán',
        paymentUrl: `/payment/demo?provider=${paymentMethod}&txn=${mockTransactionId}&amount=${amount}`,
      };

      setPaymentResponse(mockResponse);
      setStep('redirect');

      // Open demo payment page
      const paymentWindow = window.open(mockResponse.paymentUrl, '_blank', 'width=800,height=900,scrollbars=yes,resizable=yes');
      
      // Optional: Handle case where popup is blocked or closed manually
      const checkClosed = setInterval(() => {
        if (paymentWindow?.closed) {
          clearInterval(checkClosed);
          setStep('input'); // Reset to input step if popup is closed without success
        }
      }, 1000);
      
      /* 
      ============================================
      PRODUCTION CODE (Uncomment when backend ready):
      ============================================
      
      const paymentRequest: PaymentRequest = {
        campaignId: campaign.id,
        amount,
        paymentMethod,
        currency: 'VND',
        userInfo: {
          userId: String(user.id),
          email: user.email || '',
          name: user.name || user.email || 'Anonymous'
        }
      };

      const response = await securePaymentClient.initiatePayment(paymentRequest);
      setPaymentResponse(response);

      if (response.paymentUrl && paymentMethod !== 'vietqr') {
        setStep('redirect');
        window.open(response.paymentUrl, '_blank');
        monitorPaymentStatus(response.transactionId);
      } else {
        onPaymentSuccess(response.transactionId);
        onClose();
      }
      */
      
    } catch (error: any) {
      console.error('Payment error:', error);
      onPaymentError(error.message || 'Có lỗi xảy ra khi xử lý thanh toán');
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  // NOTE: monitorPaymentStatus() function will be used when backend is ready
  // Uncomment this when switching from demo mode to production

  const resetModal = () => {
    setStep('input');
    setAmount(1000000);
    setPaymentMethod('vnpay');
    setPaymentResponse(null);
    setLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Đầu tư vào dự án">
      <div className="space-y-6">
        {step === 'input' && (
          <>
            {/* Campaign Info */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900">{campaign.title || campaign.name}</h3>
              <div className="text-sm text-blue-700 mt-2">
                <div>Mục tiêu: {formatCurrency(campaign.target)}</div>
                <div>Đã gọi được: {formatCurrency(campaign.raised)}</div>
                <div>Còn lại: {formatCurrency(maxInvestment)}</div>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tiền đầu tư
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount.toLocaleString('vi-VN')}
                  onChange={handleAmountChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập số tiền..."
                />
                <span className="absolute right-3 top-3 text-gray-500">VND</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tối thiểu: {formatCurrency(minInvestment)}
              </p>
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Phương thức thanh toán
              </label>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    disabled={!method.available}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : method.available
                        ? 'border-gray-300 hover:border-gray-400'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                      {!method.available && (
                        <span className="text-xs text-red-500">Không khả dụng</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">🔒</span>
                <div className="text-sm text-green-700">
                  <div className="font-medium">Thanh toán được bảo mật với:</div>
                  <ul className="mt-1 space-y-1">
                    <li>• Mã hóa AES-256</li>
                    <li>• Xác thực hai yếu tố (2FA)</li>
                    <li>• Giám sát gian lận AI</li>
                    <li>• Nhật ký bảo mật đầy đủ</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                onClick={handlePayment}
                disabled={loading || amount < minInvestment || amount > maxInvestment}
                className="flex-1"
              >
                {loading ? 'Đang xử lý...' : `Đầu tư ${formatCurrency(amount)}`}
              </Button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Đang xử lý thanh toán</h3>
            <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
          </div>
        )}

        {step === 'redirect' && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Đã chuyển hướng đến cổng thanh toán</h3>
            <p className="text-gray-600 mb-4">
              Cửa sổ thanh toán demo đã được mở. Hoàn tất quy trình thanh toán để tiếp tục.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 mb-2">
                <strong>Thông tin giao dịch:</strong>
              </p>
              <div className="text-xs text-blue-600 space-y-1">
                <p>Mã GD: {paymentResponse?.transactionId}</p>
                <p>Phương thức: {paymentMethod.toUpperCase()}</p>
                <p>Số tiền: {amount.toLocaleString('vi-VN')} VND</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Đóng cửa sổ này
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PaymentModal;