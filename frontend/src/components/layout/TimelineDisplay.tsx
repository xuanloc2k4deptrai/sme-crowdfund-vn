import React from "react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isActive?: boolean;
  darkMode?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, isActive = false, darkMode = false }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className={`absolute left-8 top-0 h-full w-0.5 ${darkMode ? "bg-navy-700" : "bg-gray-200"}`}></div>
      
      <div className="relative flex items-start group">
        {/* Year circle */}
        <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center z-10 
          ${isActive 
            ? "bg-navy-800 text-white shadow-lg" 
            : darkMode 
              ? "bg-navy-800 text-yellow-400 border-2 border-navy-700 group-hover:border-navy-600" 
              : "bg-white text-navy-800 border-2 border-navy-200 group-hover:border-navy-400"} 
          transition-all duration-300`}>
          <span className="font-bold">{year}</span>
        </div>
        
        {/* Content */}
        <div className="ml-8 pb-12">
          <h3 className={`text-xl font-bold mb-2 ${
            isActive 
              ? darkMode ? "text-yellow-400" : "text-navy-800" 
              : darkMode 
                ? "text-white group-hover:text-yellow-400" 
                : "text-gray-800 group-hover:text-navy-700"
            } transition-colors duration-300`}>
            {title}
          </h3>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

interface TimelineProps {
  title: string;
  subtitle?: string;
  darkMode?: boolean;
}

const TimelineDisplay: React.FC<TimelineProps> = ({ title, subtitle, darkMode = false }) => {
  return (
    <section className={`py-20 ${darkMode ? "bg-navy-950" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`${darkMode ? "bg-navy-800 text-yellow-400" : "bg-navy-100 text-navy-800"} text-sm font-medium px-4 py-1.5 rounded-full`}>
            Hành trình phát triển
          </span>
          <h2 className={`mt-6 text-3xl sm:text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-4 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-3xl mx-auto`}>
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <TimelineItem 
            year="2020" 
            title="Khởi nguồn ý tưởng" 
            description="Ý tưởng về một nền tảng gọi vốn cộng đồng dành riêng cho các doanh nghiệp vừa và nhỏ tại Việt Nam bắt đầu hình thành."
            darkMode={darkMode}
          />
          
          <TimelineItem 
            year="2021" 
            title="Thành lập công ty" 
            description="SME CrowdFund chính thức được thành lập với sứ mệnh kết nối doanh nghiệp SME với nhà đầu tư thông qua nền tảng công nghệ hiện đại."
            darkMode={darkMode}
          />
          
          <TimelineItem 
            year="2022" 
            title="Ra mắt phiên bản Beta" 
            description="Nền tảng ra mắt phiên bản Beta với 10 dự án thí điểm đầu tiên và đạt tỷ lệ thành công 100%."
            isActive={true}
            darkMode={darkMode}
          />
          
          <TimelineItem 
            year="2023" 
            title="Mở rộng quy mô" 
            description="Mở rộng hoạt động trên toàn quốc với hơn 200 dự án gọi vốn thành công và tổng số tiền huy động đạt 500 tỷ đồng."
            darkMode={darkMode}
          />
          
          <TimelineItem 
            year="2024" 
            title="Hợp tác quốc tế" 
            description="Bắt đầu hợp tác với các đối tác quốc tế, mở rộng cơ hội đầu tư cho doanh nghiệp Việt Nam từ các nhà đầu tư nước ngoài."
            darkMode={darkMode}
          />
          
          <div className="relative">
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-16 h-16 rounded-full ${
                darkMode 
                  ? "bg-navy-800 text-gray-400 border-2 border-navy-700" 
                  : "bg-navy-100 text-navy-800 border-2 border-navy-200"
                } flex items-center justify-center z-10`}>
                <span className="font-bold">2025</span>
              </div>
              
              <div className="ml-8">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-400"}`}>Tương lai</h3>
                <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} italic`}>Tiếp tục sứ mệnh hỗ trợ doanh nghiệp SME Việt Nam phát triển bền vững...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineDisplay;
