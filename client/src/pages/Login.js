import React, { useEffect, useState } from 'react'
import "../css/loginpage.css"
import { Col, message, notification, Row } from 'antd'; import * as Yup from 'yup';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Eztut-logo.png'
import useMessage from 'antd/es/message/useMessage.js';
const Login = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate()
    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    };

    let userDetails = JSON.parse(localStorage.getItem("eztutuserDetails"))
    useEffect(() => {
        if (localStorage.getItem("isLogedIn") == 'true') {
            if (localStorage.getItem("eztutuserRole") == 'student') {
                navigate(`/student/${userDetails.id}`)
            }
            else if (localStorage.getItem("eztutuserRole") == 'teacher') {
                navigate(`/dashboard`)
            }
        }
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password, "data")
        if (selectedRole == 'student') {
            axios.post("http://localhost:3001/students/login", { email: email, password: password }).then((response) => {
                console.log("response", response.data)
                localStorage.setItem('eztutuserRole', selectedRole)
                localStorage.setItem('eztutuserDetails', JSON.stringify(response.data))
                localStorage.setItem("isLogedIn", true)
                notification.success({
                    message: 'Success',
                    description: "Student Login successfully",
                    placement: "top"
                })
                navigate(`/student/${response.data.id}`)
            }).catch((err) => {
                console.log(err.response.data, "eroor")
                message.open(
                    {
                        type: 'error',
                        content: err.response.data,
                    }
                )
            })
        }
        if (selectedRole == 'teacher') {
            axios.post("http://localhost:3001/teachers/login", { email: email, password: password }).then((response) => {
                console.log("response", response.data)
                localStorage.setItem('eztutuserRole', selectedRole)
                localStorage.setItem('eztutuserDetails', JSON.stringify(response.data))
                localStorage.setItem("isLogedIn", true)
                notification.success({
                    message: 'Success',
                    description: "Teacher Login successfully",
                    placement: "top"
                })

                navigate(`/dashboard`)
            }).catch((err) => {
                notification.error(
                    {
                        message: "Error",
                        description: err,
                        placement: "top"
                    }
                )
            })
        }
    };

    return (
        <div>
            <div style={{ position: "absolute" }}>
                <img src={logo} alt="logo" height="250px" />
            </div>
            {selectedRole === "" ? (
                <section>
                    <div class="form-box">

                        <div class="form-value"><div>
                            <h2>Login</h2>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                height: "25vh"
                            }}>
                                <button onClick={() => handleRoleSelection("teacher")} className="btn"><img src={'https://api.iconify.design/mdi/human-male-board.svg?width=50'} style={{ marginRight: "18%" }} alt="" /> Teacher</button>
                                <button onClick={() => handleRoleSelection("student")} className="btn"> <img src={'https://api.iconify.design/ph/student.svg?width=50'} style={{ marginRight: "18%" }} alt="" />Student</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>

            ) : (

                <section>

                    <div class="form-box">

                        <div class="form-value" style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <div style={{ marginBottom: "36px" }}>
                                <a to="#" onClick={() => handleRoleSelection("")} style={{ color: "white", cursor: "pointer" }}>Go Back</a>
                            </div>
                            <div>
                                <h2>Login as a {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
                                <form onSubmit={handleLogin}>
                                    <div className="inputbox">
                                        <img src={'https://api.iconify.design/ic/outline-email.svg?color=white'} style={{
                                            right: "0",
                                            position: "absolute",
                                            bottom: "10px"
                                        }} alt="" />
                                        <input type="email" name="email" required />
                                        <label>Email</label>
                                    </div>
                                    <div className="inputbox">
                                        <img src={'https://api.iconify.design/mdi/password.svg?color=white'} style={{
                                            right: "0",
                                            position: "absolute",
                                            bottom: "10px"
                                        }} alt="" />
                                        <input type="password" name="password" required />
                                        <label>Password</label>
                                    </div>
                                    <button type="submit" className="submitbtnlogin">Log in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Login;