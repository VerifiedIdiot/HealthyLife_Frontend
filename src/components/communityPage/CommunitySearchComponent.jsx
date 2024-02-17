import { ReactComponent as Text } from "../../assets/imgs/communityImges/write-svgrepo-com.svg";
import { ReactComponent as Image } from "../../assets/imgs/communityImges/image-svgrepo-com.svg";
import { ReactComponent as Video } from "../../assets/imgs/communityImges/video-camera-svgrepo-com.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Common from "../../utils/Common";
import CommunityAxiosApi from "../../api/CommunityAxios";
import styled from "styled-components";
import SearchComponent from "./SearchComponent";
import axios from "axios";
import { Main, Container } from "../../styles/Layouts";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const PostListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 80px;
`;
const TitleContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  align-items: center;

  p {
    color: #333;
    font-size: 0.8rem;
  }
`;
const PostList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const PostTable = styled.div`
  display: flex;
  padding: var(--, 1px) 0px 0.5px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
`;
const TableBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const TableRow = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  border-top: 2px solid #2446da;
  border-bottom: 2px solid #2446da;
  flex-direction: row;
  justify-content: space-between;
`;
const TableNormalRow = styled.div`
  width: 100%;
  height: 4em;
  border-bottom: 1px solid #dadada;
  border-left: 1px solid #dadada;
  border-right: 1px solid #dadada;
  opacity: 1;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
const TableRowData = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TableRowDataIcon = styled(TableRowData)`
  flex: 0.3;
`;
const TableRowDataWriter = styled(TableRowData)`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
// const TableRowDataCategory = styled(TableRowData)`
//   flex: 1;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
// `;
const TableRowDataTitle = styled(TableRowData)`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-image: url("../../assets/imgs/communityImges/empty-folder.png");
`;

const TableRowDataDate = styled(TableRowData)`
  flex: 0.5;
`;

const TableRowDataLikes = styled(TableRowData)`
  flex: 0.5;
`;
const TableRowDataViews = styled(TableRowData)`
  flex: 0.5;
`;
const PostPage = styled.div`
  display: flex;
  padding: 28.8px 206.23px 28.8px 206.2px;
  justify-content: center;
  align-items: center;
  gap: 9px;
  align-self: stretch;
  opacity: var(--, 1);
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 7.19px;
  opacity: var(--, 1);
`;
const PageContant = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  color: #2446da;
  font-size: 11.7px;
  font-style: normal;
  font-weight: 500;
  line-height: 17.55px;
  cursor: pointer;
`;
const MiddlePage = styled.div`
  display: flex;
  padding-right: 0.02px;
  justify-content: center;
  align-items: flex-start;
  gap: 10.79px;
  opacity: var(--, 1);
  flex-direction: row;
`;
const Page = styled.a`
  display: flex;
  padding-right: 0.52px;
  flex-direction: column;
  align-items: flex-start;
  color: ${(props) => (props.selected ? "#000" : "#C4C4C4")};
  font-family: Inter;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
`;
const CommunitySearchComponent = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalComments, setTotalComments] = useState([]);
  const location = useLocation();
  const result = location.state.result;
  const pageSize = 10;

  const checkMediaContent = (html) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, "text/html");
    const imgTag = parsedHtml.querySelector("img");
    const videoTag = parsedHtml.querySelector("video");
    const iframeTag = parsedHtml.querySelector("iframe");
    return {
      image: imgTag !== null,
      video: videoTag !== null || iframeTag !== null, // iframe 태그 추가
    }; // 이미지 태그와 동영상 태그가 각각 있으면 true, 없으면 false를 반환
  };
  useEffect(() => {
    const postPage = async () => {
      setTotalPages();
    };

    postPage();
  }, [currentPage, pageSize]);
  useEffect(() => {
    const postList = async () => {
      try {
        console.log(result.content);
        setPosts(result.content);
        setTotalPages(result.totalPages);
        // 전체 댓글 수 조회
        const totalCommentsResponses = await Promise.all(
          result.content.map((post) =>
            CommunityAxiosApi.getTotalComments(post.id)
          )
        );
        const totalComments = totalCommentsResponses.map(
          (response) => response.data
        );
        setTotalComments(totalComments);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error);
        }
      }
    };
    postList();
  }, [result, currentPage, pageSize, totalPages]);

  return (
    <>
      <Main $justify="center">
        <PostListTitle>
          <TitleContent>전체</TitleContent>
        </PostListTitle>
        <PostList>
          <PostTable>
            <TableBody>
              <TableRow>
                <TableRowDataIcon></TableRowDataIcon>
                <TableRowDataTitle>제목</TableRowDataTitle>
                <TableRowDataWriter>작성자</TableRowDataWriter>
                <TableRowDataDate>작성일</TableRowDataDate>
                <TableRowDataLikes>좋아요</TableRowDataLikes>
                <TableRowDataViews>조회수</TableRowDataViews>
              </TableRow>
              {posts.length > 0 ? (
                posts.map((post) => {
                  const hasMediaContent = checkMediaContent(post.content);
                  const writerInfo = post.email
                    ? post.nickName
                    : `${Common.truncateText(post.nickName, 10)}`;
                  return (
                    <TableNormalRow
                      key={post.communityId}
                      onClick={() => {
                        navigate(`/communitypage/detail/${post.communityId}`);
                      }}
                    >
                      <TableRowDataIcon>
                        {hasMediaContent.video ? (
                          <Video />
                        ) : hasMediaContent.img ? (
                          <Image />
                        ) : (
                          <Text />
                        )}
                      </TableRowDataIcon>
                      <TableRowDataTitle>
                        {Common.truncateText(post.title, 20)}{" "}
                        {totalComments[posts.indexOf(post)] > 0 &&
                          `(${totalComments[posts.indexOf(post)]})`}
                      </TableRowDataTitle>
                      <TableRowDataWriter>{writerInfo}</TableRowDataWriter>

                      <TableRowDataDate>
                        {Common.timeFromNow(post.regDate)}
                      </TableRowDataDate>
                      <TableRowDataLikes>{post.likeCount}</TableRowDataLikes>

                      <TableRowDataViews>{post.viewCount}</TableRowDataViews>
                    </TableNormalRow>
                  );
                })
              ) : (
                <TableNormalRow>
                  <TableRowDataTitle>검색된 결과가 없습니다</TableRowDataTitle>
                </TableNormalRow>
              )}
            </TableBody>
          </PostTable>
          <SearchComponent />
          <PostPage>
            <Pagination>
              <PageContant
                onClick={() =>
                  setCurrentPage(currentPage > 1 ? currentPage - 1 : 0)
                }
                disabled={currentPage === 0}
              >
                <IoIosArrowBack />
              </PageContant>
            </Pagination>
            {/* for 문처럼 페이지를 생성하기 위해 Array 인스턴스 생성, _이건 아무의미없는값이고 서서히 늘어나는 현식 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <MiddlePage
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum - 1)}
                  active={currentPage === pageNum ? "true" : "false"}
                >
                  <Page selected={currentPage === pageNum - 1}>{pageNum}</Page>
                </MiddlePage>
              )
            )}
            <Pagination>
              <PageContant
                onClick={() =>
                  setCurrentPage(
                    currentPage < totalPages - 1 ? currentPage + 1 : currentPage
                  )
                }
                disabled={currentPage === totalPages - 1}
              >
                <IoIosArrowForward />
              </PageContant>
            </Pagination>
          </PostPage>
        </PostList>
      </Main>
    </>
  );
};

export default CommunitySearchComponent;
