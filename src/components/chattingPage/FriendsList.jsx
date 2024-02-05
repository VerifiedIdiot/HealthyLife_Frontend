import { Box, Item, ScrollBox } from "../../styles/Layouts";
import { ChatImage, MemberImg, MemberInfo } from "./ChattingStyle";
import chatIcon from "../../assets/icons/chatIcon.svg";
import ChatApi from "../../api/ChatAPi";
import { West } from "@mui/icons-material";
import { useEffect, useState } from "react";
import MemberApi from "../../api/MemberApi";
import FriendBox from "../../styles/modals/FriendBox";
import { Button } from "@mui/base";
import { ButtonComp } from "../../styles/example/Button";

const FriendsList = (props) => {
  const [friends, setFriends] = useState([]);

  const handleCreateChatRoom = async (name) => {
    try {
      const response = await ChatApi.chatCreate(name);
      console.log(response.data);
      props.setChatNum(response.data);
      props.setState("CHATTING");
      // navigate(`/chatting/${response.data}`);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const res = await ChatApi.friendList(); // Common 모듈에 friendList 메서드를 추가하고 이용
        console.log(res);
        setFriends(res.data);
      } catch (error) {
        console.error("친구 목록을 불러오는 동안 에러 발생:", error);
        // 에러 처리 로직 추가
      }
    };
    fetchFriendList();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
      <ScrollBox>
        <FriendBoxs friendId={1} myfam={true} />
        {friends.map((friend, index) => (
          <FriendBoxs key={index} friendId={friend.friendsId} />
        ))}
      </ScrollBox>
    </>
  );
};
export default FriendsList;

// user정보 ItemBox
const FriendBoxs = (props) => {
  const { friendId, myfam } = props;
  const [userInfo, setUserInfo] = useState([]);
  const [message, setMessage] = useState();
  const [inputValue, setInputValue] = useState(""); // 입력값을 상태로 관리

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log(friendId);
        const res = await MemberApi.getMemberInfo(friendId);
        console.log(res);
        console.log(res.data.friendsId + "zzzzzzzzzz111zzz");
        setUserInfo(res.data);
      } catch (error) {
        console.error("회원정보를 불러오는 동안 에러 발생:", error);
        // 에러 처리 로직 추가
      }
      try {
        console.log(friendId);
        const res1 = await ChatApi.statusInfo(friendId);
        setMessage(res1.data);
      } catch (error) {
        console.log(friendId + "의 상태메세지가없습니다.");
        // 에러 처리 로직 추가
      }
    };
    fetchUserInfo(); // 함수 이름 변경
  }, []); // friendId를 의존성 배열에 추가

  const statusMessageChange = async (message) => {
    try {
      console.log(message);
      await ChatApi.statusMessageChange(message);
      // 성공적으로 업데이트되었다면, 추가적인 로직이나 상태 업데이트를 수행할 수 있습니다.
    } catch (error) {
      console.error("상태 메세지 변경 중 에러 발생:", error);
      // 에러 처리 로직 추가
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력값을 상태에 업데이트
  };

  const handleButtonClick = () => {
    // 입력값을 이용하여 상태 메세지 변경 함수 호출
    statusMessageChange(inputValue);
  };

  return (
    <>
      <Box $height="100px" $align="center">
        <MemberImg>
          <ChatImage
            src={
              "https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd"
            }
            alt="회원 이미지"
          />
        </MemberImg>
        <MemberInfo>
          <Item $shadow="none">{userInfo.nickName}</Item>
          {myfam ? (
            <>
              <input value={inputValue} onChange={handleInputChange} />{" "}
              <ButtonComp onClick={handleButtonClick} />
            </>
          ) : (
            <Item $shadow="none">{message ? message.statusMessage : ""}</Item>
          )}
        </MemberInfo>
        <Item $width="auto" $shadow="none">
          <ChatImage src={chatIcon} alt="채팅 아이콘" />
        </Item>
      </Box>
    </>
  );
};
