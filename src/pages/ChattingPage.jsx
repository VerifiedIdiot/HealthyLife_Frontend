import { useState } from "react";
import { ChatHeader } from "../components/chattingPage/ChatHeader";
import ChatList from "../components/chattingPage/ChatList";
import Chatting from "../components/chattingPage/Chatting";
import FriendsList from "../components/chattingPage/FriendsList";
import FriendBox from "../styles/modals/FriendBox";


const ChattingPage=()=>{
  const [state,setState]=useState("CHAT");

  const selected=(sel)=>{
    setState(sel);
  }


  return(
  <>
    <ChatHeader setState={selected}> 
        {state === "CHAT" && <ChatList setState={selected} />}
        {state === "FRIENDS" && <FriendsList />}
        {state === "CHATTING" && <Chatting/> }
    </ChatHeader> 
    {/* <FriendBox/> */}
  </>
  )
}

export default ChattingPage;