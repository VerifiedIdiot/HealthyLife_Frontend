import { Container, Box,Item, ScrollBox } from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"
import { MiddleButton } from "../../styles/styledComponents/StyledComponents"
import { ChatImage, CloseButton, MassegeInput, MassegeState, MemberImg, Message, } from "./ChattingStyle"


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
          <MessageInfo isSender={false} message={"ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"}/>
          <MessageInfo isSender={false} message={"ㅋㅋ"}/>
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
    <Box $height="auto" $width="auto" $align="none">
    <MemberImg $height="60px" $width="60px">
      <ChatImage src={""} alt="회원 이미지"/>
    </MemberImg>
    <Item $height="auto" $direction="column" $align="none">
      김현빈{sender}
      <Item $height="auto" $direction="row" $align="none">
        <Message isSender={isSender}>
          {message}
        </Message>
        <MassegeState>
          12:20{messageTime} 읽음{messageState}
        </MassegeState>
      </Item>
    </Item>
    </Box>
    </>
  )
}


