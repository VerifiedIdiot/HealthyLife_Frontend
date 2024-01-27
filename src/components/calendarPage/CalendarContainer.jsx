import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Section, Area, Box } from "../../styles/Layouts";
import {
  SmallButton,
  MiddleButton,
} from "../../styles/styledComponents/StyledComponents";

const value = {
  tan: "100",
  dan: "150",
  ji: "50",
};

const ProgressBarContainer = styled(Container).attrs({
  className: "ProgressBar",
})`
  background-color: #e0e0e0;
  height: 100%;
`;

const ProgressBar = styled(Box).attrs({
  className: "ProgressBar",
})`
  background-color: #4caf50;
  height: 100%;
  border-radius: 0 4px 4px 0;
  margin: 0.3vw 0;
  transition: width 1.5s ease-in-out;
  width: ${(props) => props.width || 0};
`;

const ProgressLabel = styled.span`
  font-size: 1vw;
`;

export const TandanjiRateBox = ({ value, label, children }) => {
  const [carbBarWidth, setCarbBarWidth] = useState(0);
  const [proteinBarWidth, setProteinBarWidth] = useState(0);
  const [fatBarWidth, setFatBarWidth] = useState(0);

  useEffect(() => {
    console.log(value);
    const total = Number(value.tan) + Number(value.dan) + Number(value.ji);
    console.log(total);
    const carbRatio = total > 0 ? (value.tan / total) * 100 : 0;
    const proteinRatio = total > 0 ? (value.dan / total) * 100 : 0;
    const fatRatio = total > 0 ? (value.ji / total) * 100 : 0;

    setCarbBarWidth(`${carbRatio}%`);
    setProteinBarWidth(`${proteinRatio}%`);
    setFatBarWidth(`${fatRatio}%`);
  }, [value]);

  return (
    <>
      {children}
      <ProgressBarContainer>
        <ProgressLabel>탄수화물</ProgressLabel>
        <ProgressBar width={carbBarWidth} />
        <ProgressLabel>단백질</ProgressLabel>
        <ProgressBar width={proteinBarWidth} />
        <ProgressLabel>지방</ProgressLabel>
        <ProgressBar width={fatBarWidth} />
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
`;

const InputSection = styled(Section).attrs({
  className: "inputsection",
})`
  justify-content: center;
`;

const InputBox = styled(MiddleButton)`
  border-radius: 0;
`;

const InputCaloryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputCalory = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const InputCaloryInfo = styled.span`
    align-items: center;
  font-size: 2.6vw;
  font-weight: bolder;
  
  color: ${(props) => props.$fontcolor || "#FD6B6B"};
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

const InputText = styled.span`
  font-size: 1%.8;
  font-weight: 700;
  padding: 0.3vw 0;
  display: block !important;

`;

// 식단, 운동, 하루기록 표시
export const SelectBox = ({ test, clickedDate, setSelectedSection }) => {
  const [selectedSection, setSelectedSectionState] = useState("전체기록");
  const buttons = ["식단", "운동", "전체기록"];

  useEffect(() => {
    setSelectedSectionState("식단");
  }, [clickedDate]);

  const handleSectionChange = (section) => {
    setSelectedSectionState(section);
    if (setSelectedSection) {
      setSelectedSection(section); // 상위 컴포넌트의 상태도 업데이트
    }
  };

  return (
    <InputContainer>
      <InputDate>{clickedDate}</InputDate>
      <InputSection $height="auto">
        {buttons.map((item) => (
          <InputBox key={item} onClick={() => handleSectionChange(item)}>
            {item}
          </InputBox>
        ))}
      </InputSection>
      <InputSection $direction="column" $height="100%">
        {selectedSection === "식단" && (
          <>
            <InputArea $height="auto">
              <InputCaloryBox>
                <InputText>표준 칼로리</InputText>
                <InputCalory>
                <InputCaloryInfo>2,024&nbsp; </InputCaloryInfo>
                <InputCaloryInfo $fontcolor="#000">Kcal </InputCaloryInfo>
                </InputCalory>
              </InputCaloryBox>
            </InputArea>
            <InputArea $height="55%">
              <MealItemBox mealtype="아침" />
              <MealItemBox mealtype="점심" />
              <MealItemBox mealtype="저녁" />
            </InputArea>
            <InputArea $height="30%">
              <TandanjiRateBox value={value}>
                <InputText>탄단지비율</InputText>
              </TandanjiRateBox>
            </InputArea>
          </>
        )}

        {selectedSection === "운동" && 
        <div>
          운동 
          시간(분)
          
          </div>}

        {selectedSection === "전체기록" && <div>전체기록 컨텐츠</div>}
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
