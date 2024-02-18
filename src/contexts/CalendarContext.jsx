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
  calendarId: 0,
  dateData: {
    meal: [],
    workout: []
  }, // 선택한 날짜에 맞는 데이터들을 담을 객체 .. 참고하셈 ㅎㅎ!
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
      case "SET_CALENDAR_ID":
        if (state.calendarId === action.payload) {
          return state;
        }
        return { ...state, calendarId: action.payload };
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
    setCalendarId: (calendarId) =>
      dispatch({ type: "SET_CALENDAR_ID", payload: calendarId }),
    setDateData: (setDateData) =>
      dispatch({ type: "SET_DATE_DATA", payload: setDateData }),
      // 애는 음식이나 운동을정보를 선택하고 추가할때 실행시킬 액션함수 내 위치할 내부 액션함수 , 그러니 단독사용 x
    updateData : async (email, selectedMonth) => {
      try {
        // 선택된 날짜에 대한 상세 정보 업데이트
        const updatedDateData = await CalendarApi.getDetailsByCalendarId(state.calendarId);
        dispatch({ type: "SET_DATE_DATA", payload: updatedDateData });
    
        // 해당 월의 데이터 업데이트
        const updatedMonthData = await CalendarApi.getMonthData(email, selectedMonth);
        dispatch({ type: "SET_MONTH_DATA", payload: updatedMonthData });
      } catch (error) {
        console.error("데이터 업데이트 중 오류 발생", error);
        // 필요한 경우 오류 처리 로직 추가
      }
    },

    addMealAndUpdate: async (email, mealType, selectedDate, selectedItem) => {
      try {
        // POST 요청을 통해 식사 정보 추가
        await CalendarApi.addMeal(email, mealType, selectedDate, selectedItem);
    
        // 성공적으로 추가된 후, updateData 액션을 호출하여 날짜 및 월 데이터 업데이트
        await actions.updateData(email, state.selectedMonth);
      } catch (error) {
        console.error("addMealAndUpdate 처리 중 오류 발생", error);
        // 오류 처리 로직 (필요한 경우)
      }
    },

    addWorkoutAndUpdate: async (email, selectedDate, selectedItem) => {
      try {
        await CalendarApi.addWorkout(email,selectedDate, selectedItem);
        await actions.updateData(email,  state.selectedMonth);
      } catch (error) {
        console.error("addMealAndUpdate 처리 중 오류 발생", error);
      }
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

  useEffect(() => {
    // monthData 또는 dateData 상태가 변경되었을 때 실행할 로직
    // 예: 데이터 로딩 인디케이터 숨기기, 추가적인 UI 업데이트 처리 등
  }, [state.monthData, state.dateData]);
  


  

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
