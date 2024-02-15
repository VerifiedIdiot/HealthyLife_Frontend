// 리액트
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ChattingPage from "../../../pages/ChattingPage";
import chatIcon from "../../../assets/icons/Header/chaticon.png";
import userIcon from "../../../assets/icons/Header/usericon.png";
import useHalfView from "../../../hooks/useHalfView";

import Common from "../../../utils/Common";

const NavContainer = styled.nav.attrs({
  className: "nav-bar",
})`
  display: flex;
  justify-content: ${(props) => props.$justify || "space-around"};
  align-items: center;
  height: 100%;
  background-color: white;
  width: ${(props) => props.$width || "60%"};
  /* border: 1px solid black; */

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: auto;
  }
`;

const NavLink = styled.div.attrs({
  className: "nav-item",
})`
  cursor: pointer;
  /* width: ${(props) => props.$width || "80%"}; */
  margin-left: ${(props) => props.$marginLeft || "0"};

  @media (max-width: 1200px) {
      
    }

  p {
    font-size: 1.2rem;
    color: ${(props) => (props.$scrolledDown ? "black" : "white")};
    padding : 0 3vw;
    @media (max-width: 1200px) {
      margin-bottom: 10px;
    }
  }
  &.hover {
    color: #000;
  }
`;

const NavLinkIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  img {
    padding: 1vw;
  }
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;
const NavLinkText = styled.p``;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;

  @media (max-width: 1200px) {
    top: 38%;
    right: auto;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  ul li {
    padding: 10px;
    text-align: center;
  }

  ul li:hover {
    background-color: #ddd;
  }
  overflow-auto {
    max-height: 200px;
    overflow-y: auto;
  }
`;

const Navigation = ({ $scrolledDown = true }) => {
  // const { isUnauthorized } = useRequireAuth("USER");
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const isHalfView = useHalfView();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const modalClick = () => {
    setModalOpen((prev) => !prev);
  };

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
      <NavContainer $width="60%">
      <NavLinkIcon>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/inbody")}
        >
          <NavLinkText>Inbody</NavLinkText>
        </NavLink>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/information")}
        >
          <p>Information</p>
        </NavLink>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/medicine")}
        >
          <p>Medicine</p>
        </NavLink>
        <NavLink
          $scrolledDown={$scrolledDown}
          onClick={() => navigate("/communitypage")}
        >
          <p>Community</p>
        </NavLink>
        </NavLinkIcon>
      </NavContainer>

      {loginStatus ? (
        // 로그인 상태일 때
        <>
          <NavContainer $width="50%">
            <NavLinkIcon>
            <NavLink
              $scrolledDown={$scrolledDown}
              onClick={() => navigate("/calendar")}
            >
              <p>Calendar</p>
            </NavLink>
            <NavLink
              $scrolledDown={$scrolledDown}
              onClick={() => navigate("/ranking")}
            >
              <p>Ranking</p>
            </NavLink>
            </NavLinkIcon>
            <NavLinkIcon>
              <NavLink 
              $scrolledDown={$scrolledDown} 
              onClick={modalClick}>
                {isHalfView ? (
                  <p>Chatting</p>
                ) : (
                  <img src={chatIcon} width={"30px"} alt="Chat Icon" />
                )}
              </NavLink>
              <ChattingPage modalOpen={modalOpen} />

              <NavLink
                $scrolledDown={$scrolledDown}
                onClick={() => toggleDropdown()}
              >
                {isHalfView ? (
                  <p>MyPage</p>
                ) : (
                  <img src={userIcon} width={"30px"} alt="User Icon" />
                )}
              </NavLink>
              {dropdownOpen && (
                <ProfileDropdown>
                  <ul>
                    <li onClick={logOutClick}>Logout</li>
                    <li onClick={() => navigate("/mypage")}>MyPage</li>
                  </ul>
                </ProfileDropdown>
              )}
            </NavLinkIcon>
          </NavContainer>
        </>
      ) : (
        // 로그아웃 상태일 때
        <>
        <NavContainer $justify="center">
          <NavLink $marginLeft="0.3vw"
            $scrolledDown={$scrolledDown}
            onClick={() => navigate("/login")}
          >
            <p>Login/SignUp</p>
            
          </NavLink>
          </NavContainer>
        </>
      )}
    </>
  );
};

export default Navigation;
