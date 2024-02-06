import { Main, Container } from "../styles/Layouts";
import { CalendarSection } from "../components/calendarPage/CalendarComponent";
import { CalendarProvider } from "../contexts/CalendarContext";

const CalendarPage = () => {
  return (
    <>
    <CalendarProvider>
      <Main $width="100%">
        <Container >
          <CalendarSection />
        </Container>
      </Main>
      </CalendarProvider>
    </>
  );
};
export default CalendarPage;
