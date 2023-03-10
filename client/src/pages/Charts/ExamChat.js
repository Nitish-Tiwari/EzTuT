import React from "react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


const ExamChat = ({ data }) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Average Marks v/s Student Marks',
            },
        },
        maintainAspectRatio: false
    };
    console.log(data, "data inside stundet")
    const labels = data.examname.map((item) => `${item.exam_name}`);
    const avgMarks = data.averagemakrs.map((item) => item.average_marks);
    const marks = data.examresult.map((item) => item.marks);
    console.log(labels, avgMarks, marks, "data map")
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Average Marks",
                data: avgMarks,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Marks",
                data: marks,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    return <Bar options={options} data={chartData} width={2000}
        height={600}
    />;

};

export default ExamChat;