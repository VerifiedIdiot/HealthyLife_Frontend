import { useEffect, useRef, useState } from "react"
import { Container, Box,Item, ScrollBox } from "../../styles/Layouts"
import { ButtonComp } from "../../styles/example/Button"
import { MiddleButton } from "../../styles/styledComponents/StyledComponents"
import { ChatBox, ChatBox1, ChatImage, CloseButton, MassegeInput, MassegeState, MemberImg, Message, MessegeContainer, Sender, SenderBox, } from "./ChattingStyle"
import Common from "../../utils/Common";
import ChatApi from "../../api/ChatAPi"


// 채팅방Component
const Chatting = (props) => {
  const { senderId,roomId } = props;
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [sender, setSender] = useState(1); // 보내는 사람
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null); // 웹소켓 객체

  useEffect(() => {
    console.log("방번호 : " + roomId);
  
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket(Common.SOCKET_URL); // 웹소켓 연결
  
      ws.current.onopen = () => {
        // 웹소켓 연결되면
        console.log("connected to " + Common.SOCKET_URL);
        setSocketConnected(true); // 웹소켓 연결 상태 변경
  
        // 서버에 입장 메시지 전송
        ws.current.send(
          JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: sender,
            message: "---------읽음---------",
          })
        );
      };
  
      ws.current.onmessage = (evt) => {
        // 서버에서 메시지가 오면
        const data = JSON.parse(evt.data);
        console.log(data.message);
        setChatList((prevItems) => [...prevItems, data]);
      };
    }
  
    // 정리 함수: 컴포넌트가 언마운트될 때 웹소켓 연결 및 이벤트 리스너 제거
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      ws.current.onmessage = null;
    };
  }, [roomId, sender]); // roomId, sender 값이 변경되면 useEffect 실행

  // 메시지 입력 핸들러
  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  // 엔터키 입력 핸들러
  const onEnterKey = (e) => {
    if (e.key === 'Enter' && inputMsg.trim() !== '') {
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  // 메시지 전송 핸들러
  const onClickMsgSend = (e) => {
    ws.current.send(
      JSON.stringify({
        type: 'TALK',
        roomId: roomId,
        sender: sender,
        message: inputMsg,
      })
    );
    setInputMsg('');
  };

  // 채팅 종료 핸들러
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        type: 'CLOSE',
        roomId: roomId,
        sender: sender,
        message: '종료합니다.',
      })
    );
    ws.current.close();
  };

  // 채팅방 정보 가져오기
  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const rsp = await ChatApi.chatDetail(roomId);
        setRoomName(rsp.data.name);
      } catch (e) {
        console.error(e);
      }
    };
    getChatRoom();
  }, [roomId]);

  // 화면 자동 스크롤
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <>
      <Container $height="100%">
        <Box $align="center" $justify="space-between" $height="50px">
          <ButtonComp>뺵</ButtonComp>
          채팅방 {roomName}
          <CloseButton onClick={onClickMsgClose}>x</CloseButton>
        </Box>
        <ScrollBox $height="350px" ref={chatContainerRef}>
          {/* 채팅 메시지 출력 */}
          {chatList.map((item, index) => (
            <MessageInfo key={index} isSender={item.sender === sender} message={item.message} />
          ))}
        </ScrollBox>
        {/* 메시지 입력창 */}
        <MassegeInput
          placeholder="메세지 전송"
          value={inputMsg}
          onChange={onChangMsg}
          onKeyUp={onEnterKey}
        />
        {/* 메시지 전송 버튼 */}
        <MiddleButton $position="absolute" $bottom="5%" $right="7%" onClick={onClickMsgSend}>
          전송
        </MiddleButton>
      </Container>
    </>
  );
};

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


