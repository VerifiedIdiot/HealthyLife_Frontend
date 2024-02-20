import React from "react";
import { SearchSection, SelectBox, InputField } from "./RankingStyle";

export const SearchBox = ({ rankingType }) => {
  return (
    <>
      <SearchSection>
        <SelectBox>
          <p>{rankingType} 랭킹</p>
        </SelectBox>
        <InputField type="text" placeholder="닉네임을 입력하세요." />
      </SearchSection>
    </>
  );
};
