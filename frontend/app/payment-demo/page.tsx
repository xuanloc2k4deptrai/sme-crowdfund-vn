'use client'

import { useState } from 'react'

export default function PaymentDemoPage() {
  const [step, setStep] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState('')

  const providers = [
    { id: 'vnpay', name: 'VNPay', icon: '🏦' },
    { id: 'momo', name: 'MoMo', icon: '📱' },
    { id: 'zalopay', name: 'ZaloPay', icon: '💳' },
    { id: 'vietqr', name: 'VietQR', icon: '📲' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💳 Demo Hệ Thống Thanh Toán Bảo Mật
          </h1>
          <p className="text-gray-600">
            Trải nghiệm thanh toán với công nghệ bảo mật tiên tiến
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex items-center ${s <= step ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  {s}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {s === 1 && 'Chọn nhà cung cấp'}
                  {s === 2 && 'Xác thực'}
                  {s === 3 && 'Mã hóa'}
                  {s === 4 && 'Hoàn thành'}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Provider Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Chọn phương thức thanh toán</h2>
              <div className="grid grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      selectedProvider === provider.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{provider.icon}</div>
                    <div className="font-medium">{provider.name}</div>
                  </button>
                ))}
              </div>
              {selectedProvider && (
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Tiếp tục
                </button>
              )}
            </div>
          )}

          {/* Step 2: Security Verification */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">🔐 Xác thực bảo mật</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-100 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Device Fingerprinting - Đã xác thực thiết bị</span>
                  </div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Risk Assessment - Điểm rủi ro: Thấp</span>
                  </div>
                </div>
                <div className="p-4 bg-green-100 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>2FA Ready - Sẵn sàng xác thực 2 yếu tố</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(3)}
                className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xác thực thành công - Tiếp tục
              </button>
            </div>
          )}

          {/* Step 3: Encryption */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">🔒 Mã hóa dữ liệu</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span>AES-256 Encryption</span>
                    <span className="text-blue-600 font-mono text-sm">Đang mã hóa...</span>
                  </div>
                  <div className="mt-2 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-3/4 transition-all duration-1000"></div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span>JWT Token Generation</span>
                    <span className="text-yellow-600 font-mono text-sm">Đang tạo token...</span>
                  </div>
                </div>
                <div className="p-4 bg-purple-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span>Fraud Detection AI</span>
                    <span className="text-purple-600 font-mono text-sm">Đang phân tích...</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(4)}
                className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mã hóa hoàn tất - Thanh toán
              </button>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Thanh toán thành công!
              </h2>
              <p className="text-gray-600 mb-6">
                Giao dịch đã được xử lý an toàn với công nghệ bảo mật tiên tiến
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Chi tiết bảo mật:</h3>
                <div className="text-sm text-left space-y-1">
                  <div>🔐 Mã hóa: AES-256</div>
                  <div>🛡️ Xác thực: 2FA + Device Fingerprint</div>
                  <div>🤖 AI Fraud Score: 0.02/1.00 (Rất an toàn)</div>
                  <div>💳 Provider: {providers.find(p => p.id === selectedProvider)?.name}</div>
                  <div>⏱️ Thời gian xử lý: 1.2s</div>
                </div>
              </div>
              <button
                onClick={() => {setStep(1); setSelectedProvider('')}}
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Thử lại demo
              </button>
            </div>
          )}
        </div>

        {/* Security Features */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">🛡️ Tính năng bảo mật</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>Mã hóa AES-256 end-to-end</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>Xác thực 2 yếu tố (2FA)</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>Device Fingerprinting</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>AI Fraud Detection</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>Rate Limiting</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>Audit Logging</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>Multi-provider Support</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span>Real-time Risk Assessment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}