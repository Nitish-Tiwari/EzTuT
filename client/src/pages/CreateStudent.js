import React from 'react'
import "../css/createstudent.css"
import { Col, Row } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const CreateStudent = () => {
    const initialValues = {
        name: "",
        age: "",
        gender: "",
        class: "",
        address: "",
        fee: "",
        phonenumber: "",
        batchname: "",
        paidfee: 0,
        email: ""

    };
    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3001/students", data).then((respose) => {
            console.log("data")
            console.log(data)
        })
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Please Enter a Name"),
        age: Yup.number().required("Please Enter a Age"),
        gender: Yup.string().required("Please select Gender"),
        class: Yup.number().required("Please Select a Class"),
        address: Yup.string().required("Please Enter a Address"),
        fee: Yup.number().required("Please Enter the Fee Amount"),
        phonenumber: Yup.number().required("Please Enter the Phone Number"),
        batchname: Yup.string().required("Please Enter a Batch Name"),
        email: Yup.string().email('Invalid email').required('Please Enter a Email')
    });
    return (
        <div className="page-wrapper">
            <div className="dashboard-content-wrapper">
                <div className="dashboard-content-wrap">
                    <div className="page-title">
                        <h2 className="page-heading">Registration</h2>
                    </div>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form className='container'>
                            <div className="personal_detail_section">
                                <div className="section_title">
                                    <h3>Personal Detail</h3>
                                </div>
                                <Row gutter={12} className="section_detail">
                                    <Col span={12} lg={12} md={12} sm={12} xs={24} flex="350px" className="section_info">
                                        <div className="info_title">
                                            <h4>Full Name</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='name' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="name" className="personal-information-single-field w-input"
                                                placeholder="Nitish" />
                                        </div>
                                    </Col>
                                    <Col span={6} lg={12} md={12} sm={12} xs={24} flex="350px" className="section_info">
                                        <div className="info_title">
                                            <h4>Age</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='age' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="age" className="personal-information-single-field w-input" placeholder="21" />
                                        </div>
                                    </Col>
                                    <Col span={6} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                        <div className="info_title">
                                            <h4>Gender</h4>
                                        </div>
                                        <ErrorMessage name='gender' component="span" />
                                        <div className="info_input">
                                            <label className='labelgender'>
                                                <Field autoComplete="off" id="inputCreateStudent" className="radiocircle" type="radio" name="gender"
                                                    value="male" />
                                                Male
                                            </label>
                                            <label className='labelgender'>
                                                <Field autoComplete="off" id="inputCreateStudent" className="radiocircle" type="radio" name="gender"
                                                    value="female" />
                                                Female
                                            </label>
                                        </div>
                                    </Col>

                                </Row>
                                <Row gutter={12} className="section_detail">

                                    <Col span={6} lg={8} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                        <div className="info_title">
                                            <h4>Phone Number</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='phonenumber' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="phonenumber" className="personal-information-single-field w-input" placeholder="999999999" />
                                        </div>
                                    </Col>
                                    <Col span={6} lg={8} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                        <div className="info_title">
                                            <h4>Address</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='address' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="address" className="personal-information-single-field w-input"
                                                placeholder="(Ex. Vastral)..." />
                                        </div>
                                    </Col>
                                    <Col span={6} lg={8} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                        <div className="info_title">
                                            <h4>Email Address</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='email' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="email" className="personal-information-single-field w-input"
                                                placeholder="(Ex. Vastral)..." />
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                            <div className="admission_detail_section">
                                <div className="section_title">
                                    <h3>Admission Details</h3>
                                </div>
                                <Row gutter={12} className="section_detail">
                                    <Col span={6} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                        <div className="info_title">
                                            <h4>Batch Name</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='batchname' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="batchname" className="personal-information-single-field w-input"
                                                placeholder="(Ex. 12)..." />
                                        </div>
                                    </Col>
                                    <Col span={6} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                        <div className="info_title">
                                            <h4>Class</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='class' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="class" className="personal-information-single-field w-input"
                                                placeholder="(Ex. 12)..." />
                                        </div>
                                    </Col>
                                    <Col span={6} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                        <div className="info_title">
                                            <h4>Fee</h4>
                                        </div>
                                        <div className="info_input">
                                            <ErrorMessage name='fee' component="span" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="fee" placeholder="(Ex. 100000)..." className="personal-information-single-field w-input" />
                                            <Field autoComplete="off" id="inputCreateStudent" name="paidfee" type="hidden" />

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="buttons">
                                <button className="submit" type="submit">
                                    <span className="btnText">Submit</span>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

        </div>
    )
}
export default CreateStudent;
