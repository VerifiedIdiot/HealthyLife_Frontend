import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserStore";

const LoginContainer = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus, loginStatus } = context;

  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const onChangePw = (e) => {
    setInputPw(e.target.value);
  };

  // 버튼 활성화
  const [isActive, setIsActive] = useState(false);

  // 팝업처리
  const [modalOpen, setModalopen] = useState(false);
  const closeModal = () => {
    setModalopen(false);
  };
  const [modalMsg, setModalMsg] = useState("");

  useEffect(() => {
    console.log("id" + inputEmail);
    console.log("pw" + inputPw);

    // 이메일 + 비밀번호 입력시 로그인 버튼 활성화
    if (inputEmail.length > 0 && inputPw.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });
  return <></>;
};
