import axios from "axios";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const CalendarApi = {
  // 음식 조회
  getFoodListByCategory: async () => {
    try {
      return await axios.get(
        BACKEND_DOMAIN + `/api/food/list/page`
      );
    } catch (error) {
      console.error("Error in getFoodListByCategory API call", error);
      throw error;
    }
  },
}

export default CalendarApi;