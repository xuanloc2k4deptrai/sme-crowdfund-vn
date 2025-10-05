import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from 'src/components/ui/Button';

const StartCampaignPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <Head>
        <title>Bắt đầu chiến dịch gọi vốn | SME CrowdFund VN</title>
        <meta name="description" content="Bắt đầu chiến dịch gọi vốn cộng đồng cho doanh nghiệp của bạn" />
      </Head>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Bắt đầu chiến dịch gọi vốn của bạn</h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto">
            Chúng tôi sẽ hướng dẫn bạn từng bước để tạo một chiến dịch gọi vốn hiệu quả và chuyên nghiệp
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Quy trình đơn giản</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Đăng ký và xác thực</h3>
                    <p className="text-gray-600 mt-1">Hoàn tất quá trình đăng ký và xác thực danh tính doanh nghiệp của bạn.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Chuẩn bị tài liệu</h3>
                    <p className="text-gray-600 mt-1">Chuẩn bị kế hoạch kinh doanh, báo cáo tài chính và các tài liệu cần thiết.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Thiết lập chiến dịch</h3>
                    <p className="text-gray-600 mt-1">Tạo trang chiến dịch với thông tin hấp dẫn, hình ảnh và video giới thiệu.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phê duyệt và ra mắt</h3>
                    <p className="text-gray-600 mt-1">Chiến dịch của bạn được xem xét, phê duyệt và chính thức ra mắt.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-blue-800 mb-3">Lợi ích khi bắt đầu chiến dịch</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Tiếp cận hàng nghìn nhà đầu tư tiềm năng</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Hỗ trợ tư vấn từ chuyên gia trong ngành</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Quy trình thẩm định chuyên nghiệp</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Quảng bá thương hiệu mạnh mẽ</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>Phân tích AI để tối ưu hiệu quả</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white mt-auto">
                <h3 className="font-bold text-xl mb-4">Sẵn sàng bắt đầu?</h3>
                <p className="mb-6">Bắt đầu chiến dịch gọi vốn cho doanh nghiệp của bạn ngay hôm nay và mở ra cơ hội phát triển không giới hạn.</p>
                <Link href="/login">
                  <Button variant="light" className="w-full py-3 text-blue-700 font-bold">
                    Bắt đầu ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Câu hỏi thường gặp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-2">Chi phí để tạo chiến dịch là bao nhiêu?</h3>
              <p className="text-gray-600">Việc tạo và đăng chiến dịch hoàn toàn miễn phí. Chúng tôi chỉ thu phí khi chiến dịch của bạn thành công gọi vốn.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-2">Ai có thể tạo chiến dịch gọi vốn?</h3>
              <p className="text-gray-600">Doanh nghiệp vừa và nhỏ tại Việt Nam có giấy phép kinh doanh hợp lệ và hoạt động tối thiểu 1 năm.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-2">Thời gian phê duyệt chiến dịch là bao lâu?</h3>
              <p className="text-gray-600">Thông thường mất 3-5 ngày làm việc để đội ngũ của chúng tôi xem xét và phê duyệt chiến dịch của bạn.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-bold text-gray-900 mb-2">Tôi có được hỗ trợ khi tạo chiến dịch không?</h3>
              <p className="text-gray-600">Có, đội ngũ chuyên gia của chúng tôi sẽ hỗ trợ bạn trong suốt quá trình từ lúc tạo đến khi kết thúc chiến dịch.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartCampaignPage;
