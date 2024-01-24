import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from "../../styles/Layouts";
// import MiddleModal from "../styles/modals/MiddleModal";

export const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState({
    Middle: false,
  });

  // const openModal = (size) => {
  //   setIsModalOpen({ ...isModalOpen, [size]: true });
  // };

  // const closeModal = (size) => {
  //   setIsModalOpen({ ...isModalOpen, [size]: false });
  // };

  const handleDateClick = (info) => {
    const clickedDateTime = new Date(info.date);
    const formattedDate = clickedDateTime.toLocaleString();
    console.log("클릭한 날짜 및 시간:", formattedDate);
    

  };
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       // const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_GOOGLE_CALENDARID}/events?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  //       // const response = await fetch(apiUrl);
  //       // const eventData = await response.json();

  //       // const events = eventData.items.map(item => ({
  //       //   title: item.summary,
  //       //   start: item.start.dateTime || item.start.date,
  //       //   end: item.end.dateTime || item.end.date
  //       // }));

  //       calendarRef.current.getApi().addEventSource(events);
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  const handleEventRender = (info) => {
    const clickedDate = new Date(info.event.start);
    const isClickedDate = info.date.getDate() === clickedDate.getDate();
    if (isClickedDate) {
      info.el.style.backgroundColor = '#4942E4';
    }
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
        height={'90vh'}
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
        dateRender={handleEventRender}
        // onClick={() => openModal('Middle')}
      />
    </Container>
  );
};

export default CalendarComponent;