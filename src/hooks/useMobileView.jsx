import { useState, useEffect } from 'react';

const useMobileView = (maxWidth = 768) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= maxWidth);

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= maxWidth);
    }

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [maxWidth]); // maxWidth가 변경될 때만 이펙트를 다시 실행합니다.

  return isMobileView;
};

export default useMobileView;
