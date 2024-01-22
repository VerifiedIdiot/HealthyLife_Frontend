import { Main,Container,Section,Area} from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"



// 채팅 헤더 + Box
export const ChatHeader=(props)=>{
  const {isDisabled,children } =props;
  
  return(
      <Container $padding="12px" $background="#333333" $position="absolute" $width="400px" $borderRadius="8px" $border="1px solid black" $height="600px" style={{overflow: "visible"}}>
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
      </Container>
  )
}