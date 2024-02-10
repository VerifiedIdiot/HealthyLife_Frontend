import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "react";
import MedicineApi from "../api/MedicineApi";
import { useApiRequest } from "../hooks/useApiRequest";
import { useNavigate, useLocation } from "react-router-dom";

const SearchContext = createContext();

const initialState = {
  typeList: {},
  checkBoxStates: {},
  comboBoxId: "",
  openComboBoxes: {},
  searchType: "통합",
  originType: "",
  searchQuery: "",
  page: 1,
  size: 10,
  searchResults: [],
  totalCount: null,
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "SET_TYPE_LIST":
      return { ...state, typeList: action.payload };
    case "TOGGLE_COMBOBOX":
      return {
        ...state,
        openComboBox:
          state.openComboBox === action.payload ? null : action.payload,
      };
    case "SET_CHECKBOX_STATES":
      return {
        ...state,
        checkBoxStates: {
          ...state.checkBoxStates,
          [action.payload.comboBoxId]: {
            ...(state.checkBoxStates[action.payload.comboBoxId] || {}),
            [action.payload.checkBoxId]: action.payload.isChecked,
          },
        },
      };
    case "RESET_COMBOBOX":
      return {
        ...state,
        checkBoxStates: { ...state.checkBoxStates, [action.payload]: {} },
      };
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload };
    case "SET_ORIGIN_TYPE":
      return { ...state, originType: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SEARCH_TRUE":
      return { ...state, pressSearch: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SIZE":
      return { ...state, size: action.payload };
    case "SET_TOTAL_COUNT":
      return { ...state, totalCount: action.payload };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: listByTypeData } = useApiRequest(MedicineApi.getListByType); // API 요청을 위한 커스텀 훅 사용

  useLayoutEffect(() => {
    // API로부터 타입 리스트 데이터를 받아오면 상태를 업데이트합니다.
    if (listByTypeData) {
      dispatch({ type: "SET_TYPE_LIST", payload: listByTypeData });
    }
  }, [listByTypeData]);

  useLayoutEffect(() => {
    actions.fetchTotalCount();
  }, []);
  // 이전 검색 원복로직
  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 URL의 쿼리 스트링을 파싱하여 검색 조건 복원
    const searchParams = Object.fromEntries(
      new URLSearchParams(location.search)
    );
    // 여기서는 searchParams 객체를 직접 performSearch 함수에 전달합니다.
    // performSearch 함수 내에서 overrideParams를 처리하는 로직을 확인하세요.
    actions.performSearch(searchParams);
    console.log(searchParams);
  }, [location.search]);

  const actions = {
    // 검색 필터 영역
    toggleComboBox: (comboBoxId) =>
      dispatch({ type: "TOGGLE_COMBOBOX", payload: comboBoxId }),
    handleCheckboxChange: (comboBoxId, checkBoxId, isChecked) =>
      dispatch({
        type: "SET_CHECKBOX_STATES",
        payload: { comboBoxId, checkBoxId, isChecked },
      }),
    resetComboBox: (comboBoxId) =>
      dispatch({ type: "RESET_COMBOBOX", payload: comboBoxId }),
    setSearchType: (searchType) =>
      dispatch({ type: "SET_SEARCH_TYPE", payload: searchType }),
    setOriginType: (originType) =>
      dispatch({ type: "SET_ORIGIN_TYPE", payload: originType }),
    setSearchQuery: (query) =>
      dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    // 최초의 페이지 랜더링시 엘라스틱서치 서버의 총 문서수를 가져오는 액션
    fetchTotalCount: async () => {
      const totalCount = await MedicineApi.getTotalCount();
      dispatch({
        type: "SET_TOTAL_COUNT",
        payload: totalCount,
      });
      console.log(totalCount);
    },
    setSize: (size) => dispatch({ type: "SET_SIZE", payload: size }),
    setPage: (page) => dispatch({ type: "SET_PAGE", payload: page}),

    // 다수의 필터를 통해 "검색" 클릭시 실행되는 액션
    performSearch: async (overrideParams = {}) => {
      // 검색 파라미터가 함수 인자로 전달되었다면, 이를 사용합니다.
      // 전달되지 않았다면, 현재 상태(state)에서 파라미터를 구성합니다.
      const {
        searchQuery, // 사용자가 입력한 검색 쿼리
        checkBoxStates, // 체크박스의 상태를 나타내는 객체
        searchType, // 선택된 검색 유형 (예: "통합")
        originType, // 선택된 원산지 유형
        page, // 현재 페이지 번호
        size, // 페이지당 결과 수
      } = state;
    
      // 선택된 체크박스에 따라 검색 기능을 파라미터로 구성합니다.
      let functionalities = [null];
      Object.entries(checkBoxStates).forEach(([key, value]) => {
        Object.entries(value).forEach(([functionality, isChecked]) => {
          if (isChecked) { // 체크된 상태라면 functionalities 배열에 추가
            functionalities.push(functionality);
          }
        });
      });
    
      // functionalities 배열을 쉼표로 구분된 문자열로 변환합니다.
      const functionalitiesParam = functionalities.join(",");
    
      // 최종 검색 파라미터를 구성합니다.
      const params = {
        query: searchQuery,
        functionalities: functionalitiesParam,
        filter: searchType,
        originType: originType,
        page : page,
        size: size,
        ...overrideParams, // overrideParams에 값이 있으면, 해당 값을 사용하여 파라미터를 오버라이드합니다.
      };
    
      // 현재 URL의 쿼리 스트링에서 검색 조건을 업데이트하기 위해 사용합니다.
      const currentSearchParams = new URLSearchParams(location.search);
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          currentSearchParams.set(key, params[key]); // 새로운 검색 조건을 URL 쿼리 스트링에 설정합니다.
        }
      });
    
      // API를 호출하여 검색 결과를 가져옵니다.
      const response = await MedicineApi.getSearchResults(params);
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: response, // 검색 결과를 상태에 저장합니다.
      });
    
      // overrideParams에 'query'가 포함되어 있다면, 검색 쿼리 상태를 업데이트합니다.
      if (overrideParams.hasOwnProperty('query')) {
        dispatch({ type: "SET_SEARCH_QUERY", payload: overrideParams.query });
      }
    
      // URL 쿼리 스트링을 업데이트합니다. 이는 사용자가 페이지를 새로 고침하거나 URL을 공유할 때 검색 상태를 유지하기 위함입니다.
      if (Object.keys(overrideParams).length === 0) {
        const query = currentSearchParams.toString();
        navigate(`?${query}`); // 현재 검색 조건으로 URL을 업데이트합니다.
      }
    },
  };

  useEffect(() => {
    // 컴포넌트가 마운트되었거나 location.search가 변경될 때 실행됩니다.
    // URL의 쿼리 스트링을 파싱하여 검색 조건을 복원합니다.
    const searchParams = Object.fromEntries(new URLSearchParams(location.search));
    actions.performSearch(searchParams); // 복원된 검색 파라미터를 사용하여 검색을 수행합니다.
  }, [location.search]); // location.search가 변경될 때마다 이 효과를 재실행합니다.

  return (
    <SearchContext.Provider value={{ state, actions }}>
      
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
