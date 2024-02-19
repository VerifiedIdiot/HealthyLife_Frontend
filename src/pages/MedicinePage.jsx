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
    <Main $height="auto" $width="100%">
      <Container $height="auto" $width="100%">
        <SearchSection/>
        <BoardSection />
        <PaginationSection />
      </Container>
    </Main>
    </SearchProvider>
  );
};

export default MedicinePage;
