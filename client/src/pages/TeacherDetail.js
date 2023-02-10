import React, { useEffect, useState } from 'react'
import "../css/test.css"
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const TeacherDetail = () => {
    let { id } = useParams();
    const [teacherData, setTeacherData] = useState(null)
    const [loading, setloading] = useState(false)
    const getData = async () => {
        setloading(true)
        axios.get(`http://localhost:3001/teachers/findteacher/${id}`).then((data) => {

            console.log(data.data)
            setTeacherData(data.data)
            setloading(false)
        })
    }
    useEffect(() => {
        getData()
    }, [loading])

    return (
        <div className="page-wrapper">
            <div className="dashboard-content-wrapper">
                <div className="dashboard-content-wrap">
                    <div className='container'>
                        <div className="personal_detail_section">
                            <div className="page_title">
                                <h1>Teacher Details</h1>
                            </div>
                            <Row gutter={6} className="student_section">
                                <Col flex="400px" lg={12} md={12} sm={12} xs={24} className="student_img">
                                    <img width="250px" height="250px" style={{ borderRadius: "50%" }} src={"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1675656939~exp=1675657539~hmac=1aba4a7e915ac81fe6cf7dc668e4dfe3e3c94efb23adb577b721c4908eb3f027"} alt="" />
                                </Col>
                                <Col flex="auto" lg={12} md={12} sm={12} xs={24} className="student_details">
                                    {teacherData && (
                                        <Row gutter={6}>

                                            <Col span={12} lg={12} md={12} sm={12} xs={24}>
                                                <div className='section_title'>
                                                    <h2>Personal Detail</h2>
                                                </div>
                                                <div className='section_detail'>
                                                    <h4>Name : {teacherData.name}</h4>
                                                    <h4>Age : {teacherData.age}</h4>
                                                    <h4>Gender : {teacherData.gender}</h4>
                                                    <h4>Phone Number : {teacherData.phonenumber}</h4>
                                                    <h4>Phone Number : {teacherData.email}</h4>

                                                </div>

                                            </Col>
                                            <Col span={12} lg={12} md={12} sm={12} xs={24}>
                                                <div className='section_title'>
                                                    <h2>Account Details</h2>
                                                </div>
                                                <div className='section_detail' >
                                                    <h4>Total Salary : {(teacherData.salary).toLocaleString('hi-IN')}</h4>
                                                    <h4>Monthly Salary : {((teacherData.salary) / 10).toLocaleString('hi-IN')}</h4>
                                                    <h4>Total Paid Salary : {(teacherData.paidsalary).toLocaleString('hi-IN')}</h4>
                                                    <h4>Remaining Salary : {(parseInt(teacherData.salary) - parseInt(teacherData.paidsalary)).toLocaleString('hi-IN')}</h4>
                                                    <h4>Remianing Salary In Month: {(10 - (parseInt(teacherData.paidsalary) / (parseInt(teacherData.salary) / 10))).toFixed(1)}</h4>
                                                </div>

                                            </Col>

                                        </Row>
                                    )}
                                </Col>
                            </Row>
                        </div>
                        <div className="transactions_details_section">
                            <div className="page_title">
                                <h1>Transaction Detail</h1>
                            </div>
                            <Row gutter={6} className="student_section">
                                <Col flex="400px" lg={12} md={12} sm={12} xs={24} >
                                    Table
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default TeacherDetail;