import React from "react";
import {
  SortedImgBoxSection,
  SortedBoxArea,
  ItemType,
  StyledIcon,
  ItemSearchSection,
  ItemArea,
  ItemBox,
} from "./RankingStyle";
import { SearchBox } from "./RankingContainer";

import ReactTable from "./ReactTable";
import seasonRanking from "../../assets/icons/ranking/seasonRanking.png";
import maleRanking from "../../assets/icons/ranking/maleRanking.png";
import femaleRanking from "../../assets/icons/ranking/femaleRanking.png";
import totalRanking from "../../assets/icons/ranking/totalRanking.png";

const rankingTypes = [
  { src: seasonRanking, alt: "Season Ranking" },
  { src: maleRanking, alt: "Male Ranking" },
  { src: femaleRanking, alt: "Female Ranking" },
  { src: totalRanking, alt: "Total Ranking" },
];

export const SortedSection = () => {
  return (
    <>
      <SortedImgBoxSection>
        {rankingTypes.map((ranking, index) => (
          <SortedBoxArea key={index}>
            <ItemType>
              <StyledIcon src={ranking.src} alt={ranking.alt} />
            </ItemType>
          </SortedBoxArea>
        ))}
      </SortedImgBoxSection>
    </>
  );
};

export const SearchSection = () => {
  return (
    <>
      <ItemSearchSection>
        <ItemArea>
          <SearchBox />
        </ItemArea>
        <ItemArea>
          <ItemBox>
            <ReactTable></ReactTable>
          </ItemBox>
        </ItemArea>
      </ItemSearchSection>
    </>
  );
};

export const BoardSection = () => {
  return <></>;
};

export const PaginationSection = () => {
  return <></>;
};
