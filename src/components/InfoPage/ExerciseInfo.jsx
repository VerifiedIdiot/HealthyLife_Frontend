import React, { useState, useCallback } from "react";
import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../../styles/Layouts";
import styled, { css } from "styled-components";

const ExerciseData = [
  {
    name: "팔굽혀펴기",
    type: "맨몸 운동",
    muscle: "가슴",
    equipment: "맨몸",
    difficulty: "쉬움",
    kcal: 100,
  },
  {
    name: "팔굽혀펴기",
    type: "맨몸 운동",
    muscle: "가슴",
    equipment: "맨몸",
    difficulty: "쉬움",
    kcal: 100,
  },
  {
    name: "팔굽혀펴기",
    type: "맨몸 운동",
    muscle: "가슴",
    equipment: "맨몸",
    difficulty: "쉬움",
    kcal: 100,
  },
];

const Food = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 400px;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 8px;
  margin: 1rem;
`;

const FoodImg = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 100%;
`;

const FoodName = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const FoodSize = styled.div``;

const FoodDetail1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const FoodDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 180px;
`;

const FoodDetail3 = styled.div``;

const FoodInfo = () => {
  return (
    <Main $justify="center" $align="center" $width="90%">
      <Container
        $direction="row"
        $justify="center"
        style={{ flexWrap: "wrap" }}
      >
        {ExerciseData.map((item, index) => (
          <Food key={index}>
            <FoodName>{item.name}</FoodName>
            <FoodSize>(1시간당 소모 칼로리 {item.kcal}kcal)</FoodSize>
            <FoodDetail1>
              <FoodDetail2>
                <FoodDetail3>종류:{item.kcal}</FoodDetail3>
                <FoodDetail3>운동 부위:{item.muscle}</FoodDetail3>
                <FoodDetail3>장비:{item.equipment}</FoodDetail3>
                <FoodDetail3>난이도:{item.difficulty}</FoodDetail3>
              </FoodDetail2>
            </FoodDetail1>
          </Food>
        ))}
      </Container>
    </Main>
  );
};

export default FoodInfo;
