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
import InfoClass from "../components/InfoPage/InfoClass";
import InfoSearch from "../components/InfoPage/InfoSearch";
import FoodInfo from "../components/InfoPage/FoodInfo";
import ExerciseInfo from "../components/InfoPage/ExerciseInfo";

const InformationPage = () => {
  const [isExInfo, setIstExInfo] = useState(false);

  const handleDataFromChild = useCallback((data) => {
    setIstExInfo(data);
  }, []);

  return (
    <>
      <Main>
        <Container $align="center" $height="auto">
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
          <Section
            $justify="center"
            $height="auto"
            style={{ marginBottom: "1rem" }}
          >
            <InfoCategory setdata={handleDataFromChild} />
          </Section>
          <Section
            $justify="center"
            $height="auto"
            style={{ marginBottom: "1rem" }}
          >
            <InfoClass />
          </Section>
          <Section
            $justify="center"
            $height="auto"
            style={{ marginBottom: "1rem" }}
          >
            <InfoSearch />
          </Section>
          <Section $justify="center" $height="auto">
            {isExInfo ? <ExerciseInfo /> : <FoodInfo />}
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InformationPage;
