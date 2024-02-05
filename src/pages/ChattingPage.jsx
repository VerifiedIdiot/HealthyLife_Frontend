import { useState } from "react";
import { ChatHeader } from "../components/chattingPage/ChatHeader";
import ChatList from "../components/chattingPage/ChatList";
import Chatting from "../components/chattingPage/Chatting";
import FriendsList from "../components/chattingPage/FriendsList";
import FriendBox from "../styles/modals/FriendBox";


const ChattingPage=()=>{
  const [state,setState]=useState("CHAT");
  const [chatNum,setChatNum]=useState("");

  const selected=(sel)=>{
    setState(sel);
  }
  const chatNumed=(sel)=>{
    setChatNum(sel);
  }

  return(
  <>
    <ChatHeader setState={selected}> 
        {state === "CHAT" && <ChatList setState={selected}  setChatNum={chatNumed} />}
        {state === "FRIENDS" && <FriendsList setState={selected} setChatNum={chatNumed} />}
        {state === "CHATTING" && <Chatting roomId={chatNum}/> }
    </ChatHeader> 
    <FriendBox/>
  </>
  )
}

export default ChattingPage;