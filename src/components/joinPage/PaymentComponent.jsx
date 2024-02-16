import { useNavigate } from "react-router";
import { Area, Container, Main, Section } from "../../styles/Layouts";

import logo from "../../assets/icons/logo.svg";
import { useContext, useEffect } from "react";
import basicUser from "../../assets/imgs/basicUser.png";

import { LargeButton } from "../../styles/styledComponents/StyledComponents";
import { UserContext } from "../../contexts/UserStore";
import MemberApi from "../../api/MemberApi";
import { storage } from "../../api/firebase";
import styled from "styled-components";
import { media } from "../../utils/MediaQuery";

const ContainerStyle = styled(Container)`
  ${media.small`
  display: none;
`}
`;

const ContainerStyle2 = styled(Container)`
  ${media.small`
  width: 100%;
`}
`;

const PaymentComp = ({ profile }) => {
  const navigate = useNavigate();
  const loginGate = useNavigate();
  const paymentNavigate = useNavigate();

  // 카카오 아이디, 비밀번호
  const context = useContext(UserContext);
  const {
    inputEmail,
    inputPw,

    inputGender,
    inputName,
    inputAge,
    inputNickName,
    inputPhone,
    inputAddr,
    isKakao,
    imgSrc,
    file,
    setUrl,
    inputExercise,
  } = context;
  // 회원가입 /////////////////////////////////////////////////////
  const onSubmit = () => {
    if (imgSrc !== basicUser && imgSrc !== profile) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      console.log("Storage Ref:", storageRef);
      console.log("File Ref:", fileRef);
      fileRef.put(file).then(() => {
        console.log("저장성공!");
        fileRef.getDownloadURL().then((url) => {
          console.log("저장경로 확인 : " + url);
          setUrl(url);
          addNewMember(url);
        });
      });
    } else {
      if (imgSrc === profile) {
        addNewMember(profile);
      } else {
        addNewMember();
      }
    }
  };

  const addNewMember = async (url) => {
    try {
      const res = await MemberApi.signup(
        inputEmail,
        inputPw,
        inputName,
        inputNickName,
        inputGender,
        inputPhone,
        inputAddr,
        url,
        isKakao,
        inputAge,
        inputExercise
      );
      if (res.data !== null) {
        alert("결제 성공");
        console.log("회원가입 성공!");
        paymentNavigate("/login");
        // setModalOpen(true);
        // setModalHeader("회원가입");
        // setModalMsg("회원가입에 성공했습니다!");
        // setModalType("회원가입");
      }
    } catch (err) {
      console.log(url);
      console.log("회원가입 : " + err);
    }
  };

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp63263614");

    const data = {
      pg: "hetf",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: "100",
      name: "결제 테스트",
      buyer_name: "이재원",
      //   buyer_tel: "01012345678",
      //   buyer_email: "dlwodnjs2669@gmail.com",
      //   buyer_addr: "구천면로 000-00",
      //   buyer_postcode: "01234",
    };

    IMP.request_pay(data, callback);
  };
  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;

    if (success) {
      onSubmit();
    } else {
      alert(`결제 실패: ${error_msg}`);
      navigate("/");
    }
  };
  return (
    <>
      <Main $direction="row" $width="100%" $height="auto">
        <ContainerStyle
          $width="50%"
          $display="flex"
          $direction="column"
          $background="#F3F3F3"
          $height="auto"
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
        </ContainerStyle>
        <ContainerStyle2
          $width="50%"
          $padding="0 15px"
          $height="100vh"
          $align="center"
          $justify="center"
        >
          <Section
            $shadow="none"
            $align="center"
            $justify="center"
            $height="10%"
            // $border="1px solid black"
            $direction="column"
          >
            <p
              style={{
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              WELLV는 결제를 해야 이용이 가능합니다.
            </p>
            <LargeButton onClick={() => onClickPayment("결제하기, true")}>
              결제하기
            </LargeButton>
          </Section>
        </ContainerStyle2>
      </Main>
    </>
  );
};
export default PaymentComp;
