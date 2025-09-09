import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

interface CampaignCardProps {
    id?: string;
    title: string;
    description: string;
    fundingGoal: number;
    currentFunding: number;
    imageUrl: string;
    daysLeft?: number;
    companyName?: string;
    industry?: string;
    onClick?: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
    id,
    title,
    description,
    fundingGoal,
    currentFunding,
    imageUrl,
    daysLeft = 30,
    companyName = '',
    industry = '',
    onClick,
}) => {
    const progressPercentage = (currentFunding / fundingGoal) * 100;

    // Format numbers to currency
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Truncate description if too long
    const truncateDescription = (text: string, maxLength = 100): string => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    // Truncate title if too long
    const truncateTitle = (text: string, maxLength = 50): string => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
            <div className="relative">
                <div className="relative h-52 w-full">
                    <img 
                        src={imageUrl || "https://via.placeholder.com/600x400/2a4365/e2e8f0/?text=Campaign"}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/600x400/2a4365/e2e8f0/?text=Campaign";
                        }}
                    />
                </div>
                
                {/* Category tag */}
                {industry && (
                    <div className="absolute top-0 left-0 bg-navy-700 text-white px-3 py-1 m-3 rounded-full text-xs font-medium">
                        {industry}
                    </div>
                )}
                
                {/* Funding progress badge */}
                <div className="absolute top-0 right-0 bg-yellow-400 text-navy-900 px-3 py-1 m-3 rounded-full text-xs font-bold">
                    {progressPercentage.toFixed(0)}% đã đạt
                </div>
            </div>
            
            <div className="p-5 flex-grow flex flex-col">
                {companyName && (
                    <div className="text-sm text-navy-600 font-medium mb-1">{companyName}</div>
                )}
                
                <h2 className="text-xl font-bold text-navy-800 mb-2 line-clamp-2">{truncateTitle(title)}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">{truncateDescription(description)}</p>
                
                <div className="mt-auto">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Mục tiêu:</span>
                        <span className="font-semibold text-navy-800">{formatCurrency(fundingGoal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">Đã gọi được:</span>
                        <span className="font-semibold text-navy-600">{formatCurrency(currentFunding)}</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                            className="bg-gradient-to-r from-navy-600 to-navy-800 h-2 rounded-full"
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mb-4">
                        <span>{daysLeft} ngày còn lại</span>
                        <span>{progressPercentage.toFixed(0)}% hoàn thành</span>
                    </div>
                </div>
                
                {onClick ? (
                    <Button
                        onClick={onClick}
                        variant="primary"
                        className="w-full"
                        size="md"
                    >
                        Xem chi tiết
                    </Button>
                ) : (
                    <Link href={`/campaigns/${id}`} className="block w-full">
                        <Button
                            variant="primary"
                            className="w-full"
                            size="md"
                        >
                            Xem chi tiết
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CampaignCard;