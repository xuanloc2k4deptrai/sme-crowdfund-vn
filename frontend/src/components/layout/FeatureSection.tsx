import React from 'react';
import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  variant?: 'light' | 'dark';
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title = "Các lợi thế nổi bật",
  subtitle = "Nền tảng gọi vốn hiện đại, ứng dụng công nghệ tiên tiến để đáp ứng nhu cầu của doanh nghiệp và nhà đầu tư",
  variant = 'light',
  features = [
    {
      title: "Minh bạch và An toàn",
      description: "Dữ liệu tài chính rõ ràng và được kiểm chứng, đảm bảo sự an toàn tuyệt đối cho nhà đầu tư trong suốt quá trình tham gia.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Quy trình Đơn giản",
      description: "Từ việc đăng ký đến đầu tư, tất cả đều được thiết kế trực quan với giao diện người dùng thân thiện, dễ sử dụng.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Thẩm định Chuyên nghiệp",
      description: "Mọi doanh nghiệp đều trải qua quá trình thẩm định kỹ lưỡng bởi đội ngũ chuyên gia tài chính và pháp lý hàng đầu.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: "Theo dõi Thời gian thực",
      description: "Công nghệ tiên tiến cho phép cập nhật dữ liệu dự án và số tiền đầu tư theo thời gian thực với các biểu đồ trực quan.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Hỗ trợ Đa nền tảng",
      description: "Trải nghiệm mượt mà trên mọi thiết bị với thiết kế responsive tối ưu cho máy tính, điện thoại và máy tính bảng.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chăm sóc khách hàng chuyên nghiệp sẵn sàng hỗ trợ mọi lúc mọi nơi qua đa dạng kênh liên lạc.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    }
  ]
}) => {
  const isLightVariant = variant === 'light';
  
  // Background classes
  const bgClass = isLightVariant
    ? 'bg-gradient-to-br from-white to-blue-50'
    : 'bg-gradient-to-br from-navy-800 to-navy-900';

  // Text classes  
  const textClass = isLightVariant
    ? 'text-blue-900'
    : 'text-white';
  
  const subtitleClass = isLightVariant
    ? 'text-blue-700/80'
    : 'text-blue-100';
  
  // Create gradient accents for section background
  const accentClasses = isLightVariant 
    ? 'from-blue-500/5 via-blue-500/10 to-transparent'
    : 'from-blue-400/10 via-blue-500/5 to-transparent';

  return (
    <section className={`relative py-20 overflow-hidden ${bgClass}`}>
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-yellow-400/15 to-blue-500/10 blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact section heading */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Ưu điểm vượt trội
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${textClass}`}>
            {title}
          </h2>
          <p className={`text-lg ${subtitleClass} max-w-3xl mx-auto`}>
            {subtitle}
          </p>
        </div>
        
        {/* Enhanced features grid - more compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl p-6 bg-white/95 backdrop-blur-md border border-blue-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/0 before:to-purple-500/0 before:opacity-0 hover:before:opacity-5 before:transition-opacity before:duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <div className="absolute inset-[1px] rounded-2xl bg-white/95 backdrop-blur-md -z-10"></div>
              
              {/* Floating icon with enhanced effects */}
              <div className="relative mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                  <div className="w-8 h-8">
                    {feature.icon}
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-xl bg-blue-500/30 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-500"></div>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-500" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-500" style={{ animationDelay: '0.4s' }}></div>
              </div>
              
              {/* Content with staggered animations */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-600 transition-colors duration-300 transform group-hover:translate-x-1 transition-transform duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm transform group-hover:translate-x-1 transition-transform duration-300 delay-75">
                  {feature.description}
                </p>
              </div>
              
              {/* Animated arrow indicator */}
              <div className="absolute bottom-4 right-4 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Shine effect on hover */}
              <div className="absolute top-0 -left-full h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* Compact bottom section with stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-md rounded-2xl px-8 py-4 shadow-lg border border-blue-100/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Đã hỗ trợ 350+ dự án</span>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">99.9% độ tin cậy</span>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
