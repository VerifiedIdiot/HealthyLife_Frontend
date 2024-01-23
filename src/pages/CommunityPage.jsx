import { ReactComponent as Star } from "../assets/imgs/communityImges/Star.svg";
import { ReactComponent as Down } from "../assets/imgs/communityImges/Down.svg";
import { ReactComponent as Menu } from "../assets/imgs/communityImges/Menu.svg";
import { ReactComponent as Talk } from "../assets/imgs/communityImges/Talk.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Main } from "../styles/Layouts";
import CommunityAxiosApi from "../api/CommunityAxiosApi";
import CommunitySearch from "../components/communityPage/CommunitySearch";
import CommunityWrite from "../components/communityPage/CommunityWrite";
import Community from "../components/communityPage/Community";
import Post from "../components/communityPage/PostRoom";
import { SmallButton } from "../styles/styledComponents/StyledComponents";
import { jwtDecode } from "jwt-decode";
import Common from "../utils/Common";

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
  align-items: flex-start;
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
  align-items: flex-start;
  @media (max-width: 1024px) {
    width: auto;
  }
`;
const CommunityMenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
  }
`;
const CommunityLink = styled.div`
  display: flex;
  padding: 15px 10px 15px 15px;
  align-items: center;
  justify-content: center;
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
  width: 300px;
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  line-height: 20px;
  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;

const CommunityMenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;

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
const CommunitySection = styled.div`
  display: flex;
  width: 1224px;
  max-width: 1224px;
  padding: 57.6px 183.99px 57.6px 0px;
  align-items: flex-start;
`;
const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

const MessageBox = styled.div`
  padding: 10px;
  margin: 10px 0;
  height: 10%;
  width: 50%;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  z-index: 1000;
  bottom: 0;
  left: 25%;
  animation: ${fadeInOut} 4s ease-in-out forwards;
`;

const SVGX = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;
const CommunityPage = () => {
  const [isList, setIsList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
  // const token = Common.getAccessToken();
  // const decode = token ? jwtDecode(token) : null;

  const ListOpen = () => {
    setIsList(!isList);
  };
  const RotatedDown = styled(Down)`
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
      props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
  `;
  useEffect(() => {
    const getCategories = async () => {
      // if (decode) {
      // setEmail(decode.sub);
      // }
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
                  <Link to="/community">
                    <CommunityLink>
                      <CommunitySVG>
                        <CommunityItem>
                          <CommunityMenuText>Community</CommunityMenuText>
                        </CommunityItem>
                      </CommunitySVG>
                    </CommunityLink>
                  </Link>
                  <CommunityLink>
                    <CommunityMenuButton>
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
                          to={`/community/${category.categoryId}`}
                          key={category.categoryId}
                        >
                          <CommunityLink key={category.categoryId}>
                            <CommunityItem>
                              <CommunityMenuText>
                                {category.categoryName}
                              </CommunityMenuText>
                              <Star />
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
              <Route path="/" element={<Community />} />
              <Route path="search/:searchTerm" element={<CommunitySearch />} />
              <Route path=":categoryId" element={<Community />} />
              <Route path="detail/:id" element={<Post />} />
              <Route path="write" element={<CommunityWrite />} />
            </Routes>
          </CommunityList>
        </Container>
      </Main>
    </>
  );
};
export default CommunityPage;
