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
    fat: 31.5,
  },
  {
    date: "2023-12-26",
    fat: 31.5,
  },
  {
    date: "2023-12-30",
    fat: 30.9,
  },
  {
    date: "2024-01-05",
    fat: 30.9,
  },
  {
    date: "2024-01-17",
    fat: 30.7,
  },
];

const fatValues = data.map((item) => item.fat);

// 평균 계산
const averagefat = Math.floor(
  fatValues.reduce((sum, value) => sum + value, 0) / fatValues.length
);

export default class FatChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="90%" height="80%">
        <LineChart width={600} height={140} data={data}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize="12px" />
          <YAxis
            interval={1}
            domain={[averagefat - 5, averagefat + 5]} // Y축의 범위를 평균에서 -5부터 +5까지로 설정
          />
          <Tooltip />
          <Line type="monotone" dataKey="fat" stroke="#4942E4" />
          <LabelList dataKey="fat" position="top" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
