import styled from 'styled-components';
import {
    Main,
    Container,
    Section,
    Area,
    Box,
    Item,
    Element,
  } from "../styles/Layouts";
import { media } from '../../utils/MediaQuery';

const ResponsiveSection = styled(Section)`
  $border: 1px solid black;
  $justify: center;
  $align: center;

  ${media.small`
    $height: 60%; // 모바일 화면에서의 높이 조정
  `}

  ${media.medium`
    $height: 50%; // 태블릿 화면에서의 높이 조정
  `}
`;
