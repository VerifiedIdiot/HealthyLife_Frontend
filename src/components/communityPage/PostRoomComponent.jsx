import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { useNavigate, useParams } from "react-router-dom";
import Common from "../../utils/Common";
// import { jwtDecode } from "jwt-decode";
import { Main, Container } from "../../styles/Layouts";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";

const HeadText = styled.span`
  cursor: pointer;
`;

const CommentContainer = styled.div``;

const CommentBox = styled.div``;

const CommentContent = styled.div``;
const CommentNickname = styled.p`
  color: #2446da;
  font-weight: bold;
  cursor: pointer;
`;

const LargeInput = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #2446da;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);

  @media (max-width: 1024px) {
    height: 200px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  color: #2446da;
  flex-direction: column;
  font-size: 0.8rem;
  align-items: flex-end;
`;

const CommentForm = styled.form``;

const createDummyComment = (commentId, content, nickName, regDate) => {
  return {
    commentId,
    content,
    nickName,
    regDate,
  };
};

// 가상의 댓글 데이터 배열
const dummyComments = [
  createDummyComment(1, "댓글1", "User1", "2024-01-27T10:00:00Z"),
  createDummyComment(2, "댓글2", "User2", "2024-01-27T11:00:00Z"),
  // ... 더 많은 데이터 추가 가능
];

const PostRoom = () => {
  const [comments, setComments] = useState(dummyComments);
  const [post, setPost] = useState([]);
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [totalCommentPages, setTotalCommentPages] = useState(0);
  const [sortType, setSortType] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [email, setEmail] = useState("");
  // const token = Common.getAccessToken();
  // const decode = token ? jwtDecode(token) : null;
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");

  const [totalComment, setTotalComment] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    // if (decode) {
    //   setEmail(decode.sub);
    // }
  }, []);
  useEffect(() => {
    const postDetail = async () => {
      try {
        const response = await CommunityAxiosApi.getCommunityDetail(id);
        setPost(response.data);
        const commentResponse = await CommunityAxiosApi.getCommentList(
          id,
          sortType,
          currentCommentPage
        );
        console.log(commentResponse.data);
        setComments(commentResponse.data.content);
        setTotalCommentPages(commentResponse.data.totalPages);
        // 전체 댓글 수 조회
        const totalCommentsResponse = await CommunityAxiosApi.getTotalComments(
          id
        );
        setTotalComment(totalCommentsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    postDetail();
    console.log(post.mediaPaths);
  }, [id, currentCommentPage, sortType]);

  const commentWrite = async () => {
    try {
      const response = await CommunityAxiosApi.commentWrite(
        email,
        id,
        newComment,
        null
      );
      setComments([...comments, response.data]);
      setNewComment("");
      // 댓글 작성 후 댓글 목록 다시 불러오기
      const commentResponse = await CommunityAxiosApi.getCommentList(
        id,
        sortType,
        currentCommentPage
      );
      setComments(commentResponse.data.content);
    } catch (error) {
      console.error(error);
    }
  };
  const likeIt = async (isLikeIt) => {
    try {
      await CommunityAxiosApi.likeIt(id, isLikeIt);
      const response = await CommunityAxiosApi.getCommunityDetail(id);
      setPost(response.data);
      if (isLikeIt) {
        alert("추천이 완료되었습니다.");
      } else {
        alert("비추천이 완료되었습니다.");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("오류가 발생하였습니다.");
      }
    }
  };

  return (
    <>
      <CommentContainer>
        {comments
          .filter((comment) => comment.parentCommentId === null)
          .map((comment) => (
            <CommentBox key={comment.commentId}>
              <CommentContent>
                <CommentNickname>{comment.nickName}</CommentNickname>
                <>{Common.formatDate(comment.regDate)}</>
                <HeadText>{comment.content}</HeadText>
              </CommentContent>
            </CommentBox>
          ))}
        {currentCommentPage > 0 && (
          <button onClick={() => setCurrentCommentPage(currentCommentPage - 1)}>
            이전
          </button>
        )}
        {currentCommentPage + 1 < totalCommentPages && (
          <button onClick={() => setCurrentCommentPage(currentCommentPage + 1)}>
            다음
          </button>
        )}
        <CommentForm>
          <LargeInput
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <FormContainer>
            <SmallButton>댓글작성</SmallButton>
          </FormContainer>
        </CommentForm>
      </CommentContainer>
    </>
  );
};

export default PostRoom;
