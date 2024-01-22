import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar React wrapper
import dayGridPlugin from '@fullcalendar/daygrid'; // Import necessary plugins
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Section, Area, Box, Item, Element } from "../../styles/Layouts";

export const Calendars = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Replace 'YOUR_GOOGLE_API_KEY' and 'YOUR_CALENDAR_ID' with your actual API key and calendar ID
        const apiKey = 'AIzaSyBHLDaL_wbao5Ukua8ZHWzN2fXyN6INxPM';
        const calendarId = 'wellv2024';
        const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;
        
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
    <Container>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        header={{
          left: '',
          center: 'prev,title,next',
          right: ''
        }}
        monthYearFormat='MMMM YYYY'
        eventLimit={true}
        fixedWeekCount={false}
        defaultView='dayGridMonth'
        dayNamesShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        buttonText={{
          today: '오늘',
          month: '월별',
          week: '주별',
          day: '일별',
        }}
      />
    </Container>
  );
};

export default Calendars;