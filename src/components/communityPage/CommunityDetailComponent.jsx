import { Main, Container } from "../../styles/Layouts";
import styled from "styled-components";
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
import React from "react";

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
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);

  @media (max-width: 1024px) {
    height: 100px;
  }
`;
const FormContainer = styled.div`
  display: flex;
  color: #2446da;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
const CenterFormContainer = styled.div`
  display: flex;
  justify-content: center;
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

// 이미지 URL을 미리보기로 표시하는 컴포넌트
const ImagePreview = ({ imageUrl }) => {
  return (
    <img
      src={imageUrl}
      alt="이미지 미리보기"
      style={{
        maxWidth: "30%",
        height: "auto",
      }}
    />
  );
};
const extractTextFromContent = (content) => {
  // 이미지 태그 제거
  if (!content) {
    return "";
  }
  const textWithoutImages = content.replace(
    /<img[^>]+src=["'][^"']+\.(jpg|jpeg|gif|png)["'][^>]*>/g,
    ""
  );
  // 피태그 제거
  const textWithoutPtags = textWithoutImages
    .replace(/<p.*?>/g, "")
    .replace(/<\/p>/g, "");

  return textWithoutPtags;
};

// 이미지 URL을 추출하여 배열로 반환하는 함수
const extractImageUrls = (content) => {
  const imageUrls = [];
  const regex = /<img[^>]+src=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    imageUrls.push(match[1]);
  }
  return imageUrls;
};
const CommunityDetailComponent = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(null); // 좋아요 상태를 저장하는 상태
  const [post, setPost] = useState(null);
  const [newText, setNewText] = useState("");
  const [newImageUrls, setNewImageUrls] = useState([]); // 빈 문자열에서 빈 배열로 변경
  const [showPostRoom, setShowPostRoom] = useState(false); // PostRoom 표시 여부 상태
  const [editing, setEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [nickName, setNickName] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // 게시물 정보 가져오기
        const postResponse = await CommunityAxiosApi.getCommunityDetail(id);
        setPost(postResponse.data);
        // content가 null이면 빈 문자열로 설정
        const content = postResponse.data.content || "";

        // content에서 이미지 URL 추출
        const imageUrls = extractImageUrls(content);

        // content에서 텍스트만 추출
        const text = extractTextFromContent(content);

        // 상태 업데이트
        setNewText(text); // 텍스트만 저장
        setNewImageUrls(imageUrls); // 이미지 URL 저장
        console.log(postResponse.data);
        console.log(content);

        // 좋아요 상태 확인하기
        const tokenResponse = await Common.TakenToken(); // 토큰 가져오기
        if (tokenResponse && tokenResponse.data && tokenResponse.data.email) {
          const email = tokenResponse.data.email; // 토큰 추출
          const likeResponse = await CommunityAxiosApi.checkLikeStatus(
            id,
            email
          );
          setIsLiked(likeResponse.data.isLiked);
        } else {
          console.error("Invalid token response:", tokenResponse);
          // 토큰이 없거나 유효하지 않은 경우 처리할 작업 추가
        }

        // // 댓글 정보 가져오기
        // const commentResponse = await CommunityAxiosApi.getCommentList(
        //   id,
        //   "최신순",
        //   0,
        //   10
        // );
        // setComments(commentResponse.data);
      } catch (error) {
        console.error("Error fetchPostAndComments ", error);
      }
    };

    fetchPostAndComments();
    // 사용자 닉네임 가져오기
    const fetchNickname = async () => {
      try {
        const memberDetail = await MemberApi.getMemberDetail();
        setNickName(memberDetail.data.nickName);
      } catch (error) {
        console.error("Error fetching user nickName:", error);
      }
    };

    fetchNickname();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }
  const likeIt = async () => {
    try {
      const tokenResponse = await Common.TakenToken(); // 토큰 가져오기
      console.log(tokenResponse.data);
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
    setNewText(extractTextFromContent(post.text));
    setNewImageUrls(extractImageUrls(post.content)); // 이미지 URL도 함께 업데이트
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
        content: newText,
        email: email,
      };
      // 수정된 내용을 API로 전송
      await CommunityAxiosApi.modifyCommunity(post.communityId, communityDto);
      // 게시물을 다시 불러와서 업데이트
      const updatedPostResponse = await CommunityAxiosApi.getCommunityDetail(
        id
      );
      setPost(updatedPostResponse.data);
      setNewText(extractTextFromContent(updatedPostResponse.data.content));
      setNewImageUrls(extractImageUrls(updatedPostResponse.data.content)); // 이미지 URL도 함께 업데이트
      setEditing(false);
      console.log("게시물 수정 성공");
      navigate("/communitypage");
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
          </FormContainer>
          <CenterFormContainer>
            {newImageUrls.map((imageUrl, index) => (
              <ImagePreview key={index} imageUrl={imageUrl} />
            ))}
          </CenterFormContainer>
          <ButtonContainer>
            {post.nickName === nickName && (
              <>
                {editing ? (
                  <SmallButton onClick={saveEdit}>저장</SmallButton>
                ) : (
                  <SmallButton onClick={handleEdit}>수정</SmallButton>
                )}
                <SmallButton onClick={deleteCommunity}>삭제</SmallButton>
              </>
            )}
          </ButtonContainer>
          <LargeInput
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            readOnly={!editing}
            ref={inputRef}
          />
          <FormContainer>
            {nickName}
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
