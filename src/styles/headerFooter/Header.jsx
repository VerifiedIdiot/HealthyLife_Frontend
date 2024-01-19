import React from "react";
import styled from "styled-components";
import Logo from "./headerComponents/Logo";
import Navigation from "./headerComponents/Navigation";


const StyledHeader = styled.header.attrs({
  className: "header-wrap"
})`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 6.8vh;
  position: ${(props) => props.$position || "static"};
  top: 0;
  left: 0;
  z-index: 998;
  background-color: ${(props) => (props.$scrolledDown ? "white" : "transparent")};
  transition: background-color 0.5s;
  box-shadow: ${(props) => props.$dynamic ? (props.$scrolledDown ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none") : "0 2px 4px rgba(0, 0, 0, 0.1)"};

`;

const HeaderInner = styled.div.attrs({
  className: "header"
})`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Header = ({ headerProps = {} }) => {
  return (
    <StyledHeader
      $scrolledDown={headerProps.$scrolledDown || false}
      $position={headerProps.$position || "static"}
      $dynamic={headerProps.$dynamic || false}>
      <HeaderInner>
        <Logo />
        <Navigation />
      </HeaderInner>
    </StyledHeader>
  );
};


export default Header;
