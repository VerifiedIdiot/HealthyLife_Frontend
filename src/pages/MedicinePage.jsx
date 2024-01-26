import { useState, useEffect } from "react";
import useApiRequest from "../hooks/useApiRequest";
import MedicineApi from "../api/MedicineApi";
import { Main, Container } from "../styles/Layouts";
import {
  SearchSection,
  BoardSection,
  PaginationSection,
} from "../components/medicinePage/MedicineComponent";

const MedicinePage = () => {
  const [comboSearch, setComboSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState({});
  const [totalCount, setTotalCount] = useState(0);

  const { data, loading, error } = useApiRequest(
    MedicineApi.getSortByColumn,
    searchParams
  );

  const handleSearch = () => {
    setSearchParams({
      comboSearch: comboSearch,
      searchQuery: searchQuery,
    });
    console.log(`${comboSearch} , ${searchQuery}`);
  };

  const handleComboSearchChange = (value) => {
    setComboSearch(value);
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    if (data) {
      setTotalCount(data.totalCount);
    }
  }, [data]);

  return (
    <Main $height="auto">
      <Container $height="auto">
        <SearchSection
          comboSearch={comboSearch}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleComboSearchChange={handleComboSearchChange}
          handleSearchQueryChange={handleSearchQueryChange}
        />
        <BoardSection totalCount={totalCount} loading={loading} error={error} />
        <PaginationSection />
      </Container>
    </Main>
  );
};

export default MedicinePage;
