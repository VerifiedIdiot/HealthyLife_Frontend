import { useState } from "react";
import styled from "styled-components";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import Trainer from "../../../src/assets/icons/HomeMain/trainer.png";
import { media } from "../../utils/MediaQuery";

const CalContainer = styled.div`
  width: 95%;
  border-radius: 8px;
  background-color: lightgray;
`;

const CalContainer1 = styled.div`
  display: flex;
  height: 200px;
  font-size: 20px;
`;

const CalContainer2 = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const CalContainer3 = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CalTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.small`
      font-size: 20px;
    `}
`;

const CalInput1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalInput2 = styled.div`
  width: 30%;
  text-align: center;
  white-space: nowrap;

  ${media.large`
      font-size: 18px
    `}
  ${media.small`
      font-size: 13px
    `}
`;

const CalInput3 = styled.input`
  width: 70%;
  height: 30px;
  border-radius: 8px;
  border: none;
`;

const CalInput4 = styled.div`
  width: 70%;
`;

const CalInput5 = styled.div`
  width: 70%;
  height: 30px;
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: blue;
`;

const CalInput6 = styled.img`
  width: 20%;
  min-width: 80px;
  max-width: 120px;
`;

const CalInput7 = styled.div``;

const Balloon = styled.div`
  background-color: white;
  width: 500px;
  height: 150px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; /* 글 간격 조절 */

  ${media.large`
      width: 350px;
    `}
  ${media.small`
      width: 180px;
      height: 80px;
      font-size: 15px;
    `}
`;

const HomeCal = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeter = height / 100;
      const bmiValue = (weight / (heightInMeter * heightInMeter)).toFixed(2);
      setBMI(bmiValue);
    } else {
      setBMI("");
    }
  };

  const recommendExercise = (bmi) => {
    if (bmi < 18.5) {
      return "저체중입니다. 살이 찌는 운동을 하면 좋습니다. 건강한 식습관과 꾸준한 유산소 운동이 필요합니다. 달리기, 수영, 요가 등을 추천합니다.";
    } else if (bmi >= 18.5 && bmi < 22.9) {
      return "정상 체중입니다. 유산소 운동을 하면 좋습니다. 건강한 식습관과 규칙적인 운동 습관을 유지하세요. 걷기, 조깅, 수영, 사이클링 등이 좋습니다.";
    } else if (bmi >= 23 && bmi < 24.9) {
      return "과체중입니다. 근력 운동을 하면 좋습니다. 규칙적인 근력 운동과 식사 조절이 필요합니다. 웨이트 트레이닝, 필라테스, 스쿼트 등이 좋습니다.";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "비만입니다. 체지방 감소와 근력 운동을 함께하면 좋습니다. 규칙적인 유산소 운동과 근력 운동을 조합하여 식사 조절과 함께 운동하세요. 유산소는 조깅, 수영, 사이클링, 근력 운동은 웨이트 트레이닝, 복근 운동 등이 좋습니다.";
    } else {
      return "고도비만입니다. 불규칙한 수면, 불규칙한 식사와 같은 사소한 생활습관부터 교정해나가며 일상속 가벼운 운동부터 시작해보는건 어떨까요? 전문가와 상담하여 체계적인 다이어트와 운동 계획을 세우세요.";
    }
  };

  return (
    <>
      <CalContainer>
        <CalTitle>BMI 확인하고 맞춤 운동 추천받기</CalTitle>
        <CalContainer1>
          <CalContainer2>
            <CalInput1>
              <CalInput2>키</CalInput2>
              <CalInput4>
                <CalInput3
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                cm
              </CalInput4>
            </CalInput1>
            <CalInput1>
              <CalInput2>몸무게</CalInput2>
              <CalInput4>
                <CalInput3
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                kg
              </CalInput4>
            </CalInput1>
            <CalInput1>
              <CalInput2>BMI</CalInput2>
              <CalInput4>
                <CalInput5>{bmi}</CalInput5>
              </CalInput4>
            </CalInput1>
            <MiddleButton
              style={{ width: "100%", height: "35px" }}
              onClick={calculateBMI}
            >
              계산하기
            </MiddleButton>
          </CalContainer2>
          <CalContainer3>
            <CalInput6 src={Trainer}></CalInput6>
            <CalInput7>
              <Balloon>{bmi && recommendExercise(parseFloat(bmi))}</Balloon>
            </CalInput7>
          </CalContainer3>
        </CalContainer1>
      </CalContainer>
    </>
  );
};
export default HomeCal;
