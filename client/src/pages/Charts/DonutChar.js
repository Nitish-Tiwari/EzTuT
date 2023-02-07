import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2"
import axios from 'axios';
ChartJS.register(ArcElement, Tooltip, Legend);
function DonutChar() {
    const [chartdata, setchartdata] = useState({})
    useEffect(() => {
        const fetechdata = async () => {
            const { data } = await axios.get("http://localhost:3001/students/eachclass")
            setchartdata({
                labels: data.map((item) => item.class),
                datasets: [
                    {
                        data: data.map((item) => item.num_students),
                        backgroundColor: ["#AC92EB", "#4FC1E8", "#A0D568", "#FFCE54", "#ED5564"],
                        hoverBackgroundColor: ["#AC92EB", "#4FC1E8", "#A0D568", "#FFCE54", "#ED5564"],
                        borderWidth: 1
                    }
                ]
            });
        }
        fetechdata()
    }, [])

    return (
        <div>
            {chartdata && chartdata.datasets && (<Doughnut
                width={"100%"}
                height={"50%"}
                data={chartdata}

                options={
                    {
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                            title: { display: true, text: "Students" }
                        }
                    }
                }
            />)}
        </div>
    )
}

export default DonutChar