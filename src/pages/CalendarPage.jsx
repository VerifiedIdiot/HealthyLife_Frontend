import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import { CalendarSection } from "../components/calendarPage/CalendarComponent";

const CalendarPage = () => {
  return (
    <>
      <Main $width="100%">
        <Container >
          <CalendarSection />
        </Container>
      </Main>
    </>
  );
};
export default CalendarPage;
