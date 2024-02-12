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

const HomePage = () => {
  return (
    <>
      <Main $width="100%">
        <Container
          $height="auto"
          $align="center"
          $shadow="none"
          style={{ fontSize: "70px", fontWeight: "bold", marginTop: "10px" }}
        >
          SMART FITNESS COMPANION, Wellv
        </Container>

        <Container
          $height="auto"
          $shadow="none"
          style={{ marginBottom: "1rem" }}
        >
          <HomeSlide />
        </Container>
        <Container
          $height="auto"
          $align="center"
          style={{ marginBottom: "1rem" }}
        >
          <HomeCal />
        </Container>
        <Container
          $align="center"
          $height="auto"
          style={{ marginBottom: "1rem" }}
        >
          <HomeIntro />
        </Container>
      </Main>
    </>
  );
};
export default HomePage;
