import { useEffect, useState } from "react";
import { Box, Item, ScrollBox } from "../../styles/Layouts";
import {
  ChatImage,
  ChatIndexBox,
  MemberImg,
  MemberInfo,
} from "./ChattingStyle";
import ChatApi from "../../api/ChatAPi";
import { ButtonComp } from "../../styles/example/Button";
import Common from "../../utils/Common";
import { LastPage } from "@mui/icons-material";

const ChatList = (props) => {
  const { setState } = props;
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  const stateClick = (state) => {
    setState(state);
  };

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const userId = await Common.TakenId();
        const rsp = await ChatApi.chatList();

        // 서버로부터 받아온 채팅방 목록에 대해 각각 읽지 않은 메시지 수를 가져옴
        const chatRoomsWithUnreadCount = await Promise.all(
          rsp.data.map(async (chatRoom) => {
            let senderId;
            if (chatRoom.senderId === userId.data) {
              senderId = chatRoom.userId;
            } else {
              senderId = chatRoom.senderId;
            }
            const unreadMessageCount = await ChatApi.getUnreadMessageCount(
              chatRoom.roomId,
              senderId
            );
            return { ...chatRoom, unreadMessageCount };
          })
        );

        console.log(chatRoomsWithUnreadCount);
        setChatRooms(chatRoomsWithUnreadCount);
      } catch (e) {
        console.log(e);
      }
    };

    getChatRoom();
  }, []);

  const chatClick = async (a) => {
    try {
      const values = a.split("_");
      // 반환된 배열의 요소를 숫자로 변환하여 사용
      const a1 = parseInt(values[0], 10);
      const a2 = parseInt(values[1], 10);

      const response = await ChatApi.chatCreate(a1, a2);
      props.setChatNum(response.data);
      props.setState("CHATTING");
    } catch (error) {
      console.error("채팅 에러 발생:", error);
    }
  };

  return (
    <>
      <ScrollBox>
        {chatRooms.map((chatRoom, index) => (
          <ChatBox
            key={index}
            roomInfo={chatRoom}
            onClick={() => chatClick(chatRoom.roomId)}
          />
        ))}
      </ScrollBox>
    </>
  );
};
export default ChatList;

// 채팅정보 ItemBox
const ChatBox = (props) => {
  const { roomInfo } = props;
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    const fetchLatestMessage = async () => {
      try {
        const latestMessageResponse = await ChatApi.getLatestMessage(
          roomInfo.roomId
        );
        // 응답 및 응답의 data 속성이 null 또는 정의되지 않은지 확인합니다.
          setLatestMessage(latestMessageResponse);
      } catch (error) {
        console.error("최신 메시지 조회 중 에러 발생:", error);
      }
    };

    fetchLatestMessage();
  }, [roomInfo.roomId]);

  return (
    <>
      <Box $align="center" $height="100px" onClick={props.onClick}>
        <MemberImg>
          <ChatImage
            src={
              "https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd"
            }
            alt="회원 이미지"
          />
        </MemberImg>
        <MemberInfo>
          <Item $shadow="none">{roomInfo.roomId}</Item>
          <Item $color="grey" $shadow="none">
            {/* Display the latest message here */}
            {latestMessage || "대화를 시작해주세요"}
          </Item>
          <ChatIndexBox>{roomInfo.unreadMessageCount}</ChatIndexBox>
        </MemberInfo>
      </Box>
    </>
  );
};
