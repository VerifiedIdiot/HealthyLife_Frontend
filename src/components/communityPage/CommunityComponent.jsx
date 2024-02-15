import { ReactComponent as Text } from "../../assets/imgs/communityImges/write-svgrepo-com.svg";
import { ReactComponent as Image } from "../../assets/imgs/communityImges/image-svgrepo-com.svg";
import { ReactComponent as Video } from "../../assets/imgs/communityImges/video-camera-svgrepo-com.svg";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Common from "../../utils/Common";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import SearchComponent from "./SearchComponent";
import { ReactComponent as Down } from "../../assets/imgs/communityImges/Down.svg";
import emptyFolder from "../../assets/imgs/communityImges/empty-folder.png";
import { Main } from "../../styles/Layouts";

const PostSection = styled.div`
  width: 100%;
`;
const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const SendButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 5px 5px 5px 0;
`;
const PostListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-weight: bold;
`;
const TitleContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`;
const PostList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;
const PostTable = styled.div`
  display: flex;
  width: 100%;
  padding: var(--, 1px) 0px 0.5px 0px;
  height: 60vh;
  @media (max-width: 1024px) {
    height: 40vh;
  }
`;
const TableBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
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
const TableNormalRow = styled.div`
  width: 100%;
  height: 40px;
  opacity: 1;
  display: flex;
  flex-direction: row;
  &:nth-child(even) {
    background: rgba(36, 70, 218, 0.05);
  }
  & + & {
    border-top: 1px solid #dee2e6;
  }
  &:hover {
    color: #fff;
    background: rgba(36, 70, 218, 0.6);
    cursor: pointer;
  }
`;
const TableRowDataIcon = styled(TableRowData)`
  flex: 0.3;
`;
const TableRowDataWriter = styled(TableRowData)`
  flex: 0.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TableRowDataTitle = styled(TableRowData)`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TableRowDataDate = styled(TableRowData)`
  flex: 0.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TableRowDataLikes = styled(TableRowData)`
  flex: 0.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TableRowDataViews = styled(TableRowData)`
  flex: 0.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const PostPage = styled.div`
  display: flex;
  padding: 28.8px 206.23px 28.8px 206.2px;
  justify-content: center;
  align-items: center;
  gap: 9px;
  align-self: stretch;
  opacity: var(--, 1);
  cursor: pointer;
`;
const TableRow = styled.div`
  width: 100%;
  height: 38px;
  opacity: var(--, 1);
  display: flex;
  background-color: rgba(36, 70, 218, 0.6);
  color: #fff;
  flex-direction: row;
  justify-content: space-between;
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
  font-size: 1rem;
  color: #2446da;
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
  color: ${(props) => (props.selected ? "#333" : "#C4C4C4")};
  font-family: Inter;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
`;

const NotPost = styled.div`
  background-image: url(${emptyFolder});
  width: 100%;
  height: 300px;
  background-size: contain; /* 배경 이미지를 컨테이너에 맞게 조정합니다 */
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  background-position: center;
  filter: invert(35%) sepia(100%) saturate(10000%) hue-rotate(213deg); /* 이미지의 색상을 변경합니다. */
`;
const CategoryDropdown = styled.div`
  position: absolute;
  top: 36px;
  color: #333;
  width: 62px;
  font-size: 1rem;
  display: none;
  justify-content: center;
  border: 1px solid #2446da;
  background: #fff;
  z-index: 3;
  @media (max-width: 1024px) {
    display: ${(props) =>
      props.showDropdown ? "block" : "none"}; /* 항상 렌더링되도록 수정 */
  }
`;
const CategoryDropdownItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: #2446da;
  }
