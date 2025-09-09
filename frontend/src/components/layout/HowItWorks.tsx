import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
}

const HowItWorks: React.FC<HowItWorksProps> = ({
  title = "Cách thức hoạt động",
  subtitle = "Quy trình đơn giản để gọi vốn thành công",
  variant = 'light'
}) => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Đăng ký",
      description: "Tạo tài khoản và xác thực thông tin",
      color: "blue",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5C15.5 6.2 16 5.6 16 5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5C8 5.6 8.5 6.2 9 6.5L3 7V9L9 8.5V19C9 20.1 9.9 21 11 21H13C14.1 21 15 20.1 15 19V8.5L21 9Z"/>
        </svg>
      )
    },
    {
      number: 2,
      title: "Tạo chiến dịch",
      description: "Tạo hồ sơ dự án và chiến dịch gọi vốn",
      color: "green",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 6.26L18 5L16.74 10.09L22 11L17.74 12.91L19 18L13.91 16.74L12 22L10.09 16.74L5 18L6.26 12.91L1 11L5.26 10.09L4 5L9.09 6.26L12 2Z"/>
        </svg>
      )
    },
    {
      number: 3,
      title: "Kêu gọi đầu tư",
      description: "Quảng bá và thu hút nhà đầu tư",
      color: "purple",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2A3 3 0 0 1 15 5V11A3 3 0 0 1 12 14A3 3 0 0 1 9 11V5A3 3 0 0 1 12 2M19 11C19 14.53 16.39 17.44 13 17.93V21H11V17.93C7.61 17.44 5 14.53 5 11H7A5 5 0 0 0 12 16A5 5 0 0 0 17 11H19Z"/>
        </svg>
      )
    },
    {
      number: 4,
      title: "Nhận vốn",
      description: "Hoàn thành giao dịch và nhận vốn",
      color: "yellow",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 15H9C9 16.08 10.37 17 12 17C13.63 17 15 16.08 15 15C15 13.9 13.96 13.5 11.76 12.97C9.64 12.44 7 11.78 7 9C7 7.21 8.47 5.69 10.5 5.18V3H13.5V5.18C15.53 5.69 17 7.21 17 9H15C15 7.92 13.63 7 12 7C10.37 7 9 7.92 9 9C9 10.1 10.04 10.5 12.24 11.03C14.36 11.56 17 12.22 17 15C17 16.79 15.53 18.31 13.5 18.82V21H10.5V18.82C8.47 18.31 7 16.79 7 15Z"/>
        </svg>
      )
    }
  ];

  const isLight = variant === 'light';
  const bgClass = isLight ? 'bg-gray-50' : 'bg-navy-900';
  const textClass = isLight ? 'text-gray-900' : 'text-white';
  const subtitleClass = isLight ? 'text-gray-600' : 'text-gray-300';

  return (
    <section className={`py-12 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${textClass} mb-4`}>
            {title}
          </h2>
          <p className={`text-lg ${subtitleClass} max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2 z-0"></div>
              )}
              
              {/* Step card */}
              <div className={`relative z-10 text-center p-6 rounded-xl ${
                isLight ? 'bg-white shadow-sm border border-gray-100' : 'bg-navy-800 border border-navy-700'
              }`}>
                {/* Step number */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                  step.color === 'blue' ? 'bg-blue-500' :
                  step.color === 'green' ? 'bg-green-500' :
                  step.color === 'purple' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}>
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className={`text-lg font-bold ${textClass} mb-2`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${subtitleClass}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/register">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Bắt đầu gọi vốn ngay
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
