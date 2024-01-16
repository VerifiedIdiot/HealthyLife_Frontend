import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

const LogInPage = () => {
  return (
    <>
      <p>로그인 페이지입니다</p>
      <Main>
        <Container>
          <Section>
            <Area>
              <Box>
                <Item>
                  <Element></Element>
                  <Element></Element>
                </Item>
              </Box>
              <Box>
                <Item>
                  <Element></Element>
                  <Element></Element>
                </Item>
              </Box>
            </Area>
          </Section>
          <Section>
            <Area>
              <Box>
                <Item>
                  <Element></Element>
                  <Element></Element>
                </Item>
              </Box>
              <Box>
                <Item>
                  <Element></Element>
                  <Element></Element>
                </Item>
              </Box>
            </Area>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default LogInPage;
