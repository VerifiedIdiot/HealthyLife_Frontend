import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Section, Area, Box } from "../../styles/Layouts";
import {
  SmallButton,
  MiddleButton,
} from "../../styles/styledComponents/StyledComponents";


const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  height: 1vw;
`;

const ProgressBar = styled.div`
  background-color: #4caf50;
  height: 100%;
  border-radius: 8px;
  transition: width 1.5s ease-in-out;
  @media (max-width: 768px) {
    height: 150%;
  }
`;

const ProgressLabel = styled.span`
  font-size: 1.5vw;
  @media (max-width: 768px) {
    font-size: 4vw; // 화면 너비가 768px 이하일 때 폰트 크기 조정
  }
`;

export const  TanDanJiItemBox = ({ value, label }) => {
  const [value1, setValue1] = useState(0); // 탄수화물
  const [value2, setValue2] = useState(0); // 단백질
  const [value3, setValue3] = useState(0); // 지방
  const [carbBarWidth, setCarbBarWidth] = useState(0);
  const [proteinBarWidth, setProteinBarWidth] = useState(0);
  const [fatBarWidth, setFatBarWidth] = useState(0);

  useEffect(() => {
    console.log(value);
    const total = value1 + value2 + value3;
    const carbRatio = total > 0 ? (value1 / total) * 100 : 0;
    const proteinRatio = total > 0 ? (value2 / total) * 100 : 0;
    const fatRatio = total > 0 ? (value3 / total) * 100 : 0;

    // 각 비율에 따라 프로그레스 바 너비 설정
    const timeoutId = setTimeout(() => {
      setCarbBarWidth(carbRatio);
      setProteinBarWidth(proteinRatio);
      setFatBarWidth(fatRatio);
    }, 1000);

    // return () => clearTimeout(timeoutId);
  }, [value1, value2, value3]);
  
  return (
  <>
    <ProgressLabel>{label}</ProgressLabel>
    <ProgressBarContainer>
      <ProgressBar width={carbBarWidth} label="탄수화물" />
      <ProgressBar width={proteinBarWidth} label="단백질" />
      <ProgressBar width={fatBarWidth} label="지방" />
      <div>test</div>
    </ProgressBarContainer>
    </>
  );
};

const MealContainer = styled(Container).attrs({
  className: "mealcontainer",
})`
  height: 25%;
`;

const MealBox = styled(Box).attrs({
  className: "mealBox",
})`
  align-items: center;
`;

const MealAddbtn = styled(SmallButton).attrs({
  className: "mealAddbtn",
})`
  width: 25px;
`;

// 식단 유형(아침, 점심, 저녁) 표시
export const MealItemBox = ({ mealtype }) => {
  return (
    <MealContainer>
      <MealBox>
        {mealtype}&nbsp;<MealAddbtn>+</MealAddbtn>
      </MealBox>
    </MealContainer>
  );
};

const InputContainer = styled(Container).attrs({
  className: "inputcontainer",
})`
  width: 50vw;
  height: 70vh;
  border: 1px solid black;
  padding: 0 8%;
`;

const InputSection = styled(Section).attrs({
  className: "inputsection",
})`
  justify-content: center;
`;

const InputBox = styled(MiddleButton)`
  border-radius: 0;
`;

const InputArea = styled(Area)`
  flex-direction: column;
  justify-content: center;
  box-shadow: none;
  height: ${(props) => props.$height || "100%"};
`;

const InputDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

// 식단, 운동, 하루기록 표시
export const SelectBox = ({ clickedDate }) => {
  const buttons = ["식단", "운동", "전체기록"];
  return (
    <InputContainer>
      <InputDate>{clickedDate}</InputDate>
      <InputSection $height="auto">
        {buttons.map((item) => (
          <InputBox key={item} isToday={item === "전체기록"}>
            {item}
          </InputBox>
        ))}
      </InputSection>
      <InputSection $direction="column" $height="100%" $>
        <InputArea $height="25%">표준 칼로리</InputArea>
        <InputArea $>
          <MealItemBox mealtype="아침" />
          <MealItemBox mealtype="점심" />
          <MealItemBox mealtype="저녁" />
        </InputArea>
        <InputArea>test
          <tandanjiRateBox />
        </InputArea>
      </InputSection>
    </InputContainer>
  );
};

// import { useEffect, useRef } from 'react';

// export const Calendars = (prop) => {
//     const calendarRef = useRef(null);

//     useEffect(() => {
//         const fetchEvents = async () => {
//           try {
//             const apiKey = 'AIzaSyBHLDaL_wbao5Ukua8ZHWzN2fXyN6INxPM';
//             const calendarId = 'wellv2024';
//             const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

//             const response = await fetch(apiUrl);
//             const eventData = await response.json();

//             const events = eventData.items.map(item => ({
//               title: item.summary,
//               start: item.start.dateTime || item.start.date,
//               end: item.end.dateTime || item.end.date
//             }));

//             calendarRef.current.getApi().addEventSource(events);
//           } catch (error) {
//             console.error('Error fetching events:', error);
//           }
//         };

//         fetchEvents();
//       }, []);
// }
