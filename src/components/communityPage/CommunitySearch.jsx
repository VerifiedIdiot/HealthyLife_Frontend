import { ReactComponent as Prev } from "../../assets/imgs/communityImges/Prev.svg";
import { ReactComponent as Next } from "../../assets/imgs/communityImges/Next.svg";
import { ReactComponent as Text } from "../../assets/imgs/communityImges/write-svgrepo-com.svg";
import { ReactComponent as Image } from "../../assets/imgs/communityImges/image-svgrepo-com.svg";
import { ReactComponent as Video } from "../../assets/imgs/communityImges/video-camera-svgrepo-com.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Common from "../../utils/Common";
import CommunityAxiosApi from "../../api/CommunityAxiosApi";
import Search from "./Search";
import styled from "styled-components";

const PostContainer = styled.div`
  display: flex;
  width: 1000px;
  padding: 0px 21.6px 0px 36px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;
const PostSection = styled.div`
  align-self: stretch;
`;
const PostListTitle = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #4942e4;
`;
const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  color: #333;

  font-family: Inter;
  font-size: 16.2px;
  font-style: normal;
  font-weight: 700;
  line-height: 24.3px;
  width: 100px;
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const PostList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
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
  border-top: 2px solid #e6e6e6;
  opacity: var(--, 1);
`;
const TableRow = styled.div`
  width: 100%;
  height: 38px;
  border-bottom: 1px solid #f5f5f5;
  opacity: var(--, 1);
  background: rgba(249, 53, 76, 0.04);
  display: flex;
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
`;
const TableRowData = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-align: center;
  overflow: hidden;
  font-family: Inter;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 400;
  line-height: 3em;
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
const TableRowDataCategory = styled(TableRowData)`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TableRowDataTitle = styled(TableRowData)`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-image: url("../../assets/imgs/communityImges/empty-folder.png");
`;

const TableRowDataDate = styled(TableRowData)`
  color: #999;
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
  color: #6ecb63;

  font-family: Inter;
  font-size: 11.7px;
  font-style: normal;
  font-weight: 500;
  line-height: 17.55px;
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
const CommunitySearch = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      categoryId: 1,
      categoryName: "과일",
      title: "제목",
      nickName: "하루",
      content: "하늘하늘",
      regDate: "",
      likeItCount: "",
      viewCount: "",
    },
  ]);
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
      img: imgTag !== null,
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
        console.log(result);

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
      } catch (error) {}
    };
    postList();
  }, [result, currentPage, pageSize, totalPages]);

  return (
    <>
      <PostContainer>
        <PostSection>
          <PostListTitle>
            <TitleContent>카테고리</TitleContent>
          </PostListTitle>
          <PostList>
            <PostTable>
              <TableBody>
                <TableRow>
                  <TableRowDataIcon></TableRowDataIcon>
                  <TableRowDataCategory>카테고리</TableRowDataCategory>
                  <TableRowDataTitle>제목</TableRowDataTitle>
                  <TableRowDataWriter>글쓴이</TableRowDataWriter>
                  <TableRowDataDate>작성일</TableRowDataDate>
                  <TableRowDataLikes>좋아요</TableRowDataLikes>
                  <TableRowDataViews>조회수</TableRowDataViews>
                </TableRow>
                {posts.length > 0 ? (
                  posts.map((post) => {
                    const hasMediaContent = checkMediaContent(post.content);
                    const writerInfo = post.email
                      ? post.email
                      : `${Common.truncateText(post.nickName, 10)}`;
                    return (
                      <TableNormalRow
                        key={post.id}
                        onClick={() => {
                          navigate(`/community/detail/${post.id}`);
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
                        <TableRowDataWriter>{writerInfo}</TableRowDataWriter>
                        <TableRowDataTitle>
                          {Common.truncateText(post.title, 20)}{" "}
                          {totalComments[posts.indexOf(post)] > 0 &&
                            `(${totalComments[posts.indexOf(post)]})`}
                        </TableRowDataTitle>
                        <TableRowDataDate>
                          {Common.timeFromNow(post.regDate)}
                        </TableRowDataDate>
                        <TableRowDataViews>{post.viewCount}</TableRowDataViews>
                      </TableNormalRow>
                    );
                  })
                ) : (
                  <TableNormalRow>
                    <TableRowDataTitle>
                      <p>검색결과가 없습니다.</p>
                    </TableRowDataTitle>
                  </TableNormalRow>
                )}
              </TableBody>
            </PostTable>
            <Search />
            <PostPage>
              <Pagination>
                <PageContant>
                  <Prev />
                </PageContant>
                <PageContant
                  onClick={() =>
                    setCurrentPage(currentPage > 1 ? currentPage - 1 : 0)
                  }
                  disabled={currentPage === 0}
                >
                  이전
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
                    <Page selected={currentPage === pageNum - 1} href="#">
                      {pageNum}
                    </Page>
                  </MiddlePage>
                )
              )}
              <Pagination>
                <PageContant
                  onClick={() =>
                    setCurrentPage(
                      currentPage < totalPages - 1
                        ? currentPage + 1
                        : currentPage
                    )
                  }
                  disabled={currentPage === totalPages - 1}
                >
                  다음
                </PageContant>
                <PageContant>
                  <Next />
                </PageContant>
              </Pagination>
            </PostPage>
          </PostList>
        </PostSection>
      </PostContainer>
    </>
  );
};

export default CommunitySearch;
