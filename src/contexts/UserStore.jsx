import { createContext, useEffect, useState } from "react";
import basicUser from "../assets/imgs/basicUser.png";

export const UserContext = createContext(null);
const UserStore = (props, profile) => {
  // 로그인 여부
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );
  const [kakaoId, setKakaoId] = useState("");
  const [kakaoPw, setKakaoPw] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [isKakao, setIsKakao] = useState(false);
  const [inputAddr, setInputAddr] = useState("");
  const [inputExercise, setInputExercise] = useState("");

  // 프로필 관련
  const [imgSrc, setImgSrc] = useState(
    profile && profile ? profile : basicUser
  );
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        kakaoId,
        setKakaoId,
        kakaoPw,
        setKakaoPw,
        inputEmail,
        setInputEmail,
        inputCode,
        setInputCode,
        inputPw,
        setInputPw,
        inputPw2,
        setInputPw2,
        inputGender,
        setInputGender,
        inputName,
        setInputName,
        inputAge,
        setInputAge,
        inputNickName,
        setInputNickName,
        inputPhone,
        setInputPhone,
        inputAddr,
        setInputAddr,
        isKakao,
        setIsKakao,
        imgSrc,
        setImgSrc,
        file,
        setFile,
        url,
        setUrl,
        inputExercise,
        setInputExercise,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
