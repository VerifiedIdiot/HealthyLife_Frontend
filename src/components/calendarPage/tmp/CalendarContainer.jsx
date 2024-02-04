import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Section, Area, Box } from "../../../styles/Layouts";
import {
  SmallButton,
  MiddleButton,
} from "../../../styles/styledComponents/StyledComponents";
import MiddleModal from "../../../styles/modals/MiddleModal";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const InputField = styled.input`
  width: 54%;
  height: 40px;

  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };
  return (
    <SearchContainer>
      <SelectBox></SelectBox>
      <InputField
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchQuery}
        onChange={handleSearchQueryChange}
      ></InputField>
    </SearchContainer>
  );
};
const MovementContainer = styled(Container).attrs({
  className: "MovementContainer",
})``;
export const MovementItemBox = () => {
  return (
    <MovementContainer>
      <MenuInputSection>
          <MenuInputArea $height="15%">
            <InputText>운동 추가</InputText>
          </MenuInputArea>
          <MenuInputArea $height="15%">
            <InputField />
          </MenuInputArea>
          <MenuInputArea $height="70%" $justify="flex-end" $align="end">
            <AddMenuButton>추가</AddMenuButton>
          </MenuInputArea>
        </MenuInputSection>
    </MovementContainer>
  );
};

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
  background-color: yellow;
  height: 80%;
  border-radius: 0 4px 4px 0;
  margin: 0.6vw 0;
  transition: width 1.5s ease-in-out;
  width: ${(props) => props.width || 0};
`;

const ProgressLabel = styled.span`

  span{
    font-size: 3vw;
  }
`;

export const TandanjiRateBox = ({ value, label, children }) => {
  const [carbBarWidth, setCarbBarWidth] = useState(0);
  const [proteinBarWidth, setProteinBarWidth] = useState(0);
  const [fatBarWidth, setFatBarWidth] = useState(0);

  useEffect(() => {
    console.log(value);
    const total = Number(value.tan) + Number(value.dan) + Number(value.ji);
    console.log(total);
    const carb = total > 0 ? (value.tan / total) * 100 : 0;
    const protein = total > 0 ? (value.dan / total) * 100 : 0;
    const fat = total > 0 ? (value.ji / total) * 100 : 0;

    setCarbBarWidth(`${carb}%`);
    setProteinBarWidth(`${protein}%`);
    setFatBarWidth(`${fat}%`);
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

const MenuInputSection = styled(Section).attrs({
  className: "MenuSection",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  height: 70vh;
`;
const MenuInputArea = styled(Area).attrs({
  className: "MenuArea",
})`
  width: 100%;
  height: ${(props) => props.$height || "50%"};
  justify-content: ${(props) => props.$justify || "center"};
  align-items: ${(props) => props.$align || "center"};
`;

const AddMenuButton = styled(MiddleButton)`
  margin-top: 10px;
`;

// 식단 유형(아침, 점심, 저녁) 표시
export const MealItemBox = ({ mealtype }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MealContainer>
      <MealBox>
        {mealtype}&nbsp;
        <MealAddbtn onClick={handleOpenModal}>+</MealAddbtn>
      </MealBox>
      <MiddleModal
        $isOpen={isModalOpen}
        $onClose={handleCloseModal}
        // onSave={handleSave}
        mealType={mealtype}
      >
        <MenuInputSection>
          <MenuInputArea $height="15%">
            <InputText>{mealtype} 메뉴 추가</InputText>
          </MenuInputArea>
          <MenuInputArea $height="15%">
            <InputField />
          </MenuInputArea>
          <MenuInputArea $height="70%" $justify="flex-end" $align="end">
            {}
            <AddMenuButton >추가</AddMenuButton>
          </MenuInputArea>
        </MenuInputSection>
      </MiddleModal>
    </MealContainer>
  );
};

const InputContainer = styled(Container).attrs({
  className: "inputcontainer",
})`
  width: 50vw;
  height: 70vh;
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
export const SelectBox = ({ clickedDate, setSelectedSection }) => {
  const [selectedSection, setSelectedSectionState] = useState("전체기록");
  const [mealItems, setMealItems] = useState([]);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const buttons = ["식단", "운동", "전체기록"];

  useEffect(() => {
    setSelectedSectionState("식단");
  }, [clickedDate]);

  const handleAddMealItem = (mealType) => {
    setMealItems((prevItems) => [...prevItems, mealType]);
  };

  const handleSectionChange = (section) => {
    setSelectedSectionState(section);
    if (setSelectedSection) {
      setSelectedSection(section); // 상위 컴포넌트상태 업데이트
    }
    
    if (section === "운동") {
      setIsMovementModalOpen(true);
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
            <InputArea $height="20%">
              <InputCaloryBox>
                <InputText>표준 칼로리</InputText>
                <InputCalory>
                  <InputCaloryInfo>2,024&nbsp; </InputCaloryInfo>
                  <InputCaloryInfo $fontcolor="#000">Kcal </InputCaloryInfo>
                </InputCalory>
              </InputCaloryBox>
            </InputArea>
            <InputArea $height="80%">
              <MealItemBox mealtype="아침" handleAdd={handleAddMealItem} />
              <MealItemBox mealtype="점심" handleAdd={handleAddMealItem} />
              <MealItemBox mealtype="저녁" handleAdd={handleAddMealItem} />
            </InputArea>
          </>
        )}

        {selectedSection === "운동" && (
          <MiddleModal
            $isOpen={isMovementModalOpen}
            $onClose={() => setIsMovementModalOpen(false)}
          >
            <MovementItemBox />
          </MiddleModal>
        )}

        {selectedSection === "전체기록" && (
          <InputArea $height="80%">
            <TandanjiRateBox value={value}>
              <InputText>영양소 그래프</InputText>
            </TandanjiRateBox>
          </InputArea>
        )}
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
