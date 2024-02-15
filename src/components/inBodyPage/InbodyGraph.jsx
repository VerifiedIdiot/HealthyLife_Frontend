import styled from "styled-components";
import Chart from "./Chart";
import { media } from "../../utils/MediaQuery";

const Graph = styled.div`
  width: 45%;
  height: 50%;

  ${media.small`
    width: 100%;
    height: 100%;
    `}
`;

const Title = styled.div`
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0px 0px;
  font-size: 100%;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const GraphContainer = styled.div`
  width: 95%;
  height: 70vh;
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈 적용 */
  justify-content: center;
  background-color: #d9d9d9;
  border-radius: 8px;
  padding-bottom: 1rem;
  min-height: 600px;

  ${media.small`
    flex-wrap: nowrap;
    flex-direction: column;
    `}
`;

const InbodyGraph = ({ bodyData }) => {
  const weightData =
    bodyData &&
    bodyData.map((item) => ({
      date: item.date,
      weight: item.weight,
    }));
  const bmiData =
    bodyData && bodyData.map((item) => ({ date: item.date, BMI: item.bmi }));
  const muscleData =
    bodyData &&
    bodyData.map((item) => ({
      date: item.date,
      muscle: item.muscle,
    }));
  const fatData =
    bodyData && bodyData.map((item) => ({ date: item.date, fat: item.fat }));

  return (
    <>
      <GraphContainer>
        <Graph>
          <Title>체중 (kg)</Title>
          <Chart data={weightData} />
        </Graph>
        <Graph>
          <Title>BMI</Title>
          <Chart data={bmiData} />
        </Graph>
        <Graph>
          <Title>골격근량 (kg)</Title>
          <Chart data={muscleData} />
        </Graph>
        <Graph>
          <Title>체지방량 (kg)</Title>
          <Chart data={fatData} />
        </Graph>
      </GraphContainer>
    </>
  );
};
export default InbodyGraph;
