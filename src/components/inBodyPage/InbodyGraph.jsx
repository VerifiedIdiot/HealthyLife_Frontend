import styled from "styled-components";
import Chart from "./Chart";
import { media } from "../../utils/MediaQuery";
import { useState, useEffect } from "react";

const Graph = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const Title = styled.div`
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 2rem;
  border: 1px solid black;
  color: blue;
`;

const GraphContainer = styled.div`
  width: 95%;
  height: 30vh;
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈 적용 */
  justify-content: center;
  border-radius: 8px;
  padding-bottom: 1rem;
  min-height: 200px;
  border: 1px solid black;
  align-items: center;

  ${media.small`
    flex-wrap: nowrap;
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  border: 1px solid black;
`;

const Button = styled.button`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  width: 95px;
  height: 95px;
  border-radius: 4px;
  cursor: pointer;
  color: blue;
  border: 3px solid blue;
  font-weight: bold;
`;

const InbodyGraph = ({ bodyData }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [title, setTitle] = useState("체중");

  useEffect(() => {
    if (bodyData && bodyData.length > 0) {
      // 페이지 로드 시 초기 데이터 설정 (체중 데이터)
      mapDataToSelectedData({ key: "weight", title: "체중" });
    }
  }, [bodyData]);

  const mapDataToSelectedData = (data) => {
    const mappedData = bodyData.map((item) => ({
      date: item.date,
      [data.key]: item[data.key], // 이 부분 수정됨
    }));
    setSelectedData(mappedData);
    setTitle(data.title);

    // BMI 데이터 출력
    console.log(
      "BMI 데이터:",
      mappedData.map((item) => item.bmi)
    );
  };

  const handleButtonClick = (data) => {
    mapDataToSelectedData(data);
  };

  return (
    <>
      <MainContainer>
        <ButtonContainer>
          <Button
            onClick={() => handleButtonClick({ key: "weight", title: "체중" })}
          >
            체중
          </Button>
          <Button
            onClick={() => handleButtonClick({ key: "bmi", title: "BMI" })}
          >
            BMI
          </Button>
          <Button
            onClick={() =>
              handleButtonClick({ key: "muscle", title: "골격근량" })
            }
          >
            골격근량
          </Button>
          <Button
            onClick={() => handleButtonClick({ key: "fat", title: "체지방량" })}
          >
            체지방량
          </Button>
        </ButtonContainer>
        <GraphContainer>
          <Title>{title}</Title>
          <Graph>{selectedData && <Chart data={selectedData} />}</Graph>
        </GraphContainer>
      </MainContainer>
    </>
  );
};

export default InbodyGraph;
