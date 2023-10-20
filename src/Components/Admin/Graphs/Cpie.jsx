import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToaster } from "react-hot-toast";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

// const data01 = [
//     { name: "Good", value: 400 },
//     { name: "Group B", value: 300 },
//     { name: "Group C", value: 300 }

// ];

export default function Cpie({ dept }) {
    console.log(dept);
    const [cdata, setcdata] = useState([]);

    const getdata = async (dep) => {
        const { data } = await axios.post("https://f-backend-7g5y.onrender.com/api/v2/depfback", {
            dep: dep
        });
        setcdata(data.responsedata);
        console.log(data.responsedata);
    }

    useEffect(() => {
        if (dept) {
            getdata(dept);
        }
    }, [dept]);




    return (
        <PieChart width={350} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={cdata}
                cx={100}
                cb={50}
                outerRadius={80}
                fill="#1E88E5"
                label
            />

            <Tooltip />
        </PieChart>
    );
}