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

const FoodInfo = ({ foodData }) => {
  const Open = () => {
    console.log(foodData);
  };
  return (
    <Main $justify="center" $align="center" $width="90%" $height="auto">
      <Container
        $height="auto"
        $direction="row"
        $justify="center"
        style={{ flexWrap: "wrap" }}
      >
        {foodData.map((item, index) => (
          <Food key={index}>
            <FoodImg src={`${item.image}`} onClick={Open}></FoodImg>
            <FoodName>{item.name}</FoodName>
            <FoodSize>(1회 제공량 {item.servingSize}g)</FoodSize>
            <FoodDetail1>
              <FoodDetail2>
                <FoodDetail3>칼로리:{item.kcal}kcal</FoodDetail3>
                <FoodDetail3>당류:{item.sugar}g</FoodDetail3>
                <FoodDetail3>지방:{item.fat}g</FoodDetail3>
                <FoodDetail3>트랜스지방:{item.transFat}g</FoodDetail3>
                <FoodDetail3>나트륨:{item.salt}g</FoodDetail3>
              </FoodDetail2>
              <FoodDetail2>
                <FoodDetail3>탄수화물:{item.carbohydrate}g</FoodDetail3>
                <FoodDetail3>단백질:{item.protein}g</FoodDetail3>
                <FoodDetail3>포화지방:{item.saturatedFat}g</FoodDetail3>
                <FoodDetail3>콜레스테롤:{item.cholesterol}g</FoodDetail3>
              </FoodDetail2>
            </FoodDetail1>
          </Food>
        ))}
      </Container>
    </Main>
  );
};

export default FoodInfo;
