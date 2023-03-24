import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart(dataRange) {
    const [chartData, setChartData] = useState({});
    console.log(dataRange)
    useEffect(() => {
        const fetchData = async () => {
            let url = `http://localhost:3001/dashboard/tranctiondetail/${dataRange.data}`;
            let label = 'Revenue';

            const { data } = await axios.get(url);
            console.log(data)
            setChartData({
                labels: data.map((item) => item.date),
                datasets: [
                    {
                        label: "income",
                        data: data.map((item) => item.income),
                        fill: true,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                        label: 'Expense',
                        data: data.map((item) => item.expense),
                        fill: true,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.3)',

                    },
                ],
            });
        };
        fetchData();
    }, [dataRange]);



    return (
        <div>

            {chartData && chartData.datasets && (
                <Line
                    width={'100%'}
                    height={'50%'}
                    data={chartData}

                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: {
                                display: true,
                                text: "Income/Expense",
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

export default LineChart;