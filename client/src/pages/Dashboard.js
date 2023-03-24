import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DonutChar from './Charts/DonutChar.js';
import LineChar from './Charts/LineChar.js';
import '../css/dashboard.css'

import TransactionTable from './TransactionTable.js';
import Link from 'antd/es/typography/Link.js';

const Dashboard = () => {
    const [countStudent, setCountStudent] = useState([]);
    const [feeStudent, setFeeStudent] = useState([]);
    const [countTeacher, setCountTeacher] = useState([]);
    const [selectedDateRange, setSelectedDateRange] = useState('today');
    const [activeButton, setActiveButton] = useState(0);
    const handleDateClick = (index, value) => {
        setActiveButton(index)

        setSelectedDateRange(value)
    }
    const getStudentscount = async () => {
        axios.get("http://localhost:3001/students/studentcount").then((respose) => {
            setCountStudent(respose.data)
        })
    }
    const getSales = async () => {
        axios.get("http://localhost:3001/dashboard").then((respose) => {
            setFeeStudent(respose.data.sales)

        })
    }
    console.log(feeStudent, "feestudent")
    const getTeacherscount = async () => {
        axios.get("http://localhost:3001/teachers/teachercount").then((respose) => {
            setCountTeacher(respose.data)
        })
    }


    useEffect(() => {
        getStudentscount();
        getSales();
        getTeacherscount();

    }, []);
    return (
        <div className="page-wrapper">
            <div className="dashboard-content-wrapper">
                {feeStudent &&
                    <div className="dashboard-content-wrap">

                        <div className="page-title">
                            <h2 className="page-heading">Dashboard</h2>
                        </div>
                        <div className="card-wrapper">
                            <div className="w-layout-grid card-grid">
                                <div className="card">
                                    <div className="carrd-image"><img
                                        src="https://api.iconify.design/mdi/account-cash.svg?color=%233c77ee&width=40&height=40'"
                                        loading="lazy" alt="" className="card-icon" style={{ background: "#e6eefe" }} /></div>
                                    <div className="card-text">
                                        <div className="card-info">Income</div>
                                        <h4 className="price">&#8377;{feeStudent?.income?.toLocaleString()}</h4>
                                    </div>
                                    <div className="card-border-right"></div>
                                </div>
                                <div className="card">
                                    <div className="carrd-image"><img
                                        src='https://api.iconify.design/mdi/hand-coin-outline.svg?color=%23be63f9&width=40&height=40'
                                        loading="lazy" alt="" className="card-icon" style={{ background: "  #f5e6fe" }} /></div>
                                    <div className="card-text">
                                        <div className="card-info">Expense</div>
                                        <h4 className="price">&#8377;{feeStudent?.expense?.toLocaleString()}</h4>
                                    </div>
                                    <div className="card-border-right"></div>
                                </div>
                                <div className="card">
                                    <div className="carrd-image"><img
                                        src='https://api.iconify.design/ph/student.svg?color=%234cbf73&width=40&height=40'
                                        loading="lazy" alt="" className="card-icon" style={{ background: "#dcfadc" }} /></div>
                                    <div className="card-text">
                                        <div className="card-info">Students</div>
                                        <h4 className="price">{countStudent}</h4>
                                    </div>
                                    <div className="card-border-right"></div>
                                </div>
                                <div className="card">
                                    <div className="carrd-image"><img
                                        src='https://api.iconify.design/mdi/teacher.svg?color=%23f96363&width=40&height=40'
                                        loading="lazy" alt="" className="card-icon" style={{ background: "#fee6e6" }} /></div>
                                    <div className="card-text">
                                        <div className="card-info">Teachers</div>
                                        <h4 className="price">{countTeacher}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <div className="w-layout-grid chart-grid">
                                <div className="outcome-categories">
                                    <h4 className="single-wrapper-common-tittle">Class Categories</h4>
                                    <div className="categories-image-wrap">
                                        <DonutChar />
                                    </div>
                                </div>
                                <div className="line-chart-wrapper">
                                    <div className="line-top-wrapper">
                                        <h4 className="single-wrapper-common-tittle overview">Overview</h4>

                                    </div>
                                    <div className='daterangebutton'>
                                        <button
                                            className={activeButton === 0 ? 'active' : ''}
                                            onClick={() => handleDateClick(0, "today")}
                                        >
                                            Today
                                        </button>
                                        <button
                                            className={activeButton === 1 ? 'active' : ''}
                                            onClick={() => handleDateClick(1, "yesterday")}
                                        >
                                            Yesterday
                                        </button>
                                        <button
                                            className={activeButton === 2 ? 'active' : ''}
                                            onClick={() => handleDateClick(2, "thisweek")}
                                        >
                                            This Week
                                        </button>
                                        <button
                                            className={activeButton === 3 ? 'active' : ''}
                                            onClick={() => handleDateClick(3, "lastweek")}
                                        >
                                            Last Week
                                        </button>
                                        <button
                                            className={activeButton === 4 ? 'active' : ''}
                                            onClick={() => handleDateClick(4, "thismonth")}
                                        >
                                            This Month
                                        </button>
                                        <button
                                            className={activeButton === 5 ? 'active' : ''}
                                            onClick={() => handleDateClick(5, "lastmonth")}
                                        >
                                            Last Month
                                        </button>
                                        <button
                                            className={activeButton === 6 ? 'active' : ''}
                                            onClick={() => handleDateClick(6, "thisyear")}
                                        >
                                            This Year
                                        </button>
                                    </div>
                                    <div className="line-chart-wrap"><LineChar data={selectedDateRange} /></div>
                                </div>
                            </div>
                        </div>

                        <div >

                            <TransactionTable />
                        </div>

                    </div>
                }
            </div>

        </div>
    )
}

export default Dashboard