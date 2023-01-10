import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DonutChar from './Charts/DonutChar.js';
import LineChar from './Charts/LineChar.js';
import '../css/dashboard.css'

const Dashboard = () => {
    const [countStudent, setCountStudent] = useState([]);
    const [feeStudent, setFeeStudent] = useState([]);
    const [countTeacher, setCountTeacher] = useState([]);
    const [feeTeacher, setFeeTeacher] = useState([]);
    const getStudentscount = async () => {
        axios.get("http://localhost:3001/students/studentcount").then((respose) => {
            setCountStudent(respose.data)
        })
    }
    const getStudentfee = async () => {
        axios.get("http://localhost:3001/students/totalfee").then((respose) => {
            setFeeStudent(respose.data)
        })
    }
    const getTeacherscount = async () => {
        axios.get("http://localhost:3001/teachers/teachercount").then((respose) => {
            setCountTeacher(respose.data)
        })
    }
    const getTeacherfee = async () => {
        axios.get("http://localhost:3001/teachers/totalsalary").then((respose) => {
            setFeeTeacher(respose.data)
        })
    }
    useEffect(() => {
        getStudentscount();
    }, []);
    useEffect(() => {
        getStudentfee();
    }, [])
    useEffect(() => {
        getTeacherscount();
    }, []);
    useEffect(() => {
        getTeacherfee();
    }, [])
    return (
        <div className="page-wrapper">
            <div className="dashboard-content-wrapper">
                <div className="dashboard-content-wrap">
                    <div className="page-title">
                        <h2 className="page-heading">Dashboard</h2>
                    </div>
                    <div className="card-wrapper">
                        <div className="w-layout-grid card-grid">
                            <div className="card">
                                <div className="carrd-image"><img
                                    src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7cef59cf3ee123110abc8_Dash-Income.svg"
                                    loading="lazy" alt="" className="card-icon" /></div>
                                <div className="card-text">
                                    <div className="card-info">Income</div>
                                    <h4 className="price">&#8377;{feeStudent.toLocaleString()}</h4>
                                </div>
                                <div className="card-border-right"></div>
                            </div>
                            <div className="card">
                                <div className="carrd-image"><img
                                    src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7cef44250464704555652_Dash-Expense.svg"
                                    loading="lazy" alt="" className="card-icon" /></div>
                                <div className="card-text">
                                    <div className="card-info">Expense</div>
                                    <h4 className="price">&#8377;{feeTeacher.toLocaleString()}</h4>
                                </div>
                                <div className="card-border-right"></div>
                            </div>
                            <div className="card">
                                <div className="carrd-image"><img
                                    src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7cef43d99ed2f8f0ed548_Dash-Contact.svg"
                                    loading="lazy" alt="" className="card-icon" /></div>
                                <div className="card-text">
                                    <div className="card-info">Students</div>
                                    <h4 className="price">{countStudent}</h4>
                                </div>
                                <div className="card-border-right"></div>
                            </div>
                            <div className="card">
                                <div className="carrd-image"><img
                                    src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7cef5f576cff62897e1df_Dash-Transaction.svg"
                                    loading="lazy" alt="" className="card-icon" /></div>
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
                                <div className="line-chart-wrap"><LineChar /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard