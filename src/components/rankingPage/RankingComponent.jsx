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

} from "./RankingStyle";

import { SearchBox } from "./RankingContainer";
import { SeasonReactTable, TotalReactTable } from "./ReactTable";

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

export const SortedSection = ({ onRankingSelect }) => {

  return (
    <>
      <SortedImgBoxSection>
        {rankingTypes.map((ranking, index) => (
          <SortedBoxArea key={index} onClick={() => onRankingSelect(ranking.alt)}>
            <ItemType>
              <StyledIcon src={ranking.src} alt={ranking.alt} />
            </ItemType>
          </SortedBoxArea>
        ))}
      </SortedImgBoxSection>
    </>
  );
};

export const SearchSection = ({ rankingType }) => {
  return (
    <>
      <ItemSearchSection>
        <ItemArea>
          <SearchBox rankingType={rankingType}/>
        </ItemArea>
      </ItemSearchSection>
    </>
  );
};



export const BoardSection = ({ rankingType }) => {
  return (
    <>
    <br/>
      
      <ItemBoardSection>
        <ItemArea>
          <ItemBox>
          {rankingType === 'Total Ranking' && <TotalReactTable />}
          {rankingType === 'Season Ranking' && <SeasonReactTable />}
          </ItemBox>
        </ItemArea>
      </ItemBoardSection>
      
    </>
  );
};


