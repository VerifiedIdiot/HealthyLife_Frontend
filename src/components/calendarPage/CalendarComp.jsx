import React, { useState } from "react";
import { Container, Section, Area, Box, Item } from "../../styles/Layouts";
import {
  SmallButton,
  MiddleButton,
} from "../../styles/styledComponents/StyledComponents";
import MiddleModal from "../../styles/modals/MiddleModal";
import { MealBox } from "./CalendarCont";
import styled from "styled-components";

// 캘린더 API 적용
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const InputSearchSection = styled(Section).attrs({
  className: "InputSearchSection",
})`
  width: ${(props) => props.$width || "100%"};
  height: 100%;
`;

const InputSearchArea = styled(Area).attrs({
  className: "InputSearchArea",
})`
  flex-direction: column;
`;

export const InputItemBox = styled(Box)`
  height: ${(props) => props.$height || "50%"};
  justify-content: center;
  align-items: center;
`;

const InputItem = styled(Item)`
  display: flex;
  align-items: flex-start;
  box-shadow: none;
  width: ${(props) => props.$width || "100%"};
`;

const ButtonItem = styled(Item)`
  justify-content: space-around;
  align-items: center;
`;

const ButtonStyle = styled(MiddleButton)`
  width: ${(props) => props.$width || "100%"};
  @media (max-width: 768px) {
    width: 40%;
  }
`;

const SelectDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DayButton = styled(SmallButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #666;
  width: auto;

  @media (max-width: 768px) {
    width: auto;
  }
`;

export const CalendarSection = () => {
  const [clickedDate, setClickedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const curDate = new Date();
  const [value, setValue] = useState(curDate);

  // 날짜 클릭 시 모달 창 열기
  const handleDayClick = (value) => {
    console.log("클릭한 날짜");
    setClickedDate(value);
    openModal();
  };

  const handleNextDay = () => {
    const nextDay = moment(value).add(1, "day").toDate();
    setValue(nextDay);
  };
  const handleBeforeDay = () => {
    const beforeDay = moment(value).add(-1, "day").toDate();
    setValue(beforeDay);
  };

  return (
    <>
      <CalendarContainer>
        <Calendar
          calendarType="US" // 요일을 일요일부터 시작하도록 설정
          locale="en" // 달력 설정 언어
          onChange={setValue}
          value={value}
          formatMonthYear={(locale, value) =>
            value.toLocaleDateString("ko", { year: "numeric", month: "long" })
          }
          //   tileContent={<ComboBox />} // 달력 내용 표시
          isBasic={true}
          minDetail="month"
          maxDetail="month"
          onClickDay={handleDayClick}
        />
        {clickedDate && (
          <MiddleModal $isOpen={modalOpen} $onClose={closeModal}>
            <InputSearchSection>
              <InputSearchArea>
                <InputItemBox $height="10%">
                  <DayButton onClick={handleBeforeDay}>{"<"}</DayButton>
                  <SelectDay>
                    {moment(value).format("YYYY년 MM월 DD일")}
                  </SelectDay>
                  <DayButton onClick={handleNextDay}>{">"}</DayButton>
                </InputItemBox>
                <InputItemBox $height="80%">
                  <InputItem>
                    <MealBox />
                  </InputItem>
                </InputItemBox>
                <InputItemBox $height="10%">
                  <ButtonItem>
                    <ButtonStyle type="button" $width="30%">
                      그래프
                    </ButtonStyle>
                    <ButtonStyle type="button" $width="60%">
                      기록하기
                    </ButtonStyle>
                  </ButtonItem>
                </InputItemBox>
              </InputSearchArea>
            </InputSearchSection>
          </MiddleModal>
        )}
      </CalendarContainer>
    </>
  );
};

const CalendarContainer = styled(Container)`
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
    color: #666;
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
    color: #fff;
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
    background: #6a6a6a;
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
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
