import { Main,Container,Section,Area,Box,Item, ScrollBox } from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"
import {LargeButton, MiddleButton} from "../../styles/styledComponents/StyledComponents"
import { ChatImage,  ChatIndexBox, CloseButton, Input, MassegeInput, MassegeState, MemberImg, MemberInfo, Message, MessagesContainer} from "./ChattingStyle"
import chatIcon from "../../assets/icons/chatIcon.svg"
import styled from "styled-components"




const ChatList  =(props)=>{

  return(
    <>
      <ScrollBox>
        <ChatBox/>
        <ChatBox/>
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
export default ChatList;


// 채팅정보 ItemBox
const ChatBox  =(props)=>{
  const {userImg,user,recMessege,messegeIndex} =props;

  return(
    <>
      <Box $align="center" $height="100px" > 
        <MemberImg>
          <ChatImage src={userImg} alt="회원 이미지" />
        </MemberImg>
        <MemberInfo>
          <Item>
            김현빈{user}
          </Item>
          <Item $color="grey">
            최근 메세지...{recMessege}
          </Item>
          <ChatIndexBox>
            999{messegeIndex}
          </ChatIndexBox>
        </MemberInfo>
      </Box>
    </>
  )
}