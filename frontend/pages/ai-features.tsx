import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from 'src/components/ui/Button';
import Image from 'next/image';

const AIFeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-950">
      <Head>
        <title>Công nghệ AI | SME CrowdFund VN</title>
        <meta name="description" content="Khám phá công nghệ AI tiên tiến giúp tối ưu hóa đầu tư và giảm thiểu rủi ro" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-950"></div>
          <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-blue-400/10 filter blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-indigo-400/10 filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Trí tuệ nhân tạo đổi mới cách đầu tư
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Nền tảng gọi vốn được trang bị công nghệ AI tiên tiến giúp doanh nghiệp và nhà đầu tư đưa ra quyết định tối ưu dựa trên dữ liệu thông minh
            </p>
            <Button variant="accent" size="lg" className="animate-pulse">
              Trải nghiệm ngay
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-purple-500/30 rounded-2xl blur-2xl transform scale-105"></div>
            <div className="relative bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Phân tích dự đoán</h3>
                  <p className="text-blue-200">
                    Dự đoán xu hướng thị trường và khả năng thành công của dự án dựa trên dữ liệu lịch sử và các chỉ số kinh tế vĩ mô
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Đánh giá rủi ro</h3>
                  <p className="text-blue-200">
                    Phát hiện và đánh giá các rủi ro tiềm ẩn trong dự án, giúp nhà đầu tư đưa ra quyết định đầu tư an toàn hơn
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Trợ lý ảo thông minh</h3>
                  <p className="text-blue-200">
                    Chatbot AI hỗ trợ trả lời câu hỏi và tư vấn 24/7, giúp người dùng tương tác với nền tảng hiệu quả hơn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Các tính năng AI nổi bật</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Công nghệ trí tuệ nhân tạo tiên tiến được tích hợp xuyên suốt quá trình trải nghiệm của người dùng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Phân tích dữ liệu thông minh",
                description: "AI xử lý hàng triệu điểm dữ liệu từ thị trường, báo cáo tài chính và các nguồn khác để đưa ra cái nhìn toàn diện về tiềm năng dự án.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                )
              },
              {
                title: "Đề xuất dự án cá nhân hóa",
                description: "Hệ thống gợi ý dự án phù hợp với sở thích, mục tiêu tài chính và mức độ rủi ro mà nhà đầu tư có thể chấp nhận.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )
              },
              {
                title: "Đánh giá mức độ tín nhiệm",
                description: "Thuật toán AI đánh giá mức độ tín nhiệm của doanh nghiệp dựa trên lịch sử hoạt động, khả năng tài chính và các chỉ số khác.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Phát hiện gian lận",
                description: "Hệ thống an ninh AI phát hiện các hoạt động bất thường, bảo vệ nhà đầu tư khỏi các dự án gian lận tiềm ẩn.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )
              },
              {
                title: "Dự báo thị trường",
                description: "AI phân tích xu hướng thị trường và cung cấp dự báo về tiềm năng tăng trưởng của các lĩnh vực khác nhau.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              },
              {
                title: "Phân tích dự án thông minh",
                description: "Đánh giá tính khả thi của dự án dựa trên nhiều yếu tố: thị trường, đội ngũ, sản phẩm và tài chính.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-800/50 to-indigo-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-950 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Trợ lý AI thông minh</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Trải nghiệm trợ lý AI của chúng tôi, sẵn sàng giúp bạn tìm hiểu thêm về các dự án và đưa ra quyết định đầu tư tốt nhất
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/70 to-indigo-900/70 backdrop-blur-sm border border-blue-700/50 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 mt-1">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                </div>
                <div className="bg-blue-800/50 rounded-2xl rounded-tl-none p-4 text-white max-w-[80%]">
                  <p>Xin chào! Tôi là trợ lý AI của SME CrowdFund VN. Tôi có thể giúp gì cho bạn hôm nay?</p>
                </div>
              </div>
              
              <div className="flex items-start justify-end">
                <div className="bg-indigo-700/50 rounded-2xl rounded-tr-none p-4 text-white max-w-[80%]">
                  <p>Tôi muốn biết về các xu hướng đầu tư hàng đầu trong lĩnh vực công nghệ năm nay.</p>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center ml-3 mt-1">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 mt-1">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                </div>
                <div className="bg-blue-800/50 rounded-2xl rounded-tl-none p-4 text-white max-w-[80%]">
                  <p>Dựa trên phân tích của chúng tôi, các xu hướng đầu tư công nghệ hàng đầu năm nay bao gồm:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Trí tuệ nhân tạo ứng dụng trong y tế và chăm sóc sức khỏe</li>
                    <li>Giải pháp công nghệ bền vững và năng lượng xanh</li>
                    <li>Ứng dụng Blockchain trong lĩnh vực tài chính</li>
                    <li>Công nghệ nông nghiệp thông minh (AgriTech)</li>
                    <li>Ứng dụng thương mại điện tử cho doanh nghiệp vừa và nhỏ</li>
                  </ul>
                  <p className="mt-2">Bạn quan tâm đến lĩnh vực nào cụ thể? Tôi có thể cung cấp thông tin chi tiết hơn.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 relative">
              <input 
                type="text" 
                placeholder="Gõ câu hỏi của bạn..." 
                className="w-full p-4 pl-4 pr-16 rounded-full bg-blue-800/30 border border-blue-700/50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-blue-200 mb-6">Trải nghiệm toàn diện với trợ lý AI thông minh trên tất cả các thiết bị</p>
            <Link href="/register">
              <Button variant="accent" size="lg">
                Đăng ký để trải nghiệm
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIFeaturesPage;
