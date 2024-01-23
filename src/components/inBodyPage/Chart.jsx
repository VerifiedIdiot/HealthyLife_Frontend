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

export default class Chart extends PureComponent {
  render() {
    const { data, yAxisRange } = this.props;

    return (
      <ResponsiveContainer width="90%" height="80%">
        <LineChart width={600} height={140} data={data}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize="12px" />
          <YAxis
            interval={1}
            domain={yAxisRange} // Y축 범위를 동적으로 설정
          />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#4942E4" />
          <Line type="monotone" dataKey="BMI" stroke="#4942E4" />
          <Line type="monotone" dataKey="muscle" stroke="#4942E4" />
          <Line type="monotone" dataKey="fat" stroke="#4942E4" />
          <LabelList dataKey="weight" position="top" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
