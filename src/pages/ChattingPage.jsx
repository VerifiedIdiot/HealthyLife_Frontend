import { ChatHeader } from "../components/chattingPage/ChatHeader";
import ChatList from "../components/chattingPage/ChatList";
import Chatting from "../components/chattingPage/Chatting";
import FriendsList from "../components/chattingPage/FriendsList";
import FriendBox from "../styles/modals/FriendBox";


const ChattingPage=()=>{

  return(
  <>
    <ChatHeader> 
      {/* <ChatList/> */}
      {/* <FriendsList/> */}
      <Chatting/>
    </ChatHeader> 
    {/* <FriendBox/> */}
  </>
  )
}

export default ChattingPage;