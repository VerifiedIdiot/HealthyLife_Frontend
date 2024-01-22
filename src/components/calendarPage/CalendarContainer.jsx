// import { useEffect, useRef } from 'react';


// export const Calendars = (prop) => {
//     const calendarRef = useRef(null);
    
//     useEffect(() => {
//         const fetchEvents = async () => {
//           try {
//             const apiKey = 'AIzaSyBHLDaL_wbao5Ukua8ZHWzN2fXyN6INxPM';
//             const calendarId = 'wellv2024';
//             const apiUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;
            
//             const response = await fetch(apiUrl);
//             const eventData = await response.json();
    
//             const events = eventData.items.map(item => ({
//               title: item.summary,
//               start: item.start.dateTime || item.start.date,
//               end: item.end.dateTime || item.end.date
//             }));
    
//             calendarRef.current.getApi().addEventSource(events);
//           } catch (error) {
//             console.error('Error fetching events:', error);
//           }
//         };
    
//         fetchEvents();
//       }, []);
// }