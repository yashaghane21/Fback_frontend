import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';

ChartJS.register(
    CategoryScale,LinearScale,BarElement
)
const FeedbackChart = ({ feedbackData,semdata }) => {
    const data = {
        labels: ['Feedbacks'],
        datasets: [
            {
                label: 'Total Feedbacks',
                backgroundColor: 'rgba(0,68,204,0.6)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [feedbackData.tfeedbacks]
            },
            {
                label: 'Total Feedbacks',
                backgroundColor: 'rgba(0,68,204,0.6)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                // data: [semdata.fbacks]
            },
            {
                label: 'Total Feedbacks',
                backgroundColor: 'rgba(0,68,204,0.6)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [feedbackData.tfeedbacks]
            }
            , {
                label: 'Total Feedbacks',
                backgroundColor: 'rgba(0,68,204,0.6)',
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
                max: 10,
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
                intersect: false,
            },
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        },
        
    };
    

    return <Bar data={data} options={options} />;
};

export default FeedbackChart;
