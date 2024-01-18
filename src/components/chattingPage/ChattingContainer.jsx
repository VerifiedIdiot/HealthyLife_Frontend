import { Children } from "react"
import { Main,Container,Section,Area,Box,Item,Element } from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"




export const ChatHeader=(props)=>{
  const {isDisabled,Children} =props
  
  return(
    <Main>
      <Container style={{padding:"20px"}} $background="#333333" $position="absolute" $width="450px" $borderRadius="8px" $border="1px solid black" $height="600px" >
        <Section $height="100%" $background="white" style={{borderRadius:"9px 9px 0px 0px"}}>
          <Area>
          <ButtonComp className={isDisabled ? 'false':""}$width="225px" $height="70px" $fontSize="1.5em" $borderRadius="8px 0px 0px 0px" >
            FRIENDS
          </ButtonComp>
          <ButtonComp className={isDisabled ? '':"false"} $width="225px" $height="70px" $fontSize="1.5em" $borderRadius="0px 8px 0px 0px" >
            CHAT
          </ButtonComp>
          </Area>
          <Area>
            {Children}
          </Area>
        </Section>
      </Container>
    </Main>
  )
}

export const FriendsList  =(props)=>{

  return(
    <Section>

    </Section>
  )
}

export const ChatList  =(props)=>{

  return(
    <Section>
    </Section>
  )
}

export const Chatting  =(props)=>{
  
  return(
    <Section>
      
    </Section>
  )
}
