import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import CalendarSection from "../components/calendarPage/CalendarComponent";
import { MyCalendar } from "../components/calendarPage/MyCalendar";

const CalendarPage = () => {
  return (
    <>
      <Main $width="100%">
        <Container $height="100vh" >
          {/* <CalendarSection $height="100%" /> */}
          <MyCalendar $height="100%" />
          
        </Container>
      </Main>
    </>
  );
};
export default CalendarPage;
