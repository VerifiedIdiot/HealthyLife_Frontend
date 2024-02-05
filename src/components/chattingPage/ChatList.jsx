import { useEffect, useState } from "react";
import { Box,Item, ScrollBox } from "../../styles/Layouts"
import { ChatImage,  ChatIndexBox, MemberImg, MemberInfo} from "./ChattingStyle"
import ChatApi from "../../api/ChatAPi";
import { ButtonComp } from "../../styles/example/Button";

const ChatList  =(props)=>{
  const {setState} =props;
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const stateClick = (state) => {
    setState(state)
  };

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    // 서버로부터 채팅방 목록을 가져오는 API 호출
    const getChatRoom = async () => {
      try {
        const rsp = await ChatApi.chatList();
        setChatRooms(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    // 페이지가 로드될 때 한 번 채팅방 목록을 가져오고,
    // 그 이후로는 일정 주기마다 업데이트를 수행
    // const intervalID = setInterval(getChatRoom, 1000);
    // return () => {
    //   clearInterval(intervalID);
    // };
  }, []);


  const enterChatRoom = (roomId) => {
    // 채팅방으로 이동하는 로직 작성
    console.log(`Entering chat room ${roomId}`);
    // navigate(`/chatting/${roomId}`);
  };
  const createChatRoom = () => {
    // navigate("/chat-create");
    console.log('Creating a new chat room');
  };
//채팅방 만들기
  const handleCreateChatRoom = async () => {
    try {
      const response = await ChatApi.chatCreate("1","5");
      console.log(response.data);
      props.setChatNum(response.data);
      props.setState("CHATTING");

    } catch (e) {
      console.log(e);
    }
  };

  const ClickChatRoom =()=>{
    props.setChatNum("1_5");
    props.setState("CHATTING");
  }


  return(
    <>
      <ScrollBox>
        <ChatBox/>
        <ChatBox/>
        <ButtonComp onClick={handleCreateChatRoom}></ButtonComp>
        <button onClick={ClickChatRoom}>zzzzzzzzzzzzzzzzzz</button>
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