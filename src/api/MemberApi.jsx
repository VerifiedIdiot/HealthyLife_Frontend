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

  signup: async (
    email,
    password,
    name,
    nickName,
    gender,
    phone,
    addr,
    image,
    birth
  ) => {
    const data = {
      email: email,
      password: password,
      name: name,
      nickName: nickName,
      gender: gender,
      phone: phone,
      addr: addr,
      image: image,
      birth: birth,
    };
    return await axios.post(BACKEND_DOMAIN + "/auth/signup", data);
  },
};

export default MemberApi;
