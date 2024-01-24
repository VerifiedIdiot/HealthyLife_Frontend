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

const data = [
  {
    date: "2023-12-22",
    BMI: 21.5,
    weight: 89.5,
    muscle: 31.5,
    fat: 31.5,
  },
  {
    date: "2023-12-26",
    BMI: 21.5,
    weight: 85.5,
    muscle: 31.5,
    fat: 31.5,
  },
  {
    date: "2023-12-30",
    BMI: 20.9,
    weight: 82.2,
    muscle: 32.9,
    fat: 30.9,
  },
  {
    date: "2024-01-05",
    BMI: 20.9,
    weight: 81.9,
    muscle: 32.9,
    fat: 30.9,
  },
  {
    date: "2024-01-17",
    BMI: 20.7,
    weight: 75.1,
    muscle: 33.7,
    fat: 30.7,
  },
];

const InbodyGraph = () => {
  const weightData = data.map((item) => ({
    date: item.date,
    weight: item.weight,
  }));
  const bmiData = data.map((item) => ({ date: item.date, BMI: item.BMI }));
  const muscleData = data.map((item) => ({
    date: item.date,
    muscle: item.muscle,
  }));
  const fatData = data.map((item) => ({ date: item.date, fat: item.fat }));

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
