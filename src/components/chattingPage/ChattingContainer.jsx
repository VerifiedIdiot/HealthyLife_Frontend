import { Children } from "react"
import { Main,Container,Section,Area,Box,Item,Element } from "../../styles/Layouts"
import { LargeButton, MiddleButton, SmallButton } from "../../styles/styledComponents/StyledComponents"
import { isDisabled } from "@testing-library/user-event/dist/utils"




export const ChatHeader=(props)=>{
  const {isDisabled} =props
  
  return(
    <Main>
      <Container style={{padding:"20px"}} $background="#333333" $position="absolute" $width="450px" $border="1px solid black" $height="600px" >
        <Section $height="100%" $background="white" style={{borderRadius:"9px 9px 0px 0px"}}>
          <LargeButton className={isDisabled ? 'false':""} $fontSize="1.5em" $borderRadius="8px 0px 0px 0px" >
            FRIENDS
          </LargeButton>
          <LargeButton className={isDisabled ? '':"false"} $fontSize="1.5em" $borderRadius="0px 8px 0px 0px" >
            CHAT
          </LargeButton>
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
