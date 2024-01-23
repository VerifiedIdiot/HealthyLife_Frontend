import { useNavigate } from "react-router";
import { Area, Container, Main, Section } from "../../styles/Layouts";
import logo from "../../assets/icons/logo.svg";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import { useState } from "react";
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
            $height="auto"
            $paddingTop="50px"
            $border="1px solid black"
            $direction="column"
            border="1px solid black"
          >
            <Area>
              <img src="" alt="프로필이미지" />
            </Area>
          </Section>
          <Section
            $height="auto"
            $paddingTop="50px"
            $direction="column"
            border="1px solid black"
          >
              <p>EMAIL (*)</p>
              <input
                type="text"
                placeholder="Email을 입력해주세요."
                style={{
                  borderBottom: "1px solid black",
                  border: "none",
                  padding: "15px 5px",
                outline: "none",
                }}
              />
            <p
                style={{
                  paddingTop: "20px",
                }}
              >
              PASSWORD (*)
            </p>
              <input
                type="text"
                placeholder="Password를 입력해주세요."
                style={{
                  borderBottom: "1px solid black",
                  border: "none",
                  padding: "15px 5px",
                outline: "none",
                }}
              />
            </Area>
          </Section>

        </Container>
      </Main>
    </>
  );
};
export default JoinComp;
