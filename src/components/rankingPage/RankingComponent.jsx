import React, { useEffect, useState } from "react";
import {
  SortedImgBoxSection,
  SortedBoxArea,
  ItemType,
  StyledIcon,
  ItemSearchSection,
  ItemArea,
  ItemBox,
  ItemBoardSection,
  ItemViewSection,
  ItemPaginationSection,
  ItemPaginationArea,
  ItemPaginationButton,
} from "./RankingStyle";

import { SearchBox } from "./RankingContainer";
import { MyReactTable, TotalReactTable } from "./ReactTable";

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
      </ItemSearchSection>
    </>
  );
};

// 
export const ViewSection = () => {
  return (
  <>
  <p> 내 랭킹 출력 </p>
  <ItemViewSection>
  <MyReactTable></MyReactTable>
  </ItemViewSection>
  </>
  );
};

export const BoardSection = () => {

  

  return (
    <>
      <p> 토탈 랭킹 출력 </p>
      <ItemBoardSection>
        <ItemArea>
          <ItemBox>
            <TotalReactTable></TotalReactTable>
          </ItemBox>
        </ItemArea>
      </ItemBoardSection>
    </>
  );
};

export const PaginationSection = () => {
  return (
  <>
  <ItemPaginationSection>
    <ItemPaginationArea>
      <ItemPaginationButton>

      </ItemPaginationButton>
    </ItemPaginationArea>
  </ItemPaginationSection>
  </>
  );
};