`;
const RotatedDown = styled(Down)`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;
const CommunityComponent = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [visiblePageStart, setVisiblePageStart] = useState(0);
  const categoryId = Number(useParams().categoryId) || undefined;
  const validCategoryId = isNaN(categoryId) ? undefined : categoryId;
  const [categoryName, setCategoryName] = useState("전체");
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const PAGE_SIZE = 10;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await CommunityAxiosApi.cateList(validCategoryId);
        setCategories(rsp.data);
        const selectedCategory = rsp.data.find(
          (cat) => cat.categoryId === categoryId
        );
        setCategoryName(
          selectedCategory ? selectedCategory.categoryName : "전체"
        );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [validCategoryId, categoryId]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const pageClick = (pageNum) => {
    console.log(pageNum);
    setCurrentPage(pageNum);
    if (pageNum >= visiblePageStart + PAGE_SIZE) {
      setVisiblePageStart(visiblePageStart + PAGE_SIZE);
    } else if (pageNum < visiblePageStart) {
      setVisiblePageStart(visiblePageStart - PAGE_SIZE);
    }
  };

  const firstClick = () => {
    setCurrentPage(0);
    setVisiblePageStart(0);
  };

  const lastClick = () => {
    const lastPage = Math.floor((totalPages - 1) / PAGE_SIZE) * PAGE_SIZE;
    setCurrentPage(totalPages - 1);
    setVisiblePageStart(lastPage);
  };

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
    // 서버에서 데이터를 가져오는 함수
    const postPage = async () => {
      try {
        // 카테고리 목록 가져오기
        const categoriesResponse = await CommunityAxiosApi.cateList();
        setCategories(categoriesResponse.data);

        // 페이지 수 가져오기
        const responsePages =
          categoryId === undefined
            ? await CommunityAxiosApi.getCommunityTotalPages(PAGE_SIZE)
            : await CommunityAxiosApi.getCommunityTotalPagesByCategory(
                categoryId,
                PAGE_SIZE
              );
        setTotalPages(responsePages.data);
        const rsp =
          categoryId === undefined
            ? await CommunityAxiosApi.getCommunityList(currentPage, PAGE_SIZE)
            : await CommunityAxiosApi.getCommunityListByCategory(
                categoryId,
                0,
                PAGE_SIZE
              );
        setPosts(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };

    postPage();
  }, [categoryId, currentPage, PAGE_SIZE]);

  useEffect(() => {
    //  컴포넌트가 언마운트된 후에 상태를 변경하려는 작업을 방지
    let cancelTokenSource = axios.CancelToken.source();
    const postList = async () => {
      try {
        const rsp =
          categoryId === undefined
            ? await CommunityAxiosApi.getCommunityList(currentPage, PAGE_SIZE, {
                cancelToken: cancelTokenSource.token,
              })
            : await CommunityAxiosApi.getCommunityListByCategory(
                categoryId,
                currentPage,
                PAGE_SIZE,
                { cancelToken: cancelTokenSource.token }
              );

        setPosts(rsp.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error);
        }
      }
    };
    postList();
    return () => {
      cancelTokenSource.cancel();
    };
  }, [categoryId, currentPage, PAGE_SIZE, totalPages]);
  return (
    <PostSection>
      <InputContainer>
        <PostListTitle>
          <TitleContent onClick={toggleDropdown}>
            {categoryName}
            <RotatedDown isRotated={showDropdown} />
            <CategoryDropdown showDropdown={showDropdown}>
              <CategoryDropdownItem
                onClick={() => {
                  navigate(`/communitypage`);
                }}
              >
                전체
              </CategoryDropdownItem>
              {categories.map((category) => (
                <CategoryDropdownItem
                  key={category.categoryId}
                  onClick={() => {
                    navigate(`/communitypage/${category.categoryId}`);
                  }}
                >
                  {category.categoryName}
                </CategoryDropdownItem>
              ))}
            </CategoryDropdown>
          </TitleContent>
        </PostListTitle>
      </InputContainer>

      <PostList>
        <PostTable>
          <TableBody>
            <TableRow>
              <TableRowDataIcon></TableRowDataIcon>
              <TableRowDataTitle>제목</TableRowDataTitle>
              <TableRowDataWriter>글쓴이</TableRowDataWriter>
              <TableRowDataDate>작성일</TableRowDataDate>
              <TableRowDataLikes>좋아요</TableRowDataLikes>
              <TableRowDataViews>조회수</TableRowDataViews>
            </TableRow>
            {posts.length === 0 ? (
              <NotPost></NotPost>
            ) : (
              posts.map((post) => {
                // memberId가 있는지 확인하고, 있다면 memberId를 사용하고 없다면 기존의 로직 수행
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
                      ) : hasMediaContent.image ? (
                        <Image />
                      ) : (
                        <Text />
                      )}
                    </TableRowDataIcon>
                    <TableRowDataTitle>{post.title}</TableRowDataTitle>
                    <TableRowDataWriter>{writerInfo}</TableRowDataWriter>
                    <TableRowDataDate>
                      {Common.timeFromNow(post.regDate)}
                    </TableRowDataDate>
                    <TableRowDataLikes>{post.likeCount}</TableRowDataLikes>
                    <TableRowDataViews>{post.viewCount}</TableRowDataViews>
                  </TableNormalRow>
                );
              })
            )}
          </TableBody>
        </PostTable>
        <SendButton>
          <MiddleButton
            onClick={() => {
              navigate(`/communitypage/write`);
            }}
          >
            글쓰기
          </MiddleButton>
        </SendButton>
        <SearchComponent />
        <PostPage>
          <Pagination>
            <PageContant onClick={firstClick} disabled={currentPage === 0}>
              <IoIosArrowBack />
            </PageContant>
          </Pagination>
          {/* for 문처럼 페이지를 생성하기 위해 Array 인스턴스 생성, _이건 아무의미없는값이고 서서히 늘어나는 현식 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(visiblePageStart, visiblePageStart + PAGE_SIZE)
            .map((pageNum) => (
              <MiddlePage key={pageNum} onClick={() => pageClick(pageNum - 1)}>
                <Page selected={currentPage === pageNum - 1}>{pageNum}</Page>
              </MiddlePage>
            ))}
          <Pagination>
            <PageContant
              onClick={lastClick}
              disabled={currentPage >= totalPages - 1}
            >
              <IoIosArrowForward />
            </PageContant>
          </Pagination>
        </PostPage>
      </PostList>
    </PostSection>
  );
};
export default CommunityComponent;
