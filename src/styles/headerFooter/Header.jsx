import React from "react";
import styled from "styled-components";
import Logo from "./headerComponents/Logo";
import Navigation from "./headerComponents/Navigation";


const StyledHeader = styled.header`
  margin: 0;
  padding: 0;
  border: 1px solid black;
  width: 99.9%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  background-color: ${(props) => (props.$scrolledDown ? "white" : "transparent")};
  transition: background-color 0.3s;
  
`;

const HeaderInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Header = () => {
  
  


  return (
    <StyledHeader>
      <HeaderInner>
        <Logo />
        <Navigation />
      </HeaderInner>
    </StyledHeader>
  );
};

export default Header;
