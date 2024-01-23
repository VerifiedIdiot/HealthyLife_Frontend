import styled from "styled-components";
import { Section, Area, Box, Item, Element } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import {
  ComboSearchBox,
  ComboBox,
  SearchBox,
} from "../../styles/styledComponents/ComboSearchBox";
import capsule from "../../assets/icons/medicine/capsule.png"
import { media } from "../../utils/MediaQuery";

const StyledIcon = styled.img.attrs({
  className: "medicine-icon",
})`
  object-fit: contain;

`


const ResponsiveSearchSection = styled(Section)`
  border: 1px solid black;
  height: 40%;
  justify-content: center;
  align-items: center;

  /* ${media.small`
    $height: 30%;
  `} */
`;

const ResponsiveSearchArea = styled(Area)`
  border: 1px solid black;
  flex-direction: column;
  height: 90%;
  width: 95%;

  /* ${media.small`
    $height: 30%;
  `} */
`;

const ResponsiveItemBox = styled(Box)`
  border: 1px solid black;
  height: 20%;
  /* justify-content: center; */
`;

const SearchItemLeft = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 15%;
`;

const SearchItemRight = styled(Item)`
  border: 1px solid black;
  width: 65%;
`;

const ButtonItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.5%;
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
            <Item $width="5%"><StyledIcon img src={capsule}/>
              </Item>
            <Item $width="95%">$제품 검색</Item>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <Item $paddingLeft="14.5%" $align="center" $justify="flex-start">
              <ComboSearchBox />
            </Item>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>원료검색</SearchItemLeft>
            <SearchItemRight>
              <SearchBox></SearchBox>
            </SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>기능성 검색</SearchItemLeft>
            <SearchItemRight>
              <ComboBox>영양소 기능</ComboBox>
              <ComboBox>생리활성 기능</ComboBox>
              <ComboBox>질병발생위험감소기능</ComboBox>
            </SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>초성 검색</SearchItemLeft>
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
  border: 1px solid black;
  height: 55%;
  justify-content: center;
  align-items: center;

  /* ${media.small`
    $height: 30%;
  `} */
`;

const ResponsiveBoardArea = styled(Area)`
  border: 1px solid black;
  height: 95%;
  width: 95%;

  /* ${media.small`
    $height: 30%;
  `} */
`;

export const BoardSection = () => {
  return (
    <>
      <ResponsiveBoardSection>
        <ResponsiveBoardArea>
          <p>게시판</p>
        </ResponsiveBoardArea>
      </ResponsiveBoardSection>
    </>
  );
};

const ResponsivePaginationSection = styled(Section)`
  border: 1px solid black;
  height: 5%;
  justify-content: center;
  align-items: center;

  /* ${media.small`
    $height: 30%;
  `} */
`;

const ResponsivePaginationArea = styled(Area)`
  border: 1px solid black;
  height: 90%;
  width: 95%;

  /* ${media.small`
    $height: 30%;
  `} */
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
