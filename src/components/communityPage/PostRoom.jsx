import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import CommunityAxiosApi from "../../api/CommunityAxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import Common from "../../utils/Common";
// import { jwtDecode } from "jwt-decode";
import { Main, Container } from "../../styles/Layouts";

const PostHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;
const TitleContainer = styled.div`
  display: flex;
`;
const WriterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PostAuthor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  font-size: 1em;
  color: #666;
`;
const CommentText = styled.p`
  color: #354b45;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
const PostNickName = styled.p`
  display: flex;
  margin: 0;
  padding: 0;
`;
const PostDate = styled.p`
  font-size: 0.8em;
  color: #999;
  margin: 0;
`;

const PostViews = styled.div`
  display: flex;
  padding: 1em;
  align-items: center;
  justify-content: flex-end;
  font-size: 1em;
  color: #999;
`;
const PostBody = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px;
`;
const PostTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1em;
  color: #333;
  padding: 1em;
`;

const PostContent = styled.div`
  font-size: 1em;
  color: #666;
  word-wrap: break-word;
  overflow: auto;
  line-height: 1.5;
  padding: 1em 0;
  img {
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  p,
  span,
  div {
    max-width: 100%;
    white-space: pre-wrap;
  }
`;

const PostLikes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const HeadText = styled.span`
  cursor: pointer;
`;

const CommentContainer = styled.div`
  width: 100%;
  margin-top: 2em;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;

  &:not(:first-child) {
    margin-top: 2em;
  }
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1em;
  color: #666;
  padding: 1em;

  &:first-child {
    margin-top: 15px;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
const CommentNickname = styled.p`
  color: #000000;
  font-weight: bold;
  cursor: pointer;
`;

const InformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 12px;
  font-style: normal;
`;
const InputCommonStyle = css`
  display: block;
  margin: 0;
  padding: 0;
  background: transparent;
  font-size: 12px;
`;

const SmallInput = styled.input`
  ${InputCommonStyle}
  width: 100%;
  height: 30px;
  border: 1px solid #0d47a1;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const LargeInput = styled.textarea`
  ${InputCommonStyle}
  padding: 10px;
  width: 100%;
  height: 100px;
  border: 1px solid #0d47a1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);

  @media (max-width: 1024px) {
    height: 200px;
  }
`;

const CommentButton = styled.button`
  ${InputCommonStyle}
  width: 300px;
  border: 1px solid #0d47a1;
  border-radius: 5px;
  background-color: #e3f2fd;
  &:after {
    clear: both;
    display: block;
    visibility: hidden;
    content: "";
  }
  @media (max-width: 1024px) {
    width: 100%;
    height: 50px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
  padding: 0;
  background-color: rgba(238, 238, 238, 0.1);
  color: #1e90ff;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.6em;
  background-color: rgba(238, 238, 238, 0.1);
  color: #1e90ff;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CommentForm = styled.form`
  display: block;
  padding: 12px;
  background: #fafafa;
  border-top: 2px solid #3f82e7;
  border-bottom: 2px solid #3f82e7;
  font-size: 12px;
`;

const PaginationButton = styled.button`
  margin-top: 15px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const CommentFormWrapper = styled.div`
  ${CommentForm}
  margin-top: 15px;
`;
const PostUpLike = styled.button`
  background: none;
  border: none;
  height: 60px;
  position: relative;

  &::before,
  &::after {
    content: "";
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.3s, opacity 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &::before {
    border: 2px solid #37474f;
    opacity: 0;
    transform: scale3d(1.2, 1.2, 1);
  }

  &::after {
    background: #fff;
  }

  &:hover {
    &::before {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    &::after {
      opacity: 0;
      transform: scale3d(0.8, 0.8, 1);
    }
  }

  ${(props) =>
    props.inverted &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #7986cb;
      }

      &::after {
        background: #7986cb;
      }

      &:hover {
        color: #7986cb;
      }
    `}

  ${(props) =>
    props.invertedAlt &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #3f51b5;
      }

      &::after {
        background: #3f51b5;
      }

      &:hover {
        color: #3f51b5;
      }
    `}
    ${(props) =>
    props.invertedAlt &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #3f51b5;
      }

      &::after {
        background: #3f51b5;
      }

      &:hover {
        color: #3f51b5;
      }
    `}
