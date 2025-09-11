import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import ImageWithFallback from '../ui/ImageWithFallback';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showCta?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title = "Kết nối doanh nghiệp với nhà đầu tư",
  subtitle = "Nền tảng gọi vốn cộng đồng hàng đầu dành cho doanh nghiệp vừa và nhỏ tại Việt Nam",
  showCta = true
}) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950"></div>
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-radial from-blue-600/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-950 to-transparent"></div>
        
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full" style={{ 
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
            backgroundSize: '30px 30px' 
          }}></div>
        </div>
        
        {/* Accent elements */}
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-yellow-400/10 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-[5%] w-80 h-80 rounded-full bg-yellow-400/5 filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center md:text-left md:pr-8 animate-slideUp">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
              {subtitle}
            </p>
            
            {showCta && (
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8">
                <Link href="/campaigns">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Khám phá các dự án
                  </Button>
                </Link>
                <Link href="/business/start-campaign">
                  <Button variant="light" size="lg" className="w-full sm:w-auto">
                    Bắt đầu chiến dịch
                  </Button>
                </Link>
              </div>
            )}

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-yellow-400 font-bold text-2xl md:text-3xl">1.2T+</div>
                <div className="text-gray-300 text-sm">Tổng vốn gọi được</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-yellow-400 font-bold text-2xl md:text-3xl">350+</div>
                <div className="text-gray-300 text-sm">Dự án thành công</div>
              </div>
              <div className="hidden md:block bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-yellow-400 font-bold text-2xl md:text-3xl">15K+</div>
                <div className="text-gray-300 text-sm">Nhà đầu tư tích cực</div>
              </div>
            </div>
          </div>
          
          {/* Image/illustration */}
          <div className="relative flex justify-center animate-slideUp animation-delay-150">
            <div className="relative w-full max-w-md">
              {/* Main image */}
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-white/20 transform hover:-rotate-1 transition-all duration-300">
                <ImageWithFallback
                  src=""
                  alt="SME Crowdfunding Platform - Business Meeting"
                  className="w-full h-auto aspect-[3/2]"
                  style={{ minHeight: '400px' }}
                  fallbackType="business"
                />
              </div>
              
              {/* Floating elements - redesigned to match the image */}
              {/* Money increase notification */}
              <div className="absolute -left-20 top-24 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-2xl transform -rotate-2 z-20 border border-white/20 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-white">+200M VND</div>
                    <div className="text-xs text-gray-300">Tăng trong tuần</div>
                  </div>
                </div>
              </div>
              
              {/* New project notification */}
              <div className="absolute right-0 top-44 bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow-xl transform rotate-2 z-20 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Dự án mới</div>
                    <div className="text-xs text-gray-500">Vừa được tài trợ</div>
                  </div>
                </div>
              </div>
              
              {/* Glowing effect behind the image */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl transform scale-110"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom transition to content - subtle gradient instead of wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
    </div>
  );
};

export default Hero;
