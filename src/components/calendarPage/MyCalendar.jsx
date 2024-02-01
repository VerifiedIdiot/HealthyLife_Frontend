import React, { useState, useEffect, forwardRef } from "react";
import MiddleModal from "../../styles/modals/MiddleModal";
import { Container, Section, Area } from "../../styles/Layouts";
import styled from "styled-components";

// 캘린더 API 적용
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export const MyCalendar = forwardRef(({ isBasic }, ref) => {

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const curDate = new Date();
  const [value, setValue] = useState(curDate);

  // value가 변경될 때마다 모달 창 열기
  useEffect(() => {
    if (value !== curDate) {
      openModal();
    }
  }, [value]);

  // 
  const handleNextDay = () => {
    const nextDay = moment(value).add(1, "day").toDate();
    setValue(nextDay);
  };
  const handleBeforeDay = () => {
    const beforeDay = moment(value).add(-1, "day").toDate();
    setValue(beforeDay);
  };

  // api 연결
  const [workoutDates, setworkoutDates] = useState([]);
  const [todayExercise, settodayExercise] = useState([]);

  // 컨텐츠 날짜 리스트
  const scList = [
    "2024-01-04",
    "2024-01-05",
    "2024-01-10",
    "2024-01-11",
    "2024-01-17",
    "2024-01-30",
  ];

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }) => {
    // 해당 날짜에 추가할 컨텐츠의 배열
    const contentMeal = [];
    const contentWorkout = [];
    const contentTotal = [];

    // data가 리스트의 날짜와 일치하면 해당 컨텐츠 추가
    // 운동
    if (scList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
      contentWorkout.push(
        <>
          {isBasic ? (
            <div className="dot-workout">
            </div>
          ) : (
            <div className="box-workout">
              <p>아침</p>
              <p>점심</p>
              <p>저녁</p>

            </div>
          )}
        </>
      );
    }
    return (
      <Container>
        {isBasic ? (
          <>
            <div className="content-row">
              <div className="content-meal">{contentMeal}</div>
              <div className="content-workout">{contentWorkout}</div>
            </div>
            <div className="content-total">{contentTotal}</div>
          </>
        ) : (
          <>
            <div className="content-row">{contentTotal}</div>
            <div className="content-column">
              <div className="content-meal">{contentWorkout}</div>
              <div className="content-workout">{contentTotal}</div>
            </div>
          </>
        )}
      </Container>
    );
  };
  return (
    <>
      <CalendarContainer>
        {isBasic ? (
          <Calendar
            ref={ref}
            calendarType="US" // 요일을 일요일부터 시작하도록 설정
            locale="en" // 달력 설정 언어
            onChange={setValue}
            value={value}
            formatMonthYear={(locale, value) =>
              value.toLocaleDateString("ko", { year: "numeric", month: "long" })
            }
            tileContent={addContent}
            isBasic={true}
            minDetail="month"
            maxDetail="month"
          />
        ) : (
          <Calendar
            ref={ref}
            calendarType="US" // 요일을 일요일부터 시작하도록 설정
            locale="en" // 달력 설정 언어
            onChange={setValue}
            value={value}
            formatMonthYear={(locale, value) =>
              value.toLocaleDateString("ko", { year: "numeric", month: "long" })
            }
            tileContent={addContent}
            isBasic={true}
            minDetail="month"
            maxDetail="month"
          />
        )}
        {modalOpen && (
            <MiddleModal open={openModal} close={closeModal}>
                <DayContainer>
                <DayButton onClick={handleBeforeDay}>
                </DayButton>
                <SelectDay>
                  {moment(value).format("YYYY년 MM월 DD일")}
                </SelectDay>
                <DayButton onClick={handleNextDay}>
                </DayButton>
              </DayContainer>
            </MiddleModal>
        )}
      </CalendarContainer>
    </>
  );
});


