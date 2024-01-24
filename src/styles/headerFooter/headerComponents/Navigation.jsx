// 리액트
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "../../../hooks/useRequireAuth";

// 폰트어썸 아이콘 영역
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComments,
  faCircleUser,
  faBell,
} from "@fortawesome/free-regular-svg-icons";

const NavContainer = styled.nav.attrs({
  className: "nav-bar",
})`
  display: flex;
  justify-content: space-around;
  justify-content: ${(props) => props.$justify || "space-around"};
  align-items: center;
  height: 100%;
  width: ${(props) => props.$width || "60%"};
  /* border: 1px solid black; */
`;

const NavLink = styled.div.attrs({
  className: "nav-item",
})`
  cursor: pointer;
  p {
    font-size: 1.5rem;
    color: ${(props) => (props.$scrolledDown ? "black" : "white")};
  }
  &.hover {
  }
`;

const Navigation = ({ $scrolledDown = true }) => {
  const { isUnauthorized } = useRequireAuth("USER");
  const navigate = useNavigate();

  return (
    <>
      <NavContainer>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/inbody")}
        >
          <p>Inbody</p>
        </NavLink>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/calendar")}
        >
          <p>Calendar</p>
        </NavLink>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/information")}
        >
          <p>Information</p>
        </NavLink>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/community")}
        >
          <p>Community</p>
        </NavLink>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/ranking")}
        >
          <p>Ranking</p>
        </NavLink>
      </NavContainer>
      <NavContainer $width="15%" $justify="">
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/login")}
        >
          <p>LogIn/SignIn</p>
        </NavLink>
      </NavContainer>
    </>
  );
};

export default Navigation;
