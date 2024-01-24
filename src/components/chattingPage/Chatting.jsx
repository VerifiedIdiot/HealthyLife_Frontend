import { Container, Box,Item, ScrollBox } from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"
import { MiddleButton } from "../../styles/styledComponents/StyledComponents"
import { ChatBox, ChatBox1, ChatImage, CloseButton, MassegeInput, MassegeState, MemberImg, Message, MessegeContainer, Sender, SenderBox, } from "./ChattingStyle"


// 채팅방Component
const Chatting  =(props)=>{
  const {roomName,chatContainerRef,onClickMsgSend,onClickMsgClose}=props;

  return(
    <>
    <Container $height="100%">
      <Box $align="center" $justify="space-between" $height="50px">
      <ButtonComp>뺵</ButtonComp>
        채팅방 {roomName}
        <CloseButton onClick={onClickMsgClose}>x</CloseButton>
      </Box>
      <ScrollBox $height="350px" ref={chatContainerRef}>
          <MessageInfo isSender={false} message={"ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"}/>
          <MessageInfo isSender={false} message={"ㅋㅋ"}/>
          <MessageInfo isSender={true} message={"ㅋㅋ"}/>
          <MessageInfo isSender={false} message={"ㅋㅋ"}/>
          <MessageInfo isSender={false} message={"ㅋㅋ"}/>
          <MessageInfo isSender={false} message={"ㅋㅋ"}/>
          <MessageInfo isSender={false} message={"ㅋㅋ"}/>
          <MessageInfo isSender={false} message={"ㅋㅋ"}/>
          <MessageInfo isSender={true} message={"ㅋㅋ"}/>
          <MessageInfo isSender={true} message={"ㅋㅋ"}/>
      </ScrollBox>
        <MassegeInput
          placeholder="메세지 전송"
          // value={inputMsg}
          // onChange={onChangMsg}
          // onKeyUp={onEnterKey}
        />
        <MiddleButton $position="absolute" $bottom="5%" $right="7%" onClick={onClickMsgSend}>전송</MiddleButton>
    </Container>
    </>
  )
}

export default Chatting;





const MessageInfo=(props)=>{
  const {isSender,message,sender,messageTime,messageState}=props;
  return(
    <>
    <MessegeContainer>
      <MemberImg $height="30px" $width="30px" isSender={isSender}>
        <ChatImage src={"https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd"} alt="회원 이미지"/>
      </MemberImg>
      <ChatBox1 isSender={isSender}>
      <ChatBox isSender={isSender}>  
        <Message isSender={isSender}>
          {message}
        </Message>
        <MassegeState>
          12:20{messageTime} 읽음{messageState}
        </MassegeState>
      </ChatBox>
      </ChatBox1>
    </MessegeContainer>
    </>
  )
}


