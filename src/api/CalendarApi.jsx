import axios from "axios";
// import Common from "../utils/Common";
// import AxiosInstance from "../utils/AxiosInstance";


const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;
const CalendarApi = {
  // 음식 조회
  getFoodList: async (params) => {
    try {
      const response = await axios.get(`${BACKEND_DOMAIN}/meal/view/search`, { params });
      return response.data;
    } catch (error) {
      console.error("Error in getFoodListBySearch API call", error);
      throw error;
    }
  },
  // 새로운 음식 데이터 추가
  addMeal: async (mealDto) => {
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/meal/add`, mealDto);
      return response.data;
    } catch (error) {
      console.error("Error in addMeal API call", error);
      throw error;
    }
  },

  // 식사기록 출력
  mealInfo: async (mealId, day) => {
    try {
      const response = await axios.get(`${BACKEND_DOMAIN}/detail/${mealId}`, day);
      return response.data;
    } catch (error) {
      console.error("데이터 가져오는 중 오류 발생", error);
    }
  },

  // 식사기록 삭제
  MealDelete: async (id) => {
    return await axios.delete(`${BACKEND_DOMAIN}/delete/${id}`);
  },
}

export default CalendarApi;