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
        <Container $align="center">
          <Section
            $height="150px"
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            My Records
          </Section>
          <Section
            $height="100%"
            $width="95%"
            $justify="space-around"
            style={{
              flexWrap: "wrap",
              backgroundColor: "#d9d9d9",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <InbodyGraph />
          </Section>
          <Section $justify="center" style={{ marginBottom: "1rem" }}>
            <InbodyInput />
          </Section>
          <Section $justify="center">
            <InbodyList />
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InbodyPage;
