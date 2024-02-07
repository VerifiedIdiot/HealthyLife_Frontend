import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "react";
import MedicineApi from "../api/MedicineApi";
import { useApiRequest } from "../hooks/useApiRequest";
import axios from "axios";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const SearchContext = createContext();

const initialState = {
  typeList: {},
  checkBoxStates: {},
  comboBoxId: "",
  openComboBoxes: {},
  searchType: "통합",
  originType: "",
  searchQuery: "",
  page: null,
  size: null,
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
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, size: action.payload };
    case "SET_TOTAL_COUNT":
      return { ...state, totalCount: action.payload };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload.results,
        // totalCount: action.payload.totalCount,
      };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const {
    data: listByTypeData,
    loading,
    error,
  } = useApiRequest(MedicineApi.getListByType); // API 요청을 위한 커스텀 훅 사용

  useLayoutEffect(() => {
    // API로부터 타입 리스트 데이터를 받아오면 상태를 업데이트합니다.
    if (listByTypeData) {
      dispatch({ type: "SET_TYPE_LIST", payload: listByTypeData });
    }
  }, [listByTypeData]);

  useLayoutEffect(() => {
    actions.fetchTotalCount();
    // console.log(state.totalCount);
  }, []);

  useEffect(() => {
    // 상태가 변경되었을 때 performSearch 실행
    actions.performSearch();
  }, [state.size, state.page]);

  const actions = {
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
    setPageSize: (size) => dispatch({ type: "SET_PAGE_SIZE", payload: size }),
    setPage: (page) => dispatch({ type: "SET_PAGE", payload: page }),
    fetchTotalCount: async () => {
      try {
        const response = await axios.get(`${BACKEND_DOMAIN}/api/filter/total-count`);
        dispatch({
          type: "SET_TOTAL_COUNT",
          payload: response.data,
        });
        console.log(response.data);
      } catch (error) {
        console.error("전체 문서 수 조회 실패:", error);
      }
    },
    performSearch: async () => {
      const {
        searchQuery,
        size,
        checkBoxStates,
        searchType,
        originType,
        page,
      } = state; // 이 부분에서 state를 직접 사용합니다.

      let functionalities = [null];
      Object.entries(checkBoxStates).forEach(([key, value]) => {
        Object.entries(value).forEach(([functionality, isChecked]) => {
          if (isChecked) {
            functionalities.push(functionality);
          }
        });
      });
      // 배열을 콤마로 구분된 문자열로 변환
      const functionalitiesParam = functionalities.join(",");

      const params = {
        query: searchQuery,
        functionalities: functionalitiesParam,
        filter: searchType,
        originType: originType,
        page: page,
        size: size,
      };

      try {
        console.log(params);

        const response = await axios.get(
          `${BACKEND_DOMAIN}/api/filter/search`,
          { params }
        );
        console.log(response.data); // API 응답 확인
        dispatch({
          type: "SET_SEARCH_RESULTS",
          payload: { results: response.data, totalCount: response.data.length },
        });
      } catch (error) {
        console.error("검색 실패:", error);
      }
    },
  };

  return (
    <SearchContext.Provider value={{ state, actions }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
