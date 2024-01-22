import { Box,Item, ScrollBox } from "../../styles/Layouts"
import { ChatImage, MemberImg, MemberInfo} from "./ChattingStyle"
import chatIcon from "../../assets/icons/chatIcon.svg"


const FriendsList  =(props)=>{

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
          <ChatImage src={userImg} alt="회원 이미지" />
        </MemberImg>
        <MemberInfo>
          <Item >
          김현빈{user}
          </Item>
          <Item>
          [상태 메세지]{statusMessege}
          </Item>
        </MemberInfo>
        <Item $width="auto">
          <ChatImage src={chatIcon} alt="채팅 아이콘" />
        </Item>
      </Box>
    </>
  )
}