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
                            {student.name}

                            {console.log(student.id)}
                        </option>

                    ))}

                </select>
                {console.log(selectedStudent)}
                {selectedStudent && (
                    <div>
                        <h2>Selected Student</h2>
                        <p>ID: {selectedStudent.id}</p>
                        <p>Fees: {selectedStudent.fee}</p>
                        <p>Class: {selectedStudent.class}</p>
                        <p>Age: {selectedStudent.age}</p>
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
                            {teacher.name}
                        </option>
                    ))}
                </select>
                {console.log(selectedTeacher)}
                {selectedTeacher && (
                    <div>
                        <h2>Selected Teacher</h2>
                        <p>ID: {selectedTeacher.id}</p>
                        <p>Salary: {selectedTeacher.salary}</p>
                        <p>Subjects: {selectedTeacher.subjects}</p>
                        <p>Age: {selectedTeacher.age}</p>
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
            axios.get(`http://localhost:3001/students/findstudent/${selectedStudentId}`).then((respose) => {
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
            axios.get(`http://localhost:3001/teachers/findteacher/${selectedTeacherId}`).then((respose) => {
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
            <div className="page-wrapper">
                <div className="dashboard-content-wrapper" >
                    <div className="dashboard-content-wrap">
                        <div className="page-title">
                            <h2 className="page-heading">Transaction</h2>
                        </div>
                        <div class="create-onvoice-form-wrapper">
                            <div className="personal-information-wrapper">

                                <div className="personal-information-form-wrapper">

                                    <div className="fields">
                                        <div className="input-field">
                                            <form>
                                                <span className="single-wrapper-common-tittle">Enter The Details</span>
                                                <div >
                                                    <label className="personal-information-single-tittle">Type</label>
                                                    <select value={tracstype} onChange={handleChange}>
                                                        <option value='student'>Students</option>
                                                        <option value='teacher'>Teacher</option>
                                                    </select>
                                                </div>
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
        </div>
    )
}

export default Transaction