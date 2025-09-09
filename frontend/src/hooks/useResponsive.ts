import { useEffect, useState } from 'react';

const breakpoints = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
};

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  });

  const handleResize = () => {
    const width = window.innerWidth;
    setScreenSize({
      isMobile: width < breakpoints.mobile,
      isTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
      isLaptop: width >= breakpoints.tablet && width < breakpoints.laptop,
      isDesktop: width >= breakpoints.laptop,
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useResponsive;