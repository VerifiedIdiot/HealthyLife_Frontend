import styled from 'styled-components';



// Wrapper 안에서 최초로 display : flex 혹은 grid를 사용하여 엘리먼트들을 어떻게
// position은 기본적으로 static이라 작동안하지만 , relative나 absolute를
// postion props의 값으로 전달하면 규칙 변경가능
// 배치할찌 결정하는 구간 ㅎ

// wrap -> Main
export const Main = styled.main.attrs({
  className: "main"
})`
  position: ${(props) => props.$position || "static"};
  display: ${(props) => props.$display || "flex"};
  flex-direction: ${(props) => props.$direction || "column"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "100%"};
  border: ${(props) => props.$border || "1px solid black"};
  border: 1px solid black;
  
`;


// 컨테이너
// Main에서 position값을 정의해서 하위에서 display 값을 정의해야할때
// 여기서 정의하세요 ㅎ
// Main과 폭과 높이가 같지만 position 값 구분을 위해 사용

// wrap -> Main -> Container
export const Container = styled.div.attrs({
  className: "container"
})`
  position: ${(props) => props.$position || "static"};
  display: ${(props) => props.$display || "flex"};
  flex-direction: ${(props) => props.$direction || "column"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "52.5vw"};
  border: ${(props) => props.$border || "none"};
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  
`;

// 섹션 : 컨테이너를 컬럼방향기준으로 나누고 싶을때
// 해당 영역부터 아래까지는 복수이상으로 존재할 수 있음

// wrap -> Main -> Container -> Section
export const Section = styled.section.attrs({
  className: "section"
})`
  position: ${(props) => props.$position || "static"};
  display: ${(props) => props.$display || "flex"};
  flex-direction: ${(props) => props.$direction || "row"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "50%"};
  border: ${(props) => props.$border || "none"};
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  /* border: 1px solid black; */
`;


// wrap -> Main -> Container -> Section -> Area
export const Area = styled.div.attrs({
  className: "area"
})`
  position: ${(props) => props.$position || "static"};
  display: ${(props) => props.$display || "flex"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "100%"};
  border: ${(props) => props.$border || "none"};
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  
`;


// wrap -> Main -> Container -> Section -> Area -> Box
export const Box = styled.div.attrs({
  className: "box"
})`
  position: ${(props) => props.$position || "static"};
  display: ${(props) => props.$display || "flex"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "100%"};
  border: ${(props) => props.$border || "none"};
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  
`;

// 각 영역별 Area
// wrap -> Main -> Container -> Section -> Area -> Box
export const Item = styled.div.attrs({
  className: "item"
})`
  position: ${(props) => props.$position || "static"};
  display: ${(props) => props.$display || "flex"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "100%"};
  border: ${(props) => props.$border || "none"};
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  
`;

// 각 영역별 Area
// wrap -> Main -> Container -> Section -> Area -> Box -> Element
export const Element = styled.div.attrs({
  className: "element"
})`
  position: ${(props) => props.$position || "static"};
  display: ${(props) => props.$display || "flex"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "100%"};
  border: ${(props) => props.$border || "none"};
  box-shadow: ${(props) => props.$shadow || "0 2px 4px rgba(0, 0, 0, 0.1)"};
  
`;