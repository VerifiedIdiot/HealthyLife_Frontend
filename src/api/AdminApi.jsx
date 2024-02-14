import Common from "../utils/Common";
import AxiosInstance from "./AxiosInstance";

const AdminAxiosApi = {
  // ----------------------------- Admin Member
  memberAllList: async () => {
    console.log("잘 받아져오나 ?");
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/admin/member/members`
    );
  },
  memberDelete: async (email) => {
    return await AxiosInstance.delete(
      Common.WEELV_DOMAIN + `/admin/member/members/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  // 회원 페이지 수 조회
  MemberPage: async (page, size) => {
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/admin/member/list/count?page=${page}&size=${size}`
    );
  },

  // 회원 페이지네이션 조회
  MemberPageList: async (page, size) => {
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/admin/member/list/page?page=${page}&size=${size}`
    );
  },

  // 게시글 삭제
  deleteCommunity: async (id) => {
    return await AxiosInstance.delete(
      Common.WEELV_DOMAIN + `/admin/member/community/delete/${id}`
    );
  },

  // 페이지 수 조회
  getAdminPages: async () => {
    console.log("관리자 게시글 총 페이지 진입");
    const page = 0;
    const size = 10;
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/admin/member/totalpage?page=${page}&size=${size}`
    );
  },
  // 게시글 리스트 조회 (페이지네이션)
  getCommunityList: async (page, size) => {
    // console.log("관리자 게시글 불러오는 중 페이지 : " + page);
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/admin/member/boardlist?page=${page}&size=${size}`
    );
  },
};

export default AdminAxiosApi;
