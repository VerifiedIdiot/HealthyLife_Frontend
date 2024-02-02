// React 및 필요한 훅과 API 호출 훅, 스타일 및 컴포넌트를 임포트합니다.
import { useState, useEffect, useCallback } from "react";
import { useApiRequestParams, useApiRequest } from "../hooks/useApiRequest";
import MedicineApi from "../api/MedicineApi";
import { Main, Container } from "../styles/Layouts";
import {
  SearchSection,
  BoardSection,
  PaginationSection,
} from "../components/medicinePage/MedicineComponent";

const MedicinePage = () => {
  // 검색 관련 상태를 관리합니다.
  const [comboSearch, setComboSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState({});
  
  // API 응답으로 받은 전체 항목 수를 관리합니다.
  const [totalCount, setTotalCount] = useState(0);
  
  // 타입 리스트와 체크박스 상태를 관리합니다.
  const [typeList, setTypeList] = useState({});
  const [checkBox, setCheckBox] = useState(false);
  
  // 콤보박스의 열림/닫힘 상태를 관리합니다.
  const [openComboBoxes, setOpenComboBoxes] = useState({});

  // 정렬 기준에 따라 데이터를 가져오는 API 호출의 상태를 관리합니다.
  const {
    data: sortByColumnData,
    loading: sortByColumnLoading,
    error: sortByColumnError,
  } = useApiRequestParams(MedicineApi.getSortByColumn, searchParams);

  // 타입별로 데이터를 가져오는 API 호출의 상태를 관리합니다.
  const {
    data: listByTypeData,
    loading: listByTypeLoading,
    error: listByTypeError,
  } = useApiRequest(MedicineApi.getListByType);

  // 검색 버튼 클릭 시 호출되는 함수입니다. 검색 파라미터를 설정합니다.
  const handleSearch = () => {
    setSearchParams({
      comboSearch: comboSearch,
      searchQuery: searchQuery,
      checkBox: checkBox,
    });
    // console.log(`${comboSearch} , ${searchQuery}  , ${searchQuery}` );
  };

  // 콤보박스와 검색 쿼리의 변경을 처리하는 함수입니다.
  const handleComboSearchChange = (value) => {
    setComboSearch(value);
  };
  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  // 선택된 항목의 변경을 처리하는 함수입니다.
  const handleSelectionChange = useCallback((key, selectedItems) => {
    // setState를 사용하여 비동기적으로 상태 업데이트
    setTimeout(() => {
      setCheckBox((prev) => ({
        ...prev,
        [key]: selectedItems,
      }));
    }, 0); // setTimeout을 사용하여 비동기적으로 처리
  }, []);

  // 콤보박스의 열림/닫힘 상태를 토글하는 함수입니다.
  const toggleComboBox = (comboBoxName) => {
    setOpenComboBoxes((prevOpenComboBoxes) => {
      const isCurrentlyOpen = prevOpenComboBoxes[comboBoxName];
      const newOpenComboBoxes = Object.keys(prevOpenComboBoxes).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      if (!isCurrentlyOpen) {
        newOpenComboBoxes[comboBoxName] = true;
      }
      return newOpenComboBoxes;
    });
  };

  // sortByColumnData가 변경될 때마다 totalCount를 업데이트합니다.
  useEffect(() => {
    if (sortByColumnData) {
      setTotalCount(sortByColumnData.totalCount);
    }
  }, [sortByColumnData]);

  // listByTypeData가 변경될 때마다 typeList를 업데이트합니다.
  useEffect(() => {
    if (listByTypeData) {
      setTypeList(listByTypeData);
    }
  }, [listByTypeData]);

  // 메인 레이아웃 컴포넌트를 렌더링합니다. 여기에는 검색 섹션, 게시판 섹션, 페이지네이션 섹션이 포함됩니다.
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
          openComboBoxes={openComboBoxes}
          toggleComboBox={toggleComboBox}
        />
        <BoardSection totalCount={totalCount} />
        <PaginationSection />
      </Container>
    </Main>
  );
};

export default MedicinePage;
