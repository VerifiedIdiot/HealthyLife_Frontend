import styled from "styled-components";
import { Section, Area, Box, Item, Element } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import {
  ComboSearchBox,
  ComboBox,
  SearchBox,
} from "../../styles/styledComponents/ComboSearchBox";
import capsule from "../../assets/icons/medicine/capsule.png";
import { media } from "../../utils/MediaQuery";

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
`;

const ResponsiveSearchSection = styled(Section)`
  height: 400px;
  justify-content: center;
  align-items: center;

  ${media.medium`
    
  `}
`;

const ResponsiveSearchArea = styled(Area)`
  flex-direction: column;
  justify-content: flex-end;
  height: 90%;
  width: 95%;

  ${media.medium`
    
    `}
`;

const ResponsiveItemBox = styled(Box)`
  height: 60px;

  ${media.medium`
    
    `}
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

  ${media.medium`
    
    `}
`;

const SearchItemRight = styled(Item)`
  display: flex;
  align-items: center;
  /* height: 60px; */
  width: 65%;

  ${media.medium`
    
    `}
`;

const ButtonItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.5%;

  ${media.medium`
    
    `}
`;

export const SearchSection = () => {
  // const handleSearchTypeChange = (e) => {
  //   setSearchType(e.target.value);
  // };

  // const handleSearchQueryChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleSearch = () => {
  //   // console.log(`검색 유형: ${searchType}, 검색어: ${searchQuery}`);
  //   // // 여기에 검색 로직을 구현합니다.
  // };

  return (
    <>
      <ResponsiveSearchSection>
        <ResponsiveSearchArea>
          <ResponsiveItemBox>
            <LogoItem>
              <StyledIcon img src={capsule} />
              <h1>제품 검색</h1>
            </LogoItem>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <Item $paddingLeft="15%" $align="center" $justify="flex-start">
              <ComboSearchBox />
            </Item>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>
              <p>원료검색</p>
            </SearchItemLeft>
            <SearchItemRight>
              <SearchBox></SearchBox>
            </SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>
              <p>기능성 검색</p>
            </SearchItemLeft>
            <SearchItemRight>
              <ComboBox>영양소 기능</ComboBox>
              <ComboBox>생리활성 기능</ComboBox>
              <ComboBox>질병발생위험감소기능</ComboBox>
            </SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>
              <p>초성 검색</p>
            </SearchItemLeft>
            <SearchItemRight>ㄱㄴㄷㄹㅁㅂㅅ</SearchItemRight>
            <ButtonItem>
              <LargeButton>검색</LargeButton>
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
  min-height: 300px;
  justify-content: center;
  align-items: center;

  ${media.medium`
    
    `}
`;

const ResponsiveBoardArea = styled(Area)`
  /* border: 1px solid black; */
  height: 95%;
  width: 95%;

  ${media.medium`
    
    `}
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

  ${media.medium`
    
    `}
`;

const ResponsivePaginationArea = styled(Area)`
  height: 90%;
  width: 95%;

  ${media.medium`
    
    `}
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
