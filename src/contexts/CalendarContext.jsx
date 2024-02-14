import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "react";

import { useLocation, useNavigate } from "react-router-dom";
import CalendarApi from "../api/CalendarApi";
import Common from "../utils/Common";

export const CalendarContext = createContext();

const initialState = {
  email: "",
  mealType: "",
  selectedMonth: "",
  monthData: [],
  selectedDate: "", // 날짜클릭 이벤트 실행시 해당 날짜 정보를 받을 객체 리터럴 ㅎㅎ!
  dateData: {}, // 선택한 날짜에 맞는 데이터들을 담을 객체 .. 참고하셈 ㅎㅎ!
};

const calendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_EMAIL":
      if (state.email === action.payload) {
        return state;
      }
      return { ...state, email: action.payload };
    case "SET_MEAL_TYPE":
      if (state.mealType === action.payload) {
        return state;
      }
      return { ...state, mealType: action.payload };
    case "SET_SELECTED_MONTH":
      if (state.selectedMonth === action.payload) {
        return state;
      }
      return { ...state, selectedMonth: action.payload };
    case "SET_MONTH_DATA":
      if (state.monthData === action.payload) {
        return state;
      }
      return { ...state, monthData: action.payload };
    case "SET_SELECTED_DATE":
      if (state.selectedDate === action.payload) {
        return state;
      }
      return { ...state, selectedDate: action.payload };
    case "SET_DATE_DATA":
      if (state.dateData === action.payload) {
        return state;
      }
      return { ...state, dateData: action.payload };
    case "SET_SEARCHED_FOOD_LIST":
      if (state.searchedFoodList === action.payload) {
        return state;
      }
      return { ...state, searchedFoodList: action.payload };
    default:
      return state;
  }
};

export const CalendarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  const actions = {
    setEmail: (email) => dispatch({ type: "SET_USER_EMAIL", payload: email }),
    setMealType: (mealType) =>
      dispatch({ type: "SET_MEAL_TYPE", payload: mealType }),
    setSelectedMonth: (selectedMonth) => 
    dispatch ({ type: "SET_SELECTED_MONTH", payload: selectedMonth}), 
    setMonthData: (monthData) =>
      dispatch({ type: "SET_MONTH_DATA", payload: monthData }),
    setSelectedDate: (selectedDate) =>
      dispatch({ type: "SET_SELECTED_DATE", payload: selectedDate }),
    setDateData: (setDateData) =>
      dispatch({ type: "SET_DATE_DATA", payload: setDateData }),
    addMealAndUpdate: async (email, mealType, selectedDate, selectedItem) => {
      // POST 요청을 통해 식사 정보 추가
      await CalendarApi.addMeal(email, mealType, selectedDate, selectedItem);

      // 성공적으로 추가된 후, 해당 날짜에 대한 새로운 식사 정보를 다시 가져옴
      const updatedDateDetails = await CalendarApi.selectedDateMealInfo(
        email,
        selectedDate
      );
      // 상태 업데이트
      dispatch({ type: "SET_DATE_DETAILS", payload: updatedDateDetails });
    },
  };

  // 최초에 컨텍스트내 영역에 진입시 랜더링 되기 실행되는 email 정보 받아오기 함수
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await Common.TakenToken();
        // console.log(response.data);
        actions.setEmail(response.data);
      } catch (error) {
        console.log("이메일 조회 실패 : " + error);
      }
    };
    fetchEmail();
  }, []);

  // 최초에 캘린더 페이지 혹은 , 다른 월을 선택했을때 해당유저의 월별 정보를 불러오는 layoutEffect 훅
  

  // 날짜를 'YYYYMMDD' 형식으로 변환하는 함수
  // 애는 달력에서 특정 날짜를 클릭했을때 , 상세 정보를 얻기 위해서 사용됨
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해주고, 두 자리수로 만듭니다.
    const day = `${d.getDate()}`.padStart(2, "0"); // 일도 두 자리수로 만듭니다.
    return `${year}${month}${day}`;
  };

  // 날짜를 'YYYYMMDD' 형식으로 변환하는 함수
  // 애는 페이지에 최초 진입시 혹은 , 달력에서 다른 month로 변경할때 실행됨
  const formatMonth = (value) => {
    const d = new Date(value);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해주고, 두 자리수로 만듭니다.
    return `${year}${month}`;
  };

  return (
    <CalendarContext.Provider
      value={{ state, actions, formatDate, formatMonth }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
