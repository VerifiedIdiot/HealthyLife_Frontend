import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import logo from "../assets/icons/logo.svg";
import Logo from "../styles/headerFooter/headerComponents/Logo";
import { LargeButton } from "../styles/styledComponents/StyledComponents";

const LoginPage = () => {
  return (
    <>
      <Main $direction="row" $width="100%">
        <Container
          $width="50%"
          $direction="row"
          $border="1px solid black"
          $background="#F3F3F3"
          $height="100vh"
        >
          <Section $paddingTop="180px">
            <Logo />
          </Section>
        </Container>
        <Container
          $width="50%"
          $direction="column"
          $padding="0 15px"
          $height="auto"
        >
          <Section
            // $border="1px solid black"
            $height="auto"
            $paddingTop="400px"
            $direction="column"
          >
            <p>EMAIL (*)</p>
            <input
              type="text"
              placeholder="Email을 입력해주세요."
              style={{
                borderBottom: "1px solid #000",
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
                borderBottom: "1px solid #000",
                border: "none",
                padding: "15px 5px",
                outline: "none",
              }}
            />
          </Section>
          <Section
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
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default LoginPage;
