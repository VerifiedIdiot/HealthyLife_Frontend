// React 및 필요한 훅과 API 호출 훅, 스타일 및 컴포넌트를 임포트합니다.
import { useState, useEffect, useCallback } from "react";
import { SearchProvider } from "../contexts/SearchContext";
import { useApiRequest } from "../hooks/useApiRequest";
import MedicineApi from "../api/MedicineApi";
import { Main, Container } from "../styles/Layouts";
import {
  SearchSection,
  BoardSection,
  PaginationSection,
} from "../components/medicinePage/MedicineComponent";

const MedicinePage = () => {

  return (
    <SearchProvider>
    <Main $height="auto">
      <Container $height="auto">
        <SearchSection/>
        <BoardSection />
        <PaginationSection />
      </Container>
    </Main>
    </SearchProvider>
  );
};

export default MedicinePage;
