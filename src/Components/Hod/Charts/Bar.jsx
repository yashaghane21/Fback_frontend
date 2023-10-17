import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Good",
    pv: 9142,
  },
  {
    name: "",
    pv: 1398,
  },
  {
    name: "Page C",
    pv: 9800,
  }
];

export default function CustomBarChart() {
  return (
    <BarChart
      width={350}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 100,
        left: 20,
        bottom: 5
      }}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 40, right: 5 }} />
      <YAxis />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8"  />
    </BarChart>
  );
}
