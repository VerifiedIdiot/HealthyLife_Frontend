import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import HomeSlide from "../components/homePage/HomeSlide";
import HomeCal from "../components/homePage/HomeCal";
import HomeIntro from "../components/homePage/HomeIntro";
import styled from "styled-components";
import { media } from "../utils/MediaQuery";

const Title = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-top: 2rem;

  ${media.large`
      font-size: 40px;
    `}
  ${media.small`
      font-size: 22px;
    `}
`;

const HomePage = () => {
  return (
    <>
      <Main $width="100%">
        <Container
          className="MainTitle"
          $height="auto"
          $align="center"
          $shadow="none"
        >
          <Title>SMART FITNESS COMPANION, Wellv</Title>
        </Container>

        <Container
          $height="auto"
          $shadow="none"
          style={{ marginBottom: "5rem" }}
        >
          <HomeSlide />
        </Container>
        <Container
          $height="auto"
          $align="center"
          $shadow="none"
          style={{ marginBottom: "5rem" }}
        >
          <HomeCal />
        </Container>
        <Container
          $align="center"
          $height="auto"
          $shadow="none"
          style={{ marginBottom: "5rem" }}
        >
          <HomeIntro />
        </Container>
      </Main>
    </>
  );
};
export default HomePage;
