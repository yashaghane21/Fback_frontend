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

// const data = [
//   {
//     name: "Sem 1",
//     uv: 40,

//   },
//   {
//     name: "Sem 2",
//     uv: 30,

//   },
//   {
//     name: "Sem 3",
//     uv: 200,

//   },
//   {
//     name: "Sem 4",
//     uv: 270,

//   },
//   {
//     name: "Sem 4",
//     usssv: 10,

//   },
//   {
//     name: "Sem 5",
//     uv: 190,

//   },
//   {
//     name: "Sem 6",
//     uv: 90,

//   }
// ];
export default function PIe() {

  const id = localStorage.getItem("userid");
  const [dep, setDep] = useState("");
  const [sem1, setSem1] = useState('');
  const [sem2, setSem2] = useState('');
  const [sem3, setSem3] = useState('');
  const [sem4, setSem4] = useState('');
  const [sem5, setSem5] = useState('');
  const [sem6, setSem6] = useState('');
  const [mdata, setMdata] = useState([]);

  const user = async () => {
    try {
      const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v3/user`, {
        id: id
      });
      setDep(data.user.department);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  const getSemesters = async () => {
    try {
      const { data } = await axios.post(`https://f-backend-7g5y.onrender.com/api/v1/getsembydep`, {
        dep: dep
      });

      if (Array.isArray(data.sems) && data.sems.length >= 6) {
        const semesterIDs = data.sems.slice(0, 6).map(sem => sem._id);
        // Set each semester ID individually in state
        setSem1(semesterIDs[0]);
        setSem2(semesterIDs[1]);
        setSem3(semesterIDs[2]);
        setSem4(semesterIDs[3]);
        setSem5(semesterIDs[4]);
        setSem6(semesterIDs[5]);
        console.log("yash", sem1, sem2, sem3, sem4, sem5, sem6)
      } else {
        console.error("Error: 'data.sems' is not in the expected format.");
      }
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const pieData = async () => {
    try {
      console.log("hhhhdddd", dep)
      const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/feedbackby", {
        dep: dep,
        sem1: sem1,
        sem2: sem2,
        sem3: sem3,
        sem4: sem4,
        sem5: sem5,
        sem6: sem6
      });

      setMdata(data.responseData);
      console.log("dd", data.responseData)
    } catch (error) {
      console.error("Error fetching pie data:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await user();
      await getSemesters();
      await pieData();
    }
    fetchData();
    console.log("hhhhhhhhhhhh", mdata)
  }, [id]);

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
