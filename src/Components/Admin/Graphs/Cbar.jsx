
import React, { useEffect, useState } from "react";
import axios from "axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     sv: 2400
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     sv: 2210
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     sv: 2290
//   }
// ];

export default function Cbar({ y1, y2, y3, dep }) {
  console.log(y1)
  const [cdata, setcdata] = useState([])

  const getdata = async (dy1, y2, y3, dep) => {
    const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/depsyear", {
      year1: y1, year2: y2, year3: y3,
      dep: dep
    });
    setcdata(data.responsedata);
    console.log(data.responsedata);
  }

  useEffect(() => {
    getdata(y1, y2, y3, dep)
  }, [y1, y2, y3, dep])

  return (
    <BarChart
      width={300}
      height={300}
      data={cdata}
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
      <Bar dataKey="good" stackId="a" fill="#8884d8" />
      <Bar dataKey="average" stackId="a" fill="#82ca9d" />
      <Bar dataKey="belowaverage" stackId="a" fill="#00000" />
    </BarChart>
  );
}