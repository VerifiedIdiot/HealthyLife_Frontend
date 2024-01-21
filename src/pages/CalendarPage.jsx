import { 
  Main, Container, Section, Area 
} from "../styles/Layouts";
import { HeaderSection,BodySection } from "../components/calendarPage/CalendarComponent";

const CalendarPage = () => {
  return (
    <>
      <Main>
        <Container $border="1px solid black">
          <HeaderSection $height="5%" />
          <BodySection $height="95%" />
        </Container>
      </Main>
    </>
  );
};
export default CalendarPage;
