import { useNavigate } from "react-router";
import { Container, Main, Section } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import logo from "../../assets/icons/logo.svg";

const PaymentComp = () => {
  const navigate = useNavigate();
  const loginGate = useNavigate();
  const homeNavigate = useNavigate();
  return (
    <>
      <Main $direction="row" $width="100%" $height="auto">
        <Container
          $width="50%"
          $display="flex"
          $direction="column"
          $background="#F3F3F3"
          $height="auto"
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
              Are you a member?
            </p>
            <p
              style={{
                cursor: "pointer",
              }}
              onClick={() => loginGate("/login")}
            >
              Log in now
            </p>
          </Section>
        </Container>
        <Container
          $width="50%"
          $padding="0 15px"
          $height="100vh"
          $align="center"
          $justify="center"
        >
          <Section
            $shadow="none"
            $align="center"
            $justify="center"
            $height="10%"
            $direction="column"
          >
            <p
              style={{
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              WELLV는 결제를 해야 이용이 가능합니다.
            </p>
            <LargeButton onClick={() => homeNavigate("/")}>
              결제하기
            </LargeButton>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default PaymentComp;
