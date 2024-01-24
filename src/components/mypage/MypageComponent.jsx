import { Area, Container, Main, Section } from "../../styles/Layouts";

const MypageComp = ({ userData }) => {
  return (
    <>
      <Main
        $direction="row"
        $background="#f3f3f3"
        $width="100%"
        $height="100vh"
      >
        <Container
          $height="auto"
          $shadow="none"
          $border="1px solid black"
          $align="center"
          $justify="center"
        >
          <Section
            $height="auto"
            $paddingTop="100px"
            $direction="column"
            $align="center"
            $justify="center"
          >
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
                src={userData && userData.image}
                alt="프로필 이미지"
              />
            </Area>
          </Section>
        </Container>
        <Container $height="auto" $shadow="none" $padding="60px 15px">
          <Section $shadow="none" $direction="column">
            <p>Email</p>
            <p
              style={{
                borderBottom: "1px solid black",
              }}
            >
              {userData.email}
            </p>
          </Section>
          <Section $shadow="none" $direction="column">
            <p>Name</p>
            <p
              style={{
                borderBottom: "1px solid black",
              }}
            >
              {userData.name}
            </p>
          </Section>
          <Section $shadow="none" $direction="column">
            <p>NickName</p>
            <p
              style={{
                borderBottom: "1px solid black",
              }}
            >
              {userData.nickName}
            </p>
          </Section>
          <Section $shadow="none" $direction="column">
            <p>Phone</p>
            <p
              style={{
                borderBottom: "1px solid black",
              }}
            >
              {userData.phone}
            </p>
          </Section>
          <Section $shadow="none" $direction="column">
            <p>Addr</p>
            <p
              style={{
                borderBottom: "1px solid black",
              }}
            >
              {userData.addr}
            </p>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default MypageComp;