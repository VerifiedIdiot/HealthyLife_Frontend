// 리액트
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "../../../hooks/useRequireAuth";
import ChattingPage from "../../../pages/ChattingPage"
// 폰트어썸 아이콘 영역
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComments,
  faCircleUser,
  faBell,
} from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../contexts/UserStore";
import Common from "../../../utils/Common";
import { Icon } from "@mui/material";

const NavContainer = styled.nav.attrs({
  className: "nav-bar",
})`
  display: flex;
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
    color: #000;
  }
`;

const Navigation = ({ $scrolledDown = true }) => {
  const { isUnauthorized } = useRequireAuth("USER");
  const [modalOpen,setModalOpen] =useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();

 const modalClick=()=>{
  setModalOpen(prev => !prev);
 }

  useEffect(() => {
    const isLogin = async () => {
      try {
        const res = await Common.IsLogin();
        // console.log(res.data + "로그인 중입니다.");
        localStorage.setItem("loginStatus", res.data);
        setLoginStatus(res.data);
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생:", error);
      }
    };
    isLogin();
  }, [loginStatus]);

  const logOutClick = () => {
    localStorage.setItem("loginStatus", "false");
    Common.setAccessToken("");
    Common.setRefreshToken("");
    navigate("/");
    setLoginStatus(false);
  };

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
          onClick={() => navigate("/communitypage")}
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
      <NavContainer $width="auto">
        {loginStatus ? (
          // 로그인 상태일 때
          <>
          <NavLink $scrolledDown={$scrolledDown} onClick={modalClick}>
              <p>채팅</p>
          </NavLink>
          <ChattingPage modalOpen={modalOpen}/>
            <NavLink $scrolledDown={$scrolledDown} onClick={logOutClick}>
              <p>LogOut</p>
            </NavLink>
          </>
        ) : (
          // 로그아웃 상태일 때
          <>
            <NavLink
              $scrolledDown={$scrolledDown}
              onClick={() => navigate("/login")}
            >
              <p>LogIn/SignIn</p>
            </NavLink>
          </>
        )}
      </NavContainer>
    </>
  );
};

export default Navigation;
