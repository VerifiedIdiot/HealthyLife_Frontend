import { useState } from "react";
import styled from "styled-components";
import { Section, Area, Box, Item } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import { SearchBox, ComboBox, ComboSearchBox } from "./MedicineContainer";
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
  @media (max-width: 768px) {
    h1 {
      
      margin-left: 0;
      width: 100%;
     
     
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
  /* height: 60px; */
  width: 15%;
  white-space: nowrap;

  p {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    width: 160px;
    p {
      font-size: smaller;
    }
   
  }
`;

const SearchItemRight = styled(Item)`
  display: flex;
  align-items: center;
  
  width: ${(props) => props.$width || "100%"};

  @media (max-width: 768px) {
  }

  @media (max-width: 550px) {
    justify-content: space-around;
    
  }
`;

const ButtonItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.5%;

  @media (max-width: 768px) {
  }
`;


const StyledButton = styled(LargeButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.5%;

  @media (max-width: 768px) {
  }
`;

export const SearchSection = () => {
  const [comboSearch, setComboSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  

  const handleSearch = () => {
    // 여기에서 검색 로직 구현
    console.log("Combo Search Type:", comboSearch);
    console.log("Search Query:", searchQuery);
    

    // 검색 로직을 여기에 추가하세요.
  };

  // 각 컴포넌트의 상태를 업데이트하는 함수들
  const handleComboSearchChange = (value) => {
    setComboSearch(value);
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <>
      <ResponsiveSearchSection>
        <ResponsiveSearchArea>
          <ResponsiveItemBox>
            <LogoItem >
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
            <SearchItemLeft >
              <p>원료검색</p>
            </SearchItemLeft>
            <SearchItemRight>
              <SearchBox onChange={handleSearchQueryChange}></SearchBox>
            </SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft >
              <p>기능성 검색</p>
            </SearchItemLeft>
            <SearchItemRight>
              <ComboBox>영양소 기능</ComboBox>
              <ComboBox>생리활성 기능</ComboBox>
              <ComboBox>질병발생위험감소기능</ComboBox>
            </SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft >
              <p>초성 검색</p>
            </SearchItemLeft>
            <SearchItemRight $width="80%">ㄱㄴㄷㄹㅁㅂㅅ</SearchItemRight>
            <ButtonItem>
              <LargeButton onClick={handleSearch}>검색</LargeButton>
            </ButtonItem>
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
  justify-content: center;
  align-items: center;


`;

const ResponsiveBoardArea = styled(Area)`
  /* border: 1px solid black; */
  height: 95%;
  width: 95%;
  min-height: 30vw;

`;

export const BoardSection = () => {
  return (
    <>
      <ResponsiveBoardSection>
        <ResponsiveBoardArea>
          <ResponsiveItemBox>
            <LogoItem>
              <StyledIcon img src={capsule} />
              <h1>제품 목록</h1>
            </LogoItem>
          </ResponsiveItemBox>
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
