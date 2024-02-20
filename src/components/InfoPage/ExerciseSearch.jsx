import React, { useState, useCallback } from "react";
import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../../styles/Layouts";
import styled, { css } from "styled-components";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import { media } from "../../utils/MediaQuery";

const Search1 = styled.input`
  width: 40%;
  height: 35px;
  border-radius: 8px 0px 0px 8px;
  box-sizing: border-box;

  ${media.small`
    width: 100%
    `};
`;

const ExerciseSearch = ({ setdata }) => {
  const [keyword, setKeyword] = useState("");

  const keywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Main $justify="center" $align="center" $width="90%" $shadow="none">
      <Container
        $justify="end"
        $align="center"
        $direction="row"
        $height="auto"
        $shadow="none"
      >
        <Search1 value={keyword} onChange={keywordChange}></Search1>
        <MiddleButton
          style={{
            borderRadius: "0px 8px 8px 0px",
            height: "35px",
            boxSizing: "border-box",
          }}
          onClick={() => setdata(keyword)}
        >
          검색
        </MiddleButton>
      </Container>
    </Main>
  );
};

export default ExerciseSearch;
