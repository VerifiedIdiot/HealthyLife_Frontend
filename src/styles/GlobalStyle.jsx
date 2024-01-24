import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from "styled-components";

// 어플리케이션 모든 페이지통째로 적용할 요소들을 정의하는 스타일드 컴포넌트
//  width, height 등을 정의할때 사용
export const Wrapper = styled.div.attrs({
  className: "wrap",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100vh;
  
  
`;

const GlobalStyle = createGlobalStyle`

${reset}

  * {
    margin: 0;
    padding: 0;
    /* font-family: 'Open Sans', sans-serif; */
  
  }
  
`;

export default GlobalStyle;
