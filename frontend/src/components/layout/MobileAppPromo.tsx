import React from 'react';
import Button from '../ui/Button';
import Image from 'next/image';

const MobileAppPromo: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-navy-50 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <span className="bg-navy-100 text-navy-800 text-sm font-medium px-4 py-1.5 rounded-full">
                Mới ra mắt
              </span>
              
              <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Quản lý đầu tư mọi lúc mọi nơi với ứng dụng di động
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Theo dõi chiến dịch, quản lý danh mục đầu tư và nhận thông báo quan trọng ngay trên điện thoại của bạn. Trải nghiệm đầu tư liền mạch với ứng dụng SME CrowdFund.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-medium text-gray-900">Thông báo thời gian thực</span> về các cập nhật dự án và biến động thị trường
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-medium text-gray-900">Xác thực sinh trắc học</span> bảo mật thông tin và giao dịch của bạn
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-medium text-gray-900">Thanh toán một chạm</span> giúp quá trình đầu tư trở nên nhanh chóng và tiện lợi
                  </p>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#" className="inline-flex items-center transition-transform hover:scale-105">
                  <div className="h-14 bg-black text-white rounded-xl px-6 flex items-center">
                    <div className="mr-3">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.6 9.48l-2.12 2.13-1.06-1.06L10.6 14.3 8.43 12.12l-1.06 1.06 3.23 3.24 5-5.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs">Tải về trên</div>
                      <div className="text-sm font-medium">Google Play</div>
                    </div>
                  </div>
                </a>
                
                <a href="#" className="inline-flex items-center transition-transform hover:scale-105">
                  <div className="h-14 bg-black text-white rounded-xl px-6 flex items-center">
                    <div className="mr-3">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs">Tải về trên</div>
                      <div className="text-sm font-medium">App Store</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Right side - Phone mockup */}
            <div className="relative flex justify-center">
              {/* Phone frame with realistic details */}
              <div className="w-[280px] h-[570px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[42px] border-[8px] border-gray-800 shadow-2xl relative overflow-hidden">
                {/* Notch area */}
                <div className="absolute top-0 w-36 h-7 bg-black left-1/2 transform -translate-x-1/2 rounded-b-2xl z-10 flex justify-center items-end pb-1">
                  <div className="w-16 h-4 flex items-center justify-around">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                  </div>
                </div>

                {/* Side buttons */}
                <div className="absolute left-[-13px] top-28 w-[5px] h-10 bg-gray-700 rounded-l-lg"></div>
                <div className="absolute left-[-13px] top-44 w-[5px] h-16 bg-gray-700 rounded-l-lg"></div>
                <div className="absolute right-[-13px] top-36 w-[5px] h-12 bg-gray-700 rounded-r-lg"></div>

                {/* Screen content */}
                <div className="h-full w-full bg-white flex flex-col relative overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-blue-600 text-white px-4 pt-8 pb-2 flex justify-between items-center z-10">
                    <div className="text-xs">15:30</div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                      </svg>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h10V5.33z"/>
                        <path d="M7 9v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9H7z"/>
                      </svg>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* App header */}
                  <div className="bg-blue-600 text-white px-4 pb-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <div className="text-lg font-bold">SME CrowdFund</div>
                          <div className="ml-1 px-1.5 py-0.5 bg-yellow-400 text-blue-900 text-xs font-bold rounded-sm">VN</div>
                        </div>
                        <div className="text-xs font-light">Quản lý đầu tư</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock app content */}
                  <div className="flex-grow p-3 bg-gray-100 overflow-y-auto">
                    {/* Dashboard stats */}
                    <div className="mb-4 bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-semibold text-blue-800">Tổng quan danh mục</div>
                        <div className="text-xs text-blue-500">Chi tiết</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="text-xs text-gray-600">Đã đầu tư:</div>
                        <div className="text-xs font-bold text-blue-900">52,500,000 VND</div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500" style={{ width: '65%' }}></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-xs text-green-600 font-medium">+12.4%</div>
                        <div className="text-xs text-gray-500">Từ tháng trước</div>
                      </div>
                    </div>
                    
                    <div className="text-xs font-semibold text-gray-700 mb-2 ml-1">Dự án đang tham gia</div>
                    
                    {/* Project cards */}
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <div className="flex justify-between">
                          <div className="font-medium text-sm text-blue-800">Nông Sản Xanh</div>
                          <div className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Đang diễn ra</div>
                        </div>
                        <div className="flex justify-between my-1">
                          <div className="text-xs text-gray-500">Đã huy động:</div>
                          <div className="text-xs font-bold">85%</div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                        <div className="flex justify-between">
                          <div className="font-medium text-sm text-blue-800">MediConnect</div>
                          <div className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">Thành công</div>
                        </div>
                        <div className="flex justify-between my-1">
                          <div className="text-xs text-gray-500">Lợi nhuận:</div>
                          <div className="text-xs font-bold text-green-600">+18.5%</div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{width: '100%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
                        <div className="flex justify-between">
                          <div className="font-medium text-sm text-blue-800">Tech Innovate</div>
                          <div className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">Sắp kết thúc</div>
                        </div>
                        <div className="flex justify-between my-1">
                          <div className="text-xs text-gray-500">Đã huy động:</div>
                          <div className="text-xs font-bold">92%</div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full">
                          <div className="h-full bg-purple-500 rounded-full" style={{width: '92%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom navigation */}
                  <div className="bg-white py-3 px-2 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                      <div className="text-[10px] text-blue-600 font-medium">Trang chủ</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z" />
                      </svg>
                      <div className="text-[10px] text-gray-500">Dự án</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center -mt-5 relative">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1">Đầu tư</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                      </svg>
                      <div className="text-[10px] text-gray-500">Thiết lập</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      <div className="text-[10px] text-gray-500">Tài khoản</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Reflections and Shadows */}
              <div className="absolute inset-0 rounded-[42px] shadow-inner pointer-events-none bg-gradient-to-tr from-black/5 via-transparent to-white/20"></div>
              <div className="absolute inset-0 rounded-[42px] shadow-xl pointer-events-none"></div>
              
              {/* Power button light */}
              <div className="absolute right-[-5px] top-24 w-1.5 h-1.5 rounded-full bg-red-500 blur-[1px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromo;
