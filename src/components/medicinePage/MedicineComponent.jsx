import { useState, useEffect, useLayoutEffect } from "react";
import { useSearch } from "../../contexts/SearchContext";
import { useTable } from "react-table";
import ReactTable from "./ReactTable";
import styled from "styled-components";
import { Section, Area, Box, Item } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import {
  SearchBox,
  ComboBox,
  ComboSearchBox,
  FilterDropdown,
} from "./MedicineContainer";
import capsule from "../../assets/icons/medicine/capsule.png";

const StyledIcon = styled.img.attrs({
  className: "medicine-icon",
})`
  object-fit: contain;
  height: 50%;
`;
const LogoItem = styled(Item)`
  width: 30%;
  align-items: center;
  margin-left: 1vw;
  h1 {
    margin-left: 10px;
  }

  h2 {
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    width: 50%;
    h1 {
      margin-left: 0;
    }
  }
`;

const ResponsiveSearchSection = styled(Section)`
  height: 200px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
  }
`;

const ResponsiveSearchArea = styled(Area)`
  flex-direction: column;

  height: 90%;
  width: 95%;

  @media (max-width: 768px) {
  }
`;

const ResponsiveItemBox = styled(Box)`
  height: 60px;

  @media (max-width: 768px) {
  }
`;

const ResponsiveItem = styled(Item)`
  padding-left: 13%;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const SearchItemLeft = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  /* height: 60px; */
  width: 15%;
  white-space: nowrap;

  p {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    width: 19.5%;
    min-width: 110px;
    p {
      font-size: smaller;
    }
  }
`;

const SearchItemRight = styled(Item)`
  display: flex;
  align-items: center;
  box-shadow: none;
  width: ${(props) => props.$width || "100%"};
  padding-right: ${(props) => props.$paddingRight || ""};
  @media (max-width: 768px) {
  }
`;

const ButtonItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  box-shadow: none;
  @media (max-width: 768px) {
  }
`;

const StyledButton = styled(LargeButton)`
  width: 200px;
  height: 45px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchSection = () => {
  // Context에서 상태와 함수를 불러옵니다.
  const { state, actions } = useSearch();
  const { typeList } = state;
  const {
    toggleComboBox,
    handleCheckboxChange,
    setSearchQuery,
    performSearch,
  } = actions;

  // 콤보박스 토글 핸들러: 콤보박스의 열림/닫힘 상태를 관리합니다.
  const handleToggleComboBox = (comboBoxId) => toggleComboBox(comboBoxId);

  // 검색 실행: 사용자가 설정한 조건에 따라 검색을 수행합니다.
  const handleSearch = () => {
    actions.performSearch(); // 검색 실행
  };
  // typeList의 키를 정렬하여 UI에 순서대로 표시합니다.
  const orderedKeys = Object.keys(typeList).sort((a, b) => a.localeCompare(b));

  // 콤보박스 위치 결정 로직
  const getPosition = (index) => {
    if (index === 0) return "left"; // 배열의 첫 번째 요소
    if (index === 2) return "right"; // 배열의 마지막 요소
    return "middle"; // 그 외 중간 위치
  };

  return (
    <>
      <ResponsiveSearchSection>
        <ResponsiveSearchArea>
          <ResponsiveItemBox>
            <LogoItem>
              <StyledIcon src={capsule} />
              <h1>제품 검색</h1>
            </LogoItem>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <ResponsiveItem>
              <ComboSearchBox />
              <ButtonItem>
                <StyledButton
                  type="button"
                  onClick={handleSearch}
                  onChange={actions.updateSearchConditions}>
                  검색
                </StyledButton>
              </ButtonItem>
            </ResponsiveItem>
          </ResponsiveItemBox>

          <ResponsiveItemBox>
            <SearchItemLeft>
              <p>기능성 검색</p>
            </SearchItemLeft>
            {orderedKeys.map((key, index) =>
              typeList[key] ? (
                <SearchItemRight $width="33.9%" key={key}>
                  <ComboBox
                    comboBoxId={key}
                    typeList={typeList[key]}
                    $position={getPosition(index, orderedKeys.length)} // 콤보박스 위치 전달
                    toggleComboBox={() => handleToggleComboBox(key)}></ComboBox>
                </SearchItemRight>
              ) : null
            )}
          </ResponsiveItemBox>
        </ResponsiveSearchArea>
      </ResponsiveSearchSection>
    </>
  );
};

