import { useNavigate } from "react-router";
import { Area, Box, Container, Main, Section } from "../../styles/Layouts";
import logo from "../../assets/icons/logo.svg";
import { useEffect, useState } from "react";
import { LabelComp } from "./JoinStyle";
import { Input, InputButton } from "./JoinInput";
import MemberApi from "../../api/MemberApi";
import AgreeCheck from "./AgreeCheck";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
const JoinComp = (email, profile) => {
  const navigate = useNavigate();
  const loginGate = useNavigate();
  const bodyNavigate = useNavigate();

  // 프로필 관련
  const [imgSrc, setImgSrc] = useState(profile && profile ? profile : logo);
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  // 입력받은 이미지 파일 주소
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files?.[0];

    // 선택된 파일이 있으면
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgSrc(objectUrl);
      // 파이어베이스에 보내기위해 변수에 저장
      setFile(selectedFile);
    }
  };

  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  // 오류 메세지
  const [emailMessage, setEmailMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pw2Message, setPw2Message] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  // 유효성
  const [isEmail, setIsEmail] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPw2, setIsPw2] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddr, setIsAddr] = useState(false);

  // 정규식
  const regexList = [
    //email
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    //pw
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_#^*?])[A-Za-z\d@$!%_#^*?]{8,15}$/,
    //phone
    /^\d{3}-\d{4}-\d{4}$/,
  ];

  // 중복체크
  const isUnique = async (num, checkVal) => {
    const msgList = [setEmailMessage, setNickNameMessage, setPhoneMessage];
    const validList = [setIsEmail, setIsNickName, setIsPhone];
    try {
      // 빽부분
    } catch (err) {
      console.log("중복오류 : " + err);
    }
  };

  // 이메일
  const onChangeEmail = (e) => {
    const currEmail = e.target.value;
    console.log("currr" + currEmail);
    setInputEmail(currEmail);
    if (!regexList[0].test(currEmail)) {
      setEmailMessage("잘못된 형식입니다.");
      setIsEmail(false);
    } else {
      isUnique(0, currEmail);
    }
  };

  // 이메일 인증 번호 확인
  const [sendCode, setSendCode] = useState("");
  const onChangeEmailCode = (e) => {
    const currCode = Number(e.target.value);
    console.log("currr" + typeof currCode);
    console.log("sentCode: " + typeof sentCode);
    console.log("code : " + (currCode === sendCode));
    setInputCode(currCode);
  };

  // 이메일 인증
  const authorizeMail = async () => {
    try {
      const res = await MemberApi.sendEmailCode(inputEmail);
      console.log("이메일전송 결과 : " + res.data);
      if (res.data !== null) {
        setSendCode(res.data);
      }
    } catch (e) {
      console.log("이메일 err : " + e);
    }
  };
  const checkCode = () => {
    if (inputCode === sendCode) {
      setIsCode(true);
      setCodeMessage("인증이 완료되었습니다.");
    } else {
      setIsCode(false);
      setCodeMessage("인증번호를 확인해주세요.");
    }
  };

  // 비밀번호
  const onChangePw = (e) => {
    const currPw = e.target.value;
    setInputPw(currPw);
    if (!regexList[1].test(currPw)) {
      setPwMessage(
        "대소문자, 숫자, 특수기호 포함 8자 이상 15자 이하로 입력 하세요."
      );
      setIsPw(false);
      setIsPw2(false);
      setPw2Message("");
    } else {
      setPwMessage("사용 가능합니다.");
      setIsPw(true);
    }
  };

  // 비밀번호 재 입력
  const onChangePw2 = (e) => {
    const currPw2 = e.target.value;
    setInputPw2(currPw2);
    if (currPw2 !== inputPw) {
      setPw2Message("입력한 비밀번호와 일치 하지 않습니다.");
      setIsPw2(false);
    } else if (isPw && currPw2 === inputPw) {
      setPw2Message("비밀번호가 일치합니다.");
      setIsPw(true);
    }
  };

  // 이름
  const onChangeName = (e) => {
    const currName = e.target.value;
    setInputName(currName);
    if (currName.length < 2 || currName.length > 5) {
      setNameMessage("2자 이상 5자 이하로 입력하세요.");
      setIsName(false);
    } else {
      setNameMessage("사용 가능합니다.");
      setIsName(true);
    }
  };

  // 닉네임
  const onChangeNickName = (e) => {
    const currNickName = e.target.value;
    setInputNickName(currNickName);
    if (currNickName.length < 2 || currNickName.length > 8) {
      setNickNameMessage("2자 이상 8자 이하로 입력하세요.");
      setIsNickName(false);
    } else {
      isUnique(1, currNickName);
    }
  };

  // 핸드폰 번호
  const onChangePhone = (e) => {
    const currPhone = e.target.value;
    setInputPhone(currPhone);
    const regex = regexList[2];
    if (!regex.test(currPhone)) {
      setPhoneMessage("잘못 입력 하셨습니다.");
      setIsPhone(false);
    } else {
      isUnique(2, currPhone);
    }
  };

  // 약관 동의
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const onCheckedChange = (checkboxNumber) => {
    switch (checkboxNumber) {
      case 1:
        setChecked1(!checked1);
        break;
      case 2:
        setChecked2(!checked2);
        break;
      default:
        // 전체약관동의 체크박스를 선택하면 나머지 두 개의 체크박스도 선택/해제되도록 설정
        setCheckedAll(!checkedAll);
        setChecked1(!checkedAll);
        setChecked2(!checkedAll);
        break;
    }
  };
  useEffect(() => {
    if (checked1 && checked2) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked1, checked2]);

  return (
    <>
      <Main $direction="row" $width="100%" $height="auto">
        <Container
          $width="50%"
          $display="flex"
          $direction="column"
          $background="#F3F3F3"
          $height="100vh"
        >
          <Section
            $height="95%"
            $display="flex"
            $justify="center"
            $align="center"
          >
            <img
              src={logo}
              alt="로고이미지"
              onClick={() => navigate("/")}
              style={{
                cursor: "pointer",
              }}
            />
          </Section>
          <Section $height="5%" $shadow="none" $padding="0 10px">
            <Area $shadow="none" $width="22%">
              <p
                style={{
                  paddingRight: "5px",
                }}
              >
                Are you a member?
              </p>
            </Area>
            <Area $shadow="none" $height="50%">
              <p
                style={{
                  borderBottom: "2px solid black",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onClick={() => loginGate("/login")}
              >
                Log in now
              </p>
            </Area>
          </Section>
        </Container>
        <Container
          $width="50%"
          $direction="column"
          $padding="0 15px"
          $height="100vh"
        >
          <Section
            $height="auto"
            $paddingTop="25px"
            $direction="column"
            $align="center"
            $justify="center"
          >
            <Area
              $shadow="none"
              $position="relative"
              $width="25%"
              $paddingBottom="25%"
              $marginBottom="30px"
              $borderRadius="50%"
              $background="#F3F3F3"
              $overflow="hidden"
            >
              <img
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
                src={imgSrc}
                alt="프로필이미지"
              />
            </Area>
            <Area $align="center" $justify="center" $shadow="none">
              <LabelComp>
                <label>
                  <input
                    type="file"
                    onChange={(e) => handleFileInputChange(e)}
                  />
                  파일 선택
                </label>
              </LabelComp>
            </Area>
          </Section>
          <Section
            $height="auto"
            $paddingTop="15px"
            $direction="column"
            $width="100%"
          >
            <Area $direction="column" $shadow="none">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                EMAIL (*)
              </p>
              <InputButton
                holder="이메일을 입력해주세요."
                value={inputEmail}
                changeEvt={onChangeEmail}
                btnChild="확인"
                active={isEmail}
                clickEvt={authorizeMail}
                msg={emailMessage}
                msgType={isEmail}
              />
            </Area>
            <Area $direction="column" $shadow="none">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                VERIFICATIOMN NUMBER (*)
              </p>
              <InputButton
                holder="인증번호를 입력하세요"
                value={inputCode}
                changeEvt={onChangeEmailCode}
                btnChild="확인"
                active={isEmail}
                clickEvt={checkCode}
                msg={codeMessage}
                msgType={isCode}
              />
            </Area>
            <Area $shadow="none" $width="100%">
              <Box
                $shadow="none"
                $direction="column"
                $width="100%"
                $padding="10px"
              >
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontWeight: "600",
                  }}
                >
                  PASSWORD (*)
                </p>
                <Input
                  holder="패스워드를 입력해주세요."
                  value={inputPw}
                  type="password"
                  msg={pwMessage}
                  msgType={isPw}
                  changeEvt={onChangePw}
                />
              </Box>
              <Box $shadow="none" $direction="column">
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontWeight: "600",
                  }}
                >
                  REPEAT PASSWORD (*)
                </p>
                <Input
                  holder="패스워드를 다시 입력해주세요."
                  value={inputPw2}
                  type="password"
                  msg={pw2Message}
                  msgType={isPw2}
                  changeEvt={onChangePw2}
                />
              </Box>
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                USERNAME (*)
              </p>
              <Input
                holder="이름을 입력해주세요."
                value={inputName}
                msg={nameMessage}
                msgType={isName}
                changeEvt={onChangeName}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                NICK NAME (*)
              </p>
              <Input
                holder="닉네임을 입력해주세요."
                value={inputNickName}
                msg={nickNameMessage}
                msgType={isNickName}
                changeEvt={onChangeNickName}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                PHONE NUMBER (*)
              </p>
              <Input
                holder="전화번호 '-' 포함 입력하세요"
                value={inputPhone}
                msg={phoneMessage}
                msgType={isPhone}
                changeEvt={onChangePhone}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                ADDRESS (*)
              </p>
              <Input
                holder="주소를 입력해주세요."
                // value={}
                // msg={phoneMessage}
                // msgType={isPhone}
                // changeEvt={onChangePhone}
              />
            </Area>

            <Area $direction="column" $shadow="none" $marginTop="10px">
              <AgreeCheck
                className="all"
                agreeAll={true}
                children="전체 약관동의"
                checked={checkedAll}
                onCheckedChange={() => onCheckedChange()}
              />
              <AgreeCheck
                children="[필수] 서비스 이용약관 동의"
                checked={checked1}
                onCheckedChange={() => onCheckedChange(1)}
                modalType="use"
              />
              <AgreeCheck
                children="[필수] 개인정보 수집 및 이용 동의"
                checked={checked2}
                onCheckedChange={() => onCheckedChange(2)}
                modalType="privacy"
              />
            </Area>
            <Area $display="flex" $justify="center" $shadow="none">
              <MiddleButton onClick={() => bodyNavigate("/join/bodyInfo")}>
                다음
              </MiddleButton>
            </Area>
          </Section>
          {/* <Section
              $display="flex"
              $direction="column"
              $marginTop="50px"
              $align="center"
              $height="auto"
            >
              <LargeButton>로그인</LargeButton>
            </Section>
            <Section
              $display="flex"
              $direction="column"
              $align="center"
              $marginTop="20px"
            >
              <LargeButton>카카오 로그인</LargeButton>
            </Section> */}
        </Container>
      </Main>
    </>
  );
};
export default JoinComp;