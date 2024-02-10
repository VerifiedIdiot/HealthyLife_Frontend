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
  savedQuery: [],
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
    case "SET_SEARCH_TRUE" :
      return { ...state, pressSearch: action.payload};
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, size: action.payload };
    case "SET_TOTAL_COUNT":
      return { ...state, totalCount: action.payload };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload
      };
    case "SET_SAVED_QUERY" :
      return {
        ...state,
        savedQuery: action.payload
      }
      case "SET_SEARCH_EXECUTED":
      return {
        ...state,
        searchExecuted: action.payload,
      };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: listByTypeData,
  } = useApiRequest(MedicineApi.getListByType); // API 요청을 위한 커스텀 훅 사용

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
    const searchParams = Object.fromEntries(new URLSearchParams(location.search));
    // 여기서는 searchParams 객체를 직접 performSearch 함수에 전달합니다.
    // performSearch 함수 내에서 overrideParams를 처리하는 로직을 확인하세요.
    actions.performSearch(searchParams);
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
    setSavedQuery: (savedQuery) =>
      dispatch({ type: "SET_SAVED_QUERY", payload: savedQuery}),
      // 실제 검색 실행을 통제하는 액션
      setSearchExecuted: (searchExecuted) => 
    dispatch({ type: "SET_SEARCH_EXECUTED", payload:  searchExecuted }),
    

    // 최초의 페이지 랜더링시 엘라스틱서치 서버의 총 문서수를 가져오는 액션
    fetchTotalCount: async ()  => {
      const totalCount = await MedicineApi.getTotalCount();
      dispatch({
        type: "SET_TOTAL_COUNT",
        payload: totalCount,
      });
      console.log(totalCount);
    },


    // 다수의 필터를 통해 "검색" 클릭시 실행되는 액션
    performSearch: async (overrideParams = {}) => {
      // 검색 파라미터가 함수 인자로 전달되었다면, 이를 사용하고, 그렇지 않으면 state에서 파라미터를 구성
      const { searchQuery, checkBoxStates, searchType, originType, page } = state;
      let functionalities = [null];
      Object.entries(checkBoxStates).forEach(([key, value]) => {
        Object.entries(value).forEach(([functionality, isChecked]) => {
          if (isChecked) {
            functionalities.push(functionality);
          }
        });
      });

      const functionalitiesParam = functionalities.join(",");
      const params = {
        query: searchQuery,
        functionalities: functionalitiesParam,
        filter: searchType,
        originType: originType,
        page,
        ...overrideParams, // URL에서 복원된 파라미터가 있다면 이를 우선적으로 사용
      };

      const response = await MedicineApi.getSearchResults(params);
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: response,
      });

      // URL 쿼리 스트링 업데이트. 첫 로딩 또는 URL에서 복원될 때는 실행하지 않음.
      if (Object.keys(overrideParams).length === 0) {
        const query = new URLSearchParams(params).toString();
        navigate(`?${query}`); // 현재 검색 조건을 URL 쿼리 스트링으로 반영
      }
    },
  };

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 URL의 쿼리 스트링을 파싱하여 검색 조건 복원
    const searchParams = Object.fromEntries(new URLSearchParams(location.search));
    actions.performSearch(searchParams); // URL에서 복원된 검색 파라미터를 사용하여 검색 수행
  }, [location.search]); // location.search가 변경될 때마다 이 효과를 재실행


  return (
    <SearchContext.Provider value={{ state, actions }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
