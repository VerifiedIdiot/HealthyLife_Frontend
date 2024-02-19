import Common from "../utils/Common";
import AxiosInstance from "./AxiosInstance";
import axios from "axios";
const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const BodyApi = {
  LoadBody: async () => {
    try {
      const res = await Common.TakenToken();
      const email = res.data;
      const response = await axios.get(
        `${BACKEND_DOMAIN}/Body/list/email?email=${email}`
      );
      return response.data;
    } catch (error) {
      // 오류 처리
      console.error("Error while loading body data:", error);
      throw error;
    }
  },

  InsertBody: async (
    bmi,
    bmr,
    date,
    fat,
    fatPercent,
    height,
    muscle,
    weight,
    dci
  ) => {
    const res = await Common.TakenToken();
    const email = res.data;
    const userBody = {
      bmi: bmi,
      bmr: bmr,
      date: date,
      fat: fat,
      fatPercent: fatPercent,
      height: height,
      memberEmail: email,
      muscle: muscle,
      weight: weight,
      DCI: dci,
    };
    return await axios.post(BACKEND_DOMAIN + "/Body/new", userBody);
  },

  LifeGet: async (Bmi, Year) => {
    const inputData = {
      BMI: Bmi, // 설정
      Year: Year, //태어난년도
    };
    // Content-Type 설정 추가
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await AxiosInstance.post(
      BACKEND_DOMAIN + "/ml/life",
      inputData,
      config
    );
  },
};
export default BodyApi;
