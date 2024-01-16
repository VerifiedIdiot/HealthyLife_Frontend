import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

const HomePage = () => {
  return (
    <>
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
export default HomePage;
