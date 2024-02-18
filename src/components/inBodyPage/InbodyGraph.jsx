import styled from "styled-components";
import Chart from "./Chart";
import { media } from "../../utils/MediaQuery";
import { useState, useEffect } from "react";

const Graph = styled.div`
  width: 85%;
  height: 80%;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap; /* 줄 바꿈 적용 */
  justify-content: center;
  border-radius: 8px;
  padding-bottom: 1rem;
  min-height: 350px;
  border: 2px solid #d9d9d9;

  align-items: center;

  ${media.small`
    flex-wrap: nowrap;
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 2rem;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.selected ? "1" : "0.4")};
`;

const InbodyGraph = ({ bodyData }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [title, setTitle] = useState("체중");
  const [latestData, setLatestData] = useState({});
  const [previousData, setPreviousData] = useState({});
  const [selectedButton, setSelectedButton] = useState("weight"); // 초기값은 체중

  useEffect(() => {
    if (bodyData && bodyData.length > 0) {
      setLatestData(bodyData[bodyData.length - 1]);
      setPreviousData(bodyData[bodyData.length - 2] || {});
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
    console.log(latestData);
    console.log(previousData);
  };

  const getColor = (currentValue, previousValue) => {
    if (currentValue > previousValue) return "green"; // 높아졌을 때 초록색
    if (currentValue < previousValue) return "red"; // 낮아졌을 때 빨간색
    return "black"; // 변동 없을 때 검은색
  };

  const getArrowIcon = (currentValue, previousValue) => {
    if (currentValue > previousValue) {
      return "⬆";
    } else if (currentValue < previousValue) {
      return "⬇";
    } else {
      return "-";
    }
  };

  const handleButtonClick = (data) => {
    mapDataToSelectedData(data);
    setSelectedButton(data.key); // 선택한 버튼 업데이트
  };

  return (
    <>
      <MainContainer>
        <ButtonContainer>
          <Button
            onClick={() => handleButtonClick({ key: "weight", title: "체중" })}
            selected={selectedButton === "weight"}
          >
            체중
            <div
              className="late"
              style={{
                color: getColor(latestData.weight, previousData.weight),
              }}
            >
              {latestData.weight} kg
              {getArrowIcon(latestData.weight, previousData.weight)}
            </div>
          </Button>
          <Button
            onClick={() => handleButtonClick({ key: "bmi", title: "BMI" })}
            selected={selectedButton === "bmi"}
          >
            BMI
            <div
              className="late"
              style={{
                color: getColor(latestData.bmi, previousData.bmi),
              }}
            >
              {latestData.bmi}
              {getArrowIcon(latestData.bmi, previousData.bmi)}
            </div>
          </Button>
          <Button
            onClick={() =>
              handleButtonClick({ key: "muscle", title: "골격근량" })
            }
            selected={selectedButton === "muscle"}
          >
            골격근량
            <div
              className="late"
              style={{
                color: getColor(latestData.muscle, previousData.muscle),
              }}
            >
              {latestData.muscle} kg
              {getArrowIcon(latestData.muscle, previousData.mucle)}
            </div>
          </Button>
          <Button
            onClick={() => handleButtonClick({ key: "fat", title: "체지방량" })}
            selected={selectedButton === "fat"}
          >
            체지방량
            <div
              className="late"
              style={{
                color: getColor(latestData.fat, previousData.fat),
              }}
            >
              {latestData.fat} kg
              {getArrowIcon(latestData.fat, previousData.fat)}
            </div>
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
