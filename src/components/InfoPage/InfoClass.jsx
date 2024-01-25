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

const Class1 = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;
`;

const Class2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Class3 = styled.select`
  background-color: white;
  width: 60%;
  height: 35px;
  border-radius: 8px;
  border: none;
`;

const Class4 = styled.option``;

const InfoClass = () => {
  return (
    <Main
      $align="center"
      $width="90%"
      style={{ backgroundColor: "#D9D9D9", borderRadius: "8px" }}
    >
      <Container
        $justify="center"
        $align="center"
        $height="60px"
        $direction="row"
        $width="100%"
      >
        <Class1>
          <Class2>식품 대분류</Class2>
          <Class3>
            <Class4 value="option1">옵션1</Class4>
          </Class3>
        </Class1>
        <Class1>
          <Class2>식품 소분류</Class2>
          <Class3>
            <Class4 value="option1">옵션2</Class4>
          </Class3>
        </Class1>
      </Container>
    </Main>
  );
};

export default InfoClass;
