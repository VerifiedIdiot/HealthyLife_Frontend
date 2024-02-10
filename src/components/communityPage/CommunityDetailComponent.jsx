import { Main, Container } from "../../styles/Layouts";
import styled from "styled-components";
import Common from "../../utils/Common";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import CommunityAxiosApi from "../../api/CommunityAxios";
import {
  SmallButton,
  MiddleButton,
} from "../../styles/styledComponents/StyledComponents";
import PostRoom from "./PostRoomComponent";
import { ReactComponent as Down } from "../../assets/imgs/communityImges/Down.svg";
import MemberApi from "../../api/MemberApi";
import React from "react";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CategoryContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1.5rem;
  font-weight: bold;
`;
const TitleContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  align-items: center;

  p {
    color: #333;
    font-size: 1rem;
  }
`;
const DetailInfoContent = styled.div`
  display: flex;
  color: #333;
  font-size: 0.8rem;
  justify-content: flex-end;
  margin-bottom: 5px;
  width: 100%;
  p {
    color: #2446da;
  }
`;
const PostListTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
const Line = styled.div`
  width: 100%;
  height: 2px;
  margin-bottom: 10px;
  border-top: 1px solid #2446da;
`;
const Line2 = styled.div`
  width: 100%;
  height: 2px;
  margin-bottom: 10px;
  border-top: 2px solid #2446da;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`;

const LargeInput = styled.textarea`
  width: calc(100% - 10px);
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
  color: #333;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
const CenterFormContainer = styled.div`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 200px;
  max-height: 350px;
  border-bottom: 1px solid #c4c4c4;
  overflow-y: scroll;
  margin-bottom: 10px;
`;
const CommentButton = styled.div`
  width: 100px;
  border: none;
`;
const RotatedDown = styled(Down)`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
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
const CommentContainer = styled.div`
  height: 15vh;
  overflow-y: scroll;
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
const CommunityDetailComponent = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(""); // 좋아요 상태를 저장하는 상태
  const [post, setPost] = useState("");
  const [showPostRoom, setShowPostRoom] = useState(false); // PostRoom 표시 여부 상태
  const [comments, setComments] = useState([]);
  const [nickName, setNickName] = useState("");
  const [photo, setPhoto] = useState("");

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [currentCommentPage, setCurrentCommentPage] = useState(0);
  const [totalCommentPages, setTotalCommentPages] = useState(0);
  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const memberDetail = await MemberApi.getMemberDetail();
        setNickName(memberDetail.data.nickName);
        setEmail(memberDetail.data.email);
        setPhoto(memberDetail.data.image);
        // 게시물 정보 가져오기
        const postResponse = await CommunityAxiosApi.getCommunityDetail(id);
        setPost(postResponse.data);
        console.log(postResponse.data);

        // 댓글 정보 가져오기
        const res = await CommunityAxiosApi.getCommentList(id);
        setComments(res.data);
        console.log(res.data);
        // 좋아요 상태 확인하기
        const likeResponse = await CommunityAxiosApi.checkLikeStatus(
          id,
          memberDetail.data.email
        );
        setIsLiked(likeResponse.data);
        console.log(likeResponse.data);
      } catch (error) {
        console.error("Error fetching post and comments:");
      }
    };
    fetchPostAndComments();
  }, [id, isLiked]);

  if (!post) {
    return <div>Loading...</div>;
  }
  const likeIt = async () => {
    try {
      const response = await MemberApi.getMemberDetail();
      const email = response.data.email;
      // 좋아요 추가 또는 취소 요청 보내기
      let likeResponse;
      if (!isLiked) {
        likeResponse = await CommunityAxiosApi.likeIt(id, true, email); // 좋아요 취소
      } else {
        likeResponse = await CommunityAxiosApi.likeIt(id, false, email); // 좋아요 추가
      }

      // 서버로부터 받은 데이터 처리
      console.log(likeResponse.data);
      setIsLiked(likeResponse.data);
      if (likeResponse.data) {
      } else {
      }
    } catch (error) {
      console.error("Error likeIt ", error);
    }
  };
  // 수정 버튼 클릭 시 수정 모드로 전환
  const handleEdit = () => {
    navigate(`/communitypage/write/${post.communityId}`);
  };

  const deleteCommunity = async () => {
    try {
      const response = await CommunityAxiosApi.deleteCommunity(
        post.communityId
      );
      if (response.data === true) {
        console.log("게시물 삭제 성공");
        navigate("/communitypage");
      } else {
        console.log("게시물 삭제 실패");
        // 여기에 삭제 실패 시 수행할 작업을 추가합니다.
      }
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
      // 여기에 오류 처리를 추가합니다.
    }
  };

  return (
    <Main>
      <InputContainer>
        <PostListTitle>
          <CategoryContent>{post.categoryName}</CategoryContent>
        </PostListTitle>
        <Line />
        <FormContainer>
          <TitleContent>
            TITLE<p>&nbsp;{post.title}</p>
          </TitleContent>
          <TitleContent>
            DATE
            <p>&nbsp;{Common.formatDate(post.regDate)}</p>
          </TitleContent>
        </FormContainer>
        <Line2 />
        <FormContainer>
          <DetailInfoContent>
            작성자 {post.nickName}, 좋아요
            <p>
              &nbsp;
              {isLiked ? (
                <FaHeart onClick={likeIt} />
              ) : (
                <FaRegHeart onClick={likeIt} />
              )}
              &nbsp;
            </p>
          </DetailInfoContent>
        </FormContainer>
        <CenterFormContainer
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></CenterFormContainer>
        <ButtonContainer>
          {post.nickName === nickName && (
            <>
              <SmallButton onClick={handleEdit}>수정</SmallButton>

              <SmallButton onClick={deleteCommunity}>삭제</SmallButton>
            </>
          )}
        </ButtonContainer>
        <CommentContainer>
          <CommentItem>
            {comments &&
              comments.map((comment, communityId) => (
                <CommentBox key={communityId}>
                  <Img src={photo} alt="Member Photo" />
                  <CommentContent>
                    <Box>
                      <CommentNickname>{comment.nickName}</CommentNickname>
                      &nbsp;
                      <Day>{Common.timeFromNow(comment.regDate)}</Day>
                    </Box>
                    <HeadText>{comment.content}</HeadText>
                  </CommentContent>
                </CommentBox>
              ))}
          </CommentItem>
          {currentCommentPage > 0 && (
            <button
              onClick={() => setCurrentCommentPage(currentCommentPage - 1)}
            >
              이전
            </button>
          )}
          {currentCommentPage + 1 < totalCommentPages && (
            <button
              onClick={() => setCurrentCommentPage(currentCommentPage + 1)}
            >
              다음
            </button>
          )}
        </CommentContainer>
        <FormContainer>
          {nickName}
          <CommentButton onClick={() => setShowPostRoom(!showPostRoom)}>
            답글달기
            <RotatedDown isRotated={showPostRoom}></RotatedDown>
          </CommentButton>
        </FormContainer>
      </InputContainer>
      {showPostRoom && <PostRoom />}
    </Main>
  );
};
export default CommunityDetailComponent;
