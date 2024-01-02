import { useState, useEffect } from 'react';

export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};