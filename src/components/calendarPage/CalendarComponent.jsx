import React, { useState, useEffect } from "react";
import { CalendarMainSection } from "./CalendarStyle";
import { MealBox } from "./CalendarContainer";
import { InfoArea, InfoItemBox, InfoItem } from "./CalendarStyle";
import SmallModal from "../../styles/modals/MiddleModal";

// 캘린더 API 적용
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarApi from "../../api/CalendarApi";
import { useCalendar } from "../../contexts/CalendarContext";

export const CalendarSection = () => {
  const { state, actions, formatDate, formatMonth } = useCalendar();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 날짜 클릭 시 모달 창 열기
  const handleDayClick = async (value) => {
    const selectedDate = formatDate(value);
    openModal();
    await actions.fetchDateData(selectedDate);
  };

  // 월 전환 버튼 클릭시 실행되는 함수
  const handleMonthClick = async ({ activeStartDate }) => {
    try {
      const month = formatMonth(activeStartDate);
      actions.setSelectedMonth(month);
      const email = state.email;
      const monthData = await CalendarApi.getMonthData(email, month);
      actions.setMonthData(monthData);
      console.log(monthData);
    } catch (error) {
      console.error("Failed to fetch month data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (state.email) {
      const fetchMonthData = async () => {
        const month = formatMonth(new Date());
        actions.setSelectedMonth(month);
        const email = state.email;
        const monthData = await CalendarApi.getMonthData(email, month);
        actions.setMonthData(monthData);
        console.log(monthData);
      };
      fetchMonthData();
    }
  }, [state.email]);

  return (
    <>
      <CalendarMainSection>
        <Calendar
          calendarType="gregory"
          locale="en"
          formatMonthYear={(locale, value) =>
            value.toLocaleDateString("ko-KR", {
              timeZone: "Asia/Seoul",
              year: "numeric",
              month: "long",
            })
          }
          onClickDay={handleDayClick}
          onActiveStartDateChange={handleMonthClick}
          value={
            new Date(
              state.selectedDate.slice(0, 4),
              state.selectedDate.slice(4, 6) - 1,
              state.selectedDate.slice(6, 8)
            )
          }
          activeStartDate={
            new Date(
              state.selectedMonth.slice(0, 4),
              state.selectedMonth.slice(4, 6) - 1
            )
          }
          tileContent={({ date, view }) => {
            // 날짜를 YYYY-MM-DD 형식으로 변환
            const dateString = formatDate(date); // 이 함수는 date를 'YYYYMMDD' 형식으로 변환해야 합니다.

            const dayData = state.monthData.find(
              (data) => data.reg_date === dateString
            );
            // 데이터가 있으면 내용을 렌더링, 없으면 null 반환
            return dayData ? (
              <div>
                {/* 여기에 dayData를 사용한 렌더링 로직 구현 */}
                칼로리: {dayData.calorie}
                <br />
                아침: {dayData.morning_meal_achieved ? "✅" : "❌"}
                <br />
                점심: {dayData.lunch_meal_achieved ? "✅" : "❌"}
                <br />
                저녁: {dayData.dinner_meal_achieved ? "✅" : "❌"}
                <br />
                운동: {dayData.workout_achieved ? "✅" : "❌"}
              </div>
            ) : null;
          }}
        />
        <SmallModal $width="25vw" $isOpen={modalOpen} $onClose={closeModal}>
          <InfoArea>
            
            <InfoItemBox $height="95%">
              <InfoItem>
                <MealBox />
              </InfoItem>
            </InfoItemBox>
          </InfoArea>
        </SmallModal>
      </CalendarMainSection>
    </>
  );
};
