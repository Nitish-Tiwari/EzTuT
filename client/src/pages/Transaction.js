import axios from 'axios';
import '../css/createstudent.css';
import React, { useState, useEffect } from 'react'
import { Row, Col, Select, notification } from 'antd';
import TransactionTable from './TransactionTable.js';

const Transaction = () => {
    const [selectedOption, setSelectedOption] = useState('student');
    const [loading, setLoading] = useState(false);
    //Student
    const [studentData, setStudentData] = useState([])
    const [selectedBatchname, setSelectedBatchname] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash')
    //Teacher
    const [teacherData, setTeacherData] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const getStudentData = () => {
        axios.get("http://localhost:3001/students/getbatchname").then((data) => {
            setStudentData(data.data)
        })

    }
    const getTeacherData = () => {

        axios.get("http://localhost:3001/teachers").then((data) => {
            console.log("TeacherData")
            setTeacherData(data.data)
        })
    }


    const createPostBodyStudent = () => {
        setLoading(true);
        axios.post("http://localhost:3001/transactions", ({ "name": selectedStudent, "typeofperson": selectedOption, "personid": getSelectedStudentData().id, "batchname": selectedBatchname, "phonenumber": getSelectedStudentData().phonenumber, "amount": paymentAmount, "amounttype": paymentMethod, "typeofamount": "income" })).then(
            console.log("Transaction Successfull"),
            setLoading(false)
        ).then(() => {
            setLoading(false);
            notification.success({
                message: "Transaction Successful",
                placement: 'top'
            });
        })
            .catch((error) => {
                setLoading(false);
                notification.error({
                    message: "Transaction Failed",
                    description: error.message,
                    placement: 'top'
                })
            })
        console.log({ "name": selectedStudent, "typeofperson": selectedOption, "personid": getSelectedStudentData().id, "batchname": selectedBatchname, "phonenumber": getSelectedStudentData().phonenumber, "amount": paymentAmount, "amounttype": paymentMethod, "typeofamount": "income" })
        setPaymentAmount(0)
        setLoading(true);
        axios.put(`http://localhost:3001/students/findstudent/${getSelectedStudentData().id}`, { "paidfee": (parseInt(paymentAmount) + parseInt(getSelectedStudentData().paidfee)) }).then(
            console.log("Student Paid Fee Successfully Updated", getSelectedStudentData().id), setLoading(false), console.log(loading, "loading 2")).catch((err) => {
                console.log(err)
                setLoading(false)
            })

    }
    const createPostBodyTeacher = () => {
        setLoading(true);
        axios.post("http://localhost:3001/transactions", ({ "name": selectedTeacher, "typeofperson": selectedOption, "personid": getSelectedTeacherData().id, "phonenumber": getSelectedTeacherData().phonenumber, "amount": paymentAmount, "amounttype": paymentMethod, "typeofamount": "expense" })).then(
            console.log("Transaction Successfull"),
            setLoading(false)
        ).then(() => {
            setLoading(false);
            notification.success({
                message: "Transaction Successful",
                placement: 'top'
            });
        })
            .catch((error) => {
                setLoading(false);
                notification.error({
                    message: "Transaction Failed",
                    description: error.message,
                    placement: 'top'
                })
            })
        console.log({ "name": selectedTeacher, "typeofperson": selectedOption, "personid": getSelectedTeacherData().id, "phonenumber": getSelectedTeacherData().phonenumber, "amount": paymentAmount, "amounttype": paymentMethod, "typeofamount": "expense" })
        setPaymentAmount(0)
        setLoading(true);
        axios.put(`http://localhost:3001/teachers/findteacher/${getSelectedTeacherData().id}`, { "paidsalary": (parseInt(paymentAmount) + parseInt(getSelectedTeacherData().paidsalary)) }).then(
            console.log("Teacher Paid Salary Successfully Updated", getSelectedTeacherData().id), setLoading(false), console.log(loading, "loading 2")).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        getStudentData();
        getTeacherData()

    }, [paymentAmount])
    //Student section
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setSelectedBatchname(null);
        setSelectedStudent(null);
    };

    const handleBatchnameSelect = (event) => {
        setSelectedBatchname(event);
        setSelectedStudent(null);
    };

    const handleStudentSelect = (event) => {
        setSelectedStudent(event);
    };

    const handlePaymentAmountChange = (event) => {
        setPaymentAmount(event.target.value);
    };

    const getBatchnameOptions = () => {
        return studentData.map((data, index) => (
            <Select.Option key={index} value={data.batchname}>{data.batchname}</Select.Option>
        ));
    };

    const getStudentOptions = () => {
        const batchnameData = studentData.find(data => data.batchname === selectedBatchname);
        return batchnameData.students.map((student, index) => (
            <Select.Option key={index} value={student.name}>{student.name}</Select.Option>
        ));
    };

    const getSelectedStudentData = () => {
        if (!selectedStudent) {
            return null;
        }
        const batchnameData = studentData.find(data => data.batchname === selectedBatchname);
        return batchnameData.students.find(student => student.name === selectedStudent);
    };

    //Teacher Section
    const handleTeacherSelect = (event) => {
        setSelectedTeacher(event);
    };
    const getTeacherOptions = () => {
        return teacherData.map((teacher, index) => (
            <Select.Option key={index} value={teacher.name}>{teacher.name}</Select.Option>
        ));
    };
    const getSelectedTeacherData = () => {
        if (!selectedTeacher) {
            return null;
        }
        return teacherData.find(teacher => teacher.name === selectedTeacher);
    };

    return (
        <div className="dashboard-content-wrapper">
            <div className="dashboard-content-wrap">
                <div className="page-title">
                    <h2 className="page-heading">Transaction</h2>
                </div>
                <div className="container">
                    <div className="personal_detail_section">
                        <div className="section_title">

                            <h3>Personal Detail</h3>
                        </div>
                        <Row gutter={12} className="section_detail">
                            <Col span={24} lg={24} md={12} sm={12} xs={24} flex="400px" className="section_info">
                                <div className="info_title">
                                    <h4>Type</h4>
                                </div>
                                <div className="info_input">
                                    <Select style={{ width: "200px" }} defaultValue={'student'} onChange={(e) => {
                                        setSelectedOption(e);
                                        setSelectedBatchname(null);
                                        setSelectedStudent(null)
                                        setSelectedTeacher(null)

                                    }}>
                                        <Select.Option value={'student'}>Student</Select.Option>
                                        <Select.Option value={'teacher'}>Teacher</Select.Option>
                                    </Select>
                                </div>
                            </Col>

                            {selectedOption === 'student' && (

                                <Col span={24} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info batchsection">
                                    <div >
                                        <div className="info_title">
                                            <h4>Batch Name</h4>
                                        </div>
                                        <Select style={{ width: "200px" }} value={selectedBatchname} onChange={handleBatchnameSelect}>
                                            <Select.Option value="">Select Batchname</Select.Option>
                                            {getBatchnameOptions()}
                                        </Select>
                                    </div>
                                    {selectedBatchname && (
                                        <div>
                                            <div className="info_title">
                                                <h4>Student Name</h4>
                                            </div>
                                            <Select style={{ width: "200px" }} onChange={handleStudentSelect} value={selectedStudent}>
                                                <Select.Option value="">Select Student</Select.Option>
                                                {getStudentOptions()}
                                            </Select>
                                        </div>

                                    )}
                                </Col>

                            )}
                            {selectedOption === 'teacher' && (

                                <Col span={24} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info batchsection">
                                    <div >
                                        <div className="info_title">
                                            <h4>Teacher Name</h4>
                                        </div>
                                        <Select style={{ width: "200px" }} value={selectedTeacher} onChange={handleTeacherSelect}>
                                            <Select.Option value="">Select Teacher</Select.Option>
                                            {getTeacherOptions()}
                                        </Select>
                                    </div>
                                </Col>
                            )}
                        </Row>

                        {selectedStudent && (
                            <div>
                                <div className="admission_detail_section " style={{ marginTop: "30px" }}>
                                    <div className="section_title">
                                        <h3>Admission Details</h3>
                                    </div>
                                    <div className="section_info transaction_flex">
                                        <div className='blockmargin' >
                                            <div className="info_title">
                                                <h4>Name</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={selectedStudent} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                        <div className='blockmargin' style={{ marginRight: "8%" }}>
                                            <div className="info_title ">
                                                <h4>Total Fee</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={getSelectedStudentData().fee} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                        <div className='blockmargin' >
                                            <div className="info_title">
                                                <h4>Mobile Number</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={getSelectedStudentData().phonenumber} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section_info transaction_flex">
                                        <div className='blockmargin' >
                                            <div className="info_title">
                                                <h4>Total Paid Fee</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={getSelectedStudentData().paidfee} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admission_detail_section " style={{ marginTop: "30px" }}>
                                    <div className="section_title" >
                                        <h3>Payment Details</h3>
                                    </div>
                                    <div className="section_info transaction_flex">
                                        <div className='blockmargin'>
                                            <div className="info_title">
                                                <h4>Payment Amount</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} type="text" value={paymentAmount} onChange={handlePaymentAmountChange} />
                                            </div>
                                        </div>
                                        <div className='blockmargin'>
                                            <div className="info_title">
                                                <h4>Type</h4>
                                            </div>
                                            <div className="info_input">
                                                <Select style={{ width: "200px" }} defaultValue={'cash'} onChange={(e) => {
                                                    setPaymentMethod(e);

                                                }}>
                                                    <Select.Option value={'cash'}>Cash</Select.Option>
                                                    <Select.Option value={'upi'}>UPI</Select.Option>
                                                    <Select.Option value={'cheque'}>Cheque</Select.Option>
                                                </Select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="admission_detail_section " style={{ marginTop: "30px" }}>
                                    <div className="buttons">
                                        <button className="submit" onClick={createPostBodyStudent}>
                                            <span className="btnText">Submit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        )}
                        {selectedTeacher && (
                            <div>
                                <div className="admission_detail_section " style={{ marginTop: "30px" }}>
                                    <div className="section_title">
                                        <h3>Teacher Details</h3>
                                    </div>
                                    <div className="section_info transaction_flex">
                                        <div className='blockmargin' >
                                            <div className="info_title">
                                                <h4>Name</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={selectedTeacher} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                        <div className='blockmargin' style={{ marginRight: "8%" }}>
                                            <div className="info_title ">
                                                <h4>Total Salary</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={getSelectedTeacherData().salary} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                        <div className='blockmargin' >
                                            <div className="info_title">
                                                <h4>Mobile Number</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={getSelectedTeacherData().phonenumber} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section_info transaction_flex">
                                        <div className='blockmargin' >
                                            <div className="info_title">
                                                <h4>Total Paid Salary</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input value={getSelectedTeacherData().paidsalary} disabled className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="admission_detail_section " style={{ marginTop: "30px" }}>
                                    <div className="section_title" >
                                        <h3>Payment Details</h3>
                                    </div>
                                    <div className="section_info transaction_flex">
                                        <div className='blockmargin'>
                                            <div className="info_title">
                                                <h4>Payment Amount</h4>
                                            </div>
                                            <div className="info_input blockmargininput">
                                                <input className="personal-information-single-field w-input w-custom" style={{
                                                    padding: "0 11px", width: "200px",
                                                    height: "32px"
                                                }} type="text" value={paymentAmount} onChange={handlePaymentAmountChange} />
                                            </div>
                                        </div>
                                        <div className='blockmargin'>
                                            <div className="info_title">
                                                <h4>Type</h4>
                                            </div>
                                            <div className="info_input">
                                                <Select style={{ width: "200px" }} defaultValue={'cash'} onChange={(e) => {
                                                    setPaymentMethod(e);

                                                }}>
                                                    <Select.Option value={'cash'}>Cash</Select.Option>
                                                    <Select.Option value={'upi'}>UPI</Select.Option>
                                                    <Select.Option value={'cheque'}>Cheque</Select.Option>
                                                </Select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="admission_detail_section " style={{ marginTop: "30px" }}>
                                    <div className="buttons">
                                        <button className="submit" onClick={createPostBodyTeacher}>
                                            <span className="btnText">Submit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        )}




                    </div>

                </div>
                <div style={{ marginTop: "40px" }}>
                    <TransactionTable loading={paymentAmount} />
                </div>
            </div>
        </div >
    )
}

export default Transaction