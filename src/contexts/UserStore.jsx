import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);
const UserStore = (props) => {
  // 로그인 여부
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );
  const [kakaoId, setKakaoId] = useState("");
  const [kakaoPw, setKakaoPw] = useState("");

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
