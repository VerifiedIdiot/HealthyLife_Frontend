import { Section, Area, Box, Item, Element } from "../../styles/Layouts";
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

const ResponsiveSearchBox = styled(Box)`
  border: 1px solid black;
  height: 20%;
  justify-content: center;
`;

const ResponsiveSearchItem = styled(Item)`
  border: 1px solid black;
  width: 15%;
`;

export const SearchSection = () => {
  return (
    <>
      <ResponsiveSearchSection>
        <ResponsiveSearchArea>
          <ResponsiveSearchBox></ResponsiveSearchBox>
          <ResponsiveSearchBox>
            <ResponsiveSearchItem>통합/제품명/제조사</ResponsiveSearchItem>
            <ResponsiveSearchItem>검색어를 입력해 주세요</ResponsiveSearchItem>
          </ResponsiveSearchBox>
          {/* <Box $border="1px solid black" $height="33.9%" ></Box>
                <Box $border="1px solid black" $height="33.9%" ></Box> */}
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
