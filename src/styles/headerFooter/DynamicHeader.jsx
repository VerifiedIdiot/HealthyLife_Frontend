import React from "react";
import styled from "styled-components";
import Logo from "./headerComponents/Logo";
import Navigation from "./headerComponents/Navigation";
import useDetectScroll from "../../hooks/useDetectScroll";

const DynamicStyledHeader = styled.header`
  margin: 0;
  padding: 0;
  border: 1px solid black;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  background-color: ${(props) => (props.$scrolledDown ? "white" : "transparent")};
  transition: background-color 0.3s;
  
`;

const DynamicHeaderInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const DynamicHeader = () => {
  
  const scrolledDown = useDetectScroll();


  return (
    <DynamicStyledHeader $scrolledDown={scrolledDown}>
      <DynamicHeaderInner>
        <Logo />
        <Navigation />
      </DynamicHeaderInner>
    </DynamicStyledHeader>
  );
};

export default DynamicHeader;