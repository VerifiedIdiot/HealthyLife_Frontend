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
        <Container $height="auto" $shadow="none">
          <HomeSlide />
        </Container>
        <Container>
          <HomeCal />
        </Container>
      </Main>
    </>
  );
};
export default HomePage;