const ResponsiveBoardSection = styled(Section)`
  /* border: 1px solid black; */
  height: auto;
  min-height: 30vw;

  align-items: center;
  flex-direction: column;
`;

const ResponsiveFilterItem = styled(Item)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 70%;

  padding-right: 10px;
`;

const ResponsiveBoardArea = styled(Area)`
  /* border: 1px solid black; */
  height: 95%;
  width: 95%;
  height: auto;
`;

const ResponsiveBoardBox = styled(Box)`
  height: auto;
`;

export const BoardSection = () => {
  const { state, actions } = useSearch();
  const { totalCount } = state;

  return (
    <>
      <ResponsiveBoardSection>
        <ResponsiveBoardArea>
          <ResponsiveItemBox>
            <LogoItem>
              <StyledIcon src={capsule} />
              <h1>제품 목록</h1>
              <h2>Total : {totalCount}</h2>
            </LogoItem>

            <ResponsiveFilterItem>
              <FilterDropdown />
            </ResponsiveFilterItem>
          </ResponsiveItemBox>
        </ResponsiveBoardArea>

        <ResponsiveBoardArea>
          <ResponsiveBoardBox>
            <ReactTable></ReactTable>
          </ResponsiveBoardBox>
        </ResponsiveBoardArea>
      </ResponsiveBoardSection>
    </>
  );
};

const ResponsivePaginationSection = styled(Section)`
  height: 5%;
  justify-content: center;
  align-items: center;
  min-height: 80px;
`;

const ResponsivePaginationArea = styled(Area)`
  display: flex;
  justify-content: center;
  
  height: 90%;
  width: 95%;
`;

const PaginationButton = styled.button`
  height: 30px;
  width: 30px;
  margin-right: 2px;
`

export const PaginationSection = () => {
  const { state, actions } = useSearch();
  const { page, size, totalCount } = state;

  const totalPages = Math.ceil(totalCount / size);
  // 페이지 범위를 계산하여 현재 페이지가 속한 그룹의 첫 페이지를 결정
  const currentPageGroupStart = Math.floor(page / 10) * 10 + 1;

  const startPage = currentPageGroupStart;
  let endPage = startPage + 9;
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  const goToPage = (pageNumber) => {
    actions.setPage(pageNumber); // 페이지 번호를 설정하는 액션 호출
    actions.performSearch(); // 새 페이지 번호로 검색을 다시 수행
  };

  return (
    <>
      <ResponsivePaginationSection>
        <ResponsivePaginationArea>
          
            {/* 이전 페이지 그룹으로 이동 */}
            {startPage > 1 && (
              <PaginationButton onClick={() => goToPage(startPage - 10)}>{"<"}</PaginationButton>
            )}
            {/* 페이지 번호 버튼 */}
            {pageNumbers.map((pageNumber) => (
              <PaginationButton
                key={pageNumber}
                className={page === pageNumber ? "active" : ""}
                onClick={() => goToPage(pageNumber)}>
                {pageNumber}
              </PaginationButton>
            ))}
            {/* 다음 페이지 그룹으로 이동 */}
            {endPage < totalPages && (
              <PaginationButton onClick={() => goToPage(endPage + 1)}>{">"}</PaginationButton>
            )}
          
        </ResponsivePaginationArea>
      </ResponsivePaginationSection>
    </>
  );
};
