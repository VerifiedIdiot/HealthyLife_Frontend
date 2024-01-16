import React from "react";
import useDetectScroll from "../../hooks/useDetectScroll";
import Header from "./Header";

const DynamicHeader = () => {
  const scrolledDown = useDetectScroll();

  return <Header $scrolledDown={scrolledDown} $position ="fixed"/>;
};

export default DynamicHeader;
