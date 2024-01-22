import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "2023-12-22",
    weight: 89.5,
  },
  {
    date: "2023-12-26",
    weight: 85.5,
  },
  {
    date: "2023-12-30",
    weight: 82.2,
  },
  {
    date: "2024-01-05",
    weight: 81.9,
  },
  {
    date: "2024-01-17",
    weight: 75.1,
  },
];

const weightValues = data.map((item) => item.weight);

// 평균 계산
const averageweight = Math.floor(
  weightValues.reduce((sum, value) => sum + value, 0) / weightValues.length
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
            domain={[averageweight - 5, averageweight + 5]} // Y축의 범위를 평균에서 -5부터 +5까지로 설정
          />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#4942E4" />
          <LabelList dataKey="weight" position="top" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
