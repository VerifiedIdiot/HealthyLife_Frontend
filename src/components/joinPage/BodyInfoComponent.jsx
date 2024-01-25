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
  const [inputBasalMetabolic, setInputBasalMetabolic] = useState("");
  const [inputBodyMass, setInputBodyMass] = useState("");
  // 오류 메세지
  const [heightMessage, setHeightMessage] = useState("");
  const [weightMessage, setWeightMessage] = useState("");
  const [muscleMessage, setMuscleMessage] = useState("");
  const [bodyFatMessage, setBodyFatMessage] = useState("");
  const [basalMetabolicMessage, setBasalMetabolicMessage] = useState("");
  const [bodyMassMessage, setBodyMassMessage] = useState("");
  // 유효성
  const [isHeight, setIsHeight] = useState(false);
  const [isWeight, setIsWeight] = useState(false);
  const [isMuscle, setIsMuscle] = useState(false);
  const [isBodyFat, setIsBodyFat] = useState(false);
  const [isBasalMetabolic, setIsBasalMetabolic] = useState(false);
  const [isBodyMass, setIsBodyMass] = useState(false);
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
  // 기초대사량
  const onChangeBasal = (e) => {
    const currBasalMetabolic = e.target.value;
    setInputBasalMetabolic(currBasalMetabolic);
    if (!regexList.test(currBasalMetabolic)) {
      setBasalMetabolicMessage("2 ~ 5 까지의 숫자만 입력가능합니다. (.포함) ");
      setIsBasalMetabolic(false);
      setBasalMetabolicMessage("");
    } else {
      setBasalMetabolicMessage("사용 가능합니다.");
      setIsBasalMetabolic(true);
    }
  };
  // BMI
  const onChangeBodyMass = (e) => {
    const currBodyMass = e.target.value;
    setInputBodyMass(currBodyMass);
    if (!regexList.test(currBodyMass)) {
      setBodyMassMessage("2 ~ 5 까지의 숫자만 입력가능합니다. (.포함) ");
      setIsBodyMass(false);
      setBodyMassMessage("");
    } else {
      setBodyMassMessage("사용 가능합니다.");
      setIsBodyMass(true);
    }
  };
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
                  holder="기초대사량 : "
                  value={inputBasalMetabolic}
                  type="basalMetabolic"
                  msg={basalMetabolicMessage}
                  msgType={isBasalMetabolic}
                  changeEvt={onChangeBasal}
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
                <Input
                  holder="체질량 지수 : "
                  value={inputBodyMass}
                  type="bodyMass"
                  msg={bodyMassMessage}
                  msgType={isBodyMass}
                  changeEvt={onChangeBodyMass}
                />
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
