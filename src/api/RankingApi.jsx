import axios from "axios";
import Common from "../utils/Common";
import AxiosInstance from "../utils/AxiosInstance";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const RankingApi = {
    getGenderData: async (email, gender) => {
        try {
          const params = {
            email: email,
            gender: gender,
          };
          const response = await axios.get(
            `${BACKEND_DOMAIN}/totalRanking/detail`,
            { params }
        );
        return response.data;
        } catch (error) {
          console.error("Error in getㅌMonthlyData API call", error);
          throw error;
        }
      },
    getListBySeason: async () => {
        try {
            const response = await axios.get(
                `${BACKEND_DOMAIN}/seasonRanking/detail`
            )
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    },

    getListByTotal: async () => {
        try {
            const response = await axios.get(
                `${BACKEND_DOMAIN}/totalRanking/detail`
            )
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error",error);
            throw error;
        }
    },
}

export default RankingApi;