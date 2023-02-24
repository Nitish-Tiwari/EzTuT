import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, notification, Modal } from 'antd';
import "../css/createstudent.css"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button, Form as Formantd } from "antd"
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import EditModelTeacher from './EditModelTeacher.js';
const Teacher = () => {
    let location = useNavigate();
    const initialValues = {
        name: "",
        age: "",
        phonenumber: "",
        gender: "",
        subjects: "",
        salary: "",
        paidsalary: 0,
        email: ""
    };
    const [form] = Formantd.useForm()
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Please Enter a Name"),
        age: Yup.number().required("Please Enter a Age"),
        phonenumber: Yup.number().required("Please Enter a Phone Number"),
        gender: Yup.string().required("Please Select Gender"),
        subjects: Yup.string().required("Please Select Subjects"),
        salary: Yup.number().required("Please Enter the Salary"),
        email: Yup.string().email('Invalid email').required('Please Enter a Email')
    });
    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [selectedTeacherId, setSelectedTeacherId] = useState('')
    const onSubmit = (data, { resetForm }) => {
        setLoading(true)
        console.log(data)

        console.log(loading)
        axios.post("http://localhost:3001/teachers", data).then((respose) => {
            console.log("data")
            setLoading(false)
        }).then(
            notification.success({
                message: 'Success',
                description: "Teacher data saved successfully",
                placement: "top"
            }),

            resetForm()
        ).catch((err) => {
            notification.error(
                {
                    message: "Error",
                    description: err,
                    placement: "top"
                }
            )
        })


    };
    const [listofTeachers, setListofTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState([]);


    const getTeachers = async () => {
        setLoading(true)
        console.log(loading, "loading ha")
        axios.get("http://localhost:3001/teachers").then((respose) => {
            setListofTeachers(respose.data);
            setFilteredTeachers(respose.data);

        })
        setLoading(false)



    }
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Age",
            selector: (row) => row.age,
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
        },
        {
            name: "Mobile Number",
            selector: (row) => row.phonenumber,
        },
        {
            name: "Email Address",
            selector: (row) => row.email,
        },
        {
            name: "Subjects",
            selector: (row) => row.subjects,
        },
        {
            name: "Salary",
            selector: (row) => row.salary,
        },
        {
            name: "Salray Paid",
            selector: (row) => row.paidsalary
        },
        {
            name: "Joined on",
            selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
        }, {
            name: "Action",
            cell: row =>
                <div>
                    <Button style={{ backgroundColor: "red", color: "white" }} onClick={showModalDelete}><CloseOutlined /></Button>
                    <Button type='primary' onClick={() => showModal(row)}><EditOutlined /></Button>
                    <Modal
                        title="Confirm Delete"
                        open={visibleDelete}
                        onCancel={handleCancelDelete}
                        footer={[
                            <Button key="cancel" onClick={handleCancelDelete}>
                                Cancel
                            </Button>,
                            <Button key="delete" type="primary" loading={loading} onClick={() => handleDelete(row.id)}>
                                Delete
                            </Button>,
                        ]}
                    >
                        <p>Are you sure you want to delete this teacher data?</p>
                    </Modal>
                </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    const [visibleDelete, setVisibleDelete] = useState(false);
    const showModalDelete = () => {
        setVisibleDelete(true);
    };

    const handleCancelDelete = () => {
        setVisibleDelete(false);
    };
    const showModal = (value) => {
        setVisible(true)
        setSelectedTeacherId(value.id)
        form.setFieldsValue({
            name: value.name,
            gender: value.gender,
            subjects: value.subjects,
            phonenumber: value.phonenumber,
            email: value.email,
            salary: value.salary
        })


    };
    const handleCreate = values => {

        form.resetFields();
        setLoading(true)
        editTeacher(values)


        setVisible(false);


    };
    const handleCancel = () => {


        form.resetFields();
        setVisible(false);


    };

    const handleDelete = async (id) => {
        setLoading(true);

        try {
            await axios.delete(`http://localhost:3001/teachers/findteacher/${id}`).then(
                notification.success({
                    message: 'Success',
                    description: "Teacher data deleted successfully",
                    placement: "top"
                })
            )
            setLoading(false);
            console.log(id)
        } catch (error) {
            setLoading(false);
            notification.error(
                {
                    message: "Error",
                    description: error,
                    placement: "top"
                }
            )
            console.log(error.message);
        }
        setVisibleDelete(false);
    };
    const editTeacher = async (vales) => {
        console.log(loading, "loading value 1")
        axios.put(`http://localhost:3001/teachers/findteacher/${selectedTeacherId}`, vales).then(
            console.log("Teacher Successfully Updated", selectedTeacherId,), setLoading(false), console.log(loading, "loading 2")).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getTeachers();
    }, [loading, visible]);
    useEffect(() => {
        const result = listofTeachers.filter((teacher) => {
            return teacher.name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilteredTeachers(result);
    }, [search]);
    createTheme('solarized', {
        text: {
            primary: 'black',
            secondary: 'black',
        },
        background: {
            default: '#ffffff',
            borderRadius: "10px"
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        button: {
            default: 'black',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(160, 160, 160, .34)'

        },

        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },

    }, 'dark');
    return (

        <div className="App">
            <div className='page-wrapper' >
                <div className="dashboard-content-wrapper" >
                    <div className="dashboard-content-wrap">
                        <div className="container_main">
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
                                                    <Field autoComplete="off" id="inputCreateTeacher" name="name" className="personal-information-single-field w-input"
                                                        placeholder="Nitish" />
                                                </div>
                                            </Col>

                                            <Col span={6} lg={12} md={12} sm={12} xs={24} flex="350px" className="section_info">
                                                <div className="info_title">
                                                    <h4>Age</h4>
                                                </div>
                                                <div className="info_input">
                                                    <ErrorMessage name='age' component="span" />
                                                    <Field autoComplete="off" id="inputCreateTeacher" name="age" className="personal-information-single-field w-input" placeholder="21" />
                                                </div>
                                            </Col>

                                            <Col span={6} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                                <div className="info_title">
                                                    <h4>Gender</h4>
                                                </div>
                                                <ErrorMessage name='gender' component="span" />
                                                <div className="info_input">
                                                    <label className='labelgender'>
                                                        <Field autoComplete="off" id="inputCreateTeacher" className="radiocircle" type="radio" name="gender"
                                                            value="male" />
                                                        Male
                                                    </label>
                                                    <label className='labelgender'>
                                                        <Field autoComplete="off" id="inputCreateTeacher" className="radiocircle" type="radio" name="gender"
                                                            value="female" />
                                                        Female
                                                    </label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="Job_detail_section">
                                        <div className="section_title">
                                            <h3>Job Details</h3>
                                        </div>

                                        <Row gutter={12} className="section_detail">
                                            <Col span={6} lg={12} md={12} sm={12} xs={24} flex="350px" className="section_info">
                                                <div className="info_title">
                                                    <h4>Phone Number</h4>
                                                </div>
                                                <div className="info_input">
                                                    <ErrorMessage name='phonenumber' component="span" />
                                                    <Field autoComplete="off" id="inputCreateTeacher" name="phonenumber" className="personal-information-single-field w-input" placeholder="9999999" />
                                                </div>
                                            </Col>
                                            <Col span={6} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                                <div className="info_title">
                                                    <h4>Subjects</h4>
                                                </div>
                                                <div className="info_input">
                                                    <ErrorMessage name='subjects' component="span" />
                                                    <Field autoComplete="off" id="inputCreateTeacher" name="subjects" className="personal-information-single-field w-input"
                                                        placeholder="SS Math" />
                                                </div>
                                            </Col>

                                            <Col span={6} lg={12} md={12} sm={12} xs={24} flex="auto" className="section_info">
                                                <div className="info_title">
                                                    <h4>Salary</h4>
                                                </div>
                                                <div className="info_input">
                                                    <ErrorMessage name='salary' component="span" />
                                                    <Field autoComplete="off" id="inputCreateTeacher" name="salary" placeholder="(Ex. 100000)..." className="personal-information-single-field w-input" />
                                                    <Field autoComplete="off" id="inputCreateStudent" name="paidsalary" type="hidden" />

                                                </div>
                                            </Col>
                                        </Row>
                                        <Row gutter={12} className="section_detail">
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
                                    <div className="buttons">
                                        <button className="submit" type="submit">
                                            <span className="btnText">Submit</span>
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        <div className='datatablestyle' style={{ marginTop: "40px" }}>
                            <EditModelTeacher
                                open={visible}
                                onCreate={handleCreate}
                                onCancel={handleCancel}
                                // initialValues={{ selectedStudent }}
                                form={form}
                            />
                            <DataTable
                                title="Teachers List"
                                columns={columns}
                                data={filteredTeachers}
                                onRowClicked={(record, rowIndex) => {
                                    location(`/teacher/${record.id}`)
                                }}
                                pagination
                                fixedHeader
                                theme="solarized"
                                fixedHeaderScrollHeight='450px'

                                selectableRowsHighlight
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <input
                                        type="text"
                                        placeholder='Search here'
                                        className='w-25 form-control'
                                        style={{
                                            borderRadius: "5px",

                                            borderStyle: "solid",
                                            padding: "5px"
                                        }}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                }

                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >);
}

export default Teacher