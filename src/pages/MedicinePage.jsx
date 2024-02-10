import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchProvider } from "../contexts/SearchContext";
import { Main, Container } from "../styles/Layouts";
import {
  SearchSection,
  BoardSection,
  PaginationSection,
} from "../components/medicinePage/MedicineComponent";

const MedicinePage = () => {

  return (
    <SearchProvider>
    <Main $height="auto">
      <Container $height="auto">
        <SearchSection/>
        <BoardSection />
        {/* <PaginationSection /> */}
      </Container>
    </Main>
    </SearchProvider>
  );
};

export default MedicinePage;
