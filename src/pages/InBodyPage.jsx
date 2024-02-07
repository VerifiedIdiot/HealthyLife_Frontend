import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../styles/Layouts";
import InbodyGraph from "../components/inBodyPage/InbodyGraph";
import InbodyInput from "../components/inBodyPage/InbodyInput";
import InbodyList from "../components/inBodyPage/InbodyList";
import React, { useEffect, useState } from "react";
import BodyApi from "../api/BodyApi";

const InbodyPage = () => {
  const [bodyData, setBodyData] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const loadBody = async () => {
      const resp = await BodyApi.LoadBody();
      setBodyData(resp);
    };
    loadBody();
  }, [isClicked]);

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    setIsClicked((prevState) => !prevState); // 현재 상태를 반전
  };

  return (
    <>
      <Main $height="auto">
        <Container $align="center" $height="auto">
          <Section
            $height="70px"
            style={{
              fontSize: "50px",
              fontWeight: "bold",
            }}
          >
            My Records
          </Section>
          <Section
            $height="400px"
            $width="95%"
            $justify="space-around"
            style={{
              flexWrap: "wrap",
              backgroundColor: "#d9d9d9",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          >
            <InbodyGraph bodyData={bodyData} />
          </Section>
          <Section $justify="center" style={{ marginBottom: "1rem" }}>
            <InbodyInput handleClick={handleClick} />
          </Section>
          <Section $justify="center" $height="85vh">
            <InbodyList bodyData={bodyData} />
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InbodyPage;
