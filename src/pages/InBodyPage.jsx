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
import InbodyInput from "../components/inBodyPage/InbodyInput";
import InbodyList from "../components/inBodyPage/InbodyList";

const InbodyPage = () => {
  return (
    <>
      <Main>
        <Container $border="1px solid black" $align="center">
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
            $width="95%"
            $justify="space-around"
            style={{
              flexWrap: "wrap",
              backgroundColor: "#d9d9d9",
              borderRadius: "8px",
            }}
          >
            <InbodyGraph />
          </Section>
          <Section $border="1px solid black" $justify="center">
            <InbodyInput />
          </Section>
          <Section $border="1px solid black" $justify="center">
            <InbodyList />
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InbodyPage;
