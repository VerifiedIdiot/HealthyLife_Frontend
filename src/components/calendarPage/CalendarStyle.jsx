import React, { useState, useEffect } from "react";
import { Container, Section, Area, Box, Item } from "../../styles/Layouts";
import styled from "styled-components";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";

// 레이아웃
export const ComboBoxContainer = styled.div.attrs({
  className: "ComboBoxConstainer",
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${(props) => props.$width || "100%"};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ComboBoxSection = styled.div.attrs({
  className: "ComboBoxSection",
})`
  max-height: 100%;
`;

export const ComboSelectBox = styled.div.attrs({
  className: "SelectBox",
})`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.$justify || "flex-start"};
  align-items: center;
  width: 100%;
  height: ${(props) => props.$height || "100%"};
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ComboBox = styled.div.attrs({
  className:"comboBox"
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    flex-direction: row;
  }
`;


export const MealTitle = styled.div.attrs({
  className:"mealtitle"
})`
display:flex;
flex-direction:column;
justify-content: space-between;
`;

export const MealInput = styled.div`
  padding: 10px 0;
  border: none;
  background-color: transparent;
  font-size: 18px;

  h2 {
    font-size: 2rem;
  }
`;


export const MealInfoList = styled.ul``;

export const MealInfo = styled.li``;

export const MealLabel = styled.span`
  font-size: 18px;
`;

export const AddButton = styled.button`
  background: #fff;
  color: #4942e4;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

// 검색 레이아웃
export const InputField = styled.input`
  width: 30vw;
  height: 40px;

  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
  }
`;

export const InputAddBtn = styled(MiddleButton)`
  padding: 10px;
  margin: 10px;
`;

export const SearchResultContainer = styled.div`
  height: auto;
  width: 96%;
  overflow-y: auto; // 높이 초과할 경우 스크롤바 생성
  p {
    margin: 0;
    padding: 5px;
  }
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  .food-name {
    width: 33.9%;

  }
  .food-size {
    
    width: 33.9%;
    
  }
  .food-kcal {
    width: 33.9%;
    vertical-align: center;
  }
`;


//////////////////////////////////////////////////

// 기록 레이아웃
export const InfoArea = styled(Area).attrs({
  className: "InfoArea",
})`
  flex-direction: column;
`;

export const InfoItemBox = styled(Box)`
  height: ${(props) => props.$height || "50%"};
  justify-content: center;
  align-items: center;
`;

export const InfoItem = styled(Item)`
  display: flex;
  align-items: flex-start;
  box-shadow: none;
  width: ${(props) => props.$width || "100%"};
`;

export const ButtonItem = styled(Item)`
  justify-content: space-around;
  align-items: center;
`;

export const ButtonStyle = styled(MiddleButton)`
  width: ${(props) => props.$width || "100%"};
  @media (max-width: 768px) {
    width: 40%;
  }
`;

//////////////////////////////////////////////////

// 캘린더 화면
export const CalendarMainSection = styled(Container)`
  height: ${(props) => props.$height || "99%"};
  justify-content: space-between;
  display: flex;
  align-items: center;

  // react-calendar.css
  .react-calendar {
    margin: 10px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bgColor};
    color: #999;
  }

  .react-calendar__navigation button {
    color: #333;
    width: auto;
    height: auto;
    background: none;
  }

  .react-calendar__navigation__arrow {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-calendar__navigation__label {
    font-size: 20px;
  }

  .react-calendar__navigation__label__labelText {
    color: ${({ theme }) => theme.menuColor};
    font-size: 17px;
  }

  .react-calendar__viewContainer {
    margin-bottom: 15px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e3e3e3;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  abbr[title] {
    text-decoration: none;
    font-weight: 400;
    font-size: small;
  }

  .react-calendar__tile {
    text-align: center;
    height: ${(props) => (props.isMobile ? "85px" : "110px")};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    color: ${({ theme }) => theme.menuColor};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #e3e3e3;
    border-radius: 6px;
    color: #333;
  }

  .react-calendar__tile--now {
    background: #4942e4;
    font-weight: bold;
    border-radius: 6px;
    color: #fff;
  }

  // 오늘 날짜 선택 시
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};
    border-radius: 6px;
    font-weight: bold;
    color: #fff;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f0f0f0;
  }

  .react-calendar__tile--range {
    background: #eee;
    color: #333;
    border-radius: 6px;
  }

  .react-calendar__month-view__days__day--weekend {
    /* color: red; */
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: blue;
  }

  .react-calendar__month-view__weekdays {
    font-size: 1.2em;
  }

  /* 해당 월의 날짜가 아니면 투명도 0.5 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }
`;
