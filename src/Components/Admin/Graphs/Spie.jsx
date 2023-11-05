import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function Spie({ year, type, uid }) {

  console.log(uid)

  // const id = localStorage.getItem("userid");
  const [dep, setDep] = useState("");
  const [id, setid] = useState(uid)
  const [sem1, setSem1] = useState('');
  const [sem2, setSem2] = useState('');
  const [sem3, setSem3] = useState('');
  const [sem4, setSem4] = useState('');
  const [sem5, setSem5] = useState('');
  const [sem6, setSem6] = useState('');
  const [mdata, setMdata] = useState([]);

  const date = new Date().getFullYear();
  const cyear = date;

  const [y, sety] = useState(cyear)
  const [ty, setty] = useState()

  const user = async () => {
    try {
      console.log(uid)
      const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v3/user", {
        id: uid.id
      });
      console.log(data.user.department._id)
      setDep(data.user.department);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const getSemesters = async () => {
    try {
      const { data } = await axios.post(`https://vercel-zpzg.vercel.app/api/v1/getsembydep`, {
        dep: dep
      });
      console.log(data)

      if (Array.isArray(data.sems) && data.sems.length >= 6) {
        const semesterIDs = data.sems.slice(0, 6).map(sem => sem._id);
        setSem1(semesterIDs[0]);
        setSem2(semesterIDs[1]);
        setSem3(semesterIDs[2]);
        setSem4(semesterIDs[3]);
        setSem5(semesterIDs[4]);
        setSem6(semesterIDs[5]);
      } else {
        console.error("Error: 'data.sems' is not in the expected format.");
      }
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const pieData = async () => {
    try {
      const { data } = await axios.post("https://vercel-zpzg.vercel.app/api/v2/goodfeedbackby", {
        dep: dep,
        year: year,
        sem1: sem1,
        sem2: sem2,
        sem3: sem3,
        sem4: sem4,
        sem5: sem5,
        sem6: sem6,
        type: ty
      });

      setMdata(data.responseData);
    } catch (error) {
      console.error("Error fetching pie data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {

      await getSemesters();
      await pieData();
    }
    setid(uid)
    fetchData();
    sety(year)
    setty(type)

  }, [uid, dep, sem1, sem2, sem3, sem4, sem5, sem6, year]);


  useEffect(() => {
    user();
  }, [])
  return (
    <AreaChart
      width={680}
      height={300}
      data={mdata}
      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>

      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
    </AreaChart>
  );
}
