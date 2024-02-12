import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import { 
  SortedSection,
  SearchSection,
  ViewSection,
  BoardSection,
  PaginationSection
 } from "../components/rankingPage/RankingComponent";

const RankingPage = () => {
  return (
    <>
      <Main >
        <Container>
          <SortedSection />
          <SearchSection />
          <ViewSection />
          <BoardSection />
          <PaginationSection />
        </Container>
      </Main>
    </>
  );
};
export default RankingPage;
