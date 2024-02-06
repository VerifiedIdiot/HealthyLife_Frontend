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
import FoodClass from "../components/InfoPage/FoodClass";
import ExerciseClass from "../components/InfoPage/ExerciseClass";
import FoodSearch from "../components/InfoPage/FoodSearch";
import ExerciseSearch from "../components/InfoPage/ExerciseSearch";
import FoodInfo from "../components/InfoPage/FoodInfo";
import ExerciseInfo from "../components/InfoPage/ExerciseInfo";
import InfoApi from "../api/InfoApi";

const InformationPage = () => {
  const [isExInfo, setIstExInfo] = useState(false);
  const [getFoodKeyword, setGetFoodKeyword] = useState("");
  const [getExerciseKeyword, setGetExerciseKeyword] = useState("");
  const [getFoodClass1, setGetFoodClass1] = useState("");
  const [getFoodClass2, setGetFoodClass2] = useState("");
  const [getExerciseClass1, setGetExerciseClass1] = useState("");
  const [getExerciseClass2, setGetExerciseClass2] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  const handleDataFromChild = useCallback((data) => {
    setIstExInfo(data);
  }, []);

  const handleDataFromChild1 = useCallback((data) => {
    setGetFoodKeyword(data);
    console.warn(data);
  }, []);

  const handleDataFromChild2 = useCallback((data1) => {
    setGetFoodClass1(data1);
    console.warn(data1);
  }, []);

  const handleDataFromChild3 = useCallback((data2) => {
    setGetFoodClass2(data2);
    console.log(data2);
  }, []);

  const handleDataFromChild4 = useCallback((data) => {
    setGetExerciseKeyword(data);
    console.warn(data);
  }, []);

  const handleDataFromChild5 = useCallback((data1) => {
    setGetExerciseClass1(data1);
    console.warn(data1);
    console.log("시발럼아" + exerciseData);
  }, []);

  const handleDataFromChild6 = useCallback((data2) => {
    setGetExerciseClass2(data2);
    console.warn(data2);
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

  const ExerciseInsert = async () => {
    try {
      const resp = await InfoApi.ExerciseInsert();
      if (resp.status === 200) {
        console.log("운동 정보 삽입 성공");
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
        getFoodKeyword,
        getFoodClass1,
        getFoodClass2,
        page,
        size
      );
      setFoodData(resp);
    };
    FoodSearch();
  }, [getFoodKeyword, getFoodClass1, getFoodClass2]);

  useEffect(() => {
    const ExerciseSearch = async () => {
      const page = 0;
      const size = 12;
      const resp = await InfoApi.ExerciseSearch(
        getExerciseKeyword,
        getExerciseClass1,
        getExerciseClass2,
        page,
        size
      );
      setExerciseData(resp);
    };
    ExerciseSearch();
  }, [getExerciseKeyword, getExerciseClass1, getExerciseClass2]);

  const Insert = () => {
    FoodInsert();
    ExerciseInsert();
  };

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
            onClick={Insert}
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
            {isExInfo ? (
              <ExerciseClass
                setdata1={handleDataFromChild5}
                setdata2={handleDataFromChild6}
              />
            ) : (
              <FoodClass
                setdata1={handleDataFromChild2}
                setdata2={handleDataFromChild3}
              />
            )}
          </Section>
          <Section
            $justify="center"
            $height="auto"
            style={{ marginBottom: "1rem" }}
          >
            {isExInfo ? (
              <ExerciseSearch setdata={handleDataFromChild4} />
            ) : (
              <FoodSearch setdata={handleDataFromChild1} />
            )}
          </Section>
          <Section $justify="center" $height="auto">
            {isExInfo ? (
              <ExerciseInfo exerciseData={exerciseData} />
            ) : (
              <FoodInfo foodData={foodData} />
            )}
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InformationPage;
