import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar React wrapper
import dayGridPlugin from '@fullcalendar/daygrid'; // Import necessary plugins
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Section, Area, Box, Item, Element } from "../../styles/Layouts";

export const CalendarComponent = () => {
  const calendarRef = useRef(null);

  const handleDateClick = (info) => {
    console.log("클릭날짜", info.date);
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${process.env.REACT_APP_GOOGLE_CALENDARID}/events?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        const response = await fetch(apiUrl);
        const eventData = await response.json();

        const events = eventData.items.map(item => ({
          title: item.summary,
          start: item.start.dateTime || item.start.date,
          end: item.end.dateTime || item.end.date
        }));

        calendarRef.current.getApi().addEventSource(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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
      />
    </Container>
  );
};

export default CalendarComponent;