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
    muscle: 31.5,
  },
  {
    date: "2023-12-26",
    muscle: 31.5,
  },
  {
    date: "2023-12-30",
    muscle: 32.9,
  },
  {
    date: "2024-01-05",
    muscle: 32.9,
  },
  {
    date: "2024-01-17",
    muscle: 33.7,
  },
];

const muscleValues = data.map((item) => item.muscle);

// 평균 계산
const averagemuscle = Math.floor(
  muscleValues.reduce((sum, value) => sum + value, 0) / muscleValues.length
);

export default class MuscleChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="90%" height="80%">
        <LineChart width={600} height={140} data={data}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize="12px" />
          <YAxis
            interval={1}
            domain={[averagemuscle - 5, averagemuscle + 5]} // Y축의 범위를 평균에서 -5부터 +5까지로 설정
          />
          <Tooltip />
          <Line type="monotone" dataKey="muscle" stroke="#4942E4" />
          <LabelList dataKey="muscle" position="top" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
