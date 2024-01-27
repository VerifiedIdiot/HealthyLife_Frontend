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

const CalendarPage = () => {
  return (
    <>
      <Main>
        <Container $height="auto">
          <CalendarSection $height="100%" />
        </Container>
      </Main>
    </>
  );
};
export default CalendarPage;
