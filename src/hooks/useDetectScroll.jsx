import { useState, useEffect } from "react";


// 특정 영역에서 스크롤을 위에서 아래로 10% 움직일시 상호작용하는 커스텀 훅
const useDetectScroll = () => {
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolledDown(offset > window.innerHeight * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 

  return scrolledDown;
};

export default useDetectScroll;
 