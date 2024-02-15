import { useNavigate } from "react-router";
import { Area, Container, Main, Section } from "../../styles/Layouts";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import styled from "styled-components";
import { media } from "../../utils/MediaQuery";

const MainStyle = styled(Main)`
  ${media.small`
    display: flex;
    flex-direction:column;
    width: 80%;
    height: 100vh;
    justify-content: center;
    background-color: white;
    align-items: center;
`}
`;

const ContainerStyle = styled(Container)`
  ${media.small`
    width: 100%;
    background-color: white;
    box-shadow: none;
    height: 20%;
`}
`;

const Container2Style = styled(Container)`
  ${media.small`
    width: 100%;
    box-shadow: none;
    height: 50%;
`}
`;

const MypageComp = ({ memberInfo }) => {
  const editNavigate = useNavigate();
  return (
    <>
      <MainStyle $direction="row" $background="#f3f3f3" $width="100%">
        <ContainerStyle
          $shadow="none"
          $align="center"
          $justify="center"
          $width="55%"
        >
          <Section
            $direction="column"
            $align="center"
            $justify="center"
            $height="auto"
          >
            <Area
              $shadow="none"
              $height="auto"
              $position="relative"
              $width="50%"
              $paddingBottom="50%"
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
                src={memberInfo && memberInfo.image}
                alt="프로필 이미지"
              />
            </Area>
          </Section>
        </ContainerStyle>
        <Container2Style
          $shadow="none"
          $padding="0 15px"
          $dispaly="flex"
          $align="center"
          $justify="center"
          $width="45%"
        >
          <Section $shadow="none" $direction="column">
            <Area $shadow="none" $direction="column">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                  paddingBottom: "10px",
                }}
              >
                Email
              </p>
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.3)",
                  fontWeight: "600",
                  padding: "0 0 10px 10px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                {memberInfo.email}
              </p>
            </Area>
            <Area $shadow="none" $direction="column">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                  paddingBottom: "10px",
                }}
              >
                Name
              </p>
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.3)",
                  fontWeight: "600",
                  padding: "0 0 10px 10px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                {memberInfo.name}
              </p>
            </Area>
            <Area $shadow="none" $direction="column">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                  paddingBottom: "10px",
                }}
              >
                NickName
              </p>
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.3)",
                  fontWeight: "600",
                  padding: "0 0 10px 10px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                {memberInfo.nickName}
              </p>
            </Area>
            <Area $shadow="none" $direction="column">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                  paddingBottom: "10px",
                }}
              >
                Phone
              </p>
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.3)",
                  fontWeight: "600",
                  padding: "0 0 10px 10px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                {memberInfo.phone}
              </p>
            </Area>
            <Area $shadow="none" $direction="column" $marginBottom="30px">
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.5)",
                  fontWeight: "600",
                  paddingBottom: "10px",
                }}
              >
                Addr
              </p>
              <p
                style={{
                  color: "rgba(0, 0, 0, 0.3)",
                  fontWeight: "600",
                  padding: "0 0 10px 10px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
                }}
              >
                {memberInfo.addr}
              </p>
            </Area>
            <Area $justify="center" $align="center" $shadow="none">
              <MiddleButton onClick={() => editNavigate("/mypage/edit")}>
                정보 수정
              </MiddleButton>
            </Area>
          </Section>
        </Container2Style>
      </MainStyle>
    </>
  );
};
export default MypageComp;
