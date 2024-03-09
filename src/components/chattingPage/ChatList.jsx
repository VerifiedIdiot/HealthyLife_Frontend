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
import MemberApi from "../../api/MemberApi";

const ChatList = (props) => {
  const { setState, state } = props;
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [chatRooms, setChatRooms] = useState([]);
  const [senderId1, setSenderId1] = useState();

  const stateClick = (state) => {
    setState(state);
  };

  // useEffect(() => {
  //   const getChatRoom = async () => {
  //     try {
  //       const userId = await Common.TakenId();
  //       const rsp = await ChatApi.chatList();
  //       // 서버로부터 받아온 채팅방 목록에 대해 각각 읽지 않은 메시지 수를 가져옴
  //       const chatRoomsWithUnreadCount = await Promise.all(
  //         rsp.data.map(async (chatRoom) => {
  //           let senderId;
  //           if (chatRoom.senderId === userId.data) {
  //             senderId = chatRoom.userId;
  //           } else {
  //             senderId = chatRoom.senderId;
  //           }
  //           const unreadMessageCount = await ChatApi.getUnreadMessageCount(
  //             chatRoom.roomId,
  //             senderId
  //           );
  //           return { ...chatRoom, unreadMessageCount };
  //         })
  //       );

  //       // console.log(chatRoomsWithUnreadCount);
  //       setChatRooms(chatRoomsWithUnreadCount);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   // 초기 업데이트
  //   getChatRoom();

  //   // 0.5초마다 업데이트
  //   const intervalId = setInterval(getChatRoom, 50 * 60);

  //   // 컴포넌트 언마운트 시 인터벌 클리어
  //   return () => clearInterval(intervalId);
  // }, []);

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
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchLatestMessage = async () => {
      const userId = await Common.TakenId();
      try {
        const latestMessageResponse = await ChatApi.getLatestMessage(
          roomInfo.roomId
        );
        setLatestMessage(latestMessageResponse);
        let senderId;
        if (roomInfo.senderId === userId.data) {
          senderId = roomInfo.memberId;
        } else {
          senderId = roomInfo.senderId;
        }
        const res = await MemberApi.getMemberInfo(senderId);
        setUserInfo(res.data);
      } catch (error) {
        console.error("최신 메시지 조회 중 에러 발생:", error);
      }
    };

    // 초기 업데이트
    fetchLatestMessage();

    // 0.5초마다 업데이트
    const intervalId = setInterval(fetchLatestMessage, 50 * 60);

    // 컴포넌트 언마운트 시 인터벌 클리어
    return () => clearInterval(intervalId);
  }, [roomInfo.roomId]);

  return (
    <>
      <Box $align="center" $height="100px" onClick={props.onClick}>
        <MemberImg>
          <ChatImage src={userInfo.image} alt="회원 이미지" />
        </MemberImg>
        <MemberInfo>
          <Item $shadow="none">{userInfo.nickName}의 채팅</Item>
          <Item $color="grey" $shadow="none">
            {/* Display the latest message here */}
            {latestMessage || "대화내용이 비어있습니다."}
          </Item>
          {roomInfo.unreadMessageCount !== 0 && (
            <ChatIndexBox>{roomInfo.unreadMessageCount}</ChatIndexBox>
          )}
        </MemberInfo>
      </Box>
    </>
  );
};
