import React, { useState, useEffect, useLayoutEffect } from "react";
import { CalendarMainSection } from "./CalendarStyle";
import { MealBox } from "./CalendarContainer";
import {
  InfoArea,
  InfoItemBox,
  InfoItem,
  ButtonItem,
  ButtonStyle,
} from "./CalendarStyle";

import MiddleModal from "../../styles/modals/MiddleModal";

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
    try {
      const selectedDate = formatDate(value);
      // console.log("가공된 날짜", selectedDate);
      actions.setSelectedDate(selectedDate);
      const email = state.email;
      const dateData = await CalendarApi.selectedDateMealInfo(
        email,
        selectedDate
      );
      actions.setDateData(dateData);

      openModal();
    } catch (error) {
      console.error("Fail", error);
    }
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

  // 캘린더의 특정 날짜에 속하는 정보가 갱신되면 재랜더링
  useEffect(() => {}, [state.dateDetails]);

  useEffect(() => {}, [state.monthData]);

  return (
    <>
      <CalendarMainSection>
        <Calendar
          calendarType="gregory"
          locale="en"
          formatMonthYear={(locale, value) =>
            value.toLocaleDateString("ko", { year: "numeric", month: "long" })
          }
          onClickDay={handleDayClick}
          onActiveStartDateChange={handleMonthClick}
          tileContent={({ date, view }) => {
            // 날짜를 YYYY-MM-DD 형식으로 변환
            const dateString = date.toISOString().split("T")[0];
            // 해당 날짜의 데이터 조회
            const dayData = state.monthData.find(
              (data) => data.reg_date === dateString.replace(/-/g, "")
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
              </div>
            ) : null;
          }}
        />
        <MiddleModal $isOpen={modalOpen} $onClose={closeModal}>
          <InfoArea>
            <InfoItemBox $height="10%"></InfoItemBox>
            <InfoItemBox $height="80%">
              <InfoItem>
                <MealBox />
              </InfoItem>
            </InfoItemBox>
            <InfoItemBox $height="10%">
              <ButtonItem>
                <ButtonStyle type="button" $width="30%">
                  그래프
                </ButtonStyle>
                <ButtonStyle type="button" $width="60%">
                  기록하기
                </ButtonStyle>
              </ButtonItem>
            </InfoItemBox>
          </InfoArea>
        </MiddleModal>
      </CalendarMainSection>
    </>
  );
};
