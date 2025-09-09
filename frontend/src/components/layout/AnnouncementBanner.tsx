import React, { useState } from 'react';
import Link from 'next/link';

interface AnnouncementBannerProps {
  message: string;
  linkText: string;
  linkUrl: string;
  variant?: 'default' | 'success' | 'info' | 'warning';
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ 
  message, 
  linkText, 
  linkUrl,
  variant = 'default'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const getBgColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-navy-100 text-navy-800';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`py-2 px-4 ${getBgColor()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center">
            <p className="text-sm font-medium">
              {message}{' '}
              <Link href={linkUrl} className="underline font-semibold whitespace-nowrap">
                {linkText} →
              </Link>
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)} 
            className="ml-2 p-1 rounded-md hover:bg-black/10 transition-colors"
            aria-label="Đóng thông báo"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
