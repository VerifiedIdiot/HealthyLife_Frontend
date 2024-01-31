import { useNavigate } from "react-router";
import { Area, Box, Container, Main, Section } from "../../styles/Layouts";
import logo from "../../assets/icons/logo.svg";
import { useEffect, useState } from "react";
import { Input, InputButton } from "./JoinInput";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";

const BodyInfoComp = (profile) => {
  const navigate = useNavigate();
  const loginGate = useNavigate();
  const cashNavigate = useNavigate();

  // 키보드 입력
  const [inputHeight, setInputHeight] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [inputMuscle, setInputMuscle] = useState("");
  const [inputBodyFat, setInputBodyFat] = useState("");

  // 오류 메세지
  const [heightMessage, setHeightMessage] = useState("");
  const [weightMessage, setWeightMessage] = useState("");
  const [muscleMessage, setMuscleMessage] = useState("");
  const [bodyFatMessage, setBodyFatMessage] = useState("");

  // 유효성
  const [isHeight, setIsHeight] = useState(false);
  const [isWeight, setIsWeight] = useState(false);
  const [isMuscle, setIsMuscle] = useState(false);
  const [isBodyFat, setIsBodyFat] = useState(false);

  // 정규식
  const regexList = /^[0-9.]{2,5}$/;
  // 키
  const onChangeHeight = (e) => {
    const currHeight = e.target.value;
    console.log("currr" + currHeight);
    setInputHeight(currHeight);
    if (!regexList.test(currHeight)) {
      setHeightMessage("2 ~ 5 까지의 숫자만 입력가능합니다. (.포함) ");
      setIsHeight(false);
      setHeightMessage("");
    } else {
      setHeightMessage("사용 가능합니다.");
      setIsHeight(true);
    }
  };
  // 몸무게
  const onChangeWeight = (e) => {
    const currWeight = e.target.value;
    setInputWeight(currWeight);
    if (!regexList.test(currWeight)) {
      setWeightMessage("2 ~ 5 까지의 숫자만 입력가능합니다. (.포함) ");
      setIsWeight(false);
      setWeightMessage("");
    } else {
      setWeightMessage("사용 가능합니다.");
      setIsWeight(true);
    }
  };
  // 근육량
  const onChangeMuscle = (e) => {
    const currMuscle = e.target.value;
    setInputMuscle(currMuscle);
    if (!regexList.test(currMuscle)) {
      setMuscleMessage("2 ~ 5 까지의 숫자만 입력가능합니다. (.포함) ");
      setIsMuscle(false);
      setMuscleMessage("");
    } else {
      setMuscleMessage("사용 가능합니다.");
      setIsMuscle(true);
    }
  };
  // 체지방률
  const onChangeBodyFat = (e) => {
    const currBodyFat = e.target.value;
    setInputBodyFat(currBodyFat);
    if (!regexList.test(currBodyFat)) {
      setBodyFatMessage("2 ~ 5 까지의 숫자만 입력가능합니다. (.포함) ");
      setIsBodyFat(false);
      setBodyFatMessage("");
    } else {
      setBodyFatMessage("사용 가능합니다.");
      setIsBodyFat(true);
    }
  };
  // 기초대사량 계산 함수
  const calculateBMR = () => {
    // 입력값이 숫자가 아니면 빈 문자열 반환
    if (isNaN(inputWeight) || isNaN(inputHeight)) {
      return "";
    }

    const weight = parseFloat(inputWeight);
    const height = parseFloat(inputHeight);
    const age = 25; // 나이는 적절하게 설정하세요

    // BMR 계산식
    const bmr = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
    return bmr.toFixed(2); // 소수점 둘째 자리까지 표시
  };

  // BMI 계산 함수
  const calculateBMI = () => {
    // 입력값이 숫자가 아니면 빈 문자열 반환
    if (isNaN(inputWeight) || isNaN(inputHeight)) {
      return "";
    }

    const weight = parseFloat(inputWeight);
    const height = parseFloat(inputHeight);

    // BMI 계산식
    const bmi = weight / Math.pow(height / 100, 2);
    return bmi.toFixed(2); // 소수점 둘째 자리까지 표시
  };

  // 기초대사량 및 BMI 상태
  const [calculatedBMR, setCalculatedBMR] = useState("");
  const [calculatedBMI, setCalculatedBMI] = useState("");

  // useEffect를 사용하여 inputHeight, inputWeight가 변경될 때마다 BMR, BMI를 다시 계산
  useEffect(() => {
    const bmrResult = calculateBMR();
    const bmiResult = calculateBMI();

    // 계산된 값이 숫자라면 상태 업데이트
    if (!isNaN(bmrResult)) {
      setCalculatedBMR(bmrResult);
    }

    if (!isNaN(bmiResult)) {
      setCalculatedBMI(bmiResult);
    }
  }, [inputHeight, inputWeight]);
  return (
    <>
      <Main $direction="row" $width="100%" $height="auto">
        <Container
          $width="50%"
          $display="flex"
          $direction="column"
          $background="#F3F3F3"
          $height="auto"
        >
          <Section
            $height="95%"
            $display="flex"
            $justify="center"
            $align="center"
          >
            <img
              src={logo}
              alt="로고이미지"
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
              }}
            />
          </Section>
          <Section $height="5%" $shadow="none" $padding="0 10px">
            <Area $shadow="none" $width="22%">
              <p
                style={{
                  paddingRight: "5px",
                }}
              >
                Are you a member?
              </p>
            </Area>
            <Area $shadow="none" $height="50%">
              <p
                style={{
                  borderBottom: "2px solid black",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => loginGate("/login")}
              >
                Log in now
              </p>
            </Area>
          </Section>
        </Container>
        <Container
          $width="50%"
          $padding="0 15px"
          $height="100vh"
          $align="center"
          $justify="center"
        >
          <Section
            $height="40%"
            $direction="column"
            $align="center"
            $justify="center"
          >
            <Area $direction="column" $shadow="none">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                HEIGHT (*)
              </p>
              <Input
                holder="키를 입력해주세요."
                value={inputHeight}
                type="height"
                msg={heightMessage}
                msgType={isHeight}
                changeEvt={onChangeHeight}
              />
            </Area>
            <Area $direction="column" $shadow="none">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                WEIGHT (*)
              </p>
              <Input
                holder="몸무게를 입력해주세요."
                value={inputWeight}
                type="weight"
                msg={weightMessage}
                msgType={isWeight}
                changeEvt={onChangeWeight}
              />
            </Area>
            <Area $direction="column" $shadow="none">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                MUSCLE (*)
              </p>
              <Input
                holder="근육량을 입력해주세요."
                value={inputMuscle}
                type="muscle"
                msg={muscleMessage}
                msgType={isMuscle}
                changeEvt={onChangeMuscle}
              />
            </Area>
            <Area $direction="column" $shadow="none">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                BODY FAT PERCENTAGE (*)
              </p>
              <Input
                holder="체지방률을 입력해주세요."
                value={inputBodyFat}
                type="bodyFat"
                msg={bodyFatMessage}
                msgType={isBodyFat}
                changeEvt={onChangeBodyFat}
              />
            </Area>
            <Area $shadow="none">
              <Box $direction="column" $shadow="none">
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontWeight: "600",
                  }}
                >
                  BASAL METABOLIC RATE (*)
                </p>
                <Input
                  holder={calculatedBMR}
                  type="basalMetabolic"
                  readOnly={true}
                />
              </Box>
              <Box $direction="column" $shadow="none">
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontWeight: "600",
                  }}
                >
                  BODY MASS INDEX (*)
                </p>
                <Input holder={calculatedBMI} type="bodyMass" readOnly={true} />
              </Box>
            </Area>
          </Section>
          <Section
            $shadow="none"
            $align="center"
            $justify="center"
            $height="10%"
            $marginTop="50px"
          >
            <MiddleButton onClick={() => cashNavigate("/join/payment")}>
              다음
            </MiddleButton>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default BodyInfoComp;
