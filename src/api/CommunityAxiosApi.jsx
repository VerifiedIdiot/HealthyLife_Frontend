import axios from "axios";
import Common from "../utils/Common";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;
const CommunityAxiosApi = {
  // 게시글 조회
  getCommunityList: async (page, size) => {
    return await axios.get(
      Common.BACKEND_DOMAIN +
        `/api/community/list/page?page=${page}&size=${size}`
    );
  },
  // 게시글 조회 (카테고리 별)
  getCommunityListByCategory: async (categoryId, page, size) => {
    return await axios.get(
      Common.BACKEND_DOMAIN +
        `/api/community/list/page/category?categoryId=${categoryId}&page=${page}&size=${size}`
    );
  },
  // 카테고리 조회
  cateList: async () => {
    return await axios.get(Common.BACKEND_DOMAIN + `/api/category/list`, {});
  },
  // 페이지 수 조회
  getCommunityTotalPages: async (size) => {
    return await axios.get(
      Common.BACKEND_DOMAIN + `/api/community/count?size=${size}`
    );
  },
  // 카테고리에 따른 페이지 수 조회
  getCommunityTotalPagesByCategory: async (categoryId, size) => {
    return await axios.get(
      Common.BACKEND_DOMAIN +
        `/api/community/count/${categoryId}?page=0&size=${size}`
    );
  },
  // 게시글 등록
  communityPost: async (communityDto) => {
    return await axios.post(
      Common.BACKEND_DOMAIN + "/api/community/new",
      communityDto
    );
  },
  // 게시글 상세 조회
  getCommunityDetail: async (communityId) => {
    return await axios.get(
      Common.BACKEND_DOMAIN + `/api/community/detail/${communityId}`
    );
  },
  // 댓글 리스트 조회
  getCommentList: async (
    communityId,
    sortType = "최신순",
    page = 0,
    size = 10
  ) => {
    return await axios.get(
      Common.BACKEND_DOMAIN + `/api/comment/list/${communityId}/page`,
      {
        params: {
          sortType,
          page,
          size,
        },
      }
    );
  },

  // 댓글 쓰기
  commentWrite: async (email, nickName, communityId, content) => {
    const comment = {
      email: email,
      nickName: nickName,
      communityId: communityId,
      content: content,
    };
    return await axios.post(
      Common.BACKEND_DOMAIN + `/api/comment/new`,
      comment,
      {}
    );
  },

  // 좋아요 추천
  likeIt: async (communityId, isLikeIt) => {
    return await axios.post(
      `${Common.BACKEND_DOMAIN}/api/community/likeIt/${communityId}/${isLikeIt}`,
      {}
    );
  },
  // 전체 댓글 수 조회
  getTotalComments: async (communityId) => {
    return await axios.get(
      Common.BACKEND_DOMAIN + `/api/comment/count/${communityId}`
    );
  },

  // 댓글 삭제
  commentDelete: async (commentId) => {
    return await axios.delete(
      Common.BACKEND_DOMAIN + `/api/comment/delete/${commentId}`
    );
  },

  // 게시글 검색
  searchCommunity: async (searchType, keyword, page = 0, size = 10) => {
    return await axios.get(
      Common.BACKEND_DOMAIN +
        `/api/community/search/${searchType}?page=${page}&size=${size}&keyword=${keyword}`
    );
  },
  // 카테고리 쓰기
  cateInsert: async (email, category) => {
    const accessToken = Common.getAccessToken();
    const cate = {
      email: email,
      categoryName: category,
    };
    return await axios.post(
      Common.BACKEND_DOMAIN + "/api/category/new",
      cate,
      {}
    );
  },
  // 카테고리 삭제
  cateDelete: async (categoryId) => {
    const accessToken = Common.getAccessToken();
    return await axios.delete(
      Common.HEALTH_HOST + `/api/category/delete/${categoryId}`
    );
  },
};
export default CommunityAxiosApi;
