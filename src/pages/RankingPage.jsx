import React, { useState } from "react";
import {
  Main,
  Container,
} from "../styles/Layouts";
import { 
  SortedSection,
  SearchSection,
  ViewSection,
  BoardSection,
  PaginationSection
 } from "../components/rankingPage/RankingComponent";

const RankingPage = () => {
  const [selectedRankingType, setSelectedRankingType] = useState('Total Ranking');

  return (
    <>
      <Main >
        <Container>
          <SortedSection onRankingSelect={setSelectedRankingType}/>
          <SearchSection rankingType={selectedRankingType}/>
          
          <BoardSection rankingType={selectedRankingType}/>
        </Container>
      </Main>
    </>
  );
};
export default RankingPage;
