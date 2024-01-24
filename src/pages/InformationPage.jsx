import InfoCategory from "../components/InfoPage/InfoCategory";
import React, { useCallback, useState } from "react";
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
  const [isExInfo, setIstExInfo] = useState(false);

  const handleDataFromChild = useCallback((data) => {
    setIstExInfo(data);
  }, []);

  return (
    <>
      <Main>
        <Container $border="1px solid black" $align="center">
          <Section
            $height="auto"
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Information
          </Section>
          <Section $border="1px solid black" $justify="center" $height="auto">
            <InfoCategory setdata={handleDataFromChild} />
          </Section>
          <Section $border="1px solid black"></Section>
          <Section $border="1px solid black"></Section>
          <Section $border="1px solid black">
            {isExInfo ? <div>운동 정보 내용</div> : <div>음식 정보 내용</div>}
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InformationPage;