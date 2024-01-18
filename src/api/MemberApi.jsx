import axios from "axios";
import Common from "../utill/Common";
import AxiosInstance from "../utils/AxiosInstance";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const MemberApi = {
  //로그인
  login: async (email, pw) => {
    const data = {
      Email: email,
      Password: pw,
    };
    return await axios.post(Common.HEALTH_HOST + "/auth/login", data);
  },
};
