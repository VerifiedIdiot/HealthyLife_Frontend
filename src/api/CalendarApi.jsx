import axios from "axios";
import Common from "../utils/Common";
import AxiosInstance from "../utils/AxiosInstance";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;
const CalendarApi = {
  // 음식 조회
  getFoodList: async (params) => {
    try {
      const response = await axios.get(
        `${Common.WEELV_DOMAIN}/meal/view/search`,
        { params }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error in getFoodListBySearch API call", error);
      throw error;
    }
  },
  // 새로운 음식 데이터 추가
  addMeal : async (email, mealType, selectedDate, selectedItem) => {
    console.log(mealType, selectedItem, email, selectedDate);
    // 모든 필드 값이 유효한지 확인
    if (!email || !mealType || !selectedDate || !selectedItem) {
      console.error("파라미터의 값이 비었음");
      throw new Error("널 금지");
    }
  
    try {
      const mealDto = {
        email : email, 
        meal_type: mealType,
        meal_name: selectedItem, 
        reg_date: selectedDate,
      };
      const response = await axios.post(`${Common.WEELV_DOMAIN}/meal/add`, mealDto);
      console.log("Meal successfully added", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in addMeal API call", error);
      throw error;
    }
  },



  
  // 날짜별 식사기록 출력
  selectedDateMealInfo: async (email, selectedDate) => {
    try {
      const response = await axios.get(`${BACKEND_DOMAIN}/meal/detail`, {
        params: { 
        email : email, 
        regDate : selectedDate }
      });
      return response.data;
    } catch (error) {
      console.error("데이터 가져오는 중 오류 발생", error);
      return null; // 오류 시 null 반환 또는 적절한 에러 처리
    }
  },

  // 식사기록 삭제
  MealDelete: async (id) => {
    return await axios.delete(`${BACKEND_DOMAIN}/delete/${id}`);
  },
};

export default CalendarApi;
