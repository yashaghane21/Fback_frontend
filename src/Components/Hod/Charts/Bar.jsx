import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";



export default function CustomBarChart({ sem, year }) {

  const [bardata, setbardata] = useState(year);
  const [iyear, setyear] = useState("")
  const [semester, setsemester] = useState()
  console.log("testing", sem, year)
  const getbardata = async () => {
    try {
      const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/typebysem", {
        year: iyear,
        sem: semester,

      });
      console.log("dd", data.responsedata);
      setbardata(data.responsedata)

    } catch (error) {

    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      getbardata();
    }, 500);

    return () => clearTimeout(timeout);

  }, [iyear, semester]);

  useEffect(() => {
    setyear(year);
    setsemester(sem);
  }, [year, sem]);

  return (
    <div style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <BarChart
        width={400}
        height={300}
        data={bardata}
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
        <Bar dataKey="pv" fill="#1E88E5" />
      </BarChart>
    </div>
  );
}