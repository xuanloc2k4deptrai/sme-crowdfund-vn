import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fallbackType?: 'gradient' | 'pattern' | 'business' | 'solid';
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  fallbackType = 'business'
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Business-themed base64 images
  const businessImages = {
    meeting: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMTAwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgcng9IjIwIiBmaWxsPSIjMkQ1NThCIi8+CjxyZWN0IHg9IjE1MCIgeT0iMTUwIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgcng9IjEwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIwMCIgeT0iMjAwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyMCIgZmlsbD0iIzM0RDM5OSIvPgo8cmVjdCB4PSIyNzAiIHk9IjIwMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNGNTlFMEIiLz4KPHJlY3QgeD0iMzQwIiB5PSIyMDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjIwIiBmaWxsPSIjOEI1Q0Y2Ii8+CjxyZWN0IHg9IjQxMCIgeT0iMjAwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyMCIgZmlsbD0iI0VGNDQ0NCIvPgo8dGV4dCB4PSI0MDAiIHk9IjMyMCIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QnVzaW5lc3MgTWVldGluZzwvdGV4dD4KPHR5ZXh0IHg9IjQwMCIgeT0iMzUwIiBmaWxsPSIjNjM3MjhCIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNNRSBDcm93ZGZ1bmRpbmcgUGxhdGZvcm08L3RleHQ+Cjwvc3ZnPgo=",
    
    tech: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMTExODI3Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTAwIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgcng9IjE1IiBmaWxsPSIjMUYyOTM3IiBzdHJva2U9IiM0Rjc5QTQiIHN0cm9rZS13aWR0aD0iMiIvPgo8cmVjdCB4PSIyMDAiIHk9IjE1MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMCIgZmlsbD0iIzBGMTcyQSIvPgo8Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMDAiIHI9IjE1IiBmaWxsPSIjMzREMzk5Ii8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjIwMCIgcj0iMTUiIGZpbGw9IiNGNTlFMEIiLz4KPGNpcmNsZSBjeD0iNTAwIiBjeT0iMjAwIiByPSIxNSIgZmlsbD0iI0VGNDQ0NCIvPgo8cmVjdCB4PSIyNTAiIHk9IjI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzRGNzlBNCIvPgo8cmVjdCB4PSIyNTAiIHk9IjI3MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzRGNzlBNCIvPgo8cmVjdCB4PSIyNTAiIHk9IjI5MCIgd2lkdGg9IjI1MCIgaGVpZ2h0PSI0IiByeD0iMiIgZmlsbD0iIzRGNzlBNCIvPgo8dGV4dCB4PSI0MDAiIHk9IjQ1MCIgZmlsbD0iI0Y5RkFGQiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VGVjaCBTdGFydHVwPC90ZXh0Pgo8dGV4dCB4PSI0MDAiIHk9IjQ4MCIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JUFA0PTwvdGV4dD4KPC9zdmc+Cg==",
    
    food: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRkVGM0MyIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI1MCIgcj0iMTAwIiBmaWxsPSIjRjU5RTBCIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI1MCIgcj0iNzAiIGZpbGw9IiNFRjQ0NDQiLz4KPGNpcmNsZSBjeD0iMzgwIiBjeT0iMjMwIiByPSIxNSIgZmlsbD0iIzM0RDM5OSIvPgo8Y2lyY2xlIGN4PSI0MjAiIGN5PSIyMzAiIHI9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI3MCIgcj0iMTAiIGZpbGw9IiM5MjQwMEQiLz4KPHJlY3QgeD0iMzUwIiB5PSIzNzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIHJ4PSIyMCIgZmlsbD0iIzkyNDAwRCIvPgo8dGV4dCB4PSI0MDAiIHk9IjQ1MCIgZmlsbD0iIzkyNDAwRCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Rm9vZCAmIEJldmVyYWdlPC90ZXh0Pgo8dGV4dCB4PSI0MDAiIHk9IjQ4MCIgZmlsbD0iIzc4MzUwRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GJTQ5PTwvdGV4dD4KPC9zdmc+Cg==",
    
    finance: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMEY0QzQ2Ii8+CjxyZWN0IHg9IjE1MCIgeT0iMTUwIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgcng9IjIwIiBmaWxsPSIjMTU4MDMwIi8+CjxjaXJjbGUgY3g9IjQwMCIgY3k9IjI1MCIgcj0iNDAiIGZpbGw9IiNGRkZGRkYiLz4KPHN0cm9rZSB4MSI9IjM4MCIgeTE9IjI1MCIgeDI9IjQyMCIgeTI9IjI1MCIgc3Ryb2tlPSIjMTU4MDMwIiBzdHJva2Utd2lkdGg9IjQiLz4KPHN0cm9rZSB4MT0iNDAwIiB5MT0iMjMwIiB4Mj0iNDAwIiB5Mj0iMjcwIiBzdHJva2U9IiMxNTgwMzAiIHN0cm9rZS13aWR0aD0iNCIvPgo8cmVjdCB4PSIyNDAiIHk9IjM0MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjMxMCIgeT0iMzIwIiB3aWR0aD0iNTAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMzgwIiB5PSIzMDAiIHdpZHRoPSI1MCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iNDUwIiB5PSIzMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI1MjAiIHk9IjMzMCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iNDU1IiBmaWxsPSIjRkZGRkZGIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5GaW5hbmNlICYgSW52ZXN0bWVudDwvdGV4dD4KPHR5ZXh0IHg9IjQwMCIgeT0iNDg1IiBmaWxsPSIjQ0NENEROIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZJTkFOQ0U8L3RleHQ+Cjwvc3ZnPgo=",
    
    retail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNzgzNUYwIi8+CjxyZWN0IHg9IjEwMCIgeT0iMTAwIiB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgcng9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjE1MCIgeT0iMTUwIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgcng9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjIwMCIgeT0iMjAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0Y5RkFGQiIgc3Ryb2tlPSIjRDFEMUQ2IiBzdHJva2Utd2lkdGg9IjEiLz4KPHJlY3QgeD0iMzUwIiB5PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjlGQUZCIiBzdHJva2U9IiNEMUQxRDYiIHN0cm9rZS13aWR0aD0iMSIvPgo8cmVjdCB4PSI1MDAiIHk9IjIwMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGOUZBRkIiIHN0cm9rZT0iI0QxRDFENiIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxyZWN0IHg9IjIwMCIgeT0iMzMwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0Y5RkFGQiIgc3Ryb2tlPSIjRDFEMUQ2IiBzdHJva2Utd2lkdGg9IjEiLz4KPHJlY3QgeD0iMzUwIiB5PSIzMzAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjlGQUZCIiBzdHJva2U9IiNEMUQxRDYiIHN0cm9rZS13aWR0aD0iMSIvPgo8cmVjdCB4PSI1MDAiIHk9IjMzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNGOUZBRkIiIHN0cm9rZT0iI0QxRDFENiIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTUiIGZpbGw9IiNGNTlFMEIiLz4KPGNpcmNsZSBjeD0iNDAwIiBjeT0iMjUwIiByPSIxNSIgZmlsbD0iIzM0RDM5OSIvPgo8Y2lyY2xlIGN4PSI1NTAiIGN5PSIyNTAiIHI9IjE1IiBmaWxsPSIjRUY0NDQ0Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iNDY1IiBmaWxsPSIjRkZGRkZGIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SZXRhaWwgJiBDb21tZXJjZTwvdGV4dD4KPHR5ZXh0IHg9IjQwMCIgeT0iNDk1IiBmaWxsPSIjRUVFRkYyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlJFVEFJTDwvdGV4dD4KPC9zdmc+Cg=="
  };

  const getBusinessImage = (fallbackType: string, altText: string) => {
    const text = altText.toLowerCase();
    
    // Priority 1: Use fallbackType mapping
    if (fallbackType === 'gradient') {
      return businessImages.tech;
    } else if (fallbackType === 'pattern') {
      return businessImages.food;
    } else if (fallbackType === 'solid') {
      return businessImages.finance;
    }
    
    // Priority 2: Use alt text keywords
    if (text.includes('tech') || text.includes('ai') || text.includes('software')) {
      return businessImages.tech;
    } else if (text.includes('food') || text.includes('restaurant') || text.includes('cafe')) {
      return businessImages.food;
    } else if (text.includes('finance') || text.includes('bank') || text.includes('investment')) {
      return businessImages.finance;
    } else if (text.includes('retail') || text.includes('shop') || text.includes('store')) {
      return businessImages.retail;
    } else {
      // Default to meeting for general business
      return businessImages.meeting;
    }
  };

  const getFallbackBackground = () => {
    switch (fallbackType) {
      case 'gradient':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'pattern':
        return 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)';
      case 'solid':
        return 'linear-gradient(135deg, #065f46 0%, #047857 100%)';
      default:
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }
  };

  if (imageError || !src) {
    return (
      <div 
        className={`relative overflow-hidden ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
          backgroundImage: `url("${getBusinessImage(fallbackType, alt)}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...style
        }}
      />
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            background: getFallbackBackground(),
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
        }}
      />
    </div>
  );
};

export default ImageWithFallback;
