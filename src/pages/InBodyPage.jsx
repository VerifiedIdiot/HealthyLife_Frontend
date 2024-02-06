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
import InfoApi from "../api/InfoApi";

const InbodyPage = () => {
  const [bodyData, setBodyData] = useState("");

  const Out = () => {
    console.log(bodyData);
  };

  useEffect(() => {
    const loadBody = async () => {
      const resp = await InfoApi.LoadBody();
      setBodyData(resp);
    };
    loadBody();
  }, []);

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
            onClick={Out}
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
            <InbodyInput />
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
