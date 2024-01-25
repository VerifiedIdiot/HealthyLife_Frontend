import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from "../../styles/Layouts";
import MiddleModal from "../../styles/modals/MiddleModal";

export const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (info) => {
    const clickedDateTime = new Date(info.date);
    const formattedDate = clickedDateTime.toLocaleString();
    console.log("클릭한 날짜 및 시간:", formattedDate);
    setClickedDate(formattedDate);
    setIsModalOpen(true);
  };

  return (
    <Container $height="100%" $shadow="none" $border="none">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        titleFormat={{
          year: 'numeric',
          month: 'long'
        }}
        dayMaxEventRows={true}
        initialView='dayGridMonth'
        height={'30vh'}
        dayHeaderFormat={{
          weekday: 'short'
        }}
        buttonText={{
          today: '오늘',
          month: '월별',
          week: '주별',
          day: '일별',
        }}
        dateClick={handleDateClick}
        events={[
        { 
          title: '1차전', 
          date: '2024-01-15', 
          backgroundColor: '#4942E4'
        },
        { 
          title: '2차전', 
          date: '2024-01-20', 
          backgroundColor: '#4942E4' 
        },
        { 
          title: '3차전', 
          date: '2024-01-25', 
          backgroundColor: '#4942E4' 
        },
        {
          title: 'TEST1', 
          date: '2024-01-25', 
          backgroundColor: '#FD6B6B' 
        },
          
      ]}
      />
      {clickedDate && (
        <MiddleModal
          $isOpen={isModalOpen} // 모달의 열림 상태를 boolean 값으로 전달
          $onClose={() => setIsModalOpen(false)} // 모달 닫기 함수를 전달
          clickedDate={clickedDate}
        >
        </MiddleModal>
      )}
    </Container>
  );
};

export default CalendarComponent;