import {
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../../styles/Layouts";

export const SearchSection = () => {
  return (
    <>
      <Section
        $border="1px solid black"
        $height="40%"
        $justify="center"
        $align="center">
        <Area
          $border="1px solid black"
          $direction="column"
          $height="90%"
          $width="95%">
          <Box $border="1px solid black" $height="20%" $justify="center"></Box>
          <Box $border="1px solid black" $height="20%" $justify="center">
            <Item $border="1px solid black" $width="15%">
              통합/제품명/제조사
            </Item>
            <Item $border="1px solid black" $width="45%"></Item>
          </Box>
          {/* <Box $border="1px solid black" $height="33.9%" ></Box>
                <Box $border="1px solid black" $height="33.9%" ></Box> */}
        </Area>
      </Section>
    </>
  );
};

export const BoardSection = () => {
  return (
    <>
      <Section
        $border="1px solid black"
        $height="55%"
        $justify="center"
        $align="center">
        <Area $border="1px solid black" $height="95%" $width="95%">
          <p>게시판</p>
        </Area>
      </Section>
    </>
  );
};

export const PaginationSection = () => {
  return (
    <>
      <Section
        $border="1px solid black"
        $height="5%"
        $justify="center"
        $align="center">
        <Area $border="1px solid black" $height="90%" $width="95%">
          <p>페이지네이션</p>
        </Area>
      </Section>
    </>
  );
};
