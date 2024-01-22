import axios from "axios";


const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const MedicineApi = {
    // 건강기능식품 관련 api
    getSortByColumn: async () => {
        try {
            const response = await axios.get(`${BACKEND_DOMAIN}/api/getSortByColumn`);
            return response.data;
        } catch (error) {
            // 오류 처리
            console.error("Error in getSortByColumn API call", error);
            throw error; 
        }
    }

}

export default MedicineApi;