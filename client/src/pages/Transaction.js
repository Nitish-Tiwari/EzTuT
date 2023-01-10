import axios from 'axios';
import '../css/createstudent.css';
import React, { useState, useEffect } from 'react'

const Transaction = () => {
    const [students, setstudents] = useState([]);
    const [selectedStudent, setselectedStudent] = useState('');
    const [selectedStudentId, setselectedStudentId] = useState('');
    const [teachers, setteachers] = useState([]);
    const [tracstype, settracstype] = useState('student');
    const [selectedTeacher, setselectedTeacher] = useState('');
    const [selectedTeacherId, setselectedTeacherId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const getstudents = async () => {
        axios.get("http://localhost:3001/students").then((respose) => {
            setstudents(respose.data.map(student => student))
            console.log(respose.data.map(student => student))

        })
    }
    const getteachers = async () => {
        axios.get("http://localhost:3001/teachers").then((respose) => {
            setteachers(respose.data.map(teacher => teacher))
            console.log(respose.data.map(teacher => teacher))

        })
    }

    const teacherstyle = {
        marginTop: "150px",
        display: "flex",
        alignItems: "flexStart",
        marginLeft: "310px"
    }
    const handleChange = (event) => {
        settracstype(event.target.value);
    }
    const selectChange = (event) => {
        setselectedStudentId(event.target.value)
    }
    const selectChangeTeacher = (event) => {
        setselectedTeacherId(event.target.value)
    }
    let content;
    if (tracstype === 'student') {
        content =
            <div >
                <label>Full Name</label>
                <select value={selectedStudentId} onChange={selectChange}>
                    {students.map((student) => (
                        <option key={student.id} value={student.id} >
                            {student.Name}

                            {console.log(student.id)}
                        </option>

                    ))}

                </select>
                {console.log(selectedStudent)}
                {selectedStudent && (
                    <div>
                        <h2>Selected Student</h2>
                        <p>ID: {selectedStudent.id}</p>
                        <p>Fees: {selectedStudent.Fee}</p>
                        <p>Class: {selectedStudent.Class}</p>
                        <p>Age: {selectedStudent.Age}</p>
                    </div>
                )}

            </div>
    }
    else if (tracstype === 'teacher') {
        content =
            <div >
                <label>Full Name</label>
                <select value={selectedTeacherId} onChange={selectChangeTeacher}>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.Name}
                        </option>
                    ))}
                </select>
                {console.log(selectedTeacher)}
                {selectedTeacher && (
                    <div>
                        <h2>Selected Teacher</h2>
                        <p>ID: {selectedTeacher.id}</p>
                        <p>Salary: {selectedTeacher.Salary}</p>
                        <p>Subjects: {selectedTeacher.Subjects}</p>
                        <p>Age: {selectedTeacher.Age}</p>
                    </div>
                )}
            </div>

    }
    useEffect(() => {
        getstudents();
        getteachers();
    }, [])
    useEffect(() => {
        const getstudentid = async () => {
            setIsLoading(true);
            axios.put(`http://localhost:3001/students/findstudent/${selectedStudentId}`).then((respose) => {
                setselectedStudent(respose.data)
            })
            setIsLoading(false);
        }
        if (selectedStudentId) {
            getstudentid();
        }
    }, [selectedStudentId])
    useEffect(() => {
        const getteacherid = async () => {
            setIsLoading(true);
            axios.put(`http://localhost:3001/teachers/findteacher/${selectedTeacherId}`).then((respose) => {
                setselectedTeacher(respose.data)
            })
            setIsLoading(false);
        }
        if (selectedTeacherId) {
            getteacherid();
        }
    }, [selectedTeacherId])

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <div className="App">
                <div className='page-wrapper' style={teacherstyle}>
                    <div className="container">
                        <header>Transactions</header>
                        <div className="form first">
                            <div className="details personal">
                                <span className="title">Personal Details</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <form>
                                            <label>Enter the Type</label>
                                            <select value={tracstype} onChange={handleChange}>
                                                <option value='student'>Students</option>
                                                <option value='teacher'>Teacher</option>
                                            </select>
                                        </form>
                                        {content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction