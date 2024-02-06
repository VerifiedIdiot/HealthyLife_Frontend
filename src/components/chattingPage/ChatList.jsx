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

const ChatList = (props) => {
  const { setState } = props;
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  const stateClick = (state) => {
    setState(state);
  };

  useEffect(() => {
    // 서버로부터 채팅방 목록을 가져오는 API 호출
    const getChatRoom = async () => {
      try {
        const rsp = await ChatApi.chatList();
        console.log(rsp.data);
        setChatRooms(rsp.data);
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

      const response = await ChatApi.chatCreate(a1,a2);
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
          <ChatBox key={index} roomInfo={chatRoom} onClick={()=>chatClick(chatRoom.roomId)}/>
        ))}
      </ScrollBox>
    </>
  );
};
export default ChatList;

// 채팅정보 ItemBox
const ChatBox = (props) => {
  const { roomInfo, recMessege, messegeIndex } = props;

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
            최근 메세지...{recMessege}
          </Item>
          <ChatIndexBox>999{messegeIndex}</ChatIndexBox>
        </MemberInfo>
      </Box>
    </>
  );
};
