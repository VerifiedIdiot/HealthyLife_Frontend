import { useNavigate } from "react-router";
import { Area, Container, Main, Section } from "../../styles/Layouts";
import logo from "../../assets/icons/logo.svg";
const JoinComp = () => {
  const navigate = useNavigate();
  return (
    <>
      <Main $direction="row" $width="100%">
        <Container
          $width="50%"
          $display="flex"
          $direction="column"
          $background="#F3F3F3"
          $height="100vh"
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
          <Section $height="5%">
            <p
              style={{
                paddingRight: "5px",
              }}
            >
              Not a member yet?
            </p>
            <p>Register now</p>
          </Section>
        </Container>
        <Container
          $width="50%"
          $direction="column"
          $padding="0 15px"
          $height="auto"
        >
          <Section
            $height="auto"
            $paddingTop="50px"
            $direction="column"
            border="1px solid black"
          >
            <Area>
              <img src="" alt="프로필이미지" />
            </Area>
          </Section>
          <Section
            $height="auto"
            $paddingTop="50px"
            $direction="column"
            border="1px solid black"
          >
            <p>EMAIL (*)</p>
            <input
              type="text"
              placeholder="Email을 입력해주세요."
              style={{
                borderBottom: "1px solid black",
                border: "none",
                padding: "15px 5px",
                outline: "none",
              }}
            />
            <p
              style={{
                paddingTop: "20px",
              }}
            >
              PASSWORD (*)
            </p>
            <input
              type="text"
              placeholder="Password를 입력해주세요."
              style={{
                borderBottom: "1px solid black",
                border: "none",
                padding: "15px 5px",
                outline: "none",
              }}
            />
          </Section>
          {/* <Section
              $display="flex"
              $direction="column"
              $marginTop="50px"
              $align="center"
              $height="auto"
            >
              <LargeButton>로그인</LargeButton>
            </Section>
            <Section
              $display="flex"
              $direction="column"
              $align="center"
              $marginTop="20px"
            >
              <LargeButton>카카오 로그인</LargeButton>
            </Section> */}
        </Container>
      </Main>
    </>
  );
};
export default JoinComp;
