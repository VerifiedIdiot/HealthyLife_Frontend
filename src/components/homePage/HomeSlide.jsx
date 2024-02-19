import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { media } from "../../utils/MediaQuery";

const Exercise = [
  {
    name: "런닝",
    kcalPerHour: 700,
    image:
      "https://cdn.pixabay.com/photo/2017/08/06/12/52/woman-2592247_640.jpg",
  },
  {
    name: "사이클",
    kcalPerHour: 750,
    image:
      "https://cdn.pixabay.com/photo/2014/07/05/08/18/bicycle-384566_1280.jpg",
  },
  {
    name: "배드민턴",
    kcalPerHour: 330,
    image:
      "https://cdn.pixabay.com/photo/2016/05/31/23/21/badminton-1428046_1280.jpg",
  },
  {
    name: "농구",
    kcalPerHour: 500,
    image:
      "https://cdn.pixabay.com/photo/2017/04/25/05/44/basketball-2258650_640.jpg",
  },
  {
    name: "축구",
    kcalPerHour: 600,
    image:
      "https://cdn.pixabay.com/photo/2016/06/15/01/11/soccer-1457988_640.jpg",
  },
  {
    name: "탁구",
    kcalPerHour: 200,
    image:
      "https://cdn.pixabay.com/photo/2016/02/17/18/59/ping-pong-1205609_1280.jpg",
  },
];

const Food = [
  {
    name: "마라탕",
    kcal: 1800,
  },
  {
    name: "황금올리브",
    kcal: 2250,
  },
  {
    name: "탕후루",
    kcal: 300,
  },
  {
    name: "엽기떡볶이",
    kcal: 2200,
  },
  {
    name: "엽기떡볶이",
    kcal: 2200,
  },
  {
    name: "무뼈닭발",
    kcal: 2500,
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ResultContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  position: relative;
  opacity: 0.8;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: white;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const AdditionalText = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: white;
  font-size: 22px;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  background: transparent;
  border: none;
  cursor: pointer;

  ${media.small`
      font-size: 14px;
    `}

  &:hover {
    color: blue;
  }

  &:active {
    color: darkblue;
  }
`;

const Text = styled.p`
  font-size: 28px;
  line-height: 1.5; /* 텍스트의 높이를 현재 폰트 크기의 1.5배로 설정합니다. */
  white-space: nowrap; /* 줄 바꿈을 허용합니다. */

  ${media.small`
      font-size: 16px;
    `}
`;

const BlueText = styled.span`
  color: blue;
`;

const HomeSlide = () => {
  const [matchedPair, setMatchedPair] = useState(null);

  const navigate = useNavigate();

  const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const matchFoodAndExercise = () => {
    const randomFood = getRandomItem(Food);
    const randomExercise = getRandomItem(Exercise);
    const requiredExerciseHours = randomFood.kcal / randomExercise.kcalPerHour;
    const hours = Math.floor(requiredExerciseHours);
    const minutes = Math.round((requiredExerciseHours - hours) * 60);
    setMatchedPair({
      food: randomFood,
      exercise: randomExercise,
      requiredExerciseHours: { hours, minutes },
    });
  };

  useEffect(() => {
    matchFoodAndExercise(); // 초기 매칭
    const interval = setInterval(() => {
      matchFoodAndExercise(); // 10초마다 매칭
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {matchedPair && (
        <ResultContainer>
          <Image
            src={matchedPair.exercise.image}
            alt={matchedPair.exercise.name}
          />
          {matchedPair && matchedPair.requiredExerciseHours && (
            <TextContainer>
              <Text>
                <BlueText>{matchedPair.food.name}</BlueText>을(를) 먹으려면{" "}
                <BlueText>{matchedPair.exercise.name}</BlueText>을(를){" "}
                <BlueText>{matchedPair.requiredExerciseHours.hours}</BlueText>
                시간{" "}
                <BlueText>{matchedPair.requiredExerciseHours.minutes}</BlueText>
                분!
                <br />
                지금 <BlueText>Wellv</BlueText>에 가입하고
                <br />
                <BlueText>Wellv</BlueText>와 함께 똑똑한 운동 습관을
                만들어보세요!
              </Text>
            </TextContainer>
          )}
          <AdditionalText
            style={{ bottom: "40px" }}
            onClick={() => navigate("/login")}
          >
            Wellv 가입하러 가기
          </AdditionalText>
        </ResultContainer>
      )}
    </Container>
  );
};

export default HomeSlide;
