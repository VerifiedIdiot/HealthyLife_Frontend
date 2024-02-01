import axios from "axios";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const CalendarApi = {
  // 음식 조회
  getFoodListBySearch: async (params) => {
    try {
      const response = await axios.get(
        console.log("zzzz")
        `${BACKEND_DOMAIN}/meal/search`, { params }
        
      );
      return response.data;
    } catch (error) {
      console.error("Error in getFoodListBySearch API call", error);
      throw error;
    }
  },
}

export default CalendarApi;