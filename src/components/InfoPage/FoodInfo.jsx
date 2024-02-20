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

const Food = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 440px;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1);
  border-radius: 8px;
  margin: 1rem;
  max-width: 300px;
  min-width: 180px;
`;

const FoodImg = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 8px 8px 0px 0px;
  display: block; /* 이미지를 블록 요소로 표시합니다. */
  margin: 0 auto; /* 가로 방향으로 가운데 정렬합니다. */
  object-fit: cover;
  margin-bottom: 0.5rem;

  ${media.medium`
    height: 150px;
    `};
`;

const FoodName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FoodSize = styled.div`
  font-size: 12px;
  margin-bottom: 0.5rem;
`;

const FoodDetail1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  ${media.medium`
    flex-direction: column;
    margin-left: 1rem;
    `};
`;

const FoodDetail2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 180px;

  ${media.medium`
    height: 110px;
    `};
`;

const FoodDetail3 = styled.div`
  font-size: 15px;

  ${media.large`
    font-size: 14px;
    `};
`;

const FoodInfo = ({ foodData }) => {
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
        {foodData.map((item, index) => (
          <Food key={index}>
            <FoodImg src={`${item.image}`}></FoodImg>
            <FoodName>{item.name}</FoodName>
            <FoodSize>(1회 제공량 {item.servingSize}g)</FoodSize>
            <FoodDetail1>
              <FoodDetail2>
                <FoodDetail3>칼로리 {item.kcal}kcal</FoodDetail3>
                <FoodDetail3>당류 {item.sugar}g</FoodDetail3>
                <FoodDetail3>지방 {item.fat}g</FoodDetail3>
                <FoodDetail3>트랜스지방 {item.transFat}g</FoodDetail3>
                <FoodDetail3>나트륨 {item.salt}g</FoodDetail3>
              </FoodDetail2>
              <FoodDetail2>
                <FoodDetail3>탄수화물 {item.carbohydrate}g</FoodDetail3>
                <FoodDetail3>단백질 {item.protein}g</FoodDetail3>
                <FoodDetail3>포화지방 {item.saturatedFat}g</FoodDetail3>
                <FoodDetail3>콜레스테롤 {item.cholesterol}g</FoodDetail3>
              </FoodDetail2>
            </FoodDetail1>
          </Food>
        ))}
      </Container>
    </Main>
  );
};

export default FoodInfo;
