import styled from "styled-components";
import WeightChart from "./WeightChart";
import BmiChart from "./BmiChart";
import MuscleChart from "./MuscleChart";
import FatChart from "./FatChart";

const Graph = styled.div`
  border: 1px solid red;
  width: 45%;
  height: 50%;
`;

const Title = styled.div`
  border: 1px solid black;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 8px 0px 0px;
  background-color: #d9d9d9;
  font-size: 100%;
  font-weight: bold;
`;

const InbodyGraph = () => {
  return (
    <>
      <Graph>
        <Title>체중 (kg)</Title>
        <WeightChart />
      </Graph>
      <Graph>
        <Title>BMI</Title>
        <BmiChart />
      </Graph>
      <Graph>
        <Title>골격근량 (kg)</Title>
        <MuscleChart />
      </Graph>
      <Graph>
        <Title>체지방량 (kg)</Title>
        <FatChart />
      </Graph>
    </>
  );
};
export default InbodyGraph;
