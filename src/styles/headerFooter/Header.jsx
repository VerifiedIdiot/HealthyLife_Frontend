import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./headerComponents/Logo";
import Navigation from "./headerComponents/Navigation";
import useHalfView from "../../hooks/useHalfView";
// import useMobileView from "../../hooks/useMobileView";
// 라이브러리 영역
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useIsMobile } from "../../hooks/useMobileView";
import ModalStyle from "../../styles/headerFooter/headerComponents/Navigation";




const StyledHeader = styled.header.attrs({
  className: "header-wrap",
})`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 60px;
  position: ${(props) => props.$position || "static"};
  top: 0;
  left: 0;
  z-index: 998;
  background-color: ${(props) =>
    props.$scrolledDown ? "white" : "transparent"};
  transition: background-color 0.5s;
  box-shadow: ${(props) =>
    props.$dynamic
      ? props.$scrolledDown
        ? "0 2px 4px rgba(0, 0, 0, 0.1)"
        : "none"
      : "0 2px 4px rgba(0, 0, 0, 0.1)"};
`;

const HeaderInner = styled.div.attrs({
  className: "header",
})`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 1200px) {
    display: block;
    font-size: 28px; 
    margin-right: 10px;
    color: #4942E4;

    &:hover {
      transform: ${props => props.$isMobile ? 'none' : 'rotate(180deg)'}; 
      transition: transform 0.5s ease-in-out; 
    }
    &:not(:hover) {
      transform: ${props => props.$isMobile ? 'none' : 'rotate(-180deg)'}; 
      transition: transform 0.5s ease-in-out; 
    }
  }
`;



const Header = ({ headerProps = {} }) => {
  const { $scrolledDown, $position, $dynamic } = headerProps;
  const isMobile = useIsMobile();
  const isHalfView = useHalfView();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (

    <StyledHeader
      $scrolledDown={$scrolledDown || false}
      $position={$position || "static"}
      $dynamic={$dynamic || true}>
      <HeaderInner>
        <Logo />
        {isHalfView ? (
          <HamburgerIcon $isMobile={isMobile} onClick={toggleNav}>
            <FontAwesomeIcon icon={faBars} />
          </HamburgerIcon>
        ) : (
            <Navigation $scrolledDown={$dynamic ? $scrolledDown : true} />
        )}
      </HeaderInner>
      {isHalfView && isNavOpen && <Navigation $scrolledDown={true} />}
    </StyledHeader>
  );
};

export default Header;
