import axios from "axios";
import Common from "../utils/Common";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;
const CommunityAxiosApi = {
  // 게시글 조회
  getCommunityList: async (page, size) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN + `/api/community/list/page?page=${page}&size=${size}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in getCommunityList API call", error);
      throw error;
    }
  },
  // 게시글 조회 (카테고리 별)
  getCommunityListByCategory: async (categoryId, page, size) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN +
          `/api/community/list/page/category?categoryId=${categoryId}&page=${page}&size=${size}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in getCommunityListByCategory API call", error);
      throw error;
    }
  },
  // 실시간 랭킹 조회
  getRanking: async (period) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN + "/api/community/ranking/" + period,
        {}
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in getRanking API call", error);
      throw error;
    }
  },
  // 카테고리 조회
  cateList: async () => {
    try {
      return await axios.get(BACKEND_DOMAIN + `/api/category/list`, {});
    } catch (error) {
      // 오류 처리
      console.error("Error in cateList API call", error);
      throw error;
    }
  },

  // 페이지 수 조회
  getCommunityTotalPages: async (size) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN + `/api/community/count?size=${size}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in getCommunityTotalPages API call", error);
      throw error;
    }
  },
  // 카테고리에 따른 페이지 수 조회
  getCommunityTotalPagesByCategory: async (categoryId, size) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN +
          `/api/community/count/${categoryId}?page=0&size=${size}`
      );
    } catch (error) {
      // 오류 처리
      console.error(
        "Error in getCommunityTotalPagesByCategory API call",
        error
      );
      throw error;
    }
  },
  // 게시글 등록
  communityPost: async (communityDto) => {
    try {
      return await axios.post(
        BACKEND_DOMAIN + "/api/community/new",
        communityDto
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },
  // 게시글 상세 조회
  getCommunityDetail: async (communityId) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN + `/api/community/detail/${communityId}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },
  // 댓글 리스트 조회
  getCommentList: async (
    communityId,
    sortType = "최신순",
    page = 0,
    size = 10
  ) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN + `/api/comment/list/${communityId}/page`,
        {
          params: {
            sortType,
            page,
            size,
          },
        }
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },

  // 댓글 쓰기
  commentWrite: async (
    email,
    nickName,
    communityId,
    content,
    parentCommentId
  ) => {
    try {
      const comment = {
        email: email,
        nickName: nickName,
        communityId: communityId,
        content: content,
        parentCommentId: parentCommentId,
      };
      return await axios.post(BACKEND_DOMAIN + `/api/comment/new`, comment, {});
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },

  // 좋아요 추천
  likeIt: async (communityId, isLikeIt) => {
    try {
      return await axios.post(
        `${BACKEND_DOMAIN}/api/community/likeIt/${communityId}/${isLikeIt}`,
        {}
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },
  // 전체 댓글 수 조회
  getTotalComments: async (communityId) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN + `/api/comment/count/${communityId}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },

  // 댓글 삭제
  commentDelete: async (commentId) => {
    try {
      return await axios.delete(
        BACKEND_DOMAIN + `/api/comment/delete/${commentId}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },

  // 게시글 검색
  searchCommunity: async (searchType, keyword, page = 0, size = 10) => {
    try {
      return await axios.get(
        BACKEND_DOMAIN +
          `/api/community/search/${searchType}?page=${page}&size=${size}&keyword=${keyword}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },
  // 카테고리 쓰기
  cateInsert: async (email, category) => {
    try {
      // const accessToken = Common.getAccessToken();
      const cate = {
        email: email,
        categoryName: category,
      };
      return await axios.post(BACKEND_DOMAIN + "/api/category/new", cate, {});
    } catch (error) {
      // 오류 처리
      console.error("Error in communityPost API call", error);
      throw error;
    }
  },
  // 카테고리 삭제
  cateDelete: async (categoryId) => {
    try {
      // const accessToken = Common.getAccessToken();
      return await axios.delete(
        BACKEND_DOMAIN + `/api/category/delete/${categoryId}`
      );
    } catch (error) {
      // 오류 처리
      console.error("Error in cateDelete API call", error);
      throw error;
    }
  },
};
export default CommunityAxiosApi;
