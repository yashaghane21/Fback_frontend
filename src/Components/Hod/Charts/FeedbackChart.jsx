import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';

ChartJS.register(
    CategoryScale, LinearScale, BarElement
)
const FeedbackChart = ({ feedbackData, tott, tots }) => {
    const data = {
        labels: ['Feedbacks,Teachers,Students,other'],
        datasets: [
            {
                label: 'Total Feedbacks',
                backgroundColor: '#ff6384',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [feedbackData.tfeedbacks]
            },
            {
                label: 'Total Teachers',
                backgroundColor: '#36a2eb',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [tott]
            },
            {
                label: 'Total Feedbacks',
                backgroundColor: '#cc65fe',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [tots]
            }
            , {
                label: 'Total Feedbacks',
                backgroundColor: '#ffce56',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [feedbackData.tfeedbacks]
            }
        ]
    };


    const options = {
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                y: {
                    min: 0,
                    max: 100
                },
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Feedback Analysis'
            },
            tooltip: {
                mode: 'index',
                intersect: true,
            },
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        }
    };


    return <Bar data={data} options={options} />;
};

export default FeedbackChart;