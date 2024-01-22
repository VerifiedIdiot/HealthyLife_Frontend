import { ChatHeader } from "../components/chattingPage/ChatHeader";
import ChatList from "../components/chattingPage/ChatList";
import Chatting from "../components/chattingPage/Chatting";
import FriendsList from "../components/chattingPage/FriendsList";


const ChattingPage=()=>{

  return(
  <>
    <ChatHeader> 
      {/* <ChatList/> */}
      {/* <FriendsList/> */}
      <Chatting/>
    </ChatHeader> 
  </>
  )
}

export default ChattingPage;