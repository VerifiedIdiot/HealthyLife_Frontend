import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

const Login = () => {
  return (
    <>
      <Main $direction="row" $width="100%" $height="105%">
        <Container $width="50%" $background="#F3F3F3">
          <Section>
            <p>페이지입니다.</p>
          </Section>
        </Container>
        <Container $width="50%">
          <Section $direction="column">
            <p>EMAIL (*)</p>
            <p>Email을 입력해 주세요</p>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default Login;
