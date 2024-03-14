import React from "react";

import { useEffect } from "react";
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
  width: 100%;

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

  width: 100%;
  height: ${(props) => props.$height || "100%"};
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ComboBox = styled.div.attrs({
  className: "comboBox",
})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  background: white;
  padding: 10px 0;
  margin: 1vh 0;
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  div {
    flex-direction: row;
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const NavigationButton = styled.button`
  background-color: #4942e4;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3932c4;
  }
`;

export const DateDisplay = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const MealTitle = styled.div.attrs({
  className: "mealtitle",
})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 3vw;
`;

export const MealInput = styled.div`
  padding: 10px 0;
  border: none;
  background-color: transparent;

  h2 {
    font-size: 1.2rem;
    align-items: baseline;
  }
`;

export const ToggleButton = styled.div`
  width: 100%;

  hr {
    border: none;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const MealInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 80%;
`;

export const WorkoutInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 3vw;
`;
export const MealDel = styled.button`
  margin: 0 3px;
  color: #666;
  border: 1px solid #eee;
  border-radius: 3px;
  width: 20px;
`;
export const MealInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
`;

export const MealInfoList = styled.ul`
  /* text-align: left; */
`;

export const MealInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export const WorkoutInfoList = styled.ul``;

export const MealButtonBox = styled.div``;

export const AddButton = styled.button`
  background-color: #4942e4;
  color: #eee;
  border: none;
  border-radius: 8px;
  align-items: center;
  height: 25px;
  width: 25px;

  cursor: pointer;

  &:hover {
    background: #333;
  }
`;

export const MealButton = styled.div`
  display: flex;
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
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }

  .food-name,
  .workout-name {
    width: 33.9%;
  }
  .food-size,
  .workout-part {
    width: 33.9%;
  }
  .food-kcal,
  .workout-equipment {
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
  box-shadow: none;
`;

export const InfoItemBox = styled(Box)`
  height: ${(props) => props.$height || "50%"};
  justify-content: center;
  align-items: center;
  box-shadow: none;
  overflow-y: auto;
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
    font-size: 16px;
  }

  .react-calendar__viewContainer {
    margin-bottom: 10px;
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
    height: 135px;
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
    color: #666;
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
    color: black;
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: black;
  }

  .react-calendar__month-view__weekdays {
    font-size: 1.2em;
  }

  /* 해당 월의 날짜가 아니면 투명도 0.5 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }
`;

/// 날짜별 모달 ///

const ModalOverlay = styled.div`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  width: ${(props) => props.$width || "450px"};
  height: ${(props) => props.$height || "650px"};

  z-index: 99999;

  @media (max-width: 768px) {
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;

  /* @media (max-width: 768px) {
    
    top: 1px;
    right: 1px;
    
  } */
`;

const ContentSection = styled.div`
  display: flex;
`;

const CalendarModal = ({ $isOpen, $onClose, imageSrc, children }) => {
  // esc 누르면 모달창 종료
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        $onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [$onClose]);

  return (
    <>
      <ModalOverlay $isOpen={$isOpen} onClick={$onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {/* <ImageSection src={imageSrc} /> */}
          <ContentSection>{children}</ContentSection>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default CalendarModal;

/// 날짜별 모달 내 영역 ///

export const DailyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 40%;
  border: 1px solid black;
`;

export const DailyInfoArea = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  border: 1px solid black;
`;



