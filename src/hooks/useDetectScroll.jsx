import { useState, useEffect } from "react";

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
 