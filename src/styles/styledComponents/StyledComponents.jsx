import styled from 'styled-components';
import { ButtonComp } from '../example/Button';

//스몰 버튼
export const SmallButton = styled(ButtonComp)`
    position: ${(props) => props.$position || "static"};
    top: ${(props) => props.$top || "none"};
    bottom: ${(props) => props.$bottom || "none"};
    left: ${(props) => props.$left || "none"};
    right: ${(props) => props.$right || "none"};
    font-size : 0.8em;
`;

//미들 버튼
export const MiddleButton = styled(ButtonComp)`
    position: ${(props) => props.$position || "static"};
    top: ${(props) => props.$top || "none"};
    bottom: ${(props) => props.$bottom || "none"};
    left: ${(props) => props.$left || "none"};
    right: ${(props) => props.$right || "none"};
    width: 100px;
    height: 40px;
`;

//라지 버튼
export const LargeButton = styled(ButtonComp)`
    position: ${(props) => props.$position || "static"};
    top: ${(props) => props.$top || "none"};
    bottom: ${(props) => props.$bottom || "none"};
    left: ${(props) => props.$left || "none"};
    right: ${(props) => props.$right || "none"};
      width: 250px;
      height: 50px;
`;

