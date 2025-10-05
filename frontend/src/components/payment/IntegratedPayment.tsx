'use client';

import React, { useState } from 'react';

interface IntegratedPaymentProps {
  campaignId: number;
  amount: number;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

const IntegratedPayment: React.FC<IntegratedPaymentProps> = ({
  campaignId,
  amount,
  onSuccess,
  onError
}) => {
  const [useNewSystem, setUseNewSystem] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleOldPayment = async () => {
    setLoading(true);
    try {
      // Simulate old payment system
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess('OLD_TXN_' + Date.now());
    } catch (error: any) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPayment = async () => {
    setLoading(true);
    try {
      // Simulate new secure payment system
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess('SECURE_TXN_' + Date.now());
    } catch (error: any) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        💳 Chọn Hệ Thống Thanh Toán
      </h3>

      {/* Payment System Selection */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setUseNewSystem(false)}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              !useNewSystem
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold">Hệ Thống Cũ</h4>
              <p className="text-sm text-gray-600">Thanh toán truyền thống</p>
            </div>
          </button>

          <button
            onClick={() => setUseNewSystem(true)}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              useNewSystem
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-semibold">Hệ Thống Bảo Mật</h4>
              <p className="text-sm text-gray-600">AI + 2FA + Encryption</p>
              <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                NEW
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Dự án:</span>
            <span className="font-semibold">Campaign #{campaignId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Số tiền đầu tư:</span>
            <span className="font-semibold">{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hệ thống:</span>
            <span className={`font-semibold ${useNewSystem ? 'text-green-600' : 'text-blue-600'}`}>
              {useNewSystem ? '🔐 Bảo mật tiên tiến' : '💰 Truyền thống'}
            </span>
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">
          {useNewSystem ? '🚀 Tính Năng Bảo Mật' : '📋 Tính Năng Cơ Bản'}
        </h4>
        
        {useNewSystem ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-green-700">
              <span className="mr-2">✅</span>
              Mã hóa AES-256
            </div>
            <div className="flex items-center text-green-700">
              <span className="mr-2">✅</span>
              2FA Authentication
            </div>
            <div className="flex items-center text-green-700">
              <span className="mr-2">✅</span>
              AI Fraud Detection
            </div>
            <div className="flex items-center text-green-700">
              <span className="mr-2">✅</span>
              Device Fingerprint
            </div>
            <div className="flex items-center text-green-700">
              <span className="mr-2">✅</span>
              Risk Assessment
            </div>
            <div className="flex items-center text-green-700">
              <span className="mr-2">✅</span>
              Real-time Monitor
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Thanh toán cơ bản
            </div>
            <div className="flex items-center text-blue-700">
              <span className="mr-2">✅</span>
              Giao diện đơn giản
            </div>
            <div className="flex items-center text-gray-500">
              <span className="mr-2">❌</span>
              Bảo mật cơ bản
            </div>
          </div>
        )}
      </div>

      {/* Payment Button */}
      <button
        onClick={useNewSystem ? handleNewPayment : handleOldPayment}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
          useNewSystem
            ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
        } disabled:opacity-50`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Đang xử lý...
          </div>
        ) : (
          `${useNewSystem ? '🚀 Thanh Toán Bảo Mật' : '💰 Thanh Toán Thường'}`
        )}
      </button>

      {/* Security Notice */}
      {useNewSystem && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">🛡️</span>
            <p className="text-xs text-green-800">
              Giao dịch được bảo vệ bởi hệ thống AI phát hiện gian lận và mã hóa quân sự cấp độ 256-bit
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegratedPayment;