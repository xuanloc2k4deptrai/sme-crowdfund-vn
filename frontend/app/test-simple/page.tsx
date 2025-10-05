export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🎯 Test Secure Payment System
          </h1>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Hệ thống thanh toán bảo mật đã sẵn sàng!
            </h2>
            <p className="text-gray-600 mb-6">
              ✅ Mã hóa AES-256<br/>
              ✅ Xác thực 2FA<br/>
              ✅ Phát hiện gian lận AI<br/>
              ✅ Đa nhà cung cấp thanh toán
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <h3 className="font-medium text-green-800">✨ Tính năng bảo mật</h3>
                <p className="text-green-600 text-sm">
                  Hệ thống thanh toán với các công nghệ bảo mật tiên tiến nhất
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}