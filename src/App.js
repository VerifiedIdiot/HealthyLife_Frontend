import React from "react";
import useTrackUserVisit from "./hooks/useTrackUserVisit";
import { SearchProvider } from "./contexts/SearchContext";
import useMobileView from "./hooks/useMobileView";
import GlobalStyle, { Wrapper } from "./styles/GlobalStyle";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  HeaderFooter,
  HeaderOnly,
  FooterOnly,
  DynamicHeaderFooter,
  DynamicHeaderOnly,
} from "./styles/headerFooter/HeaderFooter";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/LoginPage";
import InbodyPage from "./pages/InBodyPage";
import CalendarPage from "./pages/CalendarPage";
import CommunityPage from "./pages/CommunityPage";
import RankingPage from "./pages/RankingPage";
import JoinPage from "./pages/JoinPage";
import Kakao from "./pages/Kakao";
import ChattingPage from "./pages/ChattingPage";
import MedicinePage from "./pages/MedicinePage";
import TestPage from "./pages/TestPage";
import BodyInfoComp from "./components/joinPage/BodyInfoComponent";
import PaymentPage from "./pages/PaymentPage";
import MyPage from "./pages/MyPage";
import InformationPage from "./pages/InformationPage";
import MyPageEdit from "./pages/MyPageEdit";
import WriteComponent from "./components/communityPage/CommunityWriteComponent";
import UserStore from "./contexts/UserStore";
import AdminPage from "./pages/AdminPage";
import AdminChartPage from "./pages/adminPage/AdminChart";
import AdminMemberPage from "./pages/adminPage/Adminmemberpage";
import AdminCommunity from "./pages/adminPage/AdminCommunityPage";

function App() {
  // 방문자 추적 커스텀 훅
  useTrackUserVisit();
  // 모바일뷰 여부에 따라 페이지가 등장할지 말지 결정하는 커스텀 훅
  const isMobileView = useMobileView();

  return (
    <>
      <UserStore>
        <GlobalStyle />
        <Wrapper>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/join/bodyInfo" element={<BodyInfoComp />} />
              <Route path="/join/payment" element={<PaymentPage />} />
              <Route path="/auth" element={<Kakao />} />
              <Route path="/test" element={<ChattingPage />} />
              <Route element={<AdminPage />}>
                <Route path="/ad" element={<AdminChartPage />} />
                <Route path="/ad/member" element={<AdminMemberPage />} />
                <Route path="/ad/community" element={<AdminCommunity />} />
              </Route>
              {/*다이나믹한 헤더와 푸터가 포함된 라우트 그룹 */}
              <Route element={<DynamicHeaderFooter />}></Route>
              {/*일반 헤더푸터만 포함된 라우트 그룹 */}
              <Route element={<HeaderFooter />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/medicine" element={<MedicinePage />} />
                <Route path="/inbody" element={<InbodyPage />} />
                <Route path="/information" element={<InformationPage />} />

                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/edit" element={<MyPageEdit />} />

                <Route path="/communitypage/*" element={<CommunityPage />} />

                <Route
                  path="/communitypage/write"
                  element={<WriteComponent />}
                />
                <Route path="/ranking" element={<RankingPage />} />
              </Route>

              <Route element={<HeaderOnly />}>
                <Route path="/calendar" element={<CalendarPage />} />
              </Route>

              {/* 사용자가 잘못된 URL을 입력했을 때 홈으로 리다이렉션 */}
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

              <Route path="/test2" element={<TestPage />} />
            </Routes>
          </Router>
        </Wrapper>
      </UserStore>
    </>
  );
}

export default App;
