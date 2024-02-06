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

const Exercise = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 400px;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 8px;
  margin: 1rem;
`;

const ExerciseImg = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 100%;
`;

const ExerciseName = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const ExerciseDetail1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ExerciseDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 180px;
`;

const ExerciseDetail3 = styled.div``;

const ExerciseInfo = ({ exerciseData }) => {
  const Open = () => {
    console.log(exerciseData);
  };

  const ImageofMuscle = (muscle) => {};
  return (
    <Main $justify="center" $align="center" $width="90%">
      <Container
        $direction="row"
        $justify="center"
        style={{ flexWrap: "wrap" }}
      >
        {exerciseData.map((item, index) => (
          <Exercise key={index} onClick={Open}>
            <ExerciseImg
              src={`${ImageofMuscle(item.muscle)}`}
              onClick={Open}
            ></ExerciseImg>
            <ExerciseName>{item.name}</ExerciseName>
            <ExerciseDetail1>
              <ExerciseDetail2>
                <ExerciseDetail3>종류:{item.type}</ExerciseDetail3>
                <ExerciseDetail3>운동 부위:{item.muscle}</ExerciseDetail3>
                <ExerciseDetail3>장비:{item.equipment}</ExerciseDetail3>
                <ExerciseDetail3>난이도:{item.difficulty}</ExerciseDetail3>
              </ExerciseDetail2>
            </ExerciseDetail1>
          </Exercise>
        ))}
      </Container>
    </Main>
  );
};

export default ExerciseInfo;
