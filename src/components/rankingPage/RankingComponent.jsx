import React, {useState, useMemo} from "react";
import {
  SortedImgBoxSection,
  SortedBoxArea,
  ItemType,
  StyledIcon,
  ItemSearchSection,
  ItemArea,
  ItemBox,
  ItemBoardSection,
  PaginationButton,
  PaginationWrapper,
} from "./RankingStyle";

import { SearchBox } from "./RankingContainer";
import { FemaleReactTable, MaleReactTable, SeasonReactTable, TotalReactTable } from "./ReactTable";

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
  const [selectedRanking, setSelectedRanking] = useState(null);

  const handleRankingSelect = (ranking) => {
    setSelectedRanking(ranking);
    onRankingSelect(ranking);
  };

  return (
    <>
      <SortedImgBoxSection>
        {rankingTypes.map((ranking, index) => (
          <SortedBoxArea 
          key={index} 
          isSelected={selectedRanking === ranking.alt}
          onClick={() => handleRankingSelect(ranking.alt)}
          >
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
          {rankingType === 'Male Ranking' && <MaleReactTable />}
          {rankingType === 'Female Ranking' && <FemaleReactTable />}
          </ItemBox>
        </ItemArea>
      </ItemBoardSection>
      
    </>
  );
};


export const PaginationSection = ({ currentPage, setCurrentPage, totalPages }) => {
  const pageNumbers = useMemo(() => {
    let startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
    let endPage = startPage + 9 > totalPages ? totalPages : startPage + 9;

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }, [currentPage, totalPages]);

  return (
    <PaginationWrapper>
      {currentPage > 1 && (
        <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
          {"<"}
        </PaginationButton>
      )}
      {pageNumbers.map((number) => (
        <PaginationButton
          key={number}
          isActive={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </PaginationButton>
      ))}
      {currentPage < totalPages && (
        <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
          {">"}
        </PaginationButton>
      )}
    </PaginationWrapper>
  );
};

