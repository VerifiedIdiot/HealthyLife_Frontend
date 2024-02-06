import { ReactComponent as Down } from "../assets/imgs/communityImges/Down.svg";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Main } from "../styles/Layouts";
import CommunityAxiosApi from "../api/CommunityAxios";

import CommunityComponent from "../components/communityPage/CommunityComponent";
import CommunitySearchComponent from "../components/communityPage/CommunitySearchComponent";
import WriteComponent from "../components/communityPage/CommunityWriteComponent";
import CommunityDetailComponent from "../components/communityPage/CommunityDetailComponent";
// import { SmallButton } from "../styles/styledComponents/StyledComponents";

const Container = styled.div`
  display: flex;
  padding: 60px 170px;
  justify-content: center;
  align-items: center;
  gap: 60px;
  align-self: stretch;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex: 1;
`;

const CommunityList = styled.div`
  display: flex;
  height: 70vh;
  width: 100%;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0;
  }
`;
const Aside = styled.div`
  display: flex;
  width: 100%;
  max-width: 264px;
  padding-bottom: 49.83px;
  flex-direction: column;
  align-items: flex-end;
  gap: 14.39px;
  flex-shrink: 0;
  align-self: stretch;
  @media (max-width: 1024px) {
    max-width: 100%;
    padding-bottom: 0;
  }
`;

const CommunityMenuList = styled.div`
  flex-direction: row;
  @media (max-width: 1024px) {
    width: auto;
  }
`;
const CommunityMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
  }
`;
const CommunityLink = styled.div`
  display: flex;
  margin: 10px 10px 10px 0px;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;

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
const CommunityMenuText = styled.a`
  justify-content: center;
  font-size: 1.2rem;
  font-family: "noto sans";
  text-decoration: none;
  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;

const CommunityMenuButton = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px 10px 0px;
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
  width: 100%;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: row;
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
  const RotatedDown = styled(Down)`
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
      props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
  `;
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
      <Main>
        <Container>
          <CommunityList>
            <Aside>
              <CommunityMenuList>
                <CommunityMenuItem>
                  <Link to="/communitypage">
                    <CommunityLink>
                      <CommunitySVG>
                        <CommunityItem>
                          <CommunityMenuText>Community</CommunityMenuText>
                        </CommunityItem>
                      </CommunitySVG>
                    </CommunityLink>
                  </Link>
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
                  {isList && (
                    <CommunityItemList>
                      {categories.map((category) => (
                        <Link
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
                        </Link>
                      ))}
                    </CommunityItemList>
                  )}
                </CommunityMenuItem>
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
              <Route path="write" element={<WriteComponent />} />
            </Routes>
          </CommunityList>
        </Container>
      </Main>
    </>
  );
};
export default CommunityPage;
