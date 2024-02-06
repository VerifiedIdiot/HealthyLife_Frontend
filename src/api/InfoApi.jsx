import Common from "../utils/Common";
import AxiosInstance from "./AxiosInstance";
import axios from "axios";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const InfoApi = {
  // 음식 정보 삽입
  FoodInsert: async () => {
    return await axios.post(BACKEND_DOMAIN + "/api/food/insert");
  },

  FoodSearch: async (keyword, class1, class2, page, size) => {
    try {
      const response = await axios.get(
        BACKEND_DOMAIN + `/api/food/view/search`,
        {
          params: {
            keyword: keyword,
            class1: class1,
            class2: class2,
            page: page,
            size: size,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("음식 검색 중 오류 발생:", error);
      throw error;
    }
  },

  ExerciseInsert: async () => {
    return await axios.post(BACKEND_DOMAIN + "/api/exercise/insert");
  },

  ExerciseSearch: async (keyword, muscle, difficulty, page, size) => {
    try {
      const response = await axios.get(
        BACKEND_DOMAIN + `/api/exercise/view/search`,
        {
          params: {
            keyword: keyword,
            muscle: muscle,
            difficulty: difficulty,
            page: page,
            size: size,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("운동 검색 중 오류 발생:", error);
      throw error;
    }
  },
};
export default InfoApi;
