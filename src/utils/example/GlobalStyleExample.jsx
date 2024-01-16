import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    --DARKBLUE : #18122B;
    --MIDBLUE : #0C134F;
    --BLUE : #1D267D;
    --VIOLET : #5C469C;
    --LIGHTVIO : #D4ADFC;
    --GREY : #CCCCCC;
  }

  * {
    box-sizing: border-box;
  }
  body {
    background-color: var(--DARKBLUE);
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video{
    font-family: 'Noto Sans KR', sans-serif;
    color: #fff;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 15px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--GREY); 
  }
 
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--LIGHTVIO); 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  h2 {
    font-size: 2.2em;
  }
  h3 {
    font-size: 1.6em;
  }
  main {
    padding-top: 80px;
    min-height: 60vh;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    @media only screen and (max-width:1200px){
      padding: 0 20px;
    }
  }
  @media only screen and (max-width:768px) {
    body {
      font-size: 12px;
    }
    .container {
      width: 90vw;
      padding: 0;
    }
  }

`;
export default GlobalStyle;