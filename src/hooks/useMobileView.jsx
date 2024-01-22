import { useState, useEffect } from 'react';


// 뷰포트 기준 768 이하로 축소될시 , 함수나 컴포넌트 등의 실행여부를 결정하는 커스텀 훅
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




// 실제로 모바일 기기를 USER-AGENT를 통해 감지하는 커스텀 훅
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  return isMobile;
};

