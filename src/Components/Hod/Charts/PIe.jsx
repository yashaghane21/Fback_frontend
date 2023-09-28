import React from 'react';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    Tooltip, Title, ArcElement, Legend
)
const PieChart = ({ totalgood, totalaverage, totalBelowaverage }) => {
    const data = {
        labels: ['Good', 'Average', 'Below average'],
        datasets: [
            {
                data: [totalgood, totalaverage, totalBelowaverage],
                backgroundColor: ['#008000', '#FFCE56', '#FF0000'],
            },
        ], hoverOffset: 4
    };
    const options = {
        animation: {
            animateRotate: true,
            animateScale: true,
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        aspectRatio: 1,
        cutout: '40%',
    };
    return <Doughnut data={data} options={options} />;
};

export default PieChart;
