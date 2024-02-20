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

const Class1 = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;

  ${media.large`
    width: 45%
    `};
`;

const Class2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  font-size: 20px;
  font-weight: bold;
  text-align: center;

  ${media.large`
    width: 50%
    `};
  ${media.small`
    font-size: 15px;
    `};
`;

const Class3 = styled.select`
  background-color: white;
  width: 60%;
  height: 35px;
  border-radius: 8px;
`;

const Class4 = styled.option``;

const InfoClass = ({ setdata1, setdata2 }) => {
  const [selectedClass1, setSelectedClass1] = useState("");
  const [selectedClass2, setSelectedClass2] = useState("");

  const class1Options = [
    { value: "", label: "전체" },
    { value: "곡류 및 서류", label: "곡류 및 서류" },
    { value: "과자류", label: "과자류" },
    { value: "구이류", label: "구이류" },
    { value: "국 및 탕류", label: "국 및 탕류" },
    { value: "기타", label: "기타" },
    { value: "김치류", label: "김치류" },
    { value: "면 및 만두류", label: "면 및 만두류" },
    { value: "밥류", label: "밥류" },
    { value: "볶음류", label: "볶음류" },
    { value: "빵류", label: "빵류" },
    { value: "생체및 무침류", label: "생체및 무침류" },
    { value: "숙채류", label: "숙채류" },
    { value: "아이스크림류", label: "아이스크림류" },
    { value: "음료 및 차류", label: "음료 및 차류" },
    { value: "장아찌 및 절임류", label: "장아찌 및 절임류" },
    { value: "전.적 및 부침류", label: "전.적 및 부침류" },
    { value: "젓갈류", label: "젓갈류" },
    { value: "조림류", label: "조림류" },
    { value: "죽 및 스프류", label: "죽 및 스프류" },
    { value: "찌개 및 전골류", label: "찌개 및 전골류" },
    { value: "찜류", label: "찜류" },
    { value: "튀김류", label: "튀김류" },
    { value: "포류", label: "포류" },
    { value: "회류", label: "회류" },
  ];

  const class2Options = {
    "곡류 및 서류": [
      { value: "", label: "선택안함" },
      { value: "곡류 및 서류", label: "곡류 및 서류" },
      { value: "떡류", label: "떡류" },
    ],
    과자류: [
      { value: "", label: "선택안함" },
      { value: "기타 과자류", label: "기타 과자류" },
      { value: "스낵류", label: "스낵류" },
      { value: "초콜릿류", label: "초콜릿류" },
      { value: "쿠키.비스킷류", label: "쿠키.비스킷류" },
      { value: "한과류", label: "한과류" },
    ],
    구이류: [
      { value: "", label: "선택안함" },
      { value: "기타 구이류", label: "기타 구이류" },
      { value: "어패류구이", label: "어패류구이" },
      { value: "육류구이", label: "육류구이" },
      { value: "채소류구이", label: "채소류구이" },
    ],
    "국 및 탕류": [
      { value: "", label: "선택안함" },
      { value: "어패류국.탕", label: "어패류국.탕" },
      { value: "채소류국.탕", label: "채소류국.탕" },
      { value: "기타 국류", label: "기타 국류" },
      { value: "육류국.탕", label: "육류국.탕" },
      { value: "냉국류", label: "냉국류" },
      { value: "탕류", label: "탕류" },
    ],
    기타: [
      { value: "", label: "선택안함" },
      { value: "기타", label: "기타" },
    ],
    김치류: [
      { value: "", label: "선택안함" },
      { value: "김치", label: "김치" },
    ],
    "면 및 만두류": [
      { value: "", label: "선택안함" },
      { value: "중식면류", label: "중식면류" },
      { value: "라면류", label: "라면류" },
      { value: "국수류", label: "국수류" },
      { value: "스파게티류", label: "스파게티류" },
      { value: "만두류", label: "만두류" },
      { value: "기타 면류", label: "기타 면류" },
      { value: "기타 만두류", label: "기타 만두류" },
    ],
    밥류: [
      { value: "", label: "선택안함" },
      { value: "김밥(초밥)류", label: "김밥(초밥)류" },
      { value: "기타 밥류", label: "기타 밥류" },
      { value: "덮밥류", label: "덮밥류" },
      { value: "비빔밥류", label: "비빔밥류" },
      { value: "볶음밥류", label: "볶음밥류" },
      { value: "쌀밥.잡곡밥류", label: "쌀밥.잡곡밥류" },
      { value: "리조또.그라탕류", label: "리조또.그라탕류" },
    ],
    볶음류: [
      { value: "", label: "선택안함" },
      { value: "기타 볶음류", label: "기타 볶음류" },
      { value: "육류볶음", label: "육류볶음" },
      { value: "채소류볶음", label: "채소류볶음" },
      { value: "어패류볶음", label: "어패류볶음" },
      { value: "떡볶이류", label: "떡볶이류" },
    ],
    빵류: [
      { value: "", label: "선택안함" },
      { value: "기타 빵류", label: "기타 빵류" },
      { value: "도넛류", label: "도넛류" },
      { value: "버거류", label: "버거류" },
      { value: "샌드위치류", label: "샌드위치류" },
      { value: "식빵류", label: "식빵류" },
      { value: "앙금빵류", label: "앙금빵류" },
      { value: "케이크류", label: "케이크류" },
      { value: "크림빵류", label: "크림빵류" },
      { value: "페이스트리류", label: "페이스트리류" },
      { value: "피자류", label: "피자류" },
    ],
    "생채및 무침류": [
      { value: "어패류무침", label: "어패류무침" },
      { value: "나물.채소류무침", label: "나물.채소류무침" },
      { value: "기타 생채.무침류", label: "기타 생채.무침류" },
      { value: "샐러드", label: "샐러드" },
    ],
    숙채류: [
      { value: "", label: "선택안함" },
      { value: "나물.숙채류", label: "나물.숙채류" },
    ],
    아이스크림류: [
      { value: "", label: "선택안함" },
      { value: "아이스크림류", label: "아이스크림류" },
      { value: "빙수류", label: "빙수류" },
    ],
    "음료 및 차류": [
      { value: "", label: "선택안함" },
      { value: "과일.채소음료류", label: "과일.채소음료류" },
      { value: "기타 음료류", label: "기타 음료류" },
      { value: "스무디류", label: "스무디류" },
      { value: "우유.유제품류", label: "우유.유제품류" },
      { value: "주류", label: "주류" },
      { value: "차류", label: "차류" },
      { value: "커피류", label: "커피류" },
      { value: "탄산음료류", label: "탄산음료류" },
    ],
    "장아찌 및 절임류": [
      { value: "", label: "선택안함" },
      { value: "장아찌.절임류", label: "장아찌.절임류" },
    ],
    "전.적 및 부침류": [
      { value: "", label: "선택안함" },
      { value: "기타 전.적", label: "기타 전.적" },
      { value: "부침류", label: "부침류" },
      { value: "어패류전", label: "어패류전" },
      { value: "육류전", label: "육류전" },
      { value: "적류", label: "적류" },
      { value: "채소류전", label: "채소류전" },
    ],
    젓갈류: [
      { value: "", label: "선택안함" },
      { value: "젓갈류", label: "젓갈류" },
    ],
    조림류: [
      { value: "", label: "선택안함" },
      { value: "어패류조림", label: "어패류조림" },
      { value: "채소류조림", label: "채소류조림" },
      { value: "육류조림", label: "육류조림" },
      { value: "기타 조림류", label: "기타 조림류" },
    ],
    "죽 및 스프류": [
      { value: "", label: "선택안함" },
      { value: "죽류", label: "죽류" },
      { value: "스프류", label: "스프류" },
    ],
    "찌개 및 전골류": [
      { value: "", label: "선택안함" },
      { value: "육류찌개.전골", label: "육류찌개.전골" },
      { value: "어패류찌개.전골", label: "어패류찌개.전골" },
      { value: "채소류찌개.전골", label: "채소류찌개.전골" },
    ],
    찜류: [
      { value: "", label: "선택안함" },
      { value: "어패류찜", label: "어패류찜" },
      { value: "육류찜", label: "육류찜" },
      { value: "채소류찜", label: "채소류찜" },
      { value: "기타 찜류", label: "기타 찜류" },
    ],
    튀김류: [
      { value: "", label: "선택안함" },
      { value: "육류튀김", label: "육류튀김" },
      { value: "채소류튀김", label: "채소류튀김" },
      { value: "어패류튀김", label: "어패류튀김" },
      { value: "치킨류", label: "치킨류" },
      { value: "기타 튀김류", label: "기타 튀김류" },
    ],
    회류: [
      { value: "", label: "선택안함" },
      { value: "회류", label: "회류" },
    ],
    포류: [
      { value: "", label: "선택안함" },
      { value: "포류", label: "포류" },
    ],
  };

  const handleClass1Change = (e) => {
    const value = e.target.value;
    setSelectedClass1(value);
    setSelectedClass2(""); // 대분류 변경 시 소분류 선택 초기화
    setdata1(value); // 부모 컴포넌트에 선택된 값 전달
    setdata2(""); // 부모 컴포넌트의 소분류 값 초기화
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
      $shadow="none"
      style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", borderRadius: "8px" }}
    >
      <Container
        $justify="center"
        $align="center"
        $height="60px"
        $direction="row"
        $width="100%"
        $shadow="none"
      >
        <Class1>
          <Class2>식품 대분류</Class2>
          <Class3 onChange={handleClass1Change} value={selectedClass1}>
            {class1Options.map((option) => (
              <Class4 key={option.value} value={option.value}>
                {option.label}
              </Class4>
            ))}
          </Class3>
        </Class1>
        <Class1>
          <Class2>식품 소분류</Class2>
          <Class3 onChange={handleClass2Change} value={selectedClass2}>
            {selectedClass1 &&
              class2Options[selectedClass1].map((option) => (
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

export default InfoClass;
