import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";

import { SearchSection, BoardSection, PaginationSection } from "../components/medicinePage/MedicineComponent";

const MedicinePage = () => {
  return (
    <>
      <Main>
        <Container $border="1px solid black">
            <SearchSection/>
            <BoardSection/>
            <PaginationSection/>
        </Container>
      </Main>
    </>
  );
};
export default MedicinePage;
