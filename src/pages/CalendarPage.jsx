import { Main } from "../styles/Layouts";
import { CalendarComponent } from "../components/calendarPage/CalendarComponent";

const CalendarPage = () => {
  return (
    <>
      <Main>
          <CalendarComponent $height="100%" />
      </Main>
    </>
  );
};
export default CalendarPage;
