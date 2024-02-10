import { useEffect, useRef, useState } from "react";
import { Container, Box, Item, ScrollBox } from "../../styles/Layouts";
import { ButtonComp } from "../../styles/example/Button";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import {
  ChatBox,
  ChatBox1,
  ChatImage,
  CloseButton,
  MassegeInput,
  MassegeState,
  MemberImg,
  Message,
  MessegeContainer,
  Sender,
  SenderBox,
} from "./ChattingStyle";
import Common from "../../utils/Common";
import ChatApi from "../../api/ChatAPi";

// 채팅방Component
const Chatting = (props) => {
  const { userId, roomId } = props;
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [chatList, setChatList] = useState([]); // 채팅 리스트
  const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null); // 웹소켓 객체

  useEffect(() => {
    console.log("방번호 : " + roomId);
    const connectWebSocket = () => {
      ws.current = new WebSocket(Common.SOCKET_URL);
      ws.current.onopen = () => {
        console.log("connected to " + Common.SOCKET_URL);
        setSocketConnected(true);
        // 서버에 입장 메시지 전송
        ws.current.send(
          JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: userId,
            message: "---------읽음---------",
          })
        );
      };

      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data.message);
        setChatList((prevItems) => [...prevItems, data]);
      };
    };

    // WebSocket 연결
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      connectWebSocket();

      // 연결 후 이전 메시지 가져오기
      const fetchPreviousMessages = async () => {
        try {
          const response = await ChatApi.takenMessage(roomId);
          // 가져온 메시지를 적절한 상태에 저장
          const reversedMessages = response.data.reverse();
          setChatList(reversedMessages);
          console.log(response.data);
        } catch (error) {
          console.error("이전 메시지 가져오기 실패:", error);
          // 에러 처리 로직 추가
        }
      };

      fetchPreviousMessages();
    }
    // 정리 함수: 컴포넌트가 언마운트될 때 웹소켓 연결 및 이벤트 리스너 제거
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      ws.current.onmessage = null;
    };
  }, [roomId, userId]); // roomId, sender 값이 변경되면 useEffect 실행

  // 메시지 입력 핸들러
  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
  };

  // 엔터키 입력 핸들러
  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  // 메시지 전송 핸들러
  const onClickMsgSend = (e) => {
    const message = {
      type: "TALK",
      roomId: roomId,
      sender: userId,
      message: inputMsg,
      messageState: "안읽음",
    };
    ws.current.send(JSON.stringify(message));
    //db저장
    ChatApi.saveMessage(message);
    setInputMsg("");
  };

  // 채팅 종료 핸들러
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        roomId: roomId,
        sender: userId,
        message: "종료합니다.",
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
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <>
      <Container $height="100%">
        <Box $align="center" $justify="center" $height="50px">
          채팅방 {roomName}
        </Box>
        <ScrollBox $height="350px" ref={chatContainerRef}>
          {/* 채팅 메시지 출력 */}
          {chatList.map((item, index) => (
            <MessageInfo
              key={index}
              roomId={roomId}
              senderId={item.sender}
              isSender={item.sender === userId}
              userId={userId}
              messageTime={item.messageTime}
              message={item.message}
              messageStatus={item.messageStatus}
            />
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
        <MiddleButton
          $position="absolute"
          $bottom="5%"
          $right="7%"
          onClick={onClickMsgSend}
        >
          전송
        </MiddleButton>
      </Container>
    </>
  );
};

export default Chatting;

const MessageInfo = (props) => {
  const { isSender, message, messageTime,senderId, messageStatus,roomId } = props;
  // messageTime을 Date 객체로 변환
  const messageDate = new Date(messageTime);

  // 옵션 설정 (timeZone를 undefined로 변경)
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Seoul",
  };

  // 형식에 맞게 시간을 포맷
  const formattedTime = new Intl.DateTimeFormat("ko-KR", options).format(
    messageDate
  );
  useEffect(() => {
    const updateMessageStatus = async () => {
      try {
        // 서버에 메시지 읽음 상태 업데이트 요청 보내기
        await ChatApi.updateMessageStatus(roomId, senderId);
      } catch (error) {
        console.error("메시지 읽음 상태 업데이트 실패:", error);
        // 에러 처리 로직 추가
      }
    };
    // 여기에서 필요한 로직 수행
    if(isSender){
    updateMessageStatus();}
  }, [isSender]);

  return (
    <>
      <MessegeContainer>
        <MemberImg $height="30px" $width="30px" isSender={isSender}>
          <ChatImage
            src={
              "https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd"
            }
            alt="회원 이미지"
          />
        </MemberImg>
        <ChatBox1 isSender={isSender}>
          <ChatBox isSender={isSender}>
            <Message isSender={isSender}>{message}</Message>
            <MassegeState>
              {isSender && (
                <>
                  <p style={{ color: "red" }}>{messageStatus}</p>
                  {formattedTime}
                </>
              )}
              {!isSender && (
                <>
                  {formattedTime}
                  <p style={{ color: "red" }}>{messageStatus}</p>
                </>
              )}
            </MassegeState>
          </ChatBox>
        </ChatBox1>
      </MessegeContainer>
    </>
  );
};
