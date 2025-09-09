import React from 'react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    industry: string;
    raised: number;
    target: number;
    endDate?: Date;
    summary: string;
  };
  progress: number;
  daysRemaining: number;
  formatCurrency: (amount: number) => string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, progress, daysRemaining, formatCurrency }) => {
  // Determine color scheme based on project
  const getColorScheme = () => {
    if (project.title?.includes('TechLink')) {
      return {
        gradient: 'from-blue-500 to-blue-700',
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200'
      };
    }
    if (project.title?.includes('Green Farm')) {
      return {
        gradient: 'from-green-500 to-green-700',
        bg: 'bg-green-100', 
        text: 'text-green-600',
        border: 'border-green-200'
      };
    }
    if (project.title?.includes('Smart Health')) {
      return {
        gradient: 'from-red-500 to-red-700',
        bg: 'bg-red-100',
        text: 'text-red-600', 
        border: 'border-red-200'
      };
    }
    return {
      gradient: 'from-purple-500 to-purple-700',
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200'
    };
  };

  const colorScheme = getColorScheme();

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
      {/* Gradient Header Image */}
      <div className="h-56 relative overflow-hidden">
        <div className={`w-full h-full flex items-center justify-center text-white text-center p-6 bg-gradient-to-br ${colorScheme.gradient}`}>
          <div className="transform group-hover:scale-105 transition-transform duration-500">
            <h3 className="font-bold text-xl mb-2">{project.title}</h3>
            <p className="text-sm opacity-90">Dự án {project.industry}</p>
            <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs">
              Startup Innovation
            </div>
          </div>
        </div>
        
        {/* Industry Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
          {project.industry}
        </div>
        
        {/* Investment Type Badge */}
        <div className="absolute top-4 left-4 bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          Equity
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {project.summary}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Tiến độ gọi vốn</span>
            <span className={`text-sm font-bold ${colorScheme.text}`}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full bg-gradient-to-r ${colorScheme.gradient} transition-all duration-700 ease-out`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Đã gọi được</p>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(project.raised)} VND
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Mục tiêu</p>
            <p className="text-sm font-semibold text-gray-700">
              {formatCurrency(project.target)} VND
            </p>
          </div>
        </div>
        
        {/* Action Button */}
        <button className={`w-full ${colorScheme.bg} ${colorScheme.text} hover:opacity-80 font-semibold py-3 px-4 rounded-xl transition-all duration-300 border ${colorScheme.border} hover:shadow-md`}>
          Xem chi tiết dự án
        </button>
        
        {/* Days Remaining */}
        {daysRemaining > 0 && (
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500">
              Còn <span className="font-bold text-orange-600">{daysRemaining} ngày</span> để đầu tư
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
