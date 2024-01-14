import React from "react";
import useTrackUserVisit from "./hooks/TrackUserVisit";
import useMobileView from "./hooks/useMobileView";
import GlobalStyle from "./styles/GlobalStyle";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  HeaderFooterLayout,
  HeaderOnlyLayout,
  FooterOnlyLayout,
} from "./styles/headerFooter/HeaderFooter";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogIn";
import InbodyPage from "./pages/InBodyPage";
import CalendarPage from "./pages/CalendarPage";
import CommunityPage from "./pages/CommunityPage";
import RankingPage from "./pages/RankingPage";

function App() {
  // 방문자 추적 커스텀 훅
  useTrackUserVisit();
  // 모바일뷰 여부에 따라 페이지가 등장할지 말지 결정하는 커스텀 훅
  const isMobileView = useMobileView();

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LogInPage />} />

          {/* 헤더와 푸터가 포함된 라우트 그룹 */}
          <Route element={<HeaderFooterLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          {/* 헤더만 포함된 라우트 그룹 */}
          <Route element={<HeaderOnlyLayout />}>
          <Route path="/inbody" element={<InbodyPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          </Route>
          {/* 사용자가 잘못된 URL을 입력했을 때 홈으로 리다이렉션 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
