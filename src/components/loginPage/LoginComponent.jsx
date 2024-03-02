import { Area, Container, Main, Section } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import { useNavigate } from "react-router";
import logo from "../../assets/icons/logo.svg";
import styled from "styled-components";
import { media } from "../../utils/MediaQuery";
import { useContext, useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import Common from "../../utils/Common";
import kakaoimg from "../../assets/imgs/KakaoTalk.png";
import { UserContext } from "../../contexts/UserStore";
const MainStyle = styled(Main)`
  ${media.small`
    flex-direction:column;
    width: 70%;
    height: 100vh;
    justify-content: center;
    align-items: center;
`}
`;

const ContainerStyle = styled(Container)`
  ${media.small`
    width: 100%;
    background-color: white;
    box-shadow: none;
    height: 15%;
`}
`;

const Container2Style = styled(Container)`
  ${media.small`
    width: 100%;
    box-shadow: none;
    height: 30%;
`}
`;

const Sectionjoin = styled(Section)`
  ${media.small`
    height: 100%;
    width: 100%;
`}
`;

const SectionStyle = styled(Section)`
  ${media.small`
    height: 100%;
    width: 100%;
`}
`;

const AreaStyle = styled(Area)`
  ${media.small`
    font-size: 0.9em;
    justify-content: end;
    .memberYet {
      display: none;
    }

`}
`;

const LoginComp = () => {
  const navigate = useNavigate();
  const loginNavigate = useNavigate();
  const joinNavigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus } = context;

  //키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const onChangePw = (e) => {
    setInputPw(e.target.value);
  };

  // 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // console.log("id:" + inputEmail);
    // console.log("pw:" + inputPw);

    // 이메일 + 비밀번호 입력시 로그인 버튼 활성화
    if (inputEmail.length > 0 && inputPw.length > 0) setIsActive(true);
    else setIsActive(false);
  }, [inputEmail, inputPw]);

  const loginClick = async () => {
    try {
      const res = await MemberApi.login(inputEmail, inputPw);
      // console.log("tlqkf" + res.data);
      if (res.data.grantType === "Bearer") {
        // console.log("성공");
        // console.log("엑세스토큰나와 ! " + res.data.accessToken);
        // console.log("리프레시토큰나와 ! " + res.data.refreshToken);
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        setLoginStatus(true);
        if (inputEmail === "admin") {
          navigate("/ad");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log("로그인 에러 : " + err);
      if (err.response && err.response.status === 401) {
        console.log("로그인 실패: 401 Unauthorized");
        console.log("잘못된 아이디 또는 비밀번호 입니다.");
      } else {
        console.log("로그인 에러 : " + err);
        console.warn("서버와의 연결이 끊어졌습니다!");
        console.log(inputEmail);
        console.log(inputPw);
      }
    }
  };

  // 엔터 키 입력 이벤트 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginClick(); // 엔터 키가 눌리면 로그인 클릭 함수 호출
    }
  };
  // 카카오 로그인
  const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_URL;
  };
  return (
    <>
      <MainStyle $direction="row" $width="100%" $height="100vh">
        <ContainerStyle
          $width="50%"
          $display="flex"
          $direction="column"
          $background="#F3F3F3"
          $height="100%"
          $padding="0 10px"
        >
          <Section
            $height="95%"
            $display="flex"
            $justify="center"
            $align="center"
          >
            <img
              src={logo}
              alt="로고이미지"
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
              }}
            />
          </Section>
          <Sectionjoin $height="5%" $shadow="none" $width="100%">
            <AreaStyle
              $shadow="none"
              $width="100%"
              $height="100%"
              $align="center"
            >
              <p
                className="memberYet"
                style={{
                  marginRight: "10px",
                }}
              >
                Not a member yet?
              </p>
              <p
                className="register"
                style={{
                  borderBottom: "2px solid black",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => joinNavigate("/join")}
              >
                Register now
              </p>
            </AreaStyle>
            {/* <AreaStyle $shadow="none" $width="25%" $height="50%"></AreaStyle> */}
          </Sectionjoin>
        </ContainerStyle>
        <Container2Style
          $width="50%"
          $direction="column"
          $padding="0 15px"
          $height="100%"
          $display="flex"
          $justify="center"
          $align="center"
        >
          <SectionStyle
            $height="30%"
            $direction="column"
            $display="flex"
            $justify="center"
            $align="center"
          >
            <Area
              $direction="column"
              $shadow="none"
              $height="25%"
              $marginBottom="10px"
              $borderBottom="1px solid black"
            >
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                EMAIL (*)
              </p>
              <input
                type="text"
                placeholder="이메일(example@naver.com)"
                value={inputEmail}
                onChange={onChangeEmail}
                style={{
                  border: "none",
                  padding: "15px 5px",
                  outline: "none",
                }}
              />
            </Area>
            <Area
              $direction="column"
              $height="25%"
              $shadow="none"
              $marginBottom="20px"
              $borderBottom="1px solid black"
            >
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                PASSWORD (*)
              </p>
              <input
                type="password"
                placeholder="비밀번호"
                value={inputPw}
                onKeyDown={handleKeyDown}
                onChange={onChangePw}
                style={{
                  border: "none",
                  padding: "15px 5px",
                  outline: "none",
                }}
              />
            </Area>
            <Area $justify="center" $align="center" $shadow="none">
              <LargeButton onClick={() => loginClick("로그인, true")}>
                로그인
              </LargeButton>
            </Area>
            <Area
              $display="flex"
              $align="center"
              $shadow="none"
              $justify="center"
            >
              <LargeButton
                style={{
                  backgroundImage: `url(${kakaoimg})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                onClick={() => handleLogin()}
              ></LargeButton>
            </Area>
          </SectionStyle>
        </Container2Style>
      </MainStyle>
    </>
  );
};

export default LoginComp;
