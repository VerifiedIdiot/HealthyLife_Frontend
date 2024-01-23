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

const data = [
  {
    date: "2024-01-17",
    height: "181.1",
    BMR: 2000,
    BMI: 20.7,
    weight: 75.1,
    muscle: 33.7,
    fat: 30.7,
  },
  {
    date: "2024-01-05",
    height: "181.1",
    BMR: 2000,
    BMI: 20.9,
    weight: 81.9,
    muscle: 32.9,
    fat: 30.9,
  },
  {
    date: "2023-12-30",
    height: "181.1",
    BMR: 2000,
    BMI: 20.9,
    weight: 82.2,
    muscle: 32.9,
    fat: 30.9,
  },
  {
    date: "2023-12-26",
    height: 181.1,
    BMR: 2000,
    BMI: 21.5,
    weight: 85.5,
    muscle: 31.5,
    fat: 31.5,
  },
  {
    date: "2023-12-22",
    height: "181.1",
    BMI: 21.5,
    weight: 89.5,
    muscle: 31.5,
    fat: 31.5,
  },
];

const Input1 = styled.div`
  border: 1px solid black;
  display: flex;
  width: 15%;
  justify-content: space-between;
  align-items: center;
`;

const Input2 = styled.div`
  border: 1px solid black;
  font-weight: bold;
`;

const Input3 = styled.div`
  border: 1px solid black;
  width: 40%;
  height: 30%;
`;

const Input4 = styled.div`
  height: 100%;
`;

const InbodyList = () => {
  return (
    <>
      <Main
        $direction="row"
        $justify="center"
        $height="100%"
        style={{
          backgroundColor: "#D9D9D9",
          borderRadius: "8px",
          overflowY: "auto", // y 축으로만 스크롤바를 표시합니다.
          overflowX: "hidden", // 가로 스크롤을 숨깁니다.
        }}
      >
        <Container $height="100%">
          {data.map((item, index) => (
            <Input4 key={index}>
              <Section
                $border="1px solid red"
                $height="40%"
                style={{
                  alignItems: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                김현빈님의 {new Date(item.date).getFullYear()}년{" "}
                {new Date(item.date).getMonth() + 1}월{" "}
                {new Date(item.date).getDate()}일 신체정보
              </Section>
              <Section
                $border="1px solid black"
                $height="60%"
                $justify="space-around"
              >
                <Input1>
                  <Input2>키</Input2>
                  <Input3>{item.height} cm</Input3>
                </Input1>
                <Input1>
                  <Input2>체중</Input2>
                  <Input3>{item.weight} kg</Input3>
                </Input1>
                <Input1>
                  <Input2>기초대사량</Input2>
                  <Input2>{item.BMR} kcal</Input2>
                </Input1>
                <Input1>
                  <Input2>골격근량</Input2>
                  <Input3>{item.muscle} kg</Input3>
                </Input1>
                <Input1>
                  <Input2>체지방량</Input2>
                  <Input3>{item.fat} kg</Input3>
                </Input1>
                <Input1>
                  <Input2>BMI</Input2>
                  <Input2>{item.BMI}</Input2>
                </Input1>
              </Section>
            </Input4>
          ))}
        </Container>
      </Main>
    </>
  );
};
export default InbodyList;
