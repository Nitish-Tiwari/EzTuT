import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component"
import "../css/createstudent.css"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, notification } from "antd"
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import EditModelStudent from './EditModelStudent.js';
const Home = () => {
    const [listofStudents, setListofStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('')
    const [selectedStudentId, setSelectedStudentId] = useState('')
    const [loading, setLoading] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visible, setVisible] = useState(false);
    const getStudents = async () => {
        axios.get("http://localhost:3001/students").then((respose) => {
            setListofStudents(respose.data);
            setFilteredStudents(respose.data);
            console.log("data fetched")
        })
    }
    const editStudent = async (vales) => {
        console.log(loading, "loading value 1")
        axios.put(`http://localhost:3001/students/findstudent/${selectedStudentId}`, vales).then(
            console.log("Student Successfully Updated", selectedStudentId,), setLoading(false), console.log(loading, "loading 2")).catch((err) => {
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
            name: "Batch Name",
            selector: (row) => row.batchname,
            sortable: true,
        },

        {
            name: "Address",
            selector: (row) => row.address,
        },
        {
            name: "Fees",
            selector: (row) => row.fee,
        },
        {
            name: "Paid Fee",
            selector: (row) => row.paidfee,
        },
        {
            name: "Email Address",
            selector: (row) => row.email,
        },
        {
            name: "Joined on",
            selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
        },
        {
            name: "Action",
            cell: row => <div>
                <Button style={{ backgroundColor: "red", color: "white" }} onClick={() => showModelDelete(row)}><CloseOutlined /></Button>
                <Button type='primary' onClick={() => showModal(row)}><EditOutlined /></Button>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    const showModal = (value) => {
        setVisible(true)
        setSelectedStudentId(value.id)
        form.setFieldsValue({
            name: value.name,
            gender: value.gender,
            class: value.class,
            phonenumber: value.phonenumber,
            batchname: value.batchname,
            address: value.address,
            fee: value.fee,
            email: value.email
        })



    };
    const showModelDelete = (value) => {
        setVisibleDelete(true)
        setSelectedStudent(value)

    }

    const handleCancel = () => {


        form.resetFields();
        setVisible(false);
        setVisibleDelete(false)


    };
    const handleCreate = values => {

        form.resetFields();
        setLoading(true)
        editStudent(values)


        setVisible(false);


    };
    const handleDelete = async () => {
        setLoading(true);
        console.log(loading, "delete loading")
        try {
            await axios.delete(`http://localhost:3001/students/findstudent/${selectedStudent.id}`);
            setLoading(false);
            console.log(selectedStudent.id)
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
        setVisibleDelete(false)
        notification.success({
            message: 'Student Deleted',
            description: `The ${selectedStudent.name} profile was successfully deleted`,
            placement: 'top'
        });
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
            <EditModelStudent
                open={visible}
                onCreate={handleCreate}
                onCancel={handleCancel}
                // initialValues={{ selectedStudent }}
                form={form}
            />
            <Modal
                open={visibleDelete}
                title="Confirm Delete"
                onOk={handleDelete}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleDelete}>
                        Confirm
                    </Button>,
                ]}
            >
                <p>Are you sure you want to delete this Student Data?</p>
            </Modal>
            <div className="dashboard-content-wrapper" >
                <div className="dashboard-content-wrap">
                    <div className="page-title">
                        <h2 className="page-heading">Students</h2>
                    </div>
                    <div className="create-onvoice-form-wrapper">
                        <div className="personal-information-wrapper">

                            <div className="personal-information-form-wrapper datatablestyle">

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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default Home