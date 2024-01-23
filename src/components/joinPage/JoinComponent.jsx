import { useNavigate } from "react-router";
import { Area, Container, Main, Section } from "../../styles/Layouts";
import logo from "../../assets/icons/logo.svg";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import { useState } from "react";
import { LabelComp } from "./JoinStyle";
const JoinComp = (email, profile) => {
  const navigate = useNavigate();

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
  return (
    <>
      <Main $direction="row" $width="100%">
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
          <Section $height="5%">
            <p
              style={{
                paddingRight: "5px",
              }}
            >
              Not a member yet?
            </p>
            <p>Register now</p>
          </Section>
        </Container>
        <Container
          $width="50%"
          $direction="column"
          $padding="0 15px"
          $height="auto"
        >
          <Section
            $height="25%"
            $paddingTop="25px"
            $direction="column"
            $align="center"
            $justify="center"
          >
            <Area
              $shadow="none"
              $position="relative"
              $width="25%"
              $paddingBottom="20%"
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
          <Section $height="auto" $paddingTop="20px" $direction="column">
            <Area $direction="column" $shadow="none">
              <p>EMAIL (*)</p>
              <input
                type="text"
                placeholder="Email을 입력해주세요."
                style={{
                  padding: "15px 10px",
                  border: "none",
                  borderBottom: "1px solid #000",
                }}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p>VERIFICATIOMN NUMBER (*)</p>
              <input
                type="text"
                placeholder="인증번호를 입력해주세요."
                style={{
                  padding: "15px 10px",
                  border: "none",
                  borderBottom: "1px solid #000",
                }}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p>PASSWORD (*)</p>
              <input
                type="text"
                placeholder="Password를 입력해주세요."
                style={{
                  padding: "15px 10px",
                  border: "none",
                  borderBottom: "1px solid #000",
                }}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p>USERNAME (*)</p>
              <input
                type="text"
                placeholder="Email을 입력해주세요."
                style={{
                  padding: "15px 10px",
                  border: "none",
                  borderBottom: "1px solid #000",
                }}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p>NICK NAME (*)</p>
              <input
                type="text"
                placeholder="Email을 입력해주세요."
                style={{
                  padding: "15px 10px",
                  border: "none",
                  borderBottom: "1px solid #000",
                }}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p>PHONE NUMBER (*)</p>
              <input
                type="text"
                placeholder="Email을 입력해주세요."
                style={{
                  padding: "15px 10px",
                  border: "none",
                  borderBottom: "1px solid #000",
                }}
              />
            </Area>
            <Area $direction="column" $shadow="none" $marginTop="10px">
              <p>ADDRESS (*)</p>
              <input
                type="text"
                placeholder="Email을 입력해주세요."
                style={{
                  padding: "15px 10px",
                  border: "none",
                  borderBottom: "1px solid #000",
                }}
              />
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
