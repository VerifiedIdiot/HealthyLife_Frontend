import axios from "axios";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const MemberApi = {
  // 이메일 인증
  sendEmailCode: async (email) => {
    return await axios.get(`${BACKEND_DOMAIN}/email/mail?id${email}`);
  },
  //로그인
  login: async (email, pw) => {
    const data = {
      Email: email,
      Password: pw,
    };
    return await axios.post(BACKEND_DOMAIN + "/auth/login", data);
  },
};

export default MemberApi;
