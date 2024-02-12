import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {
  MiddleButton,
  SmallButton,
} from "../../styles/styledComponents/StyledComponents";
import MemberApi from "../../api/MemberApi";
import Common from "../../utils/Common";
const CommentContainer = styled.div`
  height: 30vh;
  overflow-y: scroll;
  position: relative;
`;

const LargeInput = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  resize: none;
  border: 1px solid #c4c4c4;

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
  margin-bottom: 5px;
`;

const CommentForm = styled.form`
  margin-top: 20px;
`;
const CommentBox = styled.div`
  display: flex;
`;

const CommentNickname = styled.p`
  color: #2446da;
  font-weight: bold;
  margin-left: 5px;
  margin-top: 5px;
`;
const HeadText = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: flex;
  margin: 5px;
  font-size: 0.8rem;
  word-break: break-word;
`;
const CommentContent = styled.div`
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  resize: none;
  border: 1px solid #c4c4c4;
  margin-bottom: 5px;
  height: auto;
  width: 100%;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const Day = styled.div`
  display: flex;
  font-size: 0.6rem;
`;
const Img = styled.img`
  border-radius: 50px;
  height: 50px;
  width: 50px;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
`;
const Box1 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Box2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  margin-bottom: 5px;
`;
const Dropdown = styled.select`
  width: 10em;
  height: 2em;
  margin: 10px;
  padding: 5px;
  border: 1px solid #ccc;

  border-radius: 4px;
  font-size: 16px;
  position: sticky;
  top: 0;
  &:focus {
    outline: none;
    border-color: #90caf9;
  }
`;
const PostRoom = ({ showPostRoom }) => {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [totalCommentPages, setTotalCommentPages] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const [sortType, setSortType] = useState("");
  const [nickName, setNickName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const memberDetail = await MemberApi.getMemberDetail();
        setNickName(memberDetail.data.nickName);
        setEmail(memberDetail.data.email);
        setPhoto(memberDetail.data.image);
        // 댓글 정보 가져오기
        const commentResponse = await CommunityAxiosApi.getCommentList(
          id,
          sortType,
          currentCommentPage
        );
        console.log(commentResponse.data);
        setComments(commentResponse.data.content);
        setTotalCommentPages(commentResponse.data.totalPages);
        const totalCommentsResponse = await CommunityAxiosApi.getTotalComments(
          id
        );
        setTotalComment(totalCommentsResponse.data);
      } catch (error) {
        console.error("Error fetching post and comments:");
      }
    };
    fetchPostAndComments();
  }, [id, currentCommentPage, sortType]);
  const loadComments = async () => {
    try {
      // 게시물의 ID를 사용하여 서버에서 댓글 목록을 가져옴
      const response = await CommunityAxiosApi.getCommentList(id);
      // 서버에서 받은 댓글 목록을 상태에 업데이트
      setComments(response.data.content);
      console.log("댓글 목록:", response.data);
    } catch (error) {
      console.error("댓글 목록 불러오기 오류:", error);
    }
  };
  const deleteComment = async (commentId) => {
    try {
      const response = await CommunityAxiosApi.commentDelete(commentId);
      if (response.data === true) {
        console.log("댓글 삭제 성공");
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.commentId !== commentId)
        );
      } else {
        console.log("댓글 삭제 실패");
        // 여기에 삭제 실패 시 수행할 작업을 추가합니다.
      }
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      // 여기에 오류 처리를 추가합니다.
    }
  };
  const CommentWrite = async () => {
    try {
      const response = await MemberApi.getMemberDetail();
      console.log(response.data);
      const email = response.data.email;
      // 댓글 등록 요청을 보내기 전에 필요한 데이터 준비
      const commentDto = {
        communityId: id,
        content: content,
        email: email,
      };
      // 댓글 등록 API 호출
      const commentResponse = await CommunityAxiosApi.commentRegister(
        commentDto
      );
      if (commentResponse.status === 200) {
        alert("댓글이 등록되었습니다.");
        // 입력 필드 초기화
        setContent("");
        loadComments();
      }
    } catch (error) {
      console.error("댓글 등록 오류:", error);
      alert("댓글이 등록되지 않았습니다.");
    }
  };

  return (
    <>
      <CommentContainer>
        <Dropdown onChange={(selected) => setSortType(selected.target.value)}>
          {["최신순", "등록순"].map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Dropdown>
        <CommentItem>
          {comments &&
            comments.map((comment, communityId) => (
              <CommentBox key={communityId}>
                <Img src={photo} alt="Member Photo" />
                <CommentContent>
                  <Box1>
                    <Box>
                      <CommentNickname>{comment.nickName}</CommentNickname>
                      &nbsp;
                      <Day>{Common.timeFromNow(comment.regDate)}</Day>
                    </Box>
                    <Box2>
                      <HeadText>{comment.content}</HeadText>
                      {comment.nickName === nickName && (
                        <SmallButton
                          onClick={() => deleteComment(comment.commentId)}
                        >
                          삭제
                        </SmallButton>
                      )}
                    </Box2>
                  </Box1>
                </CommentContent>
              </CommentBox>
            ))}
        </CommentItem>

        {currentCommentPage > 0 && (
          <SmallButton
            onClick={() => setCurrentCommentPage(currentCommentPage - 1)}
          >
            <IoIosArrowBack />
          </SmallButton>
        )}
        {currentCommentPage + 1 < totalCommentPages && (
          <SmallButton
            onClick={() => setCurrentCommentPage(currentCommentPage + 1)}
          >
            <IoIosArrowForward />
          </SmallButton>
        )}
      </CommentContainer>
      <CommentForm>
        <LargeInput
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <FormContainer>
          <MiddleButton onClick={CommentWrite}>댓글 작성</MiddleButton>
        </FormContainer>
      </CommentForm>
    </>
  );
};

export default PostRoom;
