import { formatProdErrorMessage } from "@reduxjs/toolkit";
import {ChatList,FriendsList,Chatting,ChatHeader} from "../components/chattingPage/ChattingContainer"
import { Main, Container,Section,Area,Box,Item,Element } from "../styles/Layouts";

const ChattingPage=()=>{

  return(
  <>
    <ChatHeader> 
      <ChatList/>
      {/* <FriendsList/> */}
      <Chatting/>
    </ChatHeader> 
  </>

  )
}

export default ChattingPage;