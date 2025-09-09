import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import Button from "../src/components/ui/Button";
import Hero from "../src/components/layout/Hero";
import FeatureSection from "../src/components/layout/FeatureSection";
import HowItWorks from "../src/components/layout/HowItWorks";
import Newsletter from "../src/components/layout/Newsletter";
import AnnouncementBanner from "../src/components/layout/AnnouncementBanner";
import MobileAppPromo from "../src/components/layout/MobileAppPromo";
import { mockCampaigns } from "../src/mocks/campaignMock";

// Dynamic imports for better performance
const CampaignCard = dynamic(() => import("../src/components/campaign/CampaignCard"), {
  loading: () => <CampaignSkeleton />,
  ssr: false
});

// Skeleton component for loading state
const CampaignSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-300"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load featured projects with delay for better UX
  useEffect(() => {
    const loadFeaturedProjects = async () => {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 500));
      setFeaturedProjects(mockCampaigns.slice(0, 3));
      setLoading(false);
    };
    
    loadFeaturedProjects();
  }, []);

  // Calculate days remaining for each campaign
  const calculateDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate progress percentage
  const calculateProgress = (raised: number, target: number) => {
    return Math.min(Math.round((raised / target) * 100), 100);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };
  return (
    <div className="overflow-hidden">
      <Head>
        <title>SME Crowdfund VN - Nền tảng gọi vốn cộng đồng cho doanh nghiệp nhỏ và vừa</title>
        <meta
          name="description"
          content="Nền tảng gọi vốn cộng đồng chuyên biệt dành cho doanh nghiệp vừa và nhỏ tại Việt Nam. Kết nối startup với nhà đầu tư một cách minh bạch và hiệu quả."
        />
        <meta name="keywords" content="crowdfunding, startup, SME, đầu tư, gọi vốn, Việt Nam" />
        <meta property="og:title" content="SME Crowdfund VN - Nền tảng gọi vốn hàng đầu Việt Nam" />
        <meta property="og:description" content="Kết nối doanh nghiệp SME với nhà đầu tư. Minh bạch, an toàn, hiệu quả." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Critical CSS for faster loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { font-family: Inter, system-ui, sans-serif; }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
          `
        }} />
      </Head>
      
      {/* Announcement Banner */}
      <AnnouncementBanner 
        message="🎉 Chúng tôi vừa ra mắt quỹ đầu tư mới với tổng giá trị 50 tỷ đồng!"
        linkText="Tìm hiểu ngay"
        linkUrl="/new-fund"
        variant="info"
      />
      
      {/* Hero Section - Dynamic with Animation */}
      <Hero 
        title="Giải pháp gọi vốn cộng đồng cho SME Việt Nam"
        subtitle="Kết nối doanh nghiệp vừa và nhỏ với cộng đồng nhà đầu tư thông qua nền tảng đầu tư minh bạch, an toàn và hiệu quả."
      />
      
      {/* Feature Section */}
      <FeatureSection />
      
      {/* AI-Powered Platform Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Decorative elements */}
          <div className="absolute left-0 right-0 bottom-0 top-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 to-indigo-500/20 backdrop-blur-sm rounded-2xl transform -rotate-3"></div>
                <div className="relative bg-gradient-to-r from-blue-800/70 to-indigo-800/70 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1">92%</div>
                      <div className="text-blue-200 text-sm">Độ chính xác AI</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1">2.5x</div>
                      <div className="text-blue-200 text-sm">Tăng hiệu suất</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1">65%</div>
                      <div className="text-blue-200 text-sm">Tăng tỷ lệ thành công</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1">10K+</div>
                      <div className="text-blue-200 text-sm">Mô hình dự án</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 relative">
                    <div className="h-32 overflow-hidden bg-gradient-to-b from-indigo-800/50 to-indigo-900/50 rounded-lg p-4 border border-indigo-700/50">
                      <div className="flex items-start">
                        <div className="bg-blue-500 text-white px-2.5 py-1.5 rounded-lg text-sm font-semibold mr-3 flex items-center justify-center shadow-sm min-w-[40px] text-center">AI</div>
                        <div className="text-sm text-blue-100">
                          <p>Phân tích 150 chỉ số tài chính cho thấy dự án Nông Sản Xanh có khả năng thành công cao. Đề xuất tăng vốn thêm 20%.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start mt-4">
                        <div className="bg-indigo-600 text-white px-2.5 py-1.5 rounded-lg text-sm font-semibold mr-3 flex items-center justify-center shadow-sm min-w-[40px] text-center">AI</div>
                        <div className="text-sm text-blue-100">
                          <p>Dự báo thị trường: Lĩnh vực này sẽ tăng trưởng 35% trong 2 năm tới. Khuyến nghị đầu tư.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Trí tuệ nhân tạo trong hành động
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-12">
              <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">Công nghệ đột phá</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nền tảng gọi vốn thông minh với sức mạnh của AI</h2>
              <p className="text-lg text-blue-100 mb-8">
                Chúng tôi áp dụng công nghệ trí tuệ nhân tạo tiên tiến để tăng cường hiệu quả đầu tư, giảm thiểu rủi ro và tối ưu hóa kết quả cho cả nhà đầu tư và doanh nghiệp.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Đánh giá dự án thông minh</h3>
                    <p className="text-blue-200">
                      AI phân tích hơn 50 chỉ số tài chính, thị trường và hoạt động để đánh giá mức độ khả thi và tiềm năng sinh lời của dự án.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Phát hiện rủi ro chủ động</h3>
                    <p className="text-blue-200">
                      Hệ thống AI liên tục giám sát và phát hiện các dấu hiệu rủi ro tiềm ẩn, giúp nhà đầu tư và doanh nghiệp chủ động ứng phó.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Tư vấn đầu tư cá nhân hóa</h3>
                    <p className="text-blue-200">
                      Trợ lý AI phân tích hồ sơ nhà đầu tư để đề xuất các dự án phù hợp nhất với mục tiêu tài chính và khẩu vị rủi ro cá nhân.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link href="/ai-features" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center">
                  <span>Khám phá sức mạnh AI</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* Statistics Section - Modern and Engaging */}
      <section className="py-20 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-600/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                Tác động của chúng tôi đến nay
              </h2>
              <p className="text-lg text-gray-300">
                Những con số biết nói từ hành trình phát triển của SME CrowdFund
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-700/20">
                <div className="text-yellow-400 font-bold text-4xl md:text-5xl mb-2">350+</div>
                <div className="text-gray-300 font-medium">Doanh nghiệp</div>
              </div>
              <div className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-700/20">
                <div className="text-yellow-400 font-bold text-4xl md:text-5xl mb-2">1.2T+</div>
                <div className="text-gray-300 font-medium">VND đã huy động</div>
              </div>
              <div className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-700/20">
                <div className="text-yellow-400 font-bold text-4xl md:text-5xl mb-2">15K+</div>
                <div className="text-gray-300 font-medium">Nhà đầu tư</div>
              </div>
              <div className="text-center p-6 bg-navy-800/50 backdrop-blur-sm rounded-xl border border-navy-700/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-700/20">
                <div className="text-yellow-400 font-bold text-4xl md:text-5xl mb-2">92%</div>
                <div className="text-gray-300 font-medium">Tỷ lệ thành công</div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                Chúng tôi không chỉ kết nối vốn với doanh nghiệp, mà còn tạo ra cơ hội đầu tư minh bạch, an toàn và hiệu quả
              </p>
              <Link href="/about">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Tìm hiểu thêm về chúng tôi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Decorative elements */}
          <div className="absolute left-0 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute right-0 bottom-20 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full">Gọi vốn hiện tại</span>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mt-4">Dự án nổi bật</h2>
              <p className="mt-4 text-lg text-blue-700/80 max-w-2xl">
                Những dự án tiềm năng đang gọi vốn trên nền tảng, được chọn lọc kỹ càng bởi đội ngũ chuyên gia
              </p>
            </div>
            <Link href="/campaigns" className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium px-5 py-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-all duration-300">
              <span>Xem tất cả dự án</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <CampaignSkeleton key={index} />
              ))
            ) : (
              featuredProjects.map((project) => {
              const progress = calculateProgress(project.raised, project.target);
              const daysRemaining = project.endDate ? calculateDaysRemaining(project.endDate) : 0;
              
              // Determine color scheme based on industry or type
              let colorScheme = {
                primary: 'from-blue-500 to-blue-600',
                hover: 'hover:shadow-blue-200',
                bg: 'bg-blue-100',
                text: 'text-blue-600'
              };
              
              if (project.industry === 'Nông nghiệp') {
                colorScheme = {
                  primary: 'from-green-500 to-green-600',
                  hover: 'hover:shadow-green-200',
                  bg: 'bg-green-100',
                  text: 'text-green-600'
                };
              } else if (project.industry === 'Y tế') {
                colorScheme = {
                  primary: 'from-purple-500 to-purple-600',
                  hover: 'hover:shadow-purple-200',
                  bg: 'bg-purple-100',
                  text: 'text-purple-600'
                };
              }
              
              return (
                <div key={project.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                  <div className="h-56 relative overflow-hidden">
                    {/* Pure CSS background - no external requests */}
                    <div 
                      className={`w-full h-full flex items-center justify-center text-white text-center p-6 ${
                        project.title?.includes('TechLink') ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                        project.title?.includes('Green Farm') ? 'bg-gradient-to-br from-green-500 to-green-700' :
                        project.title?.includes('Smart Health') ? 'bg-gradient-to-br from-red-500 to-red-700' :
                        'bg-gradient-to-br from-purple-500 to-purple-700'
                      }`}
                    >
                      <div className="transform group-hover:scale-105 transition-transform duration-500">
                        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                        <p className="text-sm opacity-90">Dự án {project.industry}</p>
                        <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs">
                          Startup Innovation
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                      {project.industry}
                    </div>
                    
                    {/* Investment type badge */}
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-navy-800 text-xs font-semibold px-2 py-1 rounded-full capitalize">
                      {project.type === 'equity' ? 'Cổ phần' : project.type === 'debt' ? 'Trái phiếu' : 'Tài trợ'}
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="text-white">
                        <div className="flex items-center gap-1 text-yellow-300">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill={i < Math.floor(project.rating || 0) ? "currentColor" : "none"} 
                                 stroke={i < Math.floor(project.rating || 0) ? "none" : "currentColor"} 
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                          <span className="font-medium ml-1">{project.rating?.toFixed(1)}/5</span>
                        </div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {daysRemaining > 0 ? `${daysRemaining} ngày còn lại` : 'Kết thúc'}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.summary}
                    </p>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm text-gray-500">Tiến độ gọi vốn</span>
                          <div className="flex items-baseline gap-2">
                            <span className={`${colorScheme.text} font-bold text-2xl`}>{progress}%</span>
                            <span className="text-gray-500 text-sm">đã hoàn thành</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">Đã gọi được</span>
                          <div className="font-semibold text-blue-900">{formatCurrency(project.raised)} VND</div>
                        </div>
                      </div>
                      <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colorScheme.primary} rounded-full`} style={{ width: `${progress}%` }}></div>
                        <div className="absolute top-0 left-0 h-full w-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1IDMwTDAgMTUgMTUgMGwxNSAxNS0xNSAxNXptMC04LjQ4bDYuNTItNi41MkwxNSA4LjQ4IDguNDggMTUgMTUgMjEuNTJ6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIi8+PC9zdmc+')]"></div>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-500">Mục tiêu: <span className="font-semibold text-blue-900">{formatCurrency(project.target)} VND</span></span>
                        <span className="text-gray-500">{project.investors || 0} nhà đầu tư</span>
                      </div>
                    </div>
                    <Link href={`/campaigns/${project.id}`}>
                      <Button variant="primary" className={`w-full py-3 rounded-xl text-white shadow-md ${colorScheme.hover} transition-all`}>
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Đầu tư ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })
            )}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/campaigns" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium px-6 py-3 bg-blue-50 hover:bg-blue-100 rounded-full transition-all duration-300 md:hidden">
              <span>Xem tất cả dự án</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900">Tại sao chọn SME Crowdfund VN?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp giải pháp huy động vốn hiệu quả và đáng tin cậy cho doanh nghiệp vừa và nhỏ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">An toàn & Minh bạch</h3>
              <p className="text-gray-600">
                Mọi giao dịch đều được bảo mật và công khai minh bạch. Quy trình thẩm định nghiêm ngặt đảm bảo chất lượng dự án.
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Hiệu quả cao</h3>
              <p className="text-gray-600">
                Các dự án được thẩm định kỹ lưỡng bởi chuyên gia, đảm bảo chất lượng và hiệu quả đầu tư tối đa cho nhà đầu tư.
              </p>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Cộng đồng mạnh mẽ</h3>
              <p className="text-gray-600">
                Kết nối cộng đồng nhà đầu tư và doanh nghiệp, tạo cơ hội phát triển bền vững và mở rộng mạng lưới kinh doanh.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile App Promo */}
      <MobileAppPromo />
      
      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;