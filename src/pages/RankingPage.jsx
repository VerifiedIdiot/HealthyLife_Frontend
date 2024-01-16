import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

const RankingPage = () => {
  return (
    <>
      <Main>
        <Container $border="1px solid black">
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
        </Container>
        <Container></Container>
        <Container $border="1px solid black">
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
          <Section $border="1px solid black">
            <p>홈페이지입니다.</p>
          </Section>
        </Container>
        <Container>
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default RankingPage;
