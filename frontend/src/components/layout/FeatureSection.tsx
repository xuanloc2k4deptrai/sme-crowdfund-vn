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
    <section className={`relative py-24 overflow-hidden ${bgClass}`}>
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-500/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400/10 to-purple-500/5 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading with gradient underline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${textClass}`}>
            {title}
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mt-4"></div>
          </h2>
          <p className={`text-xl ${subtitleClass} max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        </div>
        
        {/* Features grid with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`relative group rounded-2xl p-8 bg-white/90 backdrop-blur-sm border border-blue-50
                         shadow-lg hover:shadow-xl transition-all duration-500 
                         hover:-translate-y-2 overflow-hidden
                         ${isLightVariant ? 'hover:bg-gradient-to-br hover:from-white hover:to-blue-50' : 
                                           'bg-navy-800/80 border-navy-700/50 hover:bg-navy-800'}`}
            >
              {/* Feature accent - subtle gradient that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              {/* Icon with enhanced styling */}
              <div className={`relative flex items-center justify-center w-16 h-16 mb-6
                             rounded-xl bg-gradient-to-br ${isLightVariant ? 'from-blue-500 to-blue-600' : 'from-blue-400 to-blue-600'}
                             text-white shadow-lg group-hover:shadow-blue-500/25 transition-all duration-500
                             group-hover:scale-110`}>
                <div className="w-10 h-10">
                  {feature.icon}
                </div>
              </div>
              
              {/* Feature title with hover effect */}
              <h3 className={`text-2xl font-bold mb-4 ${textClass} group-hover:text-blue-600 transition-colors duration-300`}>
                {feature.title}
              </h3>
              
              {/* Feature description with better spacing */}
              <p className={`${isLightVariant ? 'text-gray-600' : 'text-gray-300'} leading-relaxed`}>
                {feature.description}
              </p>
              
              {/* Subtle arrow indicator that appears on hover */}
              <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <svg className={`w-6 h-6 ${isLightVariant ? 'text-blue-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        {/* Optional bottom CTA or caption */}
        <div className={`text-center mt-16 max-w-2xl mx-auto ${subtitleClass}`}>
          <p className="text-lg">
            Tìm hiểu thêm về cách thức <span className="font-semibold">SME Crowdfund VN</span> hỗ trợ doanh nghiệp vừa và nhỏ tại Việt Nam
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
