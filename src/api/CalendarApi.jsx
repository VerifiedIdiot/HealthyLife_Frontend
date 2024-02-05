import axios from "axios";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;
const CalendarApi = {
  // 음식 조회
  getFoodListBySearch: async (params) => {
    try {
      const response = await axios.get(
        `${BACKEND_DOMAIN}/meal/view/search`, { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error in getFoodListBySearch API call", error);
      throw error;
    }
  },
  // 새로운 음식 데이터를 추가하는 함수
  addMeal: async (mealDto) => {
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/meal/add`, mealDto);
      return response.data;
    } catch (error) {
      console.error("Error in addMeal API call", error);
      throw error;
    }
  },
}

export default CalendarApi;