import { createGlobalStyle } from 'styled-components';

import styled from 'styled-components';

// 어플리케이션 모든 페이지통째로 적용할 요소들을 정의하는 스타일드 컴포넌트
//  width, height 등을 정의할때 사용
export const Wrapper = styled.div.attrs({
  className: "wrap"
})`
  width: 99.9%;
  height: auto;
  min-height: 52.5vw;
  border: 1px solid black;
`;


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    /* font-family: 'Open Sans', sans-serif; */
  
  }
  
`;

export default GlobalStyle;
