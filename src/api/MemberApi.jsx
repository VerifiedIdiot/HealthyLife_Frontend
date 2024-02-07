import axios from "axios";
import Common from "../utils/Common";
import AxiosInstance from "../utils/AxiosInstance";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const MemberApi = {
  // 이메일 인증
  sendEmailCode: async (email) => {
    console.log("이메일 인증 : " + email);
    return await axios.get(Common.WEELV_DOMAIN + `/email/mail?id=${email}`);
  },

  // 중복체크
  checkUnique: async (type, data) => {
    console.log("중복체크 진입 : " + data);
    const dataMap = {
      type: type,
      data: data,
    };
    return await axios.post(Common.WEELV_DOMAIN + "/auth/isunique", dataMap);
  },

  // 회원가입
  signup: async (
    email,
    password,
    name,
    nickName,
    gender,
    phone,
    addr,
    image,
    isKakao
  ) => {
    console.log("회원가입 진입 : " + email);
    const data = {
      email: email,
      password: password,
      name: name,
      nickName: nickName,
      gender: gender,
      phone: phone,
      addr: addr,
      image: image,
      isKakao: isKakao,
    };
    return await axios.post(Common.WEELV_DOMAIN + "/auth/signup", data);
  },

  //로그인
  login: async (email, pw) => {
    console.log("로그인 진입 : " + email);
    const data = {
      email: email,
      password: pw,
    };
    return await axios.post(Common.WEELV_DOMAIN + "/auth/login", data);
  },

  // 카카오 로그인
  KakaoLogin: async (code) => {
    return await axios.get(Common.WEELV_DOMAIN + `/auth/kakao/${code}`);
  },

  // 인바디정보
  BodyRegister: async (height, weight, muscle, fatPercent, bmr, bmi) => {
    console.log("인바디 진입 : " + height);
    const data = {
      height: height,
      weight: weight,
      muscle: muscle,
      fatPercent: fatPercent,
      bmr: bmr,
      bmi: bmi,
    };
    return await axios.post(Common.WEELV_DOMAIN + "/Body/new", data);
  },

  // 회원 상세 조회
  getMemberDetail: async () => {
    return await AxiosInstance.get(Common.WEELV_DOMAIN + "/member/detail");
  },

  // 타 회원 정보 가져오기
  getMemberInfo: async (memberId) => {
    return await AxiosInstance.get(
      Common.WEELV_DOMAIN + `/member/detail/${memberId}`
    );
  },

  // 비밀번호 일치 체크
  checkPw: async (password) => {
    const data = {
      password: password,
    };
    console.log("잘 보내주고있니 ? " + password);
    return await AxiosInstance.post(
      Common.WEELV_DOMAIN + "/member/isPassword",
      data
    );
  },
};
export default MemberApi;
