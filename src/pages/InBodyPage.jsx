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
      <Main $height="auto">
        <Container $align="center" $height="auto">
          <Section
            $height="70px"
            style={{
              fontSize: "50px",
              fontWeight: "bold",
            }}
          >
            My Records
          </Section>
          <Section
            $height="400px"
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
          <Section $justify="center" $height="85vh">
            <InbodyList />
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InbodyPage;