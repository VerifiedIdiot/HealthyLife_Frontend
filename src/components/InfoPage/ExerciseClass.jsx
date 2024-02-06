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

const ExerciseClass = ({ setdata1, setdata2 }) => {
  const [selectedClass1, setSelectedClass1] = useState("");
  const [selectedClass2, setSelectedClass2] = useState("");

  const class1Options = [
    { value: "", label: "선택안함" },
    { value: "복근", label: "복근" },
    { value: "외전근", label: "외전근" },
    { value: "내전근", label: "내전근" },
    { value: "이두근", label: "이두근" },
    { value: "종아리", label: "종아리" },
    { value: "가슴", label: "가슴" },
    { value: "엉덩이", label: "엉덩이" },
    { value: "햄스트링", label: "햄스트링" },
    { value: "광배근", label: "광배근" },
    { value: "허리", label: "허리" },
    { value: "등", label: "등" },
    { value: "목", label: "목" },
    { value: "대퇴사두근", label: "대퇴사두근" },
    { value: "승모근", label: "승모근" },
    { value: "삼두근", label: "삼두근" },
    { value: "팔뚝", label: "팔뚝" },
    { value: "어깨", label: "어깨" },
  ];

  const class2Options = [
    { value: "", label: "선택안함" },
    { value: "초급자", label: "초급자" },
    { value: "중급자", label: "중급자" },
    { value: "상급자", label: "상급자" },
  ];

  const handleClass1Change = (e) => {
    const value = e.target.value;
    setSelectedClass1(value);
    setdata1(value); // 부모 컴포넌트에 선택된 값 전달
  };

  const handleClass2Change = (e) => {
    const value = e.target.value;
    setSelectedClass2(value);
    setdata2(value); // 부모 컴포넌트에 선택된 값 전달
  };

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
          <Class2>운동 부위</Class2>
          <Class3 onChange={handleClass1Change} value={selectedClass1}>
            {class1Options.map((option) => (
              <Class4 key={option.value} value={option.value}>
                {option.label}
              </Class4>
            ))}
          </Class3>
        </Class1>
        <Class1>
          <Class2>운동 난이도</Class2>
          <Class3 onChange={handleClass2Change} value={selectedClass2}>
            {class2Options.map((option) => (
              <Class4 key={option.value} value={option.value}>
                {option.label}
              </Class4>
            ))}
          </Class3>
        </Class1>
      </Container>
    </Main>
  );
};

export default ExerciseClass;
