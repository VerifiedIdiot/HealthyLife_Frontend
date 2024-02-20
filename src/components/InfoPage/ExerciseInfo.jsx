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
import { media } from "../../utils/MediaQuery";
import abdominals from "../../assets/icons/info/abdominals.png";
import abductors from "../../assets/icons/info/abductors.png";
import adductors from "../../assets/icons/info/adductors.png";
import biceps from "../../assets/icons/info/biceps.png";
import calves from "../../assets/icons/info/calves.png";
import chest from "../../assets/icons/info/chest.png";
import forearms from "../../assets/icons/info/forearms.png";
import glutes from "../../assets/icons/info/glutes.png";
import hamstrings from "../../assets/icons/info/hamstrings.png";
import lats from "../../assets/icons/info/lats.png";
import lower_back from "../../assets/icons/info/lower_back.png";
import middle_back from "../../assets/icons/info/middle_back.png";
import neck from "../../assets/icons/info/neck.png";
import quadriceps from "../../assets/icons/info/quadriceps.png";
import shoulders from "../../assets/icons/info/shoulders.png";
import triceps from "../../assets/icons/info/triceps.png";

const Exercise = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 380px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
  justify-content: space-between;
  border-radius: 8px;
  margin: 1rem;
  max-width: 300px;
  min-width: 180px;
`;

const ExerciseImg = styled.img`
  width: 100%;
  max-width: 160px;
  height: 170px;
  border-radius: 8px 8px 0px 0px;
  display: block; /* 이미지를 블록 요소로 표시합니다. */
  margin: 0 auto; /* 가로 방향으로 가운데 정렬합니다. */
  margin-bottom: 0.5rem;

  ${media.medium`
    height: 150px;
    `};
`;

const ExerciseName = styled.div`
  width: 80%;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  max-width: 250px;
  min-width: 120px;
  display: flex;
  justify-content: center;
`;

const ExerciseDetail1 = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExerciseDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 140px;

  ${media.medium`
    height: 110px;
    `};
`;

const ExerciseDetail3 = styled.div`
  font-size: 15px;

  ${media.large`
    font-size: 14px;
    `};
`;

const ExerciseInfo = ({ exerciseData }) => {
  const selectMuscleImage = (muscle) => {
    switch (muscle) {
      case "abdominals":
      case "복근":
        return abdominals;
      case "abductors":
      case "외전근":
        return abductors;
      case "adductors":
      case "내전근":
        return adductors;
      case "biceps":
      case "이두근":
        return biceps;
      case "calves":
      case "종아리":
        return calves;
      case "chest":
      case "가슴":
        return chest;
      case "forearms":
      case "팔뚝":
        return forearms;
      case "glutes":
      case "엉덩이":
        return glutes;
      case "hamstrings":
      case "햄스트링":
        return hamstrings;
      case "lats":
      case "광배근":
        return lats;
      case "lower_back":
      case "허리":
        return lower_back;
      case "middle_back":
      case "traps":
      case "등":
      case "승모근":
        return middle_back;
      case "neck":
      case "목":
        return neck;
      case "quadriceps":
      case "대퇴사두근":
        return quadriceps;
      case "shoulders":
      case "어깨":
        return shoulders;
      case "triceps":
      case "삼두근":
        return triceps;
      default:
        return null;
    }
  };

  return (
    <Main
      $justify="center"
      $align="center"
      $width="100%"
      $height="auto"
      $shadow="none"
    >
      <Container
        $height="auto"
        $direction="row"
        $justify="center"
        $shadow="none"
        style={{ flexWrap: "wrap" }}
      >
        {exerciseData.map((item, index) => (
          <Exercise key={index}>
            <ExerciseImg src={selectMuscleImage(item.muscle)}></ExerciseImg>
            <ExerciseName>{item.name}</ExerciseName>
            <ExerciseDetail1>
              <ExerciseDetail2>
                <ExerciseDetail3>종류 {item.type}</ExerciseDetail3>
                <ExerciseDetail3>운동 부위 {item.muscle}</ExerciseDetail3>
                <ExerciseDetail3>장비 {item.equipment}</ExerciseDetail3>
                <ExerciseDetail3>난이도 {item.difficulty}</ExerciseDetail3>
              </ExerciseDetail2>
            </ExerciseDetail1>
          </Exercise>
        ))}
      </Container>
    </Main>
  );
};

export default ExerciseInfo;
