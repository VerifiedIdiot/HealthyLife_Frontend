import { ReactComponent as Down } from "../assets/imgs/communityImges/Down.svg";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Main, Container } from "../styles/Layouts";
import CommunityAxiosApi from "../api/CommunityAxios";
import CommunityComponent from "../components/communityPage/CommunityComponent";
import CommunitySearchComponent from "../components/communityPage/CommunitySearchComponent";
import WriteComponent from "../components/communityPage/CommunityWriteComponent";
import CommunityDetailComponent from "../components/communityPage/CommunityDetailComponent";
// import { SmallButton } from "../styles/styledComponents/StyledComponents";

const CommunityList = styled.div`
  display: flex;
  padding: 0 10px 0 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
const Aside = styled.div`
  display: flex;
  width: 100%;
  max-width: 264px;
  padding-bottom: 49.83px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  @media (max-width: 1024px) {
    max-width: 100%;
    padding-bottom: 0;
    align-items: center;
    justify-content: center;
  }
`;
// 카테고리 전체
const CommunityMenuList = styled.div`
  flex-direction: row;
  margin-top: 10px;
  @media (max-width: 1024px) {
  }
`;
//카테고리 이름만
const CommunityMenuItem = styled.div`
  background-color: #f3f3f3;

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    display: none;
  }
`;
// //카테고리 리스트
const CommunityLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px;
    margin: 5px;
    opacity: 1;
    display: none;
  }
`;
const CommunitySVG = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const CommunityMenuText = styled.div`
  justify-content: center;
  font-size: 1.2rem;
  text-decoration: none;
  margin: 10px 10px 10px 0px; // 칸넓이

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;

const CommunityMenuButton = styled.div`
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isActive ? "#2446da" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#333")};

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
// 사이드 목차
const CommunityItem = styled.div`
  display: flex;
  margin-left: 10px;
  gap: 10px;
  width: 200px;
  align-items: flex-start;
  align-self: stretch;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
const CommunityItemList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #2446da;

  @media (max-width: 1024px) {
    flex-direction: row;
    display: none;
  }
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;

  &:hover,
  &:focus {
    color: #2446da;
  }
`;
const RotatedDown = styled(Down)`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
  display: block;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const CommunityPage = () => {
  const [isList, setIsList] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [categories, setCategories] = useState([]);

  const ListOpen = () => {
    setIsList(!isList);
  };
  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await CommunityAxiosApi.cateList();
        console.log(rsp.data);
        setCategories(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);
  return (
    <>
      <Main $justify="center" $align="center">
        <Container>
          <CommunityList>
            <Aside>
              <CommunityMenuList>
                <StyledLink to="/communitypage/*">
                  <CommunityLink>
                    <CommunitySVG>
                      <CommunityItem>
                        <CommunityMenuText>Community</CommunityMenuText>
                      </CommunityItem>
                    </CommunitySVG>
                  </CommunityLink>
                </StyledLink>
                <CommunityMenuItem>
                  <CommunityLink>
                    <CommunityMenuButton
                      isActive={isActive}
                      onClick={handleClick}
                    >
                      <CommunityItem onClick={ListOpen}>
                        <CommunityMenuText>Category</CommunityMenuText>
                      </CommunityItem>
                      <RotatedDown isRotated={isList}></RotatedDown>
                    </CommunityMenuButton>
                  </CommunityLink>
                </CommunityMenuItem>
                {isList && (
                  <CommunityItemList>
                    {categories.map((category) => (
                      <StyledLink
                        to={`/communitypage/${category.categoryId}`}
                        key={category.categoryId}
                      >
                        <CommunityLink key={category.categoryId}>
                          <CommunityItem>
                            <CommunityMenuText>
                              {category.categoryName}
                            </CommunityMenuText>
                          </CommunityItem>
                        </CommunityLink>
                      </StyledLink>
                    ))}
                  </CommunityItemList>
                )}
              </CommunityMenuList>
            </Aside>
            <Routes>
              <Route path="/" element={<CommunityComponent />} />
              <Route
                path="search/:searchTerm"
                element={<CommunitySearchComponent />}
              />
              <Route path=":categoryId" element={<CommunityComponent />} />
              <Route path="detail/:id" element={<CommunityDetailComponent />} />
              <Route path="write/:id" element={<WriteComponent />} />
            </Routes>
          </CommunityList>
        </Container>
      </Main>
    </>
  );
};
export default CommunityPage;
