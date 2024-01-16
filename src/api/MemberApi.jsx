import axios from "axios";
import Common from "../utill/Common";
import AxiosInstance from "../utils/AxiosInstance";

const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN;

const AxiosApi = {
  //로그인
  Login: async (email, pw) => {
    const login = {
      memberEmail: email,
      memberPassword: pw,
    };
    return await axios.post(BACKEND_DOMAIN + "/auth/login", login);
  },

  // 카카오 로그인
  KakaoLogin: async (code) => {
    return await axios.get(BACKEND_DOMAIN + `/auth/kakao/${code}`);
  },

  //회원가입
  // 회원가입시 아이디 체크
  SingupIdCheck: async (email) => {
    return await axios.get(BACKEND_DOMAIN + `/auth/exists/${email}`);
  },

  // 회원가입 insert
  Signup: async (email, pw, tel, name, addr, birth, gender) => {
    const userInfo = {
      memberEmail: email,
      memberPassword: pw,
      memberTel: tel,
      memberName: name,
      memberAddress: addr,
      memberBirth: birth,
      memberGender: gender,
    };
    return await axios.post(BACKEND_DOMAIN + `/auth/signup`, userInfo);
  },

  //회원 조회
  memberGet: async () => {
    const res = await Common.TakenToken();
    const email = res.data;

    return await AxiosInstance.get(BACKEND_DOMAIN + `/member/detail/${email}`);
  },

  // 유형(type)에 따라 memberUpdate 호출 및 수정
  memberUpdate: async (changeInfo, type) => {
    const res = await Common.TakenToken();
    const email = res.data;
    let member = {};
    switch (type) {
      case 1:
        member = {
          memberEmail: email,
          memberBirth: changeInfo,
        };
        console.log(member);
        break;
      case 2:
        member = {
          memberEmail: email,
          memberAddress: changeInfo,
        };
        break;
      case 3:
        member = {
          memberEmail: email,
          memberTel: changeInfo,
        };
        break;
      case 4:
        member = {
          memberEmail: email,
          memberImage: changeInfo,
        };
        break;
      case 5:
        member = {
          memberEmail: email,
          memberGrade: changeInfo,
        };
        console.log(member);
        break;
      default:
        break;
    }
    return await AxiosInstance.put(BACKEND_DOMAIN + `/member/modify`, member);
  },
  // 아이디 찾기
  findMemberId: async (name, tel) => {
    return await axios.get(BACKEND_DOMAIN + `/auth/findId?name=${name}&tel=${tel}`);
  },

  // 비밀번호 변경
    changePwd: async (email, newPwd) => {
      return await axios.post(BACKEND_DOMAIN + `/auth/change/${email}/${newPwd}`);
    },

  // 회원 탈퇴
  memberDelete: async () => {
    const res = await Common.TakenToken();
    const email = res.data;
    return await AxiosInstance.delete(BACKEND_DOMAIN + `/member/delete/${email}`);
  },

}