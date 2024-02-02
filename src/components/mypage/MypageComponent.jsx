import { useNavigate } from "react-router";
import { Area, Container, Main, Section } from "../../styles/Layouts";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";

const MypageComp = ({ memberInfo }) => {
  const editNavigate = useNavigate();
  return (
    <>
      <Main $direction="row" $background="#f3f3f3" $width="100%">
        <Container $shadow="none" $align="center" $justify="center">
          <Section $direction="column" $align="center" $justify="center">
            <Area
              $shadow="none"
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
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
                src={memberInfo && memberInfo.image}
                alt="프로필 이미지"
              />
            </Area>
          </Section>
        </Container>
        <Container
          $shadow="none"
          $padding="0 15px"
          $dispaly="flex"
          $align="center"
          $justify="center"
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
            <Area $shadow="none" $direction="column">
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
        </Container>
      </Main>
    </>
  );
};
export default MypageComp;
