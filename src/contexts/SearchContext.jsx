// SearchContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import MedicineApi from "../api/MedicineApi";
// Context 생성
const SearchContext = createContext();

// 초기 상태 정의
const initialState = {
  typeList: {}, // API에서 로드한 타입 리스트
  checkBoxStates: {}, // 체크박스의 선택 상태
  comboBoxId: "",
  openComboBoxes: {}, // 콤보박스의 열림/닫힘 상태
  searchQuery: "", // 사용자의 검색 쿼리
  pageSize: 10, // 검색 결과의 페이지 크기
  searchResults: [], // 검색 결과 저장
  totalCount: 0,
};

// Reducer 함수 정의
const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_TYPE_LIST":
      return { ...state, typeList: action.payload };
    case "TOGGLE_COMBOBOX":
      const isAlreadyOpen = state.openComboBox === action.payload;
      return {
        ...state,
        openComboBox: isAlreadyOpen ? null : action.payload, // 이미 열려있으면 닫고, 아니면 열기
      };
    case "SET_CHECKBOX_STATES":
      const { comboBoxId, checkBoxId, isChecked } = action.payload;
      return {
        ...state,
        checkBoxStates: {
          ...state.checkBoxStates,
          [comboBoxId]: {
            ...state.checkBoxStates[comboBoxId],
            [checkBoxId]: isChecked,
          },
        },
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "PERFORM_SEARCH":
      const results = performSearchLogic(
        state.checkBoxStates,
        state.searchQuery,
        state.pageSize
      );
      return { ...state, searchResults: results };
    default:
      return state;
  }
}

// SearchProvider 컴포넌트
export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const {
    data: listByTypeData,
    loading,
    error,
  } = useApiRequest(MedicineApi.getListByType);
  
  useEffect(() => {
    if (listByTypeData) {
      dispatch({ type: "SET_TYPE_LIST", payload: listByTypeData });
      console.log(listByTypeData);
    }
  }, [listByTypeData]);

  const contextValue = {
    state,
    actions: {
      toggleComboBox: (comboBoxId) => dispatch({ type: "TOGGLE_COMBOBOX", payload: comboBoxId }),
      handleCheckboxChange: (comboBoxId, checkBoxId, isChecked) =>
      dispatch({ type: "SET_CHECKBOX_STATES", payload: { comboBoxId, checkBoxId, isChecked } }),
      setSearchQuery: (query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
      performSearch: () => dispatch({ type: "PERFORM_SEARCH" }),
    },
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  // 바로 구조 분해 할당하여 반환
  const { state, dispatch, actions } = context;
  return { state, dispatch, actions };
};

const performSearchLogic = (checkBoxStates, searchQuery, pageSize) => {

};
