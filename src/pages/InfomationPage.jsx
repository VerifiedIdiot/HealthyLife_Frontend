import InfoCategory from "../components/InfoPage/InfoCategory";
import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

const InformationPage = () => {
  return (
    <>
      <Main>
        <Container $border="1px solid black" $align="center">
          <Section
            $height="150px"
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Information
          </Section>
          <Section $border="1px solid black">
            <InfoCategory />
          </Section>
          <Section $border="1px solid black"></Section>
          <Section $border="1px solid black"></Section>
          <Section $border="1px solid black"></Section>
        </Container>
      </Main>
    </>
  );
};
export default InformationPage;
