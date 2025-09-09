import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AIFeatures = () => {
  return (
    <>
      <Head>
        <title>Tính năng Trí tuệ Nhân tạo | SME CrowdFund VN</title>
        <meta name="description" content="Khám phá các tính năng trí tuệ nhân tạo tiên tiến của nền tảng gọi vốn cộng đồng SME CrowdFund VN" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="px-8 py-16 md:p-16 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trí tuệ Nhân tạo trong Gọi vốn Cộng đồng</h1>
            <p className="text-xl md:text-2xl mb-8 md:w-3/4">Chúng tôi áp dụng công nghệ AI tiên tiến để tạo ra trải nghiệm đầu tư thông minh, minh bạch và hiệu quả hơn.</p>
            <Link href="/campaigns" className="inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition duration-200">
              Khám phá các dự án
            </Link>
          </div>
        </div>
        
        {/* Features Overview */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Cách AI thay đổi trải nghiệm gọi vốn</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-800">Đánh giá dự án tự động</h3>
              <p className="text-gray-600 mb-4">AI phân tích hơn 50 chỉ số tài chính, thị trường và hoạt động của dự án để đánh giá mức độ khả thi và rủi ro.</p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Phân tích báo cáo tài chính tự động
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  So sánh với các dự án tương tự
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dự báo khả năng thành công
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-800">Tư vấn đầu tư cá nhân hóa</h3>
              <p className="text-gray-600 mb-4">AI phân tích hồ sơ và hành vi của nhà đầu tư để đề xuất các dự án phù hợp nhất với mục tiêu đầu tư cá nhân.</p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Học hỏi từ lịch sử đầu tư
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Đánh giá mức độ rủi ro phù hợp
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Thông báo cơ hội đầu tư theo thời gian thực
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-800">Theo dõi hiệu suất thông minh</h3>
              <p className="text-gray-600 mb-4">AI theo dõi tiến độ dự án và phát hiện các dấu hiệu cảnh báo sớm, giúp bảo vệ lợi ích của nhà đầu tư.</p>
              <ul className="text-sm space-y-1 text-gray-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cảnh báo sớm về các rủi ro
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Phân tích dữ liệu hoạt động dự án
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dự báo hiệu suất tương lai
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* AI Technology */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Công nghệ AI tiên tiến</h2>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-xl shadow-md mb-12">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Nền tảng AI của chúng tôi</h3>
                <p className="mb-4">SME CrowdFund VN sử dụng các mô hình học máy và học sâu tiên tiến được đào tạo trên dữ liệu từ hơn 10.000 dự án gọi vốn trong khu vực và quốc tế. Hệ thống của chúng tôi liên tục cải thiện thông qua học tăng cường.</p>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Xử lý ngôn ngữ tự nhiên</h4>
                      <p className="text-sm text-gray-600">Phân tích kế hoạch kinh doanh, mô tả dự án và phản hồi nhà đầu tư để đánh giá chất lượng và tính khả thi.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Học máy dự đoán</h4>
                      <p className="text-sm text-gray-600">Mô hình dự đoán khả năng thành công của dự án dựa trên hàng trăm yếu tố với độ chính xác lên đến 85%.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Phân tích hồ sơ nhà đầu tư</h4>
                      <p className="text-sm text-gray-600">AI phân tích hồ sơ và hành vi của nhà đầu tư để hiểu sở thích, mức độ chấp nhận rủi ro và mục tiêu tài chính.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-8 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Dữ liệu & Bảo mật</h3>
                <p className="mb-6">Chúng tôi xử lý hàng triệu điểm dữ liệu mỗi ngày, đảm bảo bảo mật tuyệt đối và tính minh bạch cho nhà đầu tư và chủ dự án.</p>
                
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <h4 className="font-bold mb-2 flex items-center text-blue-700">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Bảo mật cấp ngân hàng
                  </h4>
                  <p className="text-sm text-gray-600">Mã hóa end-to-end cho tất cả dữ liệu và tuân thủ các tiêu chuẩn bảo mật quốc tế ISO 27001 và GDPR.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold mb-2 flex items-center text-blue-700">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Minh bạch thuật toán
                  </h4>
                  <p className="text-sm text-gray-600">Chúng tôi công khai các yếu tố chính trong đánh giá dự án và quy trình đề xuất, đảm bảo tính minh bạch và công bằng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Case Study */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Câu chuyện thành công</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gray-800 flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2">+65%</div>
                  <div className="text-blue-300 font-medium">Tỷ lệ thành công</div>
                  <div className="h-px w-16 bg-blue-400 mx-auto my-4"></div>
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2">-40%</div>
                  <div className="text-blue-300 font-medium">Thời gian huy động vốn</div>
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4">Ứng dụng AI trong thực tế</h3>
                <p className="mb-6 text-gray-600">
                  Trong 6 tháng đầu triển khai hệ thống AI, nền tảng SME CrowdFund VN đã ghi nhận những kết quả đáng kinh ngạc so với phương pháp đánh giá truyền thống.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold">Dự án Nông Sản Xanh</h4>
                      <p className="text-sm text-gray-600">AI xác định tiềm năng cao cho dự án nông nghiệp hữu cơ mặc dù có cấu trúc tài chính không điển hình. Dự án đã huy động thành công 150% số vốn mục tiêu chỉ trong 12 ngày.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold">MediConnect</h4>
                      <p className="text-sm text-gray-600">AI điều chỉnh chiến dịch theo thời gian thực dựa trên phản hồi của nhà đầu tư, tăng 45% tỷ lệ chuyển đổi và đạt 85% mục tiêu gọi vốn chỉ sau 7 ngày.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-bold">TechLink AI</h4>
                      <p className="text-sm text-gray-600">AI phân tích và đề xuất điều chỉnh kế hoạch kinh doanh, giúp dự án nâng tỷ lệ thành công từ 65% lên 92% và thu hút 35% nhiều nhà đầu tư hơn dự kiến.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Roadmap */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Lộ trình phát triển AI</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              <div className="md:flex">
                <div className="md:w-1/2 pr-12 md:text-right pb-10 md:pb-0">
                  <div className="md:hidden h-full w-1 bg-blue-200 absolute left-5 top-0"></div>
                  <div className="md:hidden absolute left-5 top-5 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                  
                  <h3 className="font-bold text-lg">Q3/2025</h3>
                  <h4 className="font-bold text-xl text-blue-600 mb-2">Học máy nâng cao</h4>
                  <p className="text-gray-600">Cải tiến thuật toán đánh giá dự án với mô hình học sâu mới, nâng cao độ chính xác lên 92% dựa trên dữ liệu của hơn 15.000 dự án.</p>
                </div>
                
                <div className="hidden md:block absolute left-1/2 top-5 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                
                <div className="md:w-1/2 md:pl-12">
                  {/* Empty on first row */}
                </div>
              </div>
              
              <div className="md:flex">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  {/* Empty on second row */}
                </div>
                
                <div className="hidden md:block absolute left-1/2 top-[8.5rem] w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                
                <div className="md:w-1/2 md:pl-12 pb-10 md:pb-0">
                  <div className="md:hidden h-full w-1 bg-blue-200 absolute left-5 top-0"></div>
                  <div className="md:hidden absolute left-5 top-5 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                  
                  <h3 className="font-bold text-lg">Q4/2025</h3>
                  <h4 className="font-bold text-xl text-blue-600 mb-2">Trợ lý AI cá nhân</h4>
                  <p className="text-gray-600">Ra mắt trợ lý đầu tư AI có thể trả lời câu hỏi, giải thích các khái niệm tài chính phức tạp, và đề xuất chiến lược đầu tư phù hợp cho từng nhà đầu tư.</p>
                </div>
              </div>
              
              <div className="md:flex">
                <div className="md:w-1/2 pr-12 md:text-right pb-10 md:pb-0">
                  <div className="md:hidden h-full w-1 bg-blue-200 absolute left-5 top-0"></div>
                  <div className="md:hidden absolute left-5 top-5 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                  
                  <h3 className="font-bold text-lg">Q1/2026</h3>
                  <h4 className="font-bold text-xl text-blue-600 mb-2">Tự động hóa thẩm định</h4>
                  <p className="text-gray-600">Hệ thống AI tự động hóa 70% quy trình thẩm định dự án, giảm thời gian duyệt từ 14 ngày xuống còn 3 ngày và tăng độ chính xác của đánh giá rủi ro.</p>
                </div>
                
                <div className="hidden md:block absolute left-1/2 top-[16.5rem] w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                
                <div className="md:w-1/2 md:pl-12">
                  {/* Empty on third row */}
                </div>
              </div>
              
              <div className="md:flex">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  {/* Empty on fourth row */}
                </div>
                
                <div className="hidden md:block absolute left-1/2 top-[24.5rem] w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                
                <div className="md:w-1/2 md:pl-12">
                  <div className="md:hidden h-full w-1 bg-blue-200 absolute left-5 top-0"></div>
                  <div className="md:hidden absolute left-5 top-5 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow transform -translate-x-1/2"></div>
                  
                  <h3 className="font-bold text-lg">Q3/2026</h3>
                  <h4 className="font-bold text-xl text-blue-600 mb-2">AI dự báo thị trường</h4>
                  <p className="text-gray-600">Triển khai hệ thống dự báo xu hướng thị trường và ngành dựa trên dữ liệu lớn từ nhiều nguồn, giúp nhà đầu tư và doanh nghiệp đưa ra quyết định sáng suốt hơn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Trải nghiệm sức mạnh của AI trong đầu tư</h2>
          <p className="text-xl mb-8 md:w-2/3 mx-auto">Đăng ký ngay hôm nay để khám phá các dự án hấp dẫn được phân tích và đánh giá bởi công nghệ AI tiên tiến.</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/campaigns" className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition duration-200">
              Khám phá dự án
            </Link>
            <Link href="/login" className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border border-white hover:bg-white/10 transition duration-200">
              Đăng ký tài khoản
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIFeatures;
