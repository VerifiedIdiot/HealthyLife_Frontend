import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { useNavigate, useParams } from "react-router-dom";

import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import MemberApi from "../../api/MemberApi";

const CommentContainer = styled.div``;

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
`;

const CommentForm = styled.form``;

const PostRoom = () => {
  const [content, setContent] = useState("");
  const { id } = useParams();

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
        // 댓글 목록 다시 불러오기
        PostRoom();
      }
    } catch (error) {
      console.error("댓글 등록 오류:", error);
      alert("댓글이 등록되지 않았습니다.");
    }
  };

  return (
    <>
      <CommentContainer>
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
      </CommentContainer>
    </>
  );
};

export default PostRoom;
