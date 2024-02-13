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
  // 날짜클릭 이벤트 실행시 해당 날짜 정보를 받을 객체 리터럴 ㅎㅎ!
  selectedDate: "",
  // 선택한 날짜에 맞는 데이터들을 담을 객체 .. 참고하셈 ㅎㅎ!
  dateDetails: {},
  
  
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
    case "SET_SELECTED_DATE":
      if (state.selectedDate === action.payload) {
        return state;
      }
      return { ...state, selectedDate: action.payload };
    case "SET_DATE_DETAILS" :
      if (state.dateDetails === action.payload) {
        return state;
      }
      return { ...state, dateDetails: action.payload};
      case "SET_SEARCHED_FOOD_LIST" :
        if (state.searchedFoodList === action.payload) {
          return state;
        }
        return { ...state, searchedFoodList: action.payload};
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
    setSelectedDate: (selectedDate) => dispatch({ type: "SET_SELECTED_DATE", payload: selectedDate}),  
    setDateDetails: (dateDetails) => dispatch({ type: "SET_DATE_DETAILS", payload: dateDetails}),
    addMealAndUpdate: async (email, mealType, selectedDate, selectedItem) => {
      try {
        // POST 요청을 통해 식사 정보 추가
        await CalendarApi.addMeal(email, mealType, selectedDate, selectedItem);
        
        // 성공적으로 추가된 후, 해당 날짜에 대한 새로운 식사 정보를 다시 가져옴
        const updatedDateDetails = await CalendarApi.selectedDateMealInfo(email, selectedDate);
        
        // 상태 업데이트
        dispatch({ type: "SET_DATE_DETAILS", payload: updatedDateDetails });
      } catch (error) {
        console.error("Error adding meal and fetching updated info", error);
      }
    },
  };

  // 최초에 컨텍스트내 영역에 진입시 랜더링 되기 실행되는 email 정보 받아오기 함수
  useLayoutEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await Common.TakenToken();
        console.log(response.data);
        actions.setEmail(response.data);
      } catch (error) {
        console.log("실패 ㅠㅠ");
      }
    };
    fetchEmail();
  }, []);



    // 날짜를 'YYYY-MM-DD' 형식으로 변환하는 함수
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = `${d.getMonth() + 1}`.padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해주고, 두 자리수로 만듭니다.
      const day = `${d.getDate()}`.padStart(2, "0"); // 일도 두 자리수로 만듭니다.
      return `${year}-${month}-${day}`;
    };

  return (
    <CalendarContext.Provider value={{ state, actions, formatDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
