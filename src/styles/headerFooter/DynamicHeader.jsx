import React from "react";
import useDetectScroll from "../../hooks/useDetectScroll";
import Header from "./Header";

const DynamicHeader = () => {
  const scrolledDown = useDetectScroll();

  return (
    <Header
      headerProps={{
        $scrolledDown: scrolledDown,
        $position: "fixed",
        $dynamic: true,
      }}
    />
  );
};

export default DynamicHeader;
