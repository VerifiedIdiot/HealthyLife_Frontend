import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import InbodyGraph from "../components/inBodyPage/InbodyGraph";

const InbodyPage = () => {
  return (
    <>
      <Main>
        <Container $border="1px solid black">
          <Section
            $border="1px solid black"
            $height="150px"
            style={{ fontSize: "50px", fontWeight: "bold" }}
          >
            My Records
          </Section>
          <Section
            $border="1px solid black"
            $height="100%"
            $justify="space-around"
            style={{ flexWrap: "wrap" }}
          >
            <InbodyGraph />
          </Section>
          <Section $border="1px solid black"></Section>
          <Section $border="1px solid black"></Section>
        </Container>
      </Main>
    </>
  );
};
export default InbodyPage;
