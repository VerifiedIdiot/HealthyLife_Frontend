import {
  Main,
  Container,
  Section,
  Area,
  Box,
  Item,
  Element,
} from "../../styles/Layouts";
import styled from "styled-components";
import { MiddleButton } from "../../styles/styledComponents/StyledComponents";
import runner from "../../assets/imgs/runner.png";

const Input1 = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-between;
  align-items: center;
`;

const Input2 = styled.div`
  font-weight: bold;
`;

const Input3 = styled.input`
  width: 40%;
  height: 60%;
  border-radius: 8px;
  border: none;
`;

const Runner = styled.img`
  width: 50%;
`;

const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}년 ${
  currentDate.getMonth() + 1
}월 ${currentDate.getDate()}일`;

const InbodyInput = () => {
  return (
    <>
      <Main
        $direction="row"
        $justify="center"
        $height="100%"
        style={{ backgroundColor: "#D9D9D9", borderRadius: "8px" }}
      >
        <Container
          $height="100%"
          $width="30%"
          $justify="center"
          $align="center"
          $shadow="none"
        >
          <Runner src={runner} />
        </Container>
        <Container $height="100%" $shadow="none">
          <Section
            $height="25%"
            style={{
              borderRadius: "0px 8px 0px 0px",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            김현빈님의 {formattedDate} 신체정보 입력
          </Section>
          <Section $height="25%" $justify="space-around">
            <Input1>
              <Input2>키</Input2>
              <Input3></Input3>
            </Input1>
            <Input1>
              <Input2>체중</Input2>
              <Input3></Input3>
            </Input1>
            <Input1>
              <Input2>기초대사량</Input2>
              <Input2>2,000 kcal</Input2>
            </Input1>
          </Section>
          <Section $height="25%" $justify="space-around">
            <Input1>
              <Input2>골격근량</Input2>
              <Input3></Input3>
            </Input1>
            <Input1>
              <Input2>체지방량</Input2>
              <Input3></Input3>
            </Input1>
            <Input1>
              <Input2>BMI</Input2>
              <Input2>21</Input2>
            </Input1>
          </Section>
          <Section
            $height="25%"
            $justify="end"
            $align="center"
            style={{ borderRadius: "0px 0px 8px 0px" }}
          >
            <MiddleButton style={{ height: "80%", marginRight: "2%" }}>
              제출
            </MiddleButton>
          </Section>
        </Container>
      </Main>
    </>
  );
};
export default InbodyInput;
