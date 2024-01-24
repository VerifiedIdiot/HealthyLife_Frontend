import {
    Main,
    Container,
    Section,
    Area,
    Box,
    Item,
    Element,
  } from "../../styles/Layouts";
  import styled from "styled-components";
  
  const InfoCategory = () => {
    return (
      <>
        <Main
          $direction="row"
          $justify="center"
          $height="100%"
          style={{ backgroundColor: "#D9D9D9", borderRadius: "8px" }}
        ></Main>
      </>
    );
  };
  export default InfoCategory;