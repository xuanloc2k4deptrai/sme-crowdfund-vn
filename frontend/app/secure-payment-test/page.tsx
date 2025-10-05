'use client'

import { useState } from 'react'

export default function SecurePaymentTestPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const [paymentData, setPaymentData] = useState({
    campaignId: 1,
    amount: 100000,
    providerId: 'vnpay',
    deviceFingerprint: ''
  })

  // Generate device fingerprint
  const generateDeviceFingerprint = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx!.textBaseline = 'top'
    ctx!.font = '14px Arial'
    ctx!.fillText('Device fingerprint test', 2, 2)
    
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvas: canvas.toDataURL(),
      timestamp: Date.now()
    }
    
    return btoa(JSON.stringify(fingerprint))
  }

  const testHealthCheck = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://localhost:5000/health')
      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  const testPaymentInitiation = async () => {
    setLoading(true)
    setError('')
    try {
      const deviceFingerprint = generateDeviceFingerprint()
      
      const response = await fetch('http://localhost:5000/api/secure-payments/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token' // Mock token
        },
        body: JSON.stringify({
          ...paymentData,
          deviceFingerprint
        })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔐 Secure Payment System Test
          </h1>
          <p className="text-gray-600">
            Test tính năng thanh toán bảo mật với công nghệ tiên tiến
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Server Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🚀 Server Status</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Backend: http://localhost:5000</span>
              </div>
              <button
                onClick={testHealthCheck}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Health Check'}
              </button>
            </div>
          </div>

          {/* Payment Configuration */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">💳 Payment Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign ID
                </label>
                <input
                  type="number"
                  value={paymentData.campaignId}
                  onChange={(e) => setPaymentData({...paymentData, campaignId: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (VND)
                </label>
                <input
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({...paymentData, amount: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Provider
                </label>
                <select
                  value={paymentData.providerId}
                  onChange={(e) => setPaymentData({...paymentData, providerId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="vnpay">VNPay</option>
                  <option value="momo">MoMo</option>
                  <option value="zalopay">ZaloPay</option>
                  <option value="vietqr">VietQR</option>
                </select>
              </div>
            </div>
          </div>

          {/* Test Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🧪 Test Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={testPaymentInitiation}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Test Payment Initiation'}
              </button>
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🛡️ Security Features Active</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'AES-256 Encryption',
                'Device Fingerprinting',
                'IP Geolocation Check',
                'Rate Limiting',
                'Request Validation',
                'Fraud Detection',
                'Audit Logging',
                'Risk Assessment'
              ].map((feature) => (
                <div key={feature} className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          {(result || error) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">📊 Test Results</h2>
              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  <h3 className="font-bold">Error:</h3>
                  <p>{error}</p>
                </div>
              )}
              {result && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  <h3 className="font-bold">Success:</h3>
                  <pre className="mt-2 text-sm overflow-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* API Endpoints */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🔗 Available API Endpoints</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-mono">GET /health</span>
                <span className="text-green-600">✅ Active</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-mono">POST /api/secure-payments/payments/initiate</span>
                <span className="text-blue-600">🔐 Requires Auth</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-mono">POST /api/secure-payments/webhooks/:provider</span>
                <span className="text-purple-600">🎣 Webhook</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-mono">GET /api/secure-payments/analytics</span>
                <span className="text-orange-600">📊 Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}