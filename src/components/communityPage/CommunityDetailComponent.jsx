import { Main, Container } from "../../styles/Layouts";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";
import PostRoom from "./PostRoomComponent";
import { ReactComponent as Down } from "../../assets/imgs/communityImges/Down.svg";

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
  cursor: pointer;
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
const WriteInfo = styled.div``;
// 댓글 목록 컴포넌트
const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>
          {/* 댓글 내용 및 정보를 표시하는 코드 추가 */}
          {comment.content}
        </div>
      ))}
    </div>
  );
};
const createDummyPost = (
  id,
  categoryId,
  categoryName,
  title,
  content,
  nickName,
  email,
  regDate,
  likeItCount,
  viewCount
) => {
  return {
    id,
    categoryId,
    categoryName,
    title,
    content,
    nickName,
    email,
    regDate,
    likeItCount,
    viewCount,
  };
};

const dummyPosts = [
  createDummyPost(
    1,
    1,
    "사과",
    "사과와 그의 매력",
    "사과는 매우 영양가 있는 과일로, 많은 사람들에게 사랑받고 있습니다.",
    "과일맛나는사람",
    "admin@admin.com",
    "2024-01-27",
    35,
    72
  ),

  // 필요에 따라 더 많은 더미 게시물을 추가할 수 있습니다.
];
const CommunityDetailComponent = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태를 저장하는 상태
  const [posts, setPosts] = useState(dummyPosts);
  const [newContent, setNewContent] = useState(""); // 빈 문자열에서 빈 배열로 변경
  const [showPostRoom, setShowPostRoom] = useState(false); // PostRoom 표시 여부 상태
  const [editingIndex, setEditingIndex] = useState(-1);
  const [comments, setComments] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    const postDetail = async () => {
      try {
        const response = await CommunityAxiosApi.getCommunityDetail(id);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    postDetail();
  }, []);
  // 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await CommunityAxiosApi.getCommentList(id);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);
  // 좋아요 아이콘 클릭 시 상태 변경
  const toggleLike = () => {
    setIsLiked((prevState) => !prevState); // 현재 상태의 반대로 변경
  };

  // 답글 달기 버튼 클릭 시 PostRoom 표시 여부 상태를 변경
  const toggleReplyForm = () => {
    setShowPostRoom((prevState) => !prevState);
  };

  // 수정 버튼 클릭 시 해당 인덱스의 입력란 활성화
  const toggleEdit = (index) => {
    setEditingIndex(index);
    // 수정할 내용을 입력창에 미리 표시
    setNewContent(posts[index].content);
    inputRef.current && inputRef.current.focus();
  };

  // 수정된 내용 저장 함수
  const saveEdit = async (index) => {
    try {
      // 수정된 내용을 API로 전송
      await CommunityAxiosApi.modifyCommunity(posts[index].id, newContent);
      // 상태 업데이트
      setPosts((prevPosts) =>
        prevPosts.map((post, idx) =>
          idx === index ? { ...post, content: newContent } : post
        )
      );
      // 수정 중인 인덱스 초기화
      setEditingIndex(-1);
    } catch (error) {
      console.error("Error saving edited content:", error);
    }
  };
  // 수정 중인지 여부에 따라 버튼 변경
  const renderButton = (index) => {
    if (index === editingIndex) {
      return <SmallButton onClick={() => saveEdit(index)}>저장</SmallButton>;
    } else {
      return <SmallButton onClick={() => toggleEdit(index)}>수정</SmallButton>;
    }
  };
  const deleteCommunity = async (id) => {
    try {
      const response = await CommunityAxiosApi.deleteCommunity(id);
      if (response.data === true) {
        console.log("게시물 삭제 성공");
        // 여기에 삭제 성공 시 수행할 작업을 추가합니다.
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
        {posts.map((post, index) => (
          <InputContainer key={index}>
            <PostListTitle>
              <CategoryContent>{post.categoryName}</CategoryContent>
              {isLiked ? (
                <FaHeart onClick={toggleLike} />
              ) : (
                <FaRegHeart onClick={toggleLike} />
              )}
            </PostListTitle>
            <Line />
            <FormContainer>
              <TitleContent>{post.title}</TitleContent>
            </FormContainer>
            <FormContainer>
              <DetailInfoContent>
                {post.nickName} {post.regDate}
              </DetailInfoContent>
              <ButtonContainer>
                {renderButton(index)}
                <SmallButton onClick={deleteCommunity}>삭제</SmallButton>
              </ButtonContainer>
            </FormContainer>
            <LargeInput
              type="text"
              value={index === editingIndex ? newContent : post.content}
              onChange={(e) => setNewContent(e.target.value)}
              readOnly={index !== editingIndex}
              ref={inputRef} // input 요소에 ref를 연결
            />
            <CommentList comments={comments} />
            <FormContainer>
              <WriteInfo>{post.nickName}</WriteInfo>
              <CommentButton onClick={toggleReplyForm}>
                답글달기
                <RotatedDown isRotated={showPostRoom}></RotatedDown>
              </CommentButton>
            </FormContainer>
          </InputContainer>
        ))}
        {showPostRoom && <PostRoom />}
      </Container>
    </Main>
  );
};
export default CommunityDetailComponent;
