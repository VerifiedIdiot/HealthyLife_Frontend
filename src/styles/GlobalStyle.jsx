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
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`

${reset}


@font-face {
    font-family: 'LINESeedKR-Bd';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
  * {
    margin: 0;
    padding: 0;
    font-family: 'LINESeedKR-Bd', sans-serif; /* 기본 폰트로 지정 */
  }

  body {
    font-family: 'LINESeedKR-Bd', sans-serif; /* 기본 폰트로 지정 */
  }
`;

export default GlobalStyle;
