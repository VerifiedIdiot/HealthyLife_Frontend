import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../../styles/Layouts";
import styled from "styled-components";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import runner from "../../assets/imgs/runner.png";
import AxiosInstance from "../../api/AxiosInstance";
import Common from "../../utils/Common";
import { useState, useMemo } from "react";
import BodyApi from "../../api/BodyApi";
import { media } from "../../utils/MediaQuery";

const Input1 = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input2 = styled.div`
  font-weight: bold;

  ${media.large`
    font-size: 15px;
    `};
`;

const Input3 = styled.input`
  width: 40%;
  height: 30px;
  border-radius: 8px;
  border: none;
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 30%;
  justify-content: center;
  align-items: center;
  display: flex;

  ${media.small`
    display: none;
    `};
`;

const Runner = styled.img`
  width: 190px;

  ${media.large`
    width: 150px;
    `};
  ${media.small`
    display: none;
    `};
`;

const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}년 ${
  currentDate.getMonth() + 1
}월 ${currentDate.getDate()}일`;

// BMI 계산 함수
const calculateBMI = (height, weight) => {
  // BMI 계산 공식: 체중(kg) / 키(m)의 제곱
  return (weight / (height / 100) ** 2).toFixed(2);
};

// BMR 계산 함수
const calculateBMR = (height, weight) => {
  return 10 * weight + 6.25 * height - 100 + 5;
};

// 체지방률 계산 함수
const calculateFatPercent = (fat, weight) => {
  return ((fat / weight) * 100).toFixed(2);
};

const InbodyInput = (props) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [muscle, setMuscle] = useState("");
  const [fat, setFat] = useState("");

  const bmi = useMemo(() => {
    if (!height || !weight) {
      return 0;
    }
    return calculateBMI(height, weight);
  }, [height, weight]);

  const bmr = useMemo(() => {
    if (!height || !weight) {
      return 0;
    }
    return calculateBMR(height, weight);
  }, [height, weight]);

  const fatPercent = useMemo(
    () => calculateFatPercent(fat, weight),
    [fat, weight]
  );

  const heightChange = (e) => {
    setHeight(e.target.value);
  };
  const weightChange = (e) => {
    setWeight(e.target.value);
  };
  const muscleChange = (e) => {
    setMuscle(e.target.value);
  };
  const fatChange = (e) => {
    setFat(e.target.value);
  };

  const bodyUpload = async () => {
    if (!height || !weight || !muscle || !fat) {
      alert("모든 항목을 입력해주세요.");
      return; // 빈 값이 있을 경우 함수 종료
    } else {
      try {
        const rsp = await BodyApi.InsertBody(
          bmi,
          bmr,
          currentDate,
          fat,
          fatPercent,
          height,
          muscle,
          weight
        );
        console.log(rsp.data);
        const confirmationMessage = `키 : ${height}, 몸무게 : ${weight}, 골격근량 : ${muscle}, 체지방량 : ${fat} 이 맞습니까?`;
        if (window.confirm(confirmationMessage)) {
          if (rsp.data === true) {
            alert("등록 성공");
            console.log("씨빨 안뜨네");
            setHeight("");
            setWeight("");
            setMuscle("");
            setFat("");
            props.handleClick();
          } else {
            alert("등록 실패");
            console.log(rsp);
          }
        }
      } catch (error) {
        console.log(error);
        console.log(bmi);
        console.log(bmr);
        console.log(formattedDate);
        console.log(fatPercent);
      }
    }
  };

  return (
    <>
      <Main
        $direction="row"
        $justify="center"
        $height="100%"
        style={{ backgroundColor: "#D9D9D9", borderRadius: "8px" }}
      >
        <ImgContainer>
          <Runner src={runner} />
        </ImgContainer>
        <Container $height="100%" $shadow="none">
          <Section
            $height="25%"
            style={{
              borderRadius: "0px 8px 0px 0px",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            {formattedDate} 신체정보 입력
          </Section>
          <Section $height="25%" $justify="space-around">
            <Input1>
              <Input2>키</Input2>
              <Input3 value={height} onChange={heightChange}></Input3>
            </Input1>
            <Input1>
              <Input2>체중</Input2>
              <Input3 value={weight} onChange={weightChange}></Input3>
            </Input1>
            <Input1>
              <Input2>기초대사량</Input2>
              <Input2>{bmr} kcal</Input2>
            </Input1>
          </Section>
          <Section $height="25%" $justify="space-around">
            <Input1>
              <Input2>골격근량</Input2>
              <Input3 value={muscle} onChange={muscleChange}></Input3>
            </Input1>
            <Input1>
              <Input2>체지방량</Input2>
              <Input3 value={fat} onChange={fatChange}></Input3>
            </Input1>
            <Input1>
              <Input2>BMI</Input2>
              <Input2>{bmi}</Input2>
            </Input1>
          </Section>
          <Section
            $height="25%"
            $justify="end"
            $align="center"
            style={{ borderRadius: "0px 0px 8px 0px" }}
          >
            <MiddleButton
              style={{ marginRight: "1.5%", marginBottom: "1.5%" }}
              onClick={bodyUpload}
            >
              제출
            </MiddleButton>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InbodyInput;
