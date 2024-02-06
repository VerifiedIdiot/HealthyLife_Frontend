import { Main, Container } from "../../styles/Layouts";
import styled, { css } from "styled-components";
import Common from "../../utils/Common";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";
import PostRoom from "./PostRoomComponent";
import { ReactComponent as Down } from "../../assets/imgs/communityImges/Down.svg";
import MemberApi from "../../api/MemberApi";
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CategoryContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1.5rem;
`;
const TitleContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1rem;
  font-weight: bold;
`;
const DetailInfoContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1rem;
  justify-content: space-between;
  align-items: center;
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
  border-top: 2px solid #2446da;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
`;

const LargeInput = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #333;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);
  overflow-y: scroll;

  @media (max-width: 1024px) {
    height: 200px;
  }
`;
const FormContainer = styled.div`
  display: flex;
  color: #2446da;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
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
const CommunityDetailComponent = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(null); // 좋아요 상태를 저장하는 상태
  const [post, setPost] = useState(null);
  const [newContent, setNewContent] = useState(""); // 빈 문자열에서 빈 배열로 변경
  const [showPostRoom, setShowPostRoom] = useState(false); // PostRoom 표시 여부 상태
  const [editing, setEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // 게시물 정보 가져오기
        const postResponse = await CommunityAxiosApi.getCommunityDetail(id);
        setPost(postResponse.data);
        setNewContent(postResponse.data.content);

        // 좋아요 상태 확인하기
        const tokenResponse = await Common.TakenToken(); // 토큰 가져오기
        const email = tokenResponse.data.email; // 토큰 추출
        const likeResponse = await CommunityAxiosApi.checkLikeStatus(id, email);
        setIsLiked(likeResponse.data.isLiked);

        // 댓글 정보 가져오기
        const commentResponse = await CommunityAxiosApi.getCommentList(id);
        setComments(commentResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }
  const likeIt = async () => {
    try {
      const tokenResponse = await Common.TakenToken(); // 토큰 가져오기
      const email = tokenResponse.data.email;
      const likeResponse = await CommunityAxiosApi.likeIt(id, !isLiked, email);
      console.log(likeResponse);
      setIsLiked(likeResponse.data);
      if (likeResponse.data) {
        alert("좋아요가 완료되었습니다.");
      } else {
        alert("이미 좋아요를 했습니다.");
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
  // 수정 버튼 클릭 시 수정 모드로 전환
  const handleEdit = () => {
    setNewContent(post.content);
    setEditing(true);
    inputRef.current && inputRef.current.focus();
  };
  // 수정된 내용 저장 함수
  const saveEdit = async () => {
    try {
      const response = await MemberApi.getMemberDetail();
      const email = response.data.email;

      const communityDto = {
        title: post.title,
        content: newContent,
        email: email,
      };
      // 수정된 내용을 API로 전송
      await CommunityAxiosApi.modifyCommunity(post.communityId, communityDto);
      // 게시물을 다시 불러와서 업데이트
      const updatedPostResponse = await CommunityAxiosApi.getCommunityDetail(
        id
      );
      setPost(updatedPostResponse.data);
      setNewContent(updatedPostResponse.data.content);
      setEditing(false);
      console.log("게시물 수정 성공");
    } catch (error) {
      console.error("Error saving edited content:", error);
    }
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
      <Container>
        <InputContainer>
          <PostListTitle>
            <CategoryContent>{post.categoryName}</CategoryContent>
          </PostListTitle>
          <Line />
          <FormContainer>
            <TitleContent>{post.title}</TitleContent>{" "}
            {isLiked ? (
              <FaHeart onClick={likeIt} />
            ) : (
              <FaRegHeart onClick={likeIt} />
            )}
          </FormContainer>
          <FormContainer>
            <DetailInfoContent>
              {post.nickName} {Common.formatDate(post.regDate)}
            </DetailInfoContent>
            <ButtonContainer>
              {editing ? (
                <SmallButton onClick={saveEdit}>저장</SmallButton>
              ) : (
                <SmallButton onClick={handleEdit}>수정</SmallButton>
              )}
              <SmallButton onClick={deleteCommunity}>삭제</SmallButton>
            </ButtonContainer>
          </FormContainer>
          <LargeInput
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            readOnly={!editing}
            ref={inputRef}
          />
          <FormContainer>
            {post.nickName}
            {comments}
            <CommentButton onClick={() => setShowPostRoom(!showPostRoom)}>
              답글달기
              <RotatedDown isRotated={showPostRoom}></RotatedDown>
            </CommentButton>
          </FormContainer>
        </InputContainer>
        {showPostRoom && <PostRoom />}
      </Container>
    </Main>
  );
};
export default CommunityDetailComponent;
