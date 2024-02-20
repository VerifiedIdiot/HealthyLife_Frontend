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
import styled from "styled-components";
import { media } from "../utils/MediaQuery";

const InbodyTitle = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 1rem;
  ${media.large`
    font-size: 40px;
    `};
`;

const InbodyPage = () => {
  const [bodyData, setBodyData] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const loadBody = async () => {
      try {
        const resp = await BodyApi.LoadBody();
        setBodyData(resp);
      } catch (error) {
        // 여기에 오류 처리 로직을 추가할 수 있습니다.
        console.error("Body 오류발생:", error);
      }
    };
    loadBody();
  }, [isClicked]);

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    setIsClicked((prevState) => !prevState); // 현재 상태를 반전
  };

  return (
    <>
      <Main $height="auto" $shadow="none">
        <Container $align="center" $height="auto" $shadow="none">
          <Section
            $justify="center"
            style={{
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
