import { useState, useEffect, useLayoutEffect } from "react";
import {useApiRequestParams, useApiRequest} from "../hooks/useApiRequest";
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
  const [typeList, setTypeList] = useState({});
  const [checkBox, setCheckBox] = useState({
    "영양소 기능": [],
    "생리활성기능": [],
    "질병발생위험감소기능": [],
  });

  const { data: sortByColumnData, loading: sortByColumnLoading, error: sortByColumnError } = useApiRequestParams(
    MedicineApi.getSortByColumn,
    searchParams
  );

  // getListByType API 호출에 대한 상태
  const { data: listByTypeData, loading: listByTypeLoading, error: listByTypeError } = useApiRequest(MedicineApi.getListByType);

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

  const handleSelectionChange = (checkBoxes, selectedCheckBox) => {
    setCheckBox(prev => ({
      ...prev,
      [checkBoxes]: selectedCheckBox,
    }));
  };

  useEffect(() => {
    if (sortByColumnData) {
      setTotalCount(sortByColumnData.totalCount);
    }
  }, [sortByColumnData]);

  // getListByType API 호출에 대한 응답 처리
  useEffect(() => {
    if (listByTypeData) {
      setTypeList(listByTypeData); // 상태를 설정합니다.
    }
    
    // console.log(listByTypeData);
  }, [listByTypeData]);



  return (
    <Main $height="auto">
      <Container $height="auto">
        <SearchSection
          comboSearch={comboSearch}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          handleComboSearchChange={handleComboSearchChange}
          handleSearchQueryChange={handleSearchQueryChange}
          typeList={typeList}
          checkBox={checkBox}
  handleSelectionChange={handleSelectionChange}
        />
        <BoardSection totalCount={totalCount}/>
        <PaginationSection />
      </Container>
    </Main>
  );
};

export default MedicinePage;
