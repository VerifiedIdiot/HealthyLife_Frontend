import Common from "../utils/Common";
import AxiosInstance from "./AxiosInstance";

const ChatApi = {
  // 내 채팅방 목록 보기
  chatList: async () => {
    const res = await Common.TakenId();
    const memberId = res.data;
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/chat/list/${memberId}`
    );
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/chat/room/${roomId}`
    );
  },
  // 채팅방 생성 및 입장
  chatCreate: async (memberId, senderId) => {
    const chat = {
      memberId: memberId,
      senderId: senderId,
    };
    console.log("채팅방생성" + memberId + "_" + senderId);
    return await AxiosInstance.post(Common.WEELV_DOMAIN + "/chat/new", chat);
  },
// 메시지 저장
saveMessage: async (message) => {
  try {
    const chat = {
      message: message.message, // 수정: message.content가 아니라 message.message여야 함
      roomId: message.roomId,
      sender: message.sender, // 수정: message.sneder가 아니라 message.sender여야 함
      type: "TALK",
    };
    console.log("저장하기", message); // 수정: 문자열과 객체를 함께 출력하려면 쉼표로 구분
    const response = await AxiosInstance.post(
      Common.WEELV_DOMAIN + "/chat/message",
      chat
    );
    console.log("메시지 저장 성공:", response.data);
  } catch (error) {
    console.error("메시지 저장 중 에러 발생:", error);
    // 에러 처리 로직 추가
  }
},
  //채팅방 메세지 가져오기
  takenMessage: async (roomId) => {
    console.log("메세지 가져오기" + roomId);
    return await AxiosInstance.post(
      Common.WEELV_DOMAIN + `/chat/messages/${roomId}`
    );
  },
  ////////////////////////////////////친구차단 관리 ////////////////////////////////////////////////////
  //친구목록출력
  friendList: async () => {
    const res = await Common.TakenId();
    console.log(res.data + "씨발 왜안되냐");
    const memberId = res.data;
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/friend/list/${memberId}/true`
    );
  },

  //친구추가
  addFriend: async (friendId) => {
    const res = await Common.TakenId();
    const memberId = res.data;
    const friendDto = {
      friendsId: friendId,
      memberId: memberId,
    };
    return await AxiosInstance.post(
      Common.WEELV_DOMAIN + "/friend/add/friend",
      friendDto
    );
  },

  //차단추가
  addBlock: async (friendId) => {
    const res = await Common.TakenId();
    const memberId = res.data;
    const friendDto = {
      friendsId: friendId,
      memberId: memberId,
    };
    return await AxiosInstance.post(
      Common.WEELV_DOMAIN + "/friend/add/block",
      friendDto
    );
  },

  //차단/친구 삭제
  deletefriend: async (id) => {
    return await AxiosInstance.delete(
      Common.WEELV_DOMAIN + `/friend/delete/${id}`
    );
  },

  ////////////////////////////////////회원 상태 관리 ////////////////////////////////////////////////////
  // 회원 상태변경 접속중, 바쁨, 이딴거
  statusChange: async (status) => {
    const res = await Common.TakenId();
    const memberId = res.data;
    return await AxiosInstance.put(
      Common.WEELV_DOMAIN + `/status/changeStatus/${memberId}/${status}`
    );
  },
  //최근 접속시간 업데이트
  timeUpdate: async () => {
    const res = await Common.TakenId();
    const memberId = res.data;
    return await AxiosInstance.put(
      Common.WEELV_DOMAIN + `/status/updateLastAccessTime/${memberId}`
    );
  },
  //상태 메세지 변경
  statusMessageChange: async (message) => {
    const res = await Common.TakenId();
    const memberId = res.data;
    console.log(memberId);
    return await AxiosInstance.put(
      Common.WEELV_DOMAIN + `/status/updateStatusMessage/${memberId}/${message}`
    );
  },
  // 상태 메세지 출력
  statusInfo: async (memberId) => {
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/status/getMemberStatusInfo/${memberId}`
    );
  },
};
export default ChatApi;
