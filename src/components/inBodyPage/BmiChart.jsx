import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  {
    date: "2023-12-22",
    BMI: 21.5,
  },
  {
    date: "2023-12-26",
    BMI: 21.5,
  },
  {
    date: "2023-12-30",
    BMI: 20.9,
  },
  {
    date: "2024-01-05",
    BMI: 20.9,
  },
  {
    date: "2024-01-17",
    BMI: 20.7,
  },
];

const BMIValues = data.map((item) => item.BMI);

// 평균 계산
const averageBMI = Math.floor(
  BMIValues.reduce((sum, value) => sum + value, 0) / BMIValues.length
);

export default class WeightChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="90%" height="80%">
        <LineChart width={600} height={140} data={data}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize="12px" />
          <YAxis
            interval={1}
            domain={[averageBMI - 5, averageBMI + 5]} // Y축의 범위를 평균에서 -5부터 +5까지로 설정
          />
          <Tooltip />
          <Line type="monotone" dataKey="BMI" stroke="#4942E4" />
          <LabelList dataKey="BMI" position="top" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
