import React from "react";
import {
    SearchSection,
    SelectBox,
    InputField
} from "./RankingStyle";

export const SearchBox = () => {
  return (
  <>
  <SearchSection>
    <SelectBox>
        (시즌/남/여/토탈) 랭킹
    </SelectBox>
    <InputField
    type="text"
    placeholder="닉네임을 입력하세요." 
    />
  </SearchSection>
  </>
  );
};
