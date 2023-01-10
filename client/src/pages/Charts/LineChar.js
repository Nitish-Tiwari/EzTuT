import React from 'react'
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
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
function LineChar() {
    const [chartdata, setchartdata] = useState({})

    useEffect(() => {
        const fetechdata = async () => {
            const { data } = await axios.get("http://localhost:3001/students/monthfee")

            console.log(data)

            setchartdata({
                labels: data.map((item) => item.Month_Wise),
                datasets: [
                    {
                        label: "Revenue",
                        data: data.map((item) => item.Sales_Value
                        ),
                        fill: true,
                        borderColor: "rgb(255,99,132)",
                        backgroundColor: "rgba(255,99,132,0.3)"
                    },
                    {
                        label: "Expense",
                        data: data.map((item) => item.Sales_Value
                        ),
                        fill: true,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)"
                    }
                ]
            })
        }
        fetechdata()
    }, [])


    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    // const data = {
    //     labels,
    //     datasets: [
    //         {
    //             label: 'Expense',
    //             data: [25000, 20000, 5000, 30000, 20000, 22000, 53000],
    //             borderColor: 'rgb(255, 99, 132)',
    //             fill: false,
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',


    //         },
    //         {
    //             label: 'Income',
    //             data: [30000, 42000, 51000, 22000, 35000, 40000, 54000],
    //             borderColor: 'rgb(53, 162, 235)',
    //             fill: true,
    //             backgroundColor: 'rgba(53, 162, 235, 0.5)',

    //         },
    //     ],
    // };




    return (
        <div>{chartdata && chartdata.datasets && (<Line
            width={"100%"}
            height={"50%"}
            data={chartdata}
            options={
                {
                    responsive: true,
                    plugins: {
                        legend: { position: "top" },
                        title: { display: true, text: "Revenue" }
                    }
                }
            }
        />)}</div>
    )


}
export default LineChar