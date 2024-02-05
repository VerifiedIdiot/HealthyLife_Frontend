import { Box,Item, ScrollBox } from "../../styles/Layouts"
import { ChatImage, MemberImg, MemberInfo} from "./ChattingStyle"
import chatIcon from "../../assets/icons/chatIcon.svg"
import ChatApi from "../../api/ChatAPi";
import { West } from "@mui/icons-material";


const FriendsList  =(props)=>{
  

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

  const handleCancel = () => {
    // wes.soket.close
    // navigate(-1);
  };

  return(
  <>
      <ScrollBox>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
        <FriendBoxs/>
      </ScrollBox>
    </>
  )
}

export default FriendsList;




// user정보 ItemBox
const FriendBoxs  =(props)=>{
  const {userImg,user,statusMessege} =props;
  return(
    <>
      <Box $height="100px" $align="center"> 
        <MemberImg>
          <ChatImage src={"https://item.kakaocdn.net/do/1401e813472967e3b572fee1ee192eb89f17e489affba0627eb1eb39695f93dd"} alt="회원 이미지" />
        </MemberImg>
        <MemberInfo>
          <Item $shadow="none">
          김현빈{user}
          </Item>
          <Item $shadow="none">
          [상태 메세지]{statusMessege}
          </Item>
        </MemberInfo>
        <Item $width="auto" $shadow="none">
          <ChatImage src={chatIcon} alt="채팅 아이콘" />
        </Item>
      </Box>
    </>
  )
}