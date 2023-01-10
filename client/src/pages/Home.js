import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component"
const Home = () => {
    const [listofStudents, setListofStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const getStudents = async () => {
        axios.get("http://localhost:3001/students").then((respose) => {
            setListofStudents(respose.data);
            setFilteredStudents(respose.data);
        })
    }
    const columns = [
        {
            name: "Name",
            selector: (row) => row.Name,
            sortable: true,
        },
        {
            name: "Age",
            selector: (row) => row.Age,
        },
        {
            name: "Gender",
            selector: (row) => row.Gender,
        },
        {
            name: "Class",
            selector: (row) => row.Class,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.Address,
        },
        {
            name: "Fees",
            selector: (row) => row.Fee,
        },
        {
            name: "Joined on",
            selector: (row) => row.createdAt,
        },



    ];
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
    }, []);
    useEffect(() => {
        const result = listofStudents.filter((student) => {
            return student.Name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilteredStudents(result);
    }, [search]);
    return (
        <div className="App">
            <div className='page-wrapper'>
                <DataTable

                    theme="solarized"
                    columns={columns}
                    data={filteredStudents}
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
        </div>);
}

export default Home