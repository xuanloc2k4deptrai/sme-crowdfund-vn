'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PaymentProvider, securePaymentService } from '../../services/securePaymentService';

interface SecurePaymentProps {
  campaignId: number;
  amount: number;
  currency?: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
  onPaymentCancel: () => void;
}

interface PaymentStep {
  id: 'method' | 'details' | 'security' | 'processing' | 'completed';
  title: string;
  description: string;
}

const SecurePaymentModal: React.FC<SecurePaymentProps> = ({
  campaignId,
  amount,
  currency = 'VND',
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel
}) => {
  const [currentStep, setCurrentStep] = useState<PaymentStep['id']>('method');
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [availableProviders, setAvailableProviders] = useState<PaymentProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [fees, setFees] = useState({ platform: 0, gateway: 0, total: 0 });

  const steps: PaymentStep[] = [
    {
      id: 'method',
      title: 'Chọn phương thức',
      description: 'Chọn phương thức thanh toán phù hợp'
    },
    {
      id: 'details',
      title: 'Xác nhận chi tiết',
      description: 'Kiểm tra thông tin giao dịch'
    },
    {
      id: 'security',
      title: 'Xác thực bảo mật',
      description: 'Xác thực danh tính và bảo mật'
    },
    {
      id: 'processing',
      title: 'Đang xử lý',
      description: 'Đang thực hiện giao dịch'
    },
    {
      id: 'completed',
      title: 'Hoàn thành',
      description: 'Giao dịch đã được xử lý'
    }
  ];

  // Load available payment providers
  useEffect(() => {
    const providers = securePaymentService.getAvailableProviders(amount, currency);
    setAvailableProviders(providers);
  }, [amount, currency]);

  // Calculate fees when provider changes
  useEffect(() => {
    if (selectedProvider) {
      const calculatedFees = securePaymentService.calculateFees(amount, selectedProvider.id);
      setFees(calculatedFees);
    }
  }, [selectedProvider, amount]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }, []);

  const handleProviderSelect = useCallback((provider: PaymentProvider) => {
    setSelectedProvider(provider);
    setCurrentStep('details');
  }, []);

  const handleConfirmPayment = useCallback(async () => {
    if (!selectedProvider) return;

    setLoading(true);
    setCurrentStep('security');

    try {
      const result = await securePaymentService.initiateSecurePayment({
        campaignId,
        amount,
        currency,
        paymentProviderId: selectedProvider.id,
        investorId: 1 // This should come from auth context
      });

      setTransactionId(result.transactionId);
      setPaymentUrl(result.paymentUrl || '');
      setQrCode(result.qrCode || '');
      setVerificationRequired(result.securityVerification.verificationRequired);
      setRiskScore(result.securityVerification.riskScore);

      if (result.securityVerification.verificationRequired) {
        // Stay on security step for verification
        return;
      }

      setCurrentStep('processing');
      
      // Redirect to payment URL or show QR code
      if (result.paymentUrl) {
        window.open(result.paymentUrl, '_blank');
      }

    } catch (error: any) {
      onPaymentError(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedProvider, campaignId, amount, currency, onPaymentError]);

  const handleVerification = useCallback(async () => {
    if (!verificationCode || !transactionId) return;

    setLoading(true);
    try {
      const result = await securePaymentService.verifyPayment(
        transactionId,
        verificationCode,
        'email' // This should be determined by the verification method
      );

      if (result.success) {
        setCurrentStep('processing');
        
        // Redirect to payment URL after verification
        if (paymentUrl) {
          window.open(paymentUrl, '_blank');
        }
      } else {
        onPaymentError(result.message);
      }
    } catch (error: any) {
      onPaymentError(error.message);
    } finally {
      setLoading(false);
    }
  }, [verificationCode, transactionId, paymentUrl, onPaymentError]);

  const getProviderIcon = (provider: PaymentProvider) => {
    const iconMap: Record<string, string> = {
      vnpay: '💳',
      momo: '🟣',
      zalopay: '🔵',
      vietqr: '📱',
      bank_transfer: '🏦',
      visa_mastercard: '💳',
      crypto_btc: '₿',
      crypto_eth: '⟠'
    };
    return iconMap[provider.id] || '💰';
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-600';
    if (score <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
            currentStep === step.id
              ? 'bg-blue-600 text-white'
              : steps.findIndex(s => s.id === currentStep) > index
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {steps.findIndex(s => s.id === currentStep) > index ? '✓' : index + 1}
          </div>
          
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-2 ${
              steps.findIndex(s => s.id === currentStep) > index
                ? 'bg-green-600'
                : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderMethodSelection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center text-gray-800 mb-6">
        Chọn phương thức thanh toán
      </h3>
      
      <div className="grid gap-4">
        {availableProviders.map((provider) => (
          <div
            key={provider.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedProvider?.id === provider.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleProviderSelect(provider)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getProviderIcon(provider)}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{provider.name}</h4>
                  <p className="text-sm text-gray-600">{provider.processingTime}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSecurityLevelColor(provider.securityLevel)}`}>
                  Bảo mật {provider.securityLevel}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Phí: {provider.fees.percentage}%
                  {provider.fees.fixed > 0 && ` + ${formatCurrency(provider.fees.fixed)}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center text-gray-800">
        Xác nhận thông tin thanh toán
      </h3>

      {selectedProvider && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">{getProviderIcon(selectedProvider)}</span>
            <div>
              <h4 className="font-semibold">{selectedProvider.name}</h4>
              <p className="text-sm text-gray-600">{selectedProvider.processingTime}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Số tiền đầu tư:</span>
              <span className="font-semibold">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phí nền tảng:</span>
              <span>{formatCurrency(fees.platform)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phí thanh toán:</span>
              <span>{formatCurrency(fees.gateway)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Tổng thanh toán:</span>
              <span>{formatCurrency(amount + fees.total)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentStep('method')}
          className="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Quay lại
        </button>
        <button
          onClick={handleConfirmPayment}
          disabled={loading}
          className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
        </button>
      </div>
    </div>
  );

  const renderSecurityVerification = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center text-gray-800">
        Xác thực bảo mật
      </h3>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-yellow-600">⚠️</span>
          <span className="font-medium text-yellow-800">Xác thực bảo mật cần thiết</span>
        </div>
        <p className="text-sm text-yellow-700">
          Giao dịch của bạn có điểm rủi ro {' '}
          <span className={`font-semibold ${getRiskScoreColor(riskScore)}`}>
            {riskScore}/100
          </span>
          {' '} và cần xác thực bổ sung để đảm bảo bảo mật.
        </p>
      </div>

      {verificationRequired ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã xác thực (đã gửi về email của bạn)
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập mã xác thực 6 số"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleVerification}
            disabled={loading || verificationCode.length !== 6}
            className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Xác thực và tiếp tục'}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <span className="text-green-600 text-4xl">✓</span>
          <p className="text-green-800 font-medium mt-2">Xác thực thành công!</p>
        </div>
      )}
    </div>
  );

  const renderProcessing = () => (
    <div className="text-center space-y-6">
      <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
      
      <h3 className="text-xl font-semibold text-gray-800">
        Đang xử lý thanh toán
      </h3>
      
      <p className="text-gray-600">
        Vui lòng hoàn tất thanh toán trong cửa sổ mới hoặc quét mã QR bên dưới
      </p>

      {qrCode && (
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
          <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Quét mã QR để thanh toán
          </p>
        </div>
      )}

      <div className="text-sm text-gray-500">
        Mã giao dịch: {transactionId}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'method':
        return renderMethodSelection();
      case 'details':
        return renderPaymentDetails();
      case 'security':
        return renderSecurityVerification();
      case 'processing':
        return renderProcessing();
      default:
        return renderMethodSelection();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Thanh toán bảo mật</h2>
          <button
            onClick={onPaymentCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {renderStepIndicator()}
        
        <div className="min-h-[400px]">
          {renderCurrentStep()}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Mã hóa SSL 256-bit
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              PCI DSS Compliant
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              2FA Authentication
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurePaymentModal;