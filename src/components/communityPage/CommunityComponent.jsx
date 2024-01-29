import { ReactComponent as Text } from "../../assets/imgs/communityImges/write-svgrepo-com.svg";
import { ReactComponent as Image } from "../../assets/imgs/communityImges/image-svgrepo-com.svg";
import { ReactComponent as Video } from "../../assets/imgs/communityImges/video-camera-svgrepo-com.svg";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Common from "../../utils/Common";
import CommunityAxiosApi from "../../api/CommunityAxios";
import { SmallButton } from "../../styles/styledComponents/StyledComponents";
import { Main, Container } from "../../styles/Layouts";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import SearchComponent from "./SearchComponent";
import { ReactComponent as Down } from "../../assets/imgs/communityImges/Down.svg";

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
  createDummyPost(
    2,
    2,
    "포도",
    "포도의 다양한 종류와 특징",
    "포도에는 레드 와인과 화이트 와인을 만드는 다양한 종류가 있으며, 각각의 특징이 있습니다.",
    "와인연구가",
    "admin@admin.com",
    "2024-01-27",
    42,
    85
  ),
  createDummyPost(
    3,
    1,
    "사과",
    "사과의 다양한 요리 아이디어",
    "사과를 활용한 다양한 요리 아이디어를 소개합니다. 사과를 활용한 디저트부터 메인 요리까지 다양한 아이디어를 찾아보세요!",
    "요리하는 사람",
    "admin@admin.com",
    "2024-01-27",
    28,
    63
  ),
  // 나머지 데이터도 유사한 방식으로 추가
];

const PostSection = styled.div`
  align-self: stretch;
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
`;
const TitleContent = styled.div`
  display: flex;
  color: #2446da;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
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
  border-bottom: 1px solid #2446da;
  width: 100%;
  height: 40px;
  opacity: 1;
  display: flex;
  flex-direction: row;
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
`;
const TableRow = styled.div`
  width: 100%;
  height: 38px;
  opacity: var(--, 1);
  display: flex;
  border-top: 2px solid #2446da;
  border-bottom: 2px solid #2446da;
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
  color: ${(props) => (props.selected ? "#000" : "#C4C4C4")};
  font-family: Inter;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
`;
const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  color: #333;
`;
const Dropdown = styled.select`
  width: 100px;
  height: 30px;
  margin: 10px;
  padding: 5px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #2446da;
  }
`;

const CommunityComponent = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(dummyPosts);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [visiblePageStart, setVisiblePageStart] = useState(0);
  const categoryId = Number(useParams().categoryId);
  const validCategoryId = isNaN(categoryId) ? undefined : categoryId;
  const [sortType, setSortType] = useState(0);
  const [categories, setCategories] = useState([
    {
      categoryId: 1,
      categoryName: "사과",
      email: "admin@admin.com",
    },
    {
      categoryId: 2,
      categoryName: "포도",
      email: "admin@admin.com",
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const PAGE_SIZE = 10;
  // CategoryDropdown의 클릭 이벤트를 처리하여 드롭다운 상태를 토글하는 함수
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const RotatedDown = styled(Down)`
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
      props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
  `;
  const CategoryDropdown = styled.div`
    display: ${(props) =>
      props.showDropdown ? "block" : "none"}; /* 항상 렌더링되도록 수정 */
  `;

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

  // 미디어영역을 확인하는 함수
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
    setPosts(dummyPosts);
  }, []);
  useEffect(() => {
    // 서버에서 데이터를 가져오는 함수
    const postPage = async () => {
      try {
        // 카테고리 목록 가져오기
        const categoriesResponse = await CommunityAxiosApi.cateList();
        setCategories(categoriesResponse.data);

        // 페이지 수 가져오기
        const responsePages =
          validCategoryId === undefined
            ? await CommunityAxiosApi.getCommunityTotalPages(PAGE_SIZE)
            : await CommunityAxiosApi.getCommunityTotalPagesByCategory(
                validCategoryId,
                PAGE_SIZE,
                sortType
              );
        setTotalPages(responsePages.data);
      } catch (error) {
        console.log(error);
      }
    };

    postPage();
  }, [validCategoryId, currentPage, PAGE_SIZE, sortType]);
  useEffect(() => {
    //  컴포넌트가 언마운트된 후에 상태를 변경하려는 작업을 방지
    let cancelTokenSource = axios.CancelToken.source();
    const postList = async () => {
      try {
        const rsp =
          validCategoryId === undefined
            ? await CommunityAxiosApi.getCommunityList(currentPage, PAGE_SIZE, {
                cancelToken: cancelTokenSource.token,
              })
            : await CommunityAxiosApi.getCommunityListByCategory(
                validCategoryId,
                currentPage,
                PAGE_SIZE,
                sortType,
                { cancelToken: cancelTokenSource.token }
              );

        setPosts(rsp.data);
        console.log(rsp.data);
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
  }, [validCategoryId, currentPage, PAGE_SIZE, totalPages, sortType]);

  const handleCategoryClick = async (categoryId) => {
    setCurrentCategory(categoryId); // 선택한 카테고리를 상태에 반영
    setShowDropdown(false); // 드롭다운 숨기기
    try {
      let response;
      if (categoryId === "전체") {
        response = await CommunityAxiosApi.getCommunityList(
          currentPage,
          PAGE_SIZE
        );
      } else {
        const selectedCategory = categories.find(
          (category) => category.categoryName === categoryId
        ); // 선택된 카테고리의 정보 가져오기
        if (selectedCategory) {
          response = await CommunityAxiosApi.getCommunityListByCategory(
            selectedCategory.categoryId, // 선택된 카테고리의 ID를 사용하여 목록 불러오기
            currentPage,
            PAGE_SIZE,
            sortType
          );
        }
      }
      if (response) {
        setPosts(response.data); // 선택된 카테고리에 해당하는 포스트 목록을 상태에 설정
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Main>
      <Container>
        <PostSection>
          <InputContainer>
            <PostListTitle>
              <TitleContent onClick={toggleDropdown}>
                {currentCategory ? currentCategory : "전체"}
                <RotatedDown isRotated={showDropdown} />
                <CategoryDropdown showDropdown={showDropdown}>
                  <div onClick={() => handleCategoryClick("전체")}>전체</div>
                  {categories.map((category) => (
                    <div
                      key={category.categoryId}
                      onClick={() => handleCategoryClick(category.categoryName)}
                    >
                      {category.categoryName}
                    </div>
                  ))}
                </CategoryDropdown>
              </TitleContent>

              <CommentHeader>
                <Dropdown
                  onChange={(selected) => setSortType(selected.target.value)}
                >
                  {["최신순", "등록순", "답글순"].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Dropdown>
              </CommentHeader>
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
                {posts.map((post) => {
                  // memberId가 있는지 확인하고, 있다면 memberId를 사용하고 없다면 기존의 로직 수행
                  const hasMediaContent = checkMediaContent(post.content);
                  const writerInfo = post.email
                    ? post.nickName
                    : `${Common.truncateText(post.nickName, 10)}`;
                  return (
                    <TableNormalRow
                      key={post.id}
                      onClick={() => {
                        navigate(`/communitypage/detail/${post.id}`);
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
                      <TableRowDataLikes>{post.likeItCount}</TableRowDataLikes>
                      <TableRowDataViews>{post.viewCount}</TableRowDataViews>
                    </TableNormalRow>
                  );
                })}
              </TableBody>
            </PostTable>
            <SendButton>
              <SmallButton
                onClick={() => {
                  navigate(`/communitypage/write`);
                }}
              >
                글쓰기
              </SmallButton>
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
                  <MiddlePage
                    key={pageNum}
                    onClick={() => pageClick(pageNum - 1)}
                    active={currentPage === pageNum - 1}
                  >
                    <Page selected={currentPage === pageNum - 1}>
                      {pageNum}
                    </Page>
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
      </Container>
    </Main>
  );
};
export default CommunityComponent;
