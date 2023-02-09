import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'antd';
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
    });
    const [selectedTeacher, setSelectedTeacher] = useState('')
    const [selectedTeacherId, setSelectedTeacherId] = useState('')
    const onSubmit = (data) => {
        setLoading(true)
        console.log(data)

        console.log(loading)
        axios.post("http://localhost:3001/teachers", data).then((respose) => {
            console.log("data")
            setLoading(false)
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
            name: "Subjects",
            selector: (row) => row.subjects,
        },
        {
            name: "Salary",
            selector: (row) => row.salary,
        },
        {
            name: "Joined on",
            selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
        }, {
            name: "Action",
            cell: row =>
                <div>
                    <Button style={{ backgroundColor: "red", color: "white" }} onClick={() => handleDelete(row.id)}><CloseOutlined /></Button>
                    <Button type='primary' onClick={() => showModal(row)}><EditOutlined /></Button>
                </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    const showModal = (value) => {
        setVisible(true)
        setSelectedTeacherId(value.id)
        form.setFieldsValue({
            name: value.name,
            gender: value.gender,
            subjects: value.subjects,
            phonenumber: value.phonenumber,
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
            await axios.delete(`http://localhost:3001/teachers/findteacher/${id}`);
            setLoading(false);
            console.log(id)
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
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
                        <div style={{ marginTop: "40px" }}>
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
                                selectableRows
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