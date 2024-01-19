import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import sample from '../assets/imgs/sample.jpg'
import styled from "styled-components";

const StyledImageContainer = styled.img.attrs({
  className: "image-container",
})`
  height: 100vh;
  object-fit: cover;
`
const HomePage = () => {
  return (
    <>
      <Main $width = "100%">
        <Container $height = "100vh">
          <StyledImageContainer img src={sample}/>
        </Container>
        {/* <Container></Container>
        <Container $border="1px solid black">
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
        </Container>
        <Container>
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
          <Section $border="1px solid black">
            <p>페이지입니다.</p>
          </Section>
        </Container> */}
      </Main>
    </>
  );
};
export default HomePage;
