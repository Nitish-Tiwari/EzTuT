import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component"
import "../css/createstudent.css"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from "antd"
import { SendOutlined } from '@ant-design/icons';
import ReminderModel from './ReminderModel.js';
const Home = () => {
    const [listofStudents, setListofStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('')
    const [selectedStudentId, setSelectedStudentId] = useState('')
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const getStudents = async () => {
        axios.get("http://localhost:3001/students").then((respose) => {
            setListofStudents(respose.data);
            setFilteredStudents(respose.data);
            console.log("data fetched")
        })
    }
    const reminderStudent = async (vales) => {
        console.log(loading, "loading value 1")
        axios.post(`http://localhost:3001/students/reminder`, vales).then(
            console.log("Student Reminder Successfully Send", vales.message,), setLoading(false), console.log(loading, "loading 2")).catch((err) => {
                console.log(err)
            })
    }
    let location = useNavigate();
    const [form] = Form.useForm()
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
            name: "Class",
            selector: (row) => row.class,
            sortable: true,
        },
        {
            name: "Phone Number",
            selector: (row) => row.phonenumber,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Batch Name",
            selector: (row) => row.batchname,
            sortable: true,
        },

        {
            name: "Remaining Month",
            selector: (row) => (10 - (parseInt(row.paidfee) / (parseInt(row.fee) / 10))).toFixed(1),
            sortable: true,
            allowOverflow: true,
        },
        {
            name: "Fees",
            selector: (row) => (row.fee).toLocaleString('hi-IN'),
        },
        {
            name: "Paid Fee",
            selector: (row) => (row.paidfee.toLocaleString('hi-IN')),
        },
        {
            name: "Joined on",
            selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
        },
        {
            name: "Action",
            cell: row => <div>
                <Button style={{ backgroundColor: "#031d51b3", color: "white" }} onClick={() => showModal(row)}><SendOutlined /></Button>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    const handleReminder = (data) => {
        console.log(data)
    }
    const showModal = (value) => {
        setVisible(true)
        setSelectedStudentId(value.id)
        form.setFieldsValue({
            from: "kakarotgoku1529@gmail.com",
            to: value.email,
            totalfee: (value.fee).toLocaleString('hi-IN'),
            totalpaidfee: (value.paidfee).toLocaleString('hi-IN'),
            message: "",

        })



    };

    const handleCancel = () => {


        form.resetFields();
        setVisible(false);


    };
    const handleCreate = values => {

        form.resetFields();
        setLoading(true)
        console.log(values)
        reminderStudent(values)

        setVisible(false);


    };
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

    useEffect(() => {
        getStudents();
    }, [loading, visible]);
    useEffect(() => {
        const result = listofStudents.filter((student) => {
            return student.name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilteredStudents(result);
    }, [search]);

    return (

        <div className="page-wrapper">
            <ReminderModel
                open={visible}
                onCreate={handleCreate}
                onCancel={handleCancel}
                // initialValues={{ selectedStudent }}
                form={form}
            />
            <div className="dashboard-content-wrapper" >
                <div className="dashboard-content-wrap" >
                    <div className="page-title">
                        <h2 className="page-heading">Reminder</h2>
                    </div>
                    <div className="create-on(voice-form-wrapper">
                        <div className="personal-information-wrapper">

                            {filteredStudents && (<div className="personal-information-form-wrapper datatablestyle">

                                <DataTable

                                    theme="solarized"

                                    columns={columns}
                                    data={filteredStudents}
                                    onRowDoubleClicked={(record, rowIndex) => {
                                        location(`/student/${record.id}`)
                                    }
                                    }
                                    pagination
                                    fixedHeader
                                    fixedHeaderScrollHeight='450px'
                                    selectableRowsHighlight
                                    highlightOnHover
                                    subHeader
                                    subHeaderComponent={

                                        <input
                                            type="text"
                                            placeholder='Search here'
                                            className='w-25 form-control'
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            style={{
                                                borderRadius: "5px",

                                                borderStyle: "solid",
                                                padding: "5px"
                                            }}

                                        />
                                    }

                                />

                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Home