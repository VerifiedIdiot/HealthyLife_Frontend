import { Outlet, useNavigate } from "react-router";
import {
  Main,
  Container,
  Section,
} from "../styles/Layouts";
import { useState } from "react";
import logo from "../assets/icons/logo.svg";
import styled from "styled-components";

const Menus = styled.div`
  color: #2b2a2a;
  cursor: pointer;

  &:active,
  &:focus,
  &.active {
    color: black;
    font-weight: bold;
  }

  &:hover p {
    color: #f95001;
    transition: all 0.3s;
  }
`;

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");

  function handleClick(menu) {
    navigate(`/ad/${menu}`);
    setActiveMenu(menu);
  }

  return (
    <>
      <Main $width="100%" $position="relative">
        <Container
          $width="15vw"
          $height="100vh"
          $background="#fff"
          $color="#f3eeea"
          $padding="10px"
          $shadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
          $position="fixed"
          $align="center"
          $justify="center"
        >
          <Section $width="50%" $height="70px">
            {" "}
            <img
              src={logo}
              alt="로고이미지"
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
            />
          </Section>
          <hr
            style={{
              borderBottom: "0.5px solid #999999",
              width: "100%",
              margin: "10%",
            }}
          />
          <Menus
            className={activeMenu === "" ? "active" : ""}
            onClick={() => handleClick("")}
          >
            <p>대쉬보드</p>
          </Menus>
          <hr
            style={{
              borderBottom: "0.5px solid #999999",
              width: "100%",
              margin: "10%",
            }}
          />
          <Menus
            className={activeMenu === "" ? "active" : ""}
            onClick={() => handleClick("member")}
          >
            <p>회원 관리</p>
          </Menus>
          <hr
            style={{
              borderBottom: "0.5px solid #999999",
              width: "100%",
              margin: "10%",
            }}
          />
          <Menus
            className={activeMenu === "" ? "active" : ""}
            onClick={() => handleClick("community")}
          >
            <p>게시글 관리</p>
          </Menus>

          <hr
            style={{
              borderBottom: "0.5px solid #999999",
              width: "100%",
              margin: "10%",
            }}
          />
          <Menus
            className={activeMenu === "" ? "active" : ""}
            onClick={() => handleClick("category")}
          >
            <p>카테고리 등록</p>
          </Menus>

          <hr
            style={{
              borderBottom: "0.5px solid #999999",
              width: "100%",
              margin: "10%",
            }}
          />
        </Container>
      </Main>
      <Outlet />
    </>
  );
};
export default AdminPage;