const CalendarContainer = styled.div`
  padding-bottom: 30px;
  width: 100%;
  height: ${(props) => props.$height || "auto"};
  justify-content: space-between;
  display: flex;
  align-items: center;
  .calendar-tab {
    display: ${(props) => (props.isMobile ? "none" : "flex")};
    flex-direction: column;
    align-items: center;
    margin: 20px 10px 0 20px;
    padding: 10px;
    height: auto;
    background-color: ${({ theme }) => theme.bgColor};
    color: #999;
    line-height: 1.125em;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .select-day {
    margin: 10px;
  }

  .contents {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .calendar_Main {
    display: flex;
  }

  .content-row {
    display: flex;
    flex-direction: row;
    margin: 7px;
  }

  .content-colunm {
    display: flex;
    flex-direction: column;
  }

  .content-sc,
  .content-work {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .dot-expense,
  .dot-income,
  .dot-expense,
  .dot-schedule,
  .dot-work {
    margin: 1px;
    width: ${(props) => (props.isMobile ? "0.5em" : "0.6em")};
    height: ${(props) => (props.isMobile ? "0.5em" : "0.6em")};
    border-radius: 50%;
    /* margin-top: 55px; */
  }

  .income-text {
    color: #3fcea5;
  }

  .expense-text {
    color: #ff005c;
  }

  .dot-income {
    background-color: #3fcea5;
  }

  .dot-expense {
    background-color: #ff005c;
  }

  .income-text,
  .expense-text {
    font-size: 0.8em;
  }

  .dot-schedule,
  .box-schedule {
    background-color: #329d9c;
  }

  .dot-work,
  .box-work {
    background-color: #bdbdbd;
  }

  .box-schedule,
  .box-work {
    width: 2em;
    height: 1.2em;
    border-radius: 10%;
    margin: 1px;
    align-items: center;
    justify-content: center;
    vertical-align: center;
    p {
      color: #fff;
      font-size: 0.6em;
      padding-bottom: 1px;
    }
  }

  // react-calendar.css
  .react-calendar {
    margin: 10px;
    width: 90%;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bgColor};
    color: #999;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__navigation button {
    color: #222;
    font-weight: bold;
    width: auto;
    height: auto;
    background: none;
    /* font-size: 16px; */
    /* margin-top: 15px; */
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

  .react-calendar__viewContainer {
    margin-bottom: 15px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.bgColor};
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    /* background: ${({ theme }) => theme.bgColor}; */
    background: ${({ theme }) => theme.todayColor};
    border-radius: 6px;
    font-weight: bold;
    color: #222;
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
    background: ${({ theme }) => theme.seldayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: blue;
  }

  // react-calendar.css
  .react-calendar {
    margin: 10px;
    width: 85%;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bgColor};
    color: #999;
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__navigation button {
    color: ${({ theme }) => theme.menuColor};
    font-weight: bold;
    width: auto;
    height: auto;
    background: none;
    /* font-size: 16px; */
    /* margin-top: 15px; */
  }

  .react-calendar__navigation__arrow {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background-color: ${({ theme }) => theme.bgColor};
    border: 0px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${({ theme }) => theme.seldayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    /* background: ${({ theme }) => theme.bgColor}; */
    background: ${({ theme }) => theme.todayColor};
    border-radius: 6px;
    font-weight: bold;
    color: #222;
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
    background: ${({ theme }) => theme.todayColor};
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f0f0f0;
  }

  .react-calendar__tile--range {
    background: ${({ theme }) => theme.todayColor};
    color: #fff;
    border-radius: 6px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__month-view__days__day--weekend:nth-child(7n) {
    color: blue;
  }

  /* .react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: top;
  font-size: 0.75em;
  font-weight: bold;
} */

  .react-calendar__tile {
    padding: 0;
}

  .react-calendar__tile {
    text-align: center;
    /* padding: 20px; */
    height: ${(props) => (props.isMobile ? "85px" : "100px")};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    color: ${({ theme }) => theme.menuColor};
  }

  .react-calendar__month-view__weekdays {
    font-size: 1.2em;
  }

  /* 해당 월의 날짜가 아니면 투명도 0.5 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }
`;

const SelectDay = styled.div`
  font-size: 17px;
  margin-right: 10px;
  width: 140px;
  margin: 0 auto;
`;

const DayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  font-weight: 600;
`;

const DayButton = styled.button`
  border-radius: 15%;
  width: 30px;
  height: 30px;
  background-color: #ffffff00;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.menuBgColor};
  }
  > svg {
    fill: ${({ theme }) => theme.budgetButton};
  }
`;