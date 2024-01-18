import styled from 'styled-components';
import { ButtonComp } from '../example/Button';

// 버튼 기본스타일 
// export const ButtonComp = styled.button`
// text-align: center;
// width: ${(props) => props.width || "40px"};
// height: ${(props) => props.height || "25px"};
// color: ${(props) => props.color || "white"};
// font-weight: 600;
// font-size: ${(props) => props.fontSize || "1em"};
// border: none;
// border-radius: 5px;
// background-color: ${(props) => props.$front || "#4942E4"};
// transition: 0.2s ease-in;
// cursor: pointer;
// &.false {
//   background-color: #11009E;
//   cursor: default;
//   &:hover {
//     background-color: #11009E;
//   }
// }
// &:hover {
//   background-color: ${(props) => props.$back || "#11009E"};
//   color: white;
// }
// `;

//스몰 버튼
export const SmallButton = styled(ButtonComp)`
    font-size : 0.8em;
`;

//미들 버튼
export const MiddleButton = styled(ButtonComp)`
    width: 100px;
    height: 40px;
`;


//라지 버튼
export const LargeButton = styled(ButtonComp)`
      width: 250px;
      height: 50px;
`;

