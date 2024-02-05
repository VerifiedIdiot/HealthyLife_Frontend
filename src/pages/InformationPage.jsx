import InfoCategory from "../components/InfoPage/InfoCategory";
import React, { useCallback, useEffect, useState } from "react";
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
import InfoApi from "../api/InfoApi";

const InformationPage = () => {
  const [isExInfo, setIstExInfo] = useState(false);
  const [getKeyword, setGetKeyword] = useState("");
  const [getClass1, setGetClass1] = useState("");
  const [getClass2, setGetClass2] = useState("");
  const [foodData, setFoodData] = useState([]);

  const handleDataFromChild = useCallback((data) => {
    setIstExInfo(data);
  }, []);

  const handleDataFromChild1 = useCallback((data) => {
    setGetKeyword(data);
    console.warn(data);
  }, []);

  const handleDataFromChild2 = useCallback((data1) => {
    setGetClass1(data1);
    console.warn(data1);
  }, []);

  const handleDataFromChild3 = useCallback((data2) => {
    setGetClass2(data2);
    console.log(data2);
  }, []);

  const FoodInsert = async () => {
    try {
      const resp = await InfoApi.FoodInsert();
      if (resp.status === 200) {
        console.log("음식 정보 삽입 성공");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const FoodSearch = async () => {
      const page = 0;
      const size = 12;
      const resp = await InfoApi.FoodSearch(
        getKeyword,
        getClass1,
        getClass2,
        page,
        size
      );
      setFoodData(resp);
    };
    FoodSearch();
  }, [getKeyword, getClass1, getClass2]);

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
            onClick={() => FoodInsert()}
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
            <InfoClass
              setdata1={handleDataFromChild2}
              setdata2={handleDataFromChild3}
            />
          </Section>
          <Section
            $justify="center"
            $height="auto"
            style={{ marginBottom: "1rem" }}
          >
            <InfoSearch setdata={handleDataFromChild1} />
          </Section>
          <Section $justify="center" $height="auto">
            {isExInfo ? <ExerciseInfo /> : <FoodInfo foodData={foodData} />}
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InformationPage;
