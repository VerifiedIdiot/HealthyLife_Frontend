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
import { media } from "../../utils/MediaQuery";

const Input1 = styled.div`
  display: flex;
  align-items: center;
`;

const Input2 = styled.div`
  font-weight: bold;
  font-size: 13px;
  flex-wrap: nowrap;
  width: 110px;
  height: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Input3 = styled.div`
  width: 135px;
  height: 20px;
  font-size: 15px;
  font-weight: bold;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input4 = styled.div`
  height: auto;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input5 = styled.div`
  height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4942e4;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #4a42e46a;
    border-radius: 6px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const InputContainer1 = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
`;

const InbodyList = ({ bodyData }) => {
  return (
    <>
      <Main
        $direction="column"
        $justify="center"
        style={{ borderRadius: "8px" }}
      >
        <Input5>
          {bodyData &&
            bodyData
              .slice() // 원본 배열을 변경하지 않고 복사본을 만듭니다.
              .reverse() // 역순으로 배열을 정렬합니다.
              .map((item, index) => (
                <Input4 key={index}>
                  <Container
                    $height="150px"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    <Section
                      $height="20%"
                      style={{
                        alignItems: "center",
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: "0.5rem",
                      }}
                    >
                      {new Date(item.date).getFullYear()}년{" "}
                      {new Date(item.date).getMonth() + 1}월{" "}
                      {new Date(item.date).getDate()}일 신체정보
                    </Section>
                    <Section $justify="center" $height="80%">
                      <InputContainer>
                        <InputContainer1>
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
                            <Input3>{item.bmr} kcal</Input3>
                          </Input1>
                          <Input1>
                            <Input2></Input2>
                            <Input3></Input3>
                          </Input1>
                        </InputContainer1>
                        <InputContainer1>
                          <Input1>
                            <Input2>골격근량</Input2>
                            <Input3>{item.muscle} kg</Input3>
                          </Input1>
                          <Input1>
                            <Input2>체지방량</Input2>
                            <Input3>{item.fat} kg</Input3>
                          </Input1>
                          <Input1>
                            <Input2>체지방률</Input2>
                            <Input3>{item.fatPercent} %</Input3>
                          </Input1>
                          <Input1>
                            <Input2>BMI</Input2>
                            <Input3>{item.bmi}</Input3>
                          </Input1>
                        </InputContainer1>
                      </InputContainer>
                    </Section>
                  </Container>
                </Input4>
              ))}
        </Input5>
      </Main>
    </>
  );
};
export default InbodyList;
