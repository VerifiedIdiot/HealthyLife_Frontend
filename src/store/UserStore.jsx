import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null);
const UserStore = (props) => {
  // 로그인 여부
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
