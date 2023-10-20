
import React from "react";
import { BarChart, Bar } from "recharts";

const data = [
    {
        name: "Page A",
        uv: 1000,


    },
    {
        name: "Page B",
        uv: 3000,

    },
    {
        name: "Page C",
        uv: 2000,

    }
];

export default function Qbar() {
    return (
        <BarChart width={300} height={300} data={data}>
            <Bar dataKey="uv" fill="#8884d8" />
            <h1 className='font-bold text-white my-5 '>dwdwsd</h1>
        </BarChart>
    );
}