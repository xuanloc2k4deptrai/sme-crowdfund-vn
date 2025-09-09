import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  variant?: 'light' | 'dark';
}

const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Sẵn sàng để bắt đầu?",
  subtitle = "Đăng ký ngay hôm nay để tham gia vào nền tảng gọi vốn hàng đầu cho doanh nghiệp SME tại Việt Nam",
  primaryCta = {
    text: "Bắt đầu ngay",
    link: "/register"
  },
  secondaryCta = {
    text: "Tìm hiểu thêm",
    link: "/about"
  },
  variant = 'light'
}) => {
  const bgClass = variant === 'light' 
    ? 'bg-white' 
    : 'bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950';
  
  const textClass = variant === 'light'
    ? 'text-navy-900'
    : 'text-white';
  
  const subtitleClass = variant === 'light'
    ? 'text-gray-600'
    : 'text-gray-300';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {variant === 'dark' && (
          <>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-600/20 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute inset-0">
              <div className="h-full w-full opacity-10" style={{ 
                backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, 
                backgroundSize: '30px 30px' 
              }}></div>
            </div>
          </>
        )}
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${textClass}`}>
            {title}
          </h2>
          <p className={`text-lg md:text-xl mb-10 ${subtitleClass}`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryCta.link}>
              <Button variant={variant === 'light' ? 'primary' : 'accent'} size="lg" className="w-full sm:w-auto">
                {primaryCta.text}
              </Button>
            </Link>
            <Link href={secondaryCta.link}>
              <Button variant="outline" size="lg" className={`w-full sm:w-auto ${variant === 'dark' ? 'text-white border-white hover:bg-white/10' : ''}`}>
                {secondaryCta.text}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
