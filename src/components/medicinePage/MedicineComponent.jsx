import { useState, useEffect, useLayoutEffect } from "react";
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
  height: 350px;
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
  /* justify-content: center; */
  align-items: center;
  width: 25%;
  box-shadow: none;
  @media (max-width: 768px) {
  }
`;

const InitialConsonant = styled.div`
  display: flex;
  align-items: center;
  width: 75%;

  @media (max-width: 768px) {
    width: 73%;
  }
`;

const StyledButton = styled(LargeButton)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchSection = ({
  comboSearch,
  searchQuery,
  handleSearch,
  handleComboSearchChange,
  handleSearchQueryChange,
  typeList,
  checkBox,
  handleSelectionChange,
  openComboBoxes,
  toggleComboBox,
}) => {
  useEffect(() => {
    if (Object.keys(typeList).length > 0) {
      console.log("typeList:", typeList);
    }
  }, [typeList]);

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
              <ComboSearchBox onChange={handleComboSearchChange} />
            </ResponsiveItem>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>
              <p>원료검색</p>
            </SearchItemLeft>
            <SearchItemRight>
              <SearchBox onChange={handleSearchQueryChange} />
            </SearchItemRight>
          </ResponsiveItemBox>
          
            <ResponsiveItemBox >
              <SearchItemLeft>
                <p>기능성 검색</p>
              </SearchItemLeft>
              {Object.keys(typeList).map((key) => (
                typeList[key] ? (
              <SearchItemRight $width="33.9%" key={key}>
                <ComboBox
                  typeList={typeList[key]}
                  onSelectionChange={(selectedItems) =>
                    handleSelectionChange(key, selectedItems)
                  }
                  $isOpen={openComboBoxes[key]}
                  toggleComboBox={() => toggleComboBox(key)}
                />
              </SearchItemRight>
                ) : null
              ))}
            </ResponsiveItemBox>
         
          <ResponsiveItemBox>
            <SearchItemLeft>
              <p>초성 검색</p>
            </SearchItemLeft>
            <SearchItemRight $width="100%">
              <InitialConsonant>ㄱㄴㄷㄹㅁㅂㅅ</InitialConsonant>
              <ButtonItem>
                <StyledButton type="button" onClick={handleSearch}>
                  검색
                </StyledButton>
              </ButtonItem>
            </SearchItemRight>
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

export const BoardSection = ({ totalCount }) => {
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
          <ResponsiveBoardBox></ResponsiveBoardBox>
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
  height: 90%;
  width: 95%;
`;

export const PaginationSection = () => {
  return (
    <>
      <ResponsivePaginationSection>
        <ResponsivePaginationArea>
          <p>페이지네이션</p>
        </ResponsivePaginationArea>
      </ResponsivePaginationSection>
    </>
  );
};
