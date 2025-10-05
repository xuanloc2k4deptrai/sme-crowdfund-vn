import React, { useState, useCallback } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style,
}) => {
  const [imageError, setImageError] = useState(false);

  // Business-themed simple colored rectangles with icons
  const businessImages = {
    meeting: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiM0ZjQ2ZTUiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5CVVNJTEVTUZBTWUVFVEFOR148L3RleHQ+PC9zdmc+",
    tech: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMxZTE5NDciLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5URUNITk9MT0dZPC90ZXh0Pjwvc3ZnPg==",
    food: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmNTllMGIiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GT09EICZhbXA7IEFHUkk8L3RleHQ+PC9zdmc+",
    finance: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwZjU0NzMiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GSU5BTkNFICZhbXA7IE1FRElDQUw8L3RleHQ+PC9zdmc+",
    retail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiM3ODM1ZjAiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5SRVRBSUwgJmFtcDsgQ09NTUVSQ0U8L3RleHQ+PC9zdmc+"
  };

  const getBusinessImage = useCallback((altText: string) => {
    const text = altText.toLowerCase();
    
    if (text.includes('techlink') || text.includes('tech') || text.includes('công nghệ') || text.includes('ai') || 
        text.includes('nền tảng') || text.includes('hệ thống') || text.includes('phần mềm')) {
      return businessImages.tech;
    }
    
    if (text.includes('nông sản') || text.includes('greenfarm') || text.includes('food') || text.includes('thực phẩm') || 
        text.includes('nông nghiệp') || text.includes('farm') || text.includes('hữu cơ') || text.includes('green')) {
      return businessImages.food;
    }
    
    if (text.includes('mediconnect') || text.includes('finance') || text.includes('tài chính') || text.includes('y tế') || 
        text.includes('medical') || text.includes('health') || text.includes('sức khỏe') || text.includes('bệnh viện') ||
        text.includes('medic') || text.includes('kết nối')) {
      return businessImages.finance;
    }
    
    if (text.includes('retail') || text.includes('bán lẻ') || text.includes('thương mại') || 
        text.includes('cửa hàng') || text.includes('shop')) {
      return businessImages.retail;
    }
    
    return businessImages.meeting;
  }, [businessImages]);

  // Determine final image source with error handling
  const finalImageSrc = imageError || !src || src.trim() === '' || src === '/images/undefined' 
    ? getBusinessImage(alt) 
    : src;

  const handleImageError = useCallback(() => {
    if (!imageError) {
      setImageError(true);
    }
  }, [imageError]);

  return (
    <div className={`relative ${className}`} style={style}>
      <img
        src={finalImageSrc}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleImageError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default ImageWithFallback;
