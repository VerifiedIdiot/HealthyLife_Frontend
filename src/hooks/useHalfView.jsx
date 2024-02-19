// 화면 반을 기준으로 미디어쿼리를 실행시키는 커스텀훅


import { useState, useEffect } from 'react';

const useHalfView = (maxWidth = 768) => {
  const [isHalfView, setIsHalfView] = useState(window.innerWidth <= maxWidth);

  useEffect(() => {
    function handleResize() {
      setIsHalfView(window.innerWidth <= maxWidth);
    }

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [maxWidth]); // maxWidth가 변경될 때만 이펙트를 다시 실행합니다.

  return isHalfView;
};

export default useHalfView;