`;
const PostDownLike = styled.button`
  background: none;
  border: none;
  height: 60px;
  position: relative;

  &::before,
  &::after {
    content: "";
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.3s, opacity 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &::before {
    border: 2px solid #37474f;
    opacity: 0;
    transform: scale3d(1.2, 1.2, 1);
  }

  &::after {
    background: #fff;
  }

  &:hover {
    &::before {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    &::after {
      opacity: 0;
      transform: scale3d(0.8, 0.8, 1);
    }
  }

  ${(props) =>
    props.inverted &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #7986cb;
      }

      &::after {
        background: #7986cb;
      }

      &:hover {
        color: #7986cb;
      }
    `}

  ${(props) =>
    props.invertedAlt &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #3f51b5;
      }

      &::after {
        background: #3f51b5;
      }

      &:hover {
        color: #3f51b5;
      }
    `}
`;

const ButtonText = styled.span`
  padding-left: 0.35em;
`;
const CommentPageButton = styled.button`
  --flip-button-height: 40px;
  width: 50%;
  height: var(--flip-button-height);
  color: transparent;
  background: #018cff;
  border-radius: 0;
  perspective: 500px;
  transition: 0.3s;
  position: relative; // 추가

  &:hover {
    color: white;
    background: #018cff;
    .front {
      transform: rotateX(-90deg);
    }

    .back {
      transform: rotateX(0deg);
    }
  }

  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white; // 추가
    background: var(--btn-bg); // 추가
    transition: 0.3s;
    transform-origin: center center calc(var(--flip-button-height) / -2);
  }

  .back {
    transform: rotateX(88deg);
  }
`;

const Post = () => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({
    communityId: 7,
    categoryId: 2,
    categoryName: "사과",
    title: "제목1",
    nickName: "하루1",
    regDate: "",
    likeItCount: "",
    viewCount: "",
  });
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
  const navigate = useNavigate();

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
        nickName,
        password,
        id,
        newComment,
        null
      );
      setComments([...comments, response.data]);
      setNewComment(id, response.data.id, newComment, email);
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
  const like = async (isLikeIt) => {
    try {
      await CommunityAxiosApi.like(id, isLikeIt);
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
    <Main>
      <Container>
        <PostHeader>
          <WriterInfo>
            <TitleContainer>
              <PostTitle>{post.title}</PostTitle>
              <PostViews>조회수: {post.viewCount}</PostViews>
            </TitleContainer>
            <PostAuthor>
              <PostNickName>{post.nickName}</PostNickName>
              <PostDate> {Common.formatDate(post.regDate)}</PostDate>
            </PostAuthor>
          </WriterInfo>
        </PostHeader>
        <PostBody>
          <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostBody>
        <Post>
          <PostUpLike onClick={() => like(true)}>
            <ButtonText>좋아요</ButtonText>
          </PostUpLike>
          <PostTitle>{post.likeItCount}</PostTitle>
          <PostDownLike onClick={() => like(false)}>싫어요</PostDownLike>
        </Post>

        <CommentContainer>
          {comments
            .filter((comment) => comment.parentCommentId === null)
            .map((comment) => (
              <CommentBox key={comment.commentId}>
                <CommentContent>
                  <CommentNickname></CommentNickname>

                  <>{Common.formatDate(comment.regDate)}</>
                  <HeadText>{comment.content}</HeadText>
                </CommentContent>
              </CommentBox>
            ))}
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
          <CommentForm>
            <FormContainer>
              <LargeInput
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <CommentButton
                type="button"
                onClick={commentWrite}
                required={nickName && password}
              >
                댓글 작성
              </CommentButton>
            </FormContainer>
          </CommentForm>
        </CommentContainer>
      </Container>
    </Main>
  );
};

export default Post;
