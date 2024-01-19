import { Main,Container,Section,Area,Box,Item,Element, ScrollBox } from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"
import { ChatImage, MemberImg, MemberInfo} from "./ChattingStyle"
import chatIcon from "../../assets/icons/chatIcon.svg"




export const ChatHeader=(props)=>{
  const {isDisabled,children } =props;
  
  return(
    <Main>
      <Container style={{padding:"20px"}} $background="#333333" $position="absolute" $width="400px" $borderRadius="8px" $border="1px solid black" $height="600px" >
        <Section $direction="column" $height="100%" $background="white" style={{borderRadius:"9px 9px 0px 0px"}}>
          <Area $height="none">
          <ButtonComp className={isDisabled ? 'false':""}$width="50%" $height="70px" $fontSize="1.5em" $borderRadius="8px 0px 0px 0px" >
            FRIENDS
          </ButtonComp>
          <ButtonComp className={isDisabled ? '':"false"} $width="50%" $height="70px" $fontSize="1.5em" $borderRadius="0px 8px 0px 0px" >
            CHAT
          </ButtonComp>
          </Area>
          <Area $direction="column">
            {children}
          </Area>
        </Section>
      </Container>
    </Main>
  )
}

export const FriendsList  =(props)=>{

  return(
   <>
      <ScrollBox $height="88%">
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
      </ScrollBox>
    </>
  )
}


export const ChatList  =(props)=>{

  return(
    <>
      <ScrollBox $height="88%">
        <ChatBox/>
        <ChatBox/>
        <ChatBox/>
        <ChatBox/>
        <ChatBox/>
        <ChatBox/>
      </ScrollBox>
    </>
  )
}

export const Chatting  =(props)=>{
  
  return(
    <>
      
    </>
  )
}
const ChatBox  =(props)=>{
  const {userImg,user,recMessege,messegeIndex} =props;
  return(
    <>
      <Box $height="100px" > 
        <MemberImg>
          <ChatImage src={userImg} alt="회원 이미지" />
        </MemberImg>
        <MemberInfo>
          <Item >
          김현빈{user}
          </Item>
          <Item>
          최근 메세지...{recMessege}
          </Item>
        </MemberInfo>
        <Item $width="auto" $shadow="none">
          
          1{messegeIndex}
        </Item>
      </Box>
    </>
  )
}

const FriendBoxs  =(props)=>{
  const {userImg,user,statusMessege} =props;
  return(
    <>
      <Box $height="100px" > 
        <MemberImg>
          <ChatImage src={userImg} alt="회원 이미지" />
        </MemberImg>
        <MemberInfo>
          <Item >
          김현빈{user}
          </Item>
          <Item>
          [상태 메세지]{statusMessege}
          </Item>
        </MemberInfo>
        <Item $width="auto" $shadow="none">
          <ChatImage src={chatIcon} alt="채팅 아이콘" />
        </Item>
      </Box>
    </>
  )
}