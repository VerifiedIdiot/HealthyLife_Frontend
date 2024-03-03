import { useCallback, useMemo, useEffect, useRef, useState } from "react";
import { useSearch } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

import ReactTable from "./ReactTable";
import styled from "styled-components";
import { Section, Area, Box, Item } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import {
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
    white-space: nowrap;
  }

  h2 {
    margin-left: 10px;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    width: 35%;
  }

  @media (max-width: 500px) {
  }
`;

const ResponsiveSearchSection = styled(Section)`
  height: 200px;
  justify-content: center;
  align-items: center;
  min-width: 1050px;

  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    /* overflow-x: hidden; */
  }

  @media (max-width: 500px) {
  }
`;

const ResponsiveSearchArea = styled(Area)`
  flex-direction: column;

  height: 90%;
  width: 95%;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const ResponsiveItemBox = styled(Box)`
  height: 60px;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const ResponsiveItem = styled(Item)`
  padding-left: 13%;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding-left: 0;
  }

  @media (max-width: 500px) {
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
    display: none;
  }

  @media (max-width: 500px) {
    display: none;
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

  @media (max-width: 500px) {
  }
`;

const ButtonItem = styled(Item)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 15%;
  box-shadow: none;
  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const StyledButton = styled(LargeButton)`
  width: 200px;
  height: 45px;
  @media (max-width: 768px) {
    width: 17vw;
  }

  @media (max-width: 500px) {
  }
`;

export const SearchSection = () => {
  // Context에서 상태와 함수를 불러옵니다.
  const { state, actions } = useSearch();
  const { typeList } = state;
  const { toggleComboBox } = actions;
  // SearchSection에 포커스가 가있는지 판별하기 위한 useRef
  const searchSectionRef = useRef(null);

  // 콤보박스 토글 핸들러: 콤보박스의 열림/닫힘 상태를 관리합니다.
  const handleToggleComboBox = (comboBoxId) => toggleComboBox(comboBoxId);

  // 검색 실행: 사용자가 설정한 조건에 따라 검색을 수행합니다.
  const handleSearch = () => {
    actions.performSearch();
  };

  // typeList의 키를 정렬하여 UI에 순서대로 표시합니다.
  const orderedKeys = Object.keys(typeList).sort((a, b) => a.localeCompare(b));

  // 콤보박스 위치 결정 로직
  const getPosition = (index) => {
    if (index === 0) return "left"; // 배열의 첫 번째 요소
    if (index === 2) return "right"; // 배열의 마지막 요소
    return "middle"; // 그 외 중간 위치
  };
  // SearchSection에 포커스가 가있을때 Enter키로 검색을 진행할 수 있도록 하는 이벤트함수
  const handleKeyDown = useCallback(
    (event) => {
      // event.currentTarget을 사용하여 현재 이벤트 핸들러가 부착된 요소가 이벤트를 발생시켰는지 확인
      if (
        event.key === "Enter" &&
        event.currentTarget === searchSectionRef.current
      ) {
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    const element = searchSectionRef.current;
    if (element) {
      element.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (element) {
        element.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleKeyDown]);

  return (
    <>
      <ResponsiveSearchSection ref={searchSectionRef} tabIndex={-1}>
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
                <StyledButton type="button" onClick={handleSearch}>
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
  min-width: 1050px;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    overflow-x: hidden;
  }

  @media (max-width: 500px) {
  }
`;

const ResponsiveFilterItem = styled(Item)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 70%;

  @media (max-width: 768px) {
    padding-right: 0;
  }

  @media (max-width: 500px) {
  }
`;

const ResponsiveBoardArea = styled(Area)`
  /* border: 1px solid black; */
  height: 95%;
  width: 95%;
  height: auto;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const ResponsiveBoardBox = styled(Box)`
  height: auto;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

export const BoardSection = () => {
  const { state } = useSearch();
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

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    overflow-x: hidden;
  }

  @media (max-width: 500px) {
  }
`;

const ResponsivePaginationArea = styled(Area)`
  display: flex;
  justify-content: center;

  height: 90%;
  width: 95%;

  @media (max-width: 768px) {
  }

  @media (max-width: 500px) {
  }
`;

const PaginationButton = styled.button`
  height: 40px;
  width: 40px;
  margin-right: 5px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? "#4942e4" : "#f8f9fa")};
  color: ${(props) => (props.$isActive ? "white" : "#212529")};
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#37319d" : "#e2e6ea")}; /* 조건부 색상 변경 */
    color: ${(props) => (props.$isActive ? "white" : "#212529")}; /* 조건부 색상 변경 */
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    /* 반응형 디자인 */
  }

  @media (max-width: 500px) {
    /* 반응형 디자인 */
  }
`;


export const PaginationSection = () => {
  const { state, actions } = useSearch();
  const { size, totalCount } = state;
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / size);

  const [currentPage, setCurrentPage] = useState(1); // 초기 페이지 상태를 1로 설정

  const currentPageGroupStart = Math.floor((currentPage - 1) / 10) * 10 + 1;
  const startPage = currentPageGroupStart;
  let endPage = startPage + 9;
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  const pageNumbers = useMemo(() => {
    return [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i);
  }, [startPage, endPage]);

  const goToPage = useCallback(
    (pageNumber) => {
      setCurrentPage(pageNumber);
      actions.setPage(pageNumber);
      actions.performSearch({ page: pageNumber });

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", pageNumber.toString());
      navigate(`?${searchParams.toString()}`, { replace: true });
    },
    [actions, navigate]
  );

  return (
    <>
      <ResponsivePaginationSection>
        <ResponsivePaginationArea>
          {startPage > 1 && (
            <PaginationButton onClick={() => goToPage(startPage - 10)}>
              {"<"}
            </PaginationButton>
          )}
          {pageNumbers.map((pageNumber) => (
            <PaginationButton
              key={pageNumber}
              $isActive={currentPage === pageNumber}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </PaginationButton>
          ))}
          {endPage < totalPages && (
            <PaginationButton onClick={() => goToPage(endPage + 1)}>
              {">"}
            </PaginationButton>
          )}
        </ResponsivePaginationArea>
      </ResponsivePaginationSection>
    </>
  );
};


