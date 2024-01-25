import { useNavigate } from "react-router";
import { Area, Box, Container, Main, Section } from "../../styles/Layouts";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import { useState } from "react";
import { LabelComp } from "../joinPage/JoinStyle";
import { Input, InputButton } from "../joinPage/JoinInput";

const MypageEditComp = ({ userData }) => {
  const myPageNavigate = useNavigate();

  // 프로필 관련
  const [imgSrc, setImgSrc] = useState("");
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
  const [inputOriginPw, setInputOriginPw] = useState("");
  const [oringinBtn, setOriginBtn] = useState(false);
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  //오류 메세지
  const [pwMessage, setPwMessage] = useState("");
  const [pw2Message, setPw2Message] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  //유효성
  const [isOriginPw, setIsOriginPw] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPw2, setIsPw2] = useState(false);
  const [isNickName, setIsNickName] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isAddr, setIsAddr] = useState(true);

  // 모달
  const [isModalOpen, setIsModalOpen] = useState({
    Large: false,
    Middle: false,
    Small: false,
  });

  // 정규식
  const regexList = [
    //pw
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_#^*?])[A-Za-z\d@$!%_#^*?]{8,15}$/,
    //phone
    /^\d{3}-\d{4}-\d{4}$/,
  ];

  // 비밀번호 확인
  const onChangeOriginPw = (e) => {
    const currInput = e.target.value;
    setInputOriginPw(e.target.value);
    currInput.length > 0 ? setOriginBtn(true) : setOriginBtn(false);
  };

  const fetchIsOriginPw = async () => {
    const res = userData.password(inputOriginPw);
    console.log("비밀번호 확인 : " + res.data);
    if (res.data) {
      setIsOriginPw(true);
    } else {
      setIsOriginPw(false);
    }
  };

  // 새 비밀번호
  const onChangePw = (e) => {
    const currPw = e.target.value;
    setInputPw(currPw);
    if (!regexList[0].test(currPw)) {
      setPwMessage(
        "대소문자, 숫자, 특수기호 포함 8자 이상 15자 이하로 입력 하세요"
      );
      setIsPw(false);
      setIsPw2(false);
      setPw2Message("");
    } else {
      if (currPw === inputOriginPw) {
        setPwMessage("기존 비밀번호 입니다.");
        setIsPw(false);
        setIsPw2(false);
      } else {
        setPwMessage("사용 가능합니다");
        setIsPw(true);
      }
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
      setPw2Message("비밀번호가 일치합니다");
      setIsPw2(true);
    }
  };

  // 닉네임
  const onChangeNickName = (e) => {
    const currNickName = e.target.value;
    setInputNickName(currNickName);
    if (currNickName.length < 2 || currNickName.length > 8) {
      setNickNameMessage("2자 이상 8자 이하로 입력하세요");
      setIsNickName(false);
    } else {
      //   isUnique(1, currNickName);
    }
  };

  // 번호
  const onChangePhone = (e) => {
    const currPhone = e.target.value;
    setInputPhone(currPhone);
    const regex = regexList[1];
    if (!regex.test(currPhone)) {
      setPhoneMessage("잘못 입력 하셨습니다.");
      setIsPhone(false);
    } else {
      //   isUnique(2, currPhone);
    }
  };
  return (
    <>
      <Main $direction="column" $width="100%" $height="auto">
        <Container
          $width="100%"
          $direction="column"
          $height="auto"
          $align="center"
          $justify="center"
          $padding="80px 0"
        >
          <Section
            $width="100%"
            $height="auto"
            $direction="column"
            $align="center"
            $justify="center"
            $marginBottom="50px"
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
            $display="flex"
            $direction="column"
            $align="center"
            $justify="center"
            $width="100%"
            style={{
              maxWidth: "700px",
            }}
          >
            <Area $direction="column" $shadow="none" $marginBottom="20px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                Email
              </p>
              {userData ? (
                <Input value={userData.email} disabled={true} />
              ) : (
                <Input value="" disabled={false} />
              )}
            </Area>
            <Area $direction="column" $shadow="none" $marginBottom="20px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                Existing Password
              </p>
              <InputButton
                holder="기존 비밀번호 입력"
                value={inputOriginPw}
                type="password"
                changeEvt={onChangeOriginPw}
                btnChild="확인"
                active={oringinBtn}
                clickEvt={fetchIsOriginPw}
                msgType={isOriginPw}
              />
            </Area>
            <Area
              $shadow="none"
              $width="100%"
              $direction="row"
              $marginBottom="20px"
            >
              <Box $shadow="none" $width="100%" $direction="column">
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontWeight: "600",
                  }}
                >
                  New password
                </p>
                <Input
                  holder="새 비밀번호"
                  value={inputPw}
                  type="password"
                  msg={pwMessage}
                  msgType={isPw}
                  changeEvt={onChangePw}
                  disabled={!isOriginPw}
                />
              </Box>
              <Box $shadow="none" $direction="column">
                <p
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    fontWeight: "600",
                  }}
                >
                  Repeat New password
                </p>
                <Input
                  holder="비밀번호 다시 입력"
                  value={inputPw2}
                  type="password"
                  msg={pw2Message}
                  msgType={isPw2}
                  changeEvt={onChangePw2}
                  disabled={!isOriginPw}
                />
              </Box>
            </Area>
            <Area $direction="column" $shadow="none" $marginBottom="20px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                UserName
              </p>
              <Input
                holder="이름"
                value={userData ? userData.name : ""}
                disabled={true}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginBottom="20px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                NickName
              </p>
              <Input
                holder="닉네임"
                value={inputNickName}
                msg={nickNameMessage}
                msgType={isNickName}
                changeEvt={onChangeNickName}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginBottom="20px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                Phone
              </p>
              <Input
                holder="전화번호 '-' 포함 입력하세요"
                value={inputPhone}
                msg={phoneMessage}
                msgType={isPhone}
                changeEvt={onChangePhone}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginBottom="20px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                }}
              >
                Address
              </p>
              <Input
                holder="주소를 입력해주세요."
                // value={}
                // msg={phoneMessage}
                // msgType={isPhone}
                // changeEvt={onChangePhone}
              />
            </Area>

            <MiddleButton onClick={() => myPageNavigate("/mypage")}>
              수정하기
            </MiddleButton>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default MypageEditComp;
