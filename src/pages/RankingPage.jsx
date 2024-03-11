import React, { useState } from "react";
import {
  Main,
  Container,
} from "../styles/Layouts";
import { 
  SortedSection,
  SearchSection,
  BoardSection,
  PaginationSection,
 } from "../components/rankingPage/RankingComponent";

const RankingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  const [selectedRankingType, setSelectedRankingType] = useState('Total Ranking');

  return (
    <>
      <Main >
        <Container>
          <SortedSection onRankingSelect={setSelectedRankingType}/>
          <SearchSection rankingType={selectedRankingType}/>
          <BoardSection rankingType={selectedRankingType}/>
          <PaginationSection 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          />
        </Container>
      </Main>
    </>
  );
};
export default RankingPage;
