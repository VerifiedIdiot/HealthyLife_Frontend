import { Section, Area, Box, Item, Element } from "../../styles/Layouts";
import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import { ComboSearchBox } from "../../styles/styledComponents/ComboSearchBox";
import { media } from "../../utils/MediaQuery";
import styled from "styled-components";




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
  border: 1px solid black;
  width: 15%;
`;

const SearchItemRight = styled(Item)`
  border: 1px solid black;
  width: 65%;
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
            <Item $width="5%">아이콘</Item>
            <Item $width="95%">$제품 검색</Item>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <Item $paddingLeft ="29%" $align ="center" $justify="flex-start">
              <ComboSearchBox/>
            </Item>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>통합/제품명/제조사</SearchItemLeft>
            <SearchItemRight>검색어를 입력해 주세요</SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>통합/제품명/제조사</SearchItemLeft>
            <SearchItemRight>검색어를 입력해 주세요</SearchItemRight>
          </ResponsiveItemBox>
          <ResponsiveItemBox>
            <SearchItemLeft>통합/제품명/제조사</SearchItemLeft>
            <SearchItemRight>검색어를 입력해 주세요</SearchItemRight>
            <LargeButton></LargeButton>
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
