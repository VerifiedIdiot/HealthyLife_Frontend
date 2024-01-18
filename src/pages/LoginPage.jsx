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
        <Main $direction="row" $width="100%">
          <Container $width="50%" $direction="row" $border="1px solid black">
            {/* <Section>
              <p>페이지입니다.</p>
            </Section> */}
          </Container>
          <Container $width="50%" $direction="row" $border="1px solid black">
            {/* <Section $border="1px solid black">
              <p>EMAIL (*)</p>
              <p>Email을 입력해 주세요</p>
            </Section> */}
          </Container>
        </Main>
      </>
    );
  };
  export default Login;
  