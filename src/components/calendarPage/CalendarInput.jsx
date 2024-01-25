import React from "react";
import { Container, Section, Area } from "../../styles/Layouts";


export const CalendarInput = (props) => {
 return (
  <>
  <Container $height="80vh">
    <Section 
    $direction="column"
    $height="10%"
    >
    <Area
     $justify="center"
     $align="center"
    >
     {/* <Input1></Input1> */}
    </Area>
    </Section>
    <Section
    $height="100%"
    >
    <Area
     $justify="center"
     $align="center"
    >지겨워</Area>
    <Area
     $justify="center"
     $align="center"
    >개귀찮</Area>
    </Section>
 </Container>
 </>
 );
};

export default CalendarInput;