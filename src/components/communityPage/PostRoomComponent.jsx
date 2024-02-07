import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { useNavigate, useParams } from "react-router-dom";
import Common from "../../utils/Common";
import { Main, Container } from "../../styles/Layouts";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";
import MemberApi from "../../api/MemberApi";
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
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);

  @media (max-width: 1024px) {
    height: 100px;
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

const PostRoom = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [totalCommentPages, setTotalCommentPages] = useState(0);
  const [sortType, setSortType] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");

  const [totalComment, setTotalComment] = useState(0);

  const { id } = useParams();

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
  }, [id, currentCommentPage, sortType]);
  useEffect(() => {
    console.log(post.mediaPaths);
  }, [post]);
  const commentWrite = async () => {
    try {
      // 댓글 등록 요청을 보내기 전에 필요한 데이터 준비
      const commentDto = {
        communityId: id,
        content: newComment,
      };

      // 댓글 등록 API 호출
      const commentResponse = await CommunityAxiosApi.commentRegister(
        commentDto
      );

      // 댓글 목록에 새로운 댓글 추가
      setComments([...comments, commentResponse.data]);

      // 입력 필드 초기화
      setNewComment("");

      // 새로운 댓글을 기존 댓글 목록에 추가하여 상태 업데이트
      setComments([...comments, commentResponse.data]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <CommentContainer>
        {comments
          .filter((comment) => comment.communityId === null)
          .map((comment) => (
            <CommentBox key={comment.communityId}>
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
            <SmallButton onClick={commentWrite}>댓글작성</SmallButton>
          </FormContainer>
        </CommentForm>
      </CommentContainer>
    </>
  );
};

export default PostRoom;
