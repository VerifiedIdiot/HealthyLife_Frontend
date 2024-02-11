import { Main, Container } from "../styles/Layouts";
import { CalendarSection } from "../components/calendarPage/CalendarComponent";
import { CalendarProvider } from "../contexts/CalendarContext";
import Common from "../utils/Common";
import { useEffect, useState } from "react";

const CalendarPage = () => {
  const [emali, setEmail]  = useState("");

useEffect(() => {
  const fetchEmail = async () => {
    try {
      const response = await Common.TakenToken();
      setEmail(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("실패 ㅠㅠ");
    }
  };
  fetchEmail();
}, []);


  return (
    <>
    <CalendarProvider>
      <Main $width="100%">
        <Container >
          <CalendarSection emali={emali} />
        </Container>
      </Main>
      </CalendarProvider>
    </>
  );
};
export default CalendarPage;
