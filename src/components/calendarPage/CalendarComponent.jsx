import React, { useState, useRef, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MiddleModal from "../../styles/modals/MiddleModal";
import { Container, Section, Area, Box, Item } from "../../styles/Layouts";
import { SelectBox, TandanjiRateBox } from "./CalendarContainer";
import styled from "styled-components";

const value = {
  tan: '0',
  dan: '0',
  ji: '0',
};

const InputSection = styled(Section).attrs({
  className: "InputSection"
})`
`;

const InputArea = styled(Area).attrs({
  className: "InputArea",
})`
  
`;

const AddItemModal = ({ onClose }) => {
  // 항목 추가 로직
  // ...

  return (
    <div className="modal">
      {/* 입력 폼 및 항목 추가 버튼 */}
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const CalendarSection = () => {
  const calendarRef = useRef(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("전체기록");
  const [isAddItemModalOpen, setIsAddItemModalOpen] =useState(false);

  const handleDateClick = useCallback((info) => {
    const clickedDateTime = new Date(info.date);
    const formattedDate = clickedDateTime.toLocaleDateString();
    console.log("클릭한 날짜 및 시간:", formattedDate);
    setClickedDate(formattedDate);
    setIsModalOpen(true);
    setSelectedBtn("전체기록");
  }, []);

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
          <InputSection>
            <InputArea $height="30%">
              <SelectBox
                clickedDate={clickedDate}
                selectedBtn={setSelectedBtn}
                onOpenAddItemModal={() => setIsAddItemModalOpen(true)}
              />
            </InputArea>
            {isAddItemModalOpen && (
        <AddItemModal
          onClose={() => setIsAddItemModalOpen(false)}
        />
      )}
          </InputSection>
        </MiddleModal>
      )}
    </>
  );
};

export default CalendarSection;
