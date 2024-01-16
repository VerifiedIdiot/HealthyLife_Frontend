import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

const CalendarPage = () => {
  return (
    <>
      <p>캘린더 페이지입니다</p>
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
export default CalendarPage;
