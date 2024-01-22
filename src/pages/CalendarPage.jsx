import { Main, Container, Section, Area } from "../styles/Layouts";
import { Calendars } from "../components/calendarPage/CalendarComponent";

const CalendarPage = () => {
  return (
    <>
      <Main>
        <Container $border="1px solid black">
          <Calendars $height="100%" />
          {/* <BodySection $height="95%" /> */}
        </Container>
      </Main>
    </>
  );
};
export default CalendarPage;
