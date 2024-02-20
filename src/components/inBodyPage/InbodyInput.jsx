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
import { useState, useMemo, useEffect } from "react";
import BodyApi from "../../api/BodyApi";
import { media } from "../../utils/MediaQuery";
import MemberApi from "../../api/MemberApi";
import InfoApi from "../../api/InfoApi";

const Input1 = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input4 = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.5s ease; // 트랜지션 추가
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
const calculateBMR = (height, weight, gender, age) => {
  if (gender === "남") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// 체지방률 계산 함수
const calculateFatPercent = (fat, weight) => {
  return ((fat * 100) / weight).toFixed(2);
};

const InbodyInput = (props) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [muscle, setMuscle] = useState("");
  const [fat, setFat] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mlPredictions, setMLPredictions] = useState(0);
  const [exerciseInfo, setExerciseInfo] = useState("");

  useEffect(() => {
    const loadMemberInfo = async () => {
      try {
        const resp = await MemberApi.getMemberDetail();
        console.warn(resp.data.gender);
        console.log(resp.data.birth);
        console.log("운동량" + resp.data.exerciseInfo);
        setExerciseInfo(resp.data.exerciseInfo);
        setGender(resp.data.gender);

        // 생년월일을 Date 객체로 변환
        const birthDate = new Date(resp.data.birth);

        // 현재 날짜를 가져오기
        const currentDate = new Date();

        // 나이 계산
        const calculatedAge =
          currentDate.getFullYear() - birthDate.getFullYear();

        // 생일이 지났는지 체크
        if (
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
        ) {
          setAge(calculatedAge - 1); // 아직 생일이 지나지 않았으면 1을 빼줌
        } else {
          setAge(calculatedAge);
        }
      } catch (error) {
        // 여기에 오류 처리 로직을 추가할 수 있습니다.
        console.error("MemberInfo 오류발생:", error);
      }
    };
    loadMemberInfo();
  }, []);

  const bmi = useMemo(() => {
    if (!height || !weight) {
      return 0;
    }
    return calculateBMI(height, weight);
  }, [height, weight]);

  const bmr = useMemo(() => {
    if (!height || !weight || !gender || !age) {
      return 0;
    }
    return calculateBMR(height, weight, gender, age);
  }, [height, weight, gender, age]);

  const fatPercent = useMemo(
    () => calculateFatPercent(fat, weight),
    [fat, weight]
  );

  const dci = useMemo(() => {
    if (!exerciseInfo || !weight) {
      return 0;
    }
    return exerciseInfo * weight;
  }, [exerciseInfo, weight]);

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
          weight,
          dci
        );
        console.log("문디문디" + rsp.data);
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
            console.log(height);
            console.log(weight);
            console.log(bmi);
            console.log(currentDate);
            console.log(fat);
            console.log(fatPercent);
            console.log(muscle);
            console.log(dci);
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
  function extractYearFromDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    return year;
  }

  useEffect(() => {
    const fetchMLPredictions = async () => {
      try {
        const res = await MemberApi.getMemberDetail();
        const year = extractYearFromDate(res.data.birth);
        const predictions = await InfoApi.getMLPredictions(bmi, year);
        console.log(predictions);
        const formattedNumber = parseInt(predictions.predictions[0]);
        setMLPredictions(formattedNumber);
      } catch (error) {
        console.error("ML 예측 호출 중 오류 발생:", error);
      }
    };
    // 컴포넌트가 마운트될 때 한 번 호출
    fetchMLPredictions();
  }, [bmi]); // BMI 또는 AdultMortality가 변경될 때마다 호출

  return (
    <>
      <Main
        $direction="row"
        $justify="center"
        $height="100%"
        $s
        style={{
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        }}
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
              marginLeft: "1rem",
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
            {bmi !== 0 ? (
              <>
                <Input4>
                  고객님의 남은 평균 수명은{" "}
                  <p style={{ color: "red" }}>{mlPredictions}</p> 살 입니다.
                  BMI를 <p style={{ color: "blue" }}>{bmi - 2}</p>으로 낮출시
                  평균 <p style={{ color: "blue" }}>{mlPredictions + 2}</p>살 더
                  살 수 있습니다! 열심히 운동하세요!
                </Input4>
                <p style={{ fontSize: "0.1em" }}>* 2015년 자료 기반 입니다</p>
              </>
            ) : (
              <Input4></Input4>
            )}
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
