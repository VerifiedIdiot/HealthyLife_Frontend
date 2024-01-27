import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MiddleModal from "../../styles/modals/MiddleModal";
import {SelectBox, MealItemBox, TanDanJiItemBox} from "./CalendarContainer";


const value = {
  tan : 100 ,
  dan : 100,
  ji :50

}

const CalendarSection = () => {
  const calendarRef = useRef(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (info) => {
    const clickedDateTime = new Date(info.date);
    const formattedDate = clickedDateTime.toLocaleDateString();
    console.log("클릭한 날짜 및 시간:", formattedDate);
    setClickedDate(formattedDate);
    setIsModalOpen(true);
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        titleFormat={{
          year: "numeric",
          month: "long",
        }}
        dayMaxEventRows={true}
        initialView="dayGridMonth"
        height={"90vh"}
        dayHeaderFormat={{
          weekday: "short",
        }}
        buttonText={{
          today: "오늘",
          month: "월별",
          week: "주별",
          day: "일별",
        }}
        dateClick={handleDateClick}
      />
      {clickedDate && (
        <MiddleModal
          $isOpen={isModalOpen} // 모달의 열림 상태를 boolean 값으로 전달
          $onClose={() => setIsModalOpen(false)} // 모달 닫기 함수를 전달
          clickedDate={clickedDate}
        >
          <SelectBox clickedDate={clickedDate}>
            <MealItemBox flex-direction="column"/>
            <TanDanJiItemBox value={value}/>
          </SelectBox>
        </MiddleModal>
      )}
    </>
  );
};

export default CalendarSection;
