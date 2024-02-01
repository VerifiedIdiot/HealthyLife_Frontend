import axios from "axios";


const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const MedicineApi = {
  getListByType: async () => {
    try {
      const reponse = await axios.get(
        `${BACKEND_DOMAIN}/api/medicines/get-codes`
      );
      // console.log(reponse.data)
      return reponse.data;
    } catch (error) {
      console.error("Error in getListByType API call", error);
      throw error;
    }
  },

  // // 건강기능식품 관련 api
  // getSortByColumn: async (params) => {
  //   try {
  //     const response = await axios.get(
  //       `${BACKEND_DOMAIN}/api/medicine/${params}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     // 오류 처리
  //     console.error("Error in getSortByColumn API call", error);
  //     throw error;
  //   }
  // },

  // getSortByOffSet: async (params) => {
  //   try {
  //     const response = await axios.get(
  //       `${BACKEND_DOMAIN}/api/medicine/${params}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     // 오류 처리
  //     console.error("Error in getSortByColumn API call", error);
  //     throw error;
  //   }
  // },
};

export default MedicineApi;
