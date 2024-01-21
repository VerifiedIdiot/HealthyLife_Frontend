import { Main, Container, Section, Area, Box, Item, Element } from "../../styles/Layouts"


export const HeaderSection = (props) => {
  return (
    <>
      <Section 
      $border="1px solid black"
      $height="8%"
      $align="center">
        <p>달력헤더</p>
      </Section>
      </>
    );
};

export const BodySection = () => {
    return (
        <>
        <Section 
        $height="100%"
        $justify="center"
        $align="center">
            <Area 
            $width="250px" 
            $height="100%"
            $border="1px solid #333">
                <p>달력1</p>
            </Area>
            <Area
            $width="78vw"
            $height="100%" 
            $border="1px solid #333">
                <p>달력2</p>
            </Area>
        </Section>
        </>
    );
};
