import { Box,Item, ScrollBox } from "../../styles/Layouts"
import { ChatImage,  ChatIndexBox, MemberImg, MemberInfo} from "./ChattingStyle"





const ChatList  =(props)=>{
  const {setState} =props;
  const stateClick = (state) => {
    setState(state)
  };

  return(
    <>
      <ScrollBox onClick={()=>stateClick("CHATTING")} >
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
          <ChatImage src={"https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd"} alt="회원 이미지" />
        </MemberImg>
        <MemberInfo>
          <Item $shadow="none">
            김현빈{user}
          </Item>
          <Item $color="grey" $shadow="none">
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