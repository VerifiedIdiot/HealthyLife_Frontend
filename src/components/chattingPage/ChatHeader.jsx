import styled from "styled-components";
import { Main,Container,Section,Area} from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"


const Containerstyle = styled(Container)`
  $position: relative;
  $width: 400px;
  $height: 600px;
  $background: #333333;
  $border: 1px solid black;
  $border-radius: 8px;
  $overflow: visible;
  $padding: 12px;
  &::before {
  content: '';
  position: absolute;
  top: -2%;
  left: 10%;
  transform: translateX(700%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 20px 20px;  /* 변경된 부분 */
  border-color: transparent transparent ${props => props.$background};  /* 변경된 부분 */
}`;

// 채팅 헤더 + Box
export const ChatHeader=(props)=>{
  const {isDisabled,children } =props;
  
  return(
      <Containerstyle >
        <Section $direction="column" $height="100%" $background="white" style={{borderRadius:"9px 9px 0px 0px"}}>
          <Area $height="none">
          <ButtonComp className={isDisabled ? 'false':""}$width="50%" $height="70px" $fontSize="1.5em" $borderRadius="8px 0px 0px 0px" >
            FRIENDS
          </ButtonComp>
          <ButtonComp className={isDisabled ? '':"false"} $width="50%" $height="70px" $fontSize="1.5em" $borderRadius="0px 8px 0px 0px" >
            CHAT
          </ButtonComp>
          </Area>
          <Area $direction="column" style={{overflow:"hidden"}}>
            {children}
          </Area>
        </Section>
      </Containerstyle>
  )
}