import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../css/createstudent.css';
const Teacher = () => {
    const teacherstyle = {
        marginTop: "150px",
        display: "flex",
        alignItems: "flexStart",
        marginLeft: "310px"
    }
    const initialValues = {
        Name: "",
        Age: "",
        Gender: "",
        Subjects: "",
        Salary: "",
    };
    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("Please input a Name"),
        Age: Yup.number().required("Please input a Age"),
        Gender: Yup.string().required("Please select Gender"),
        Subjects: Yup.string().required("Please input Subjects"),
        Salary: Yup.number().required("Please insert Salary"),
    });
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/teachers", data).then((respose) => {
            console.log("data")
        })
    };
    const [listofTeachers, setListofTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const getTeachers = async () => {
        axios.get("http://localhost:3001/teachers").then((respose) => {
            setListofTeachers(respose.data);
            setFilteredTeachers(respose.data);
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
            name: "Subjects",
            selector: (row) => row.Subjects,
        },
        {
            name: "Salary",
            selector: (row) => row.Salary,
        },
        {
            name: "Joined on",
            selector: (row) => row.createdAt,
        },

    ];
    useEffect(() => {
        getTeachers();
    }, []);
    useEffect(() => {
        const result = listofTeachers.filter((teacher) => {
            return teacher.Name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilteredTeachers(result);
    }, [search]);
    return (

        <div className="App">
            <div className='page-wrapper' style={teacherstyle}>

                <div className="container">
                    <header>Registration</header>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

                        <Form>
                            <div className="form first">
                                <div className="details personal">
                                    <span className="title">Personal Details</span>

                                    <div className="fields">
                                        <div className="input-field">
                                            <label>Full Name</label>
                                            <ErrorMessage name='Name' component="span" />
                                            <Field autoComplete="off" id="inputCreateTeacher" name="Name"
                                                placeholder="(Ex. Usha)..." />
                                        </div>

                                        <div className="input-field">
                                            <label>Age</label>
                                            <ErrorMessage name='Age' component="span" />
                                            <Field autoComplete="off" id="inputCreateTeacher" name="Age" placeholder="(Ex. 21)..." />
                                        </div>


                                        <div className="input-field">
                                            <label>Gender</label>
                                            <ErrorMessage name='Gender' component="span" />
                                            <label>
                                                <Field autoComplete="off" id="inputCreateTeacher" type="radio" name="Gender"
                                                    value="male" />
                                                Male
                                            </label>
                                            <label>
                                                <Field autoComplete="off" id="inputCreateTeacher" type="radio" name="Gender"
                                                    value="female" />
                                                Female
                                            </label>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="details admission">
                                <span className="title">Job Details</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <label>Subjects</label>
                                        <ErrorMessage name='Subjects' component="span" />
                                        <Field autoComplete="off" id="inputCreateTeacher" name="Subjects"
                                            placeholder="(Ex. Maths,English,Sci)..." />
                                    </div>

                                    <div className="input-field">
                                        <label>Salary</label>
                                        <ErrorMessage name='Salary' component="span" />
                                        <Field autoComplete="off" id="inputCreateTeacher" name="Salary" placeholder="(Ex. 100000)..." />
                                    </div>
                                </div>

                                <div className="buttons">
                                    <button className="sumbit" type="submit">
                                        <span className="btnText">Submit</span>
                                    </button>
                                </div>
                            </div>

                        </Form>
                    </Formik>
                </div>
                <div style={{ marginLeft: "20px" }}>
                    <DataTable
                        title="Teachers List"
                        columns={columns}
                        data={filteredTeachers}

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
                            />
                        }

                    />
                </div>
            </div>
        </div>);
}

export default Teacher