import Common from "../utils/Common";
import AxiosInstance from "./AxiosInstance";

  const ChatApi = {
  // 내 채팅방 목록 보기
  chatList: async (memberId) => {
    console.log("채팅방목록보기"+memberId);
    return await AxiosInstance.get(Common.WEELV_DOMAIN + `/chat/list/${memberId}`);
  },
  // 채팅방 정보 보기                                                                                
  chatDetail: async (roomId) => {
    return await AxiosInstance.get(Common.WEELV_DOMAIN + `/chat/room/${roomId}`);
  },
  // 채팅방 생성
  chatCreate: async (memberId,senderId) => {
    const chat = {
      memberId: memberId,
      senderId: senderId
    };
    console.log("채팅방생성"+memberId+"_"+senderId);
    return await AxiosInstance.post(Common.WEELV_DOMAIN + "/chat/new", chat);
  },
  //메세지 저장 
  saveMessage: async (message,roomId)=>{
    const chat ={
      message: message,
      roomId: roomId,
      sender: 0,
      type: "TALK"
    }
    console.log("저장하기"+message);
    return await AxiosInstance.post(Common.WEELV_DOMAIN + "/chat/message", chat);
  },
  //입장 
  enterRoom: async(memberId,senderId)=>{
    const chat ={
      memberId: memberId,
      senderId: senderId,
    }
    console.log("입장하기"+memberId+senderId);
  return await AxiosInstance.get(Common.WEELV_DOMAIN + "/chat/enter", chat);
  },
  //채팅방 메세지 가져오기
  takenMessage: async(roomId)=>{
    console.log("메세지 가져오기"+roomId);
    return await AxiosInstance.post(Common.WEELV_DOMAIN + `/chat/messages/${roomId}`);
  },






}
export default ChatApi;