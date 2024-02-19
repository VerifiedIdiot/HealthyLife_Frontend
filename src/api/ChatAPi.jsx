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
  // 읽지 않은 메시지 수 가져오기
  getUnreadMessageCount: async (roomId, memberId) => {
    try {
      const response = await AxiosInstance.get(
        Common.WEELV_DOMAIN + `/chat/unreadMessages/${roomId}/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error("읽지 않은 메시지 수 조회 중 에러 발생:", error);
      // 에러 처리 로직 추가
      return 0; // 예외가 발생하면 -1을 반환하거나 다른 적절한 값으로 처리할 수 있습니다.
    }
  },
  // 채팅방의 최신 메시지 가져오기
  getLatestMessage: async (roomId) => {
    try {
      const response = await AxiosInstance.get(
        Common.WEELV_DOMAIN + `/chat/latestMessage/${roomId}`
      );
      return response.data.message;
    } catch (error) {
      console.error("최신 메시지 조회 중 에러 발생:", error);
      // 에러 처리 로직 추가
      return null; // 예외가 발생하면 null을 반환하거나 다른 적절한 값으로 처리할 수 있습니다.
    }
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
    try {
      const res = await Common.TakenId();
      const memberId = res.data;
      console.log(
        "메세지 가져오기 " +
          roomId +
          "아이디" +
          memberId +
          `chat/messages/${roomId}?memberId=${memberId}`
      );
      const response = await AxiosInstance.post(
        Common.WEELV_DOMAIN+`/chat/messages/${roomId}?memberId=${memberId}`
      );
      console.log("서버 응답", response);
      return response;
    } catch (error) {
      console.error("에러 발생", error);
      throw error; // 에러를 다시 던져서 상위 레벨에서 처리할 수 있도록 함
    }
  },

  updateMessageStatus: async (roomId, userId) => {
    try {
      // 서버에 메시지 읽음 상태 업데이트 요청 보내기
      await AxiosInstance.post(
        Common.WEELV_DOMAIN +
          `/chat/updateMessageStatus?memberId=${userId}&roomId=${roomId}&status="읽음"`
      );
      console.log("읽음 상태 업데이트 성공");
    } catch (error) {
      console.error("메시지 읽음 상태 업데이트 실패:", error);
      // 에러 처리 로직 추가
    }
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
    console.log(memberId + "의 메세지가 " + message + "로 잘변경됬습니다.!!");
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
