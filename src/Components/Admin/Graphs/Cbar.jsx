
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
    name: "Page A",
    uv: 4000,
    pv: 2400,
    sv: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    sv: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    sv: 2290
  }
];

export default function Cbar() {
  return (
    <BarChart
      width={350}
      height={300}
      data={data}
      margin={{
        top: 0,
        right: 10,
        left: 0,
        bottom: 0
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      <Bar dataKey="sv" stackId="a" fill="#00000" />
    </BarChart>
  );
}