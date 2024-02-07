import styled from "styled-components";
import Chart from "./Chart";
const Graph = styled.div`
  width: 45%;
  height: 50%;
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
    </>
  );
};
export default InbodyGraph;
