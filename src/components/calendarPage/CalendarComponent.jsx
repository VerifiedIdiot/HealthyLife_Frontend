import React, { useState, useEffect } from "react";
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
  const { state, actions, formatDate } = useCalendar();
  
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
      const dateDetails = await CalendarApi.selectedDateMealInfo(email, selectedDate);
      actions.setDateDetails(dateDetails);
      console.log(dateDetails);
      openModal();
    } catch (error) {
      console.error("Fail", error);
    }
  };

  useEffect(() => {
  }, [state.dateDetails]); 

  return (
    <>
      <CalendarMainSection>
        <Calendar
          calendarType="gregory" // 요일을 일요일부터 시작하도록 설정
          locale="en" // 달력 설정 언어
          formatMonthYear={(locale, value) =>
            value.toLocaleDateString("ko", { year: "numeric", month: "long" })
          }
          // tileContent={tileContent} // 달력 내용 표시
          onClickDay={handleDayClick}
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
