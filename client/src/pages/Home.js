import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component"
import "../css/createstudent.css"
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button } from "antd"
import { CloseOutlined } from '@ant-design/icons';
const Home = () => {
    const [listofStudents, setListofStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const getStudents = async () => {
        axios.get("http://localhost:3001/students").then((respose) => {
            setListofStudents(respose.data);
            setFilteredStudents(respose.data);
            console.log("data fetched")
        })
    }
    let location = useNavigate();
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
            name: "Joined on",
            selector: (row) => moment(row.createdAt).format('DD/MM/YYYY'),
        },
        {
            name: "Action",
            cell: row => <Button type='danger' onClick={() => handleDelete(row.id)}><CloseOutlined /></Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];
    const handleDelete = async (id) => {
        setLoading(true);

        try {
            await axios.delete(`http://localhost:3001/students/findstudent/${id}`);
            setLoading(false);
            console.log(id)
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    };
    createTheme('solarized', {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
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
    }, [loading]);
    useEffect(() => {
        const result = listofStudents.filter((student) => {
            return student.name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilteredStudents(result);
    }, [search]);

    return (
        <div className="page-wrapper">
            <div className="dashboard-content-wrapper" >
                <div className="dashboard-content-wrap">
                    <div className="page-title">
                        <h2 className="page-heading">Students</h2>
                    </div>
                    <div className="create-onvoice-form-wrapper">
                        <div className="personal-information-wrapper">

                            <div className="personal-information-form-wrapper">

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
                                    selectableRows
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
                                            style={{ borderRadius: "10px" }}

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