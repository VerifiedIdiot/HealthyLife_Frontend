import axios from "axios";
import Common from "../utils/Common";
import AxiosInstance from "../utils/AxiosInstance";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const RankingApi = {
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
    }
}

export default RankingApi;