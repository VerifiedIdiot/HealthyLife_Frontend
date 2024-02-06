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

const Search1 = styled.input`
  width: 40%;
  height: 35px;
  border-radius: 8px 0px 0px 8px;
  border: none;
  background-color: #d9d9d9;
  box-sizing: border-box;
`;

const InfoSearch = ({ setdata }) => {
  const [keyword, setKeyword] = useState("");

  const keywordChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Main $justify="center" $align="center" $width="90%">
      <Container $justify="end" $align="center" $direction="row" $height="auto">
        <Search1 value={keyword} onChange={keywordChange}></Search1>
        <MiddleButton
          style={{
            borderRadius: "0px 8px 8px 0px",
            height: "35px",
            boxSizing: "border-box",
          }}
          onClick={() => setdata(keyword)}
        >
          음식검색
        </MiddleButton>
      </Container>
    </Main>
  );
};

export default InfoSearch;
