import React from "react";
import styled from "styled-components";
import Logo from "./headerComponents/Logo";
import Navigation from "./headerComponents/Navigation";

const StyledHeader = styled.header`
  margin: 0;
  padding: 0;
  border: 1px solid black;
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 998;
  
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
