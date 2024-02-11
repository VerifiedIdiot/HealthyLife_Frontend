import React, { useState, useEffect } from "react";
import { Section, Area, Box, Item } from "../../styles/Layouts";
import { CalendarMainSection } from "./CalendarStyle";
import styled from "styled-components";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import { MealBox } from "./CalendarContainer";
import { 
    InfoArea,
    InfoItemBox,
    InfoItem,
    ButtonItem,
    ButtonStyle
} from "./CalendarStyle";

import MiddleModal from "../../styles/modals/MiddleModal";

// 캘린더 API 적용
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarApi from "../../api/CalendarApi";


export const CalendarSection = () => {
  const [date, setDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mealData, setMealData] = useState();


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 날짜 클릭 시 모달 창 열기
  const handleDayClick = async (value) => {
    try {
      console.log("클릭한 날짜", value);
      setDate(value);
      setClickedDate(true);
      openModal();
    } catch (error) {
      console.error("Fail", error);
    }
  };

  return (
    <>
      <CalendarMainSection>
        <Calendar
          calendarType="US" // 요일을 일요일부터 시작하도록 설정
          locale="en" // 달력 설정 언어
          formatMonthYear={(locale, value) =>
            value.toLocaleDateString("ko", { year: "numeric", month: "long" })
          }
          // tileContent={tileContent} // 달력 내용 표시
          onClickDay={handleDayClick}
        />
        {clickedDate && (
          <MiddleModal $isOpen={modalOpen} $onClose={closeModal}>
            <InfoArea>
                <InfoItemBox $height="10%">
                  
                </InfoItemBox>
                <InfoItemBox $height="80%">
                  <InfoItem>
                    <MealBox mealData={mealData} />
                  </InfoItem>
                </InfoItemBox>
                <InfoItemBox $height="10%">
                  <ButtonItem>
                    <ButtonStyle type="button" $width="30%">
                      그래프
                    </ButtonStyle>
                    <ButtonStyle
                      type="button"
                      $width="60%"
                    >
                      기록하기
                    </ButtonStyle>
                  </ButtonItem>
                </InfoItemBox>
              </InfoArea>
          </MiddleModal>
        )}
      </CalendarMainSection>
    </>
  );
};