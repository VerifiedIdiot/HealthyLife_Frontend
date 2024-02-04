import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import { CalendarSection } from "../components/calendarPage/CalendarComp";
import { MyCalendar } from "../components/calendarPage/tmp/MyCalendar";

const CalendarPage = () => {
  return (
    <>
      <Main $width="100%">
        <Container >
          <CalendarSection />
          {/* <MyCalendar $height="100%" /> */}
          
        </Container>
      </Main>
    </>
  );
};
export default CalendarPage;
