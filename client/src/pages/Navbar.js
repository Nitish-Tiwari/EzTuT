import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../css/navbar.css'
import eztutlogo from '../images/Eztut-logo.png'
import profile from '../images/Nitish Tiwari.jpg'
import studentlogo from '../images/students.png'
import teacherlogo from '../images/teachers.png'
import registrationlogo from "../images/registration.png"
const Navbar = () => {
    const mystyle = {
        width: "30px",
        height: "30px"
    }
    const logostyle = {
        width: "100%",
        height: "100%",
        objectfit: "cover"
    }
    const navlinkstyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#041437" : "",
            color: isActive ? "#fff" : "",
        }
    }
    return (
        <>
            <div className="topbar-wrapper">
                <div className="header-content">
                    <div
                        data-w-id="feb4e242-1220-8af5-1e7f-0dffdb362104"
                        className="mobile-menu-bar-wrap"
                    >
                        <img
                            src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/6220c2b492ca1738f08b5e52_Bar.svg"
                            loading="lazy"
                            alt="bar"
                        />
                    </div>
                    <div />
                    <div className="profile-wrapper">
                        <div>
                            <div
                                data-hover="false"
                                data-delay={0}
                                data-w-id="feb4e242-1220-8af5-1e7f-0dffdb36210e"
                                className="dropdown w-dropdown"
                            >
                                <div className="dropdown-button w-dropdown-toggle">
                                    <div className="profile-image">
                                        <img
                                            src={profile}
                                            loading="lazy"
                                            alt="profile"
                                        />
                                    </div>
                                    <div>
                                        <div className="welcome">Welcome</div>
                                        <div className="dropdown-button-text">Nitish Tiwari</div>
                                        <div className="dropdown-icon w-icon-dropdown-toggle" />
                                    </div>
                                </div>
                                <nav className="profile-dropdown-list w-dropdown-list">
                                    {/* <a
                                        to="/sign-in"

                                        className="list-item mr w-inline-block"
                                    >
                                        <img
                                            src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7cef537961e9814594b19_Profile-Log-out.svg"
                                            loading="lazy"
                                            alt=""
                                            className="user"
                                        />
                                        <div className="item-text mr">Log Out</div>
                                    </a> */}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="side-navbar-wrapper">
                <div className="sidebar-logo-wrapper">
                    <Link to="/" className="w-inline-block">
                        <img
                            src={eztutlogo}
                            loading="lazy"
                            alt=""
                            style={logostyle}
                        />
                    </Link>
                    <div
                        data-w-id="caf85816-cde5-265d-906a-b3c2a6263d92"
                        className="mobile-menu-close"
                    >
                        <img
                            src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/6220c2b5824a69731d637f24_Colos.svg"
                            loading="lazy"
                            alt=""
                        />
                    </div>
                </div>
                <div className="sidebar-nav-links-wrapper">
                    <NavLink
                        style={navlinkstyle}
                        to="/dashboard"
                        className="single-nav-link-wrapper w-inline-block"
                    >
                        <img
                            src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7d4fa2893455f2286e646_Sidebar-Icon-1.svg"
                            loading="lazy"
                            alt='Sidebar'
                            className="single-nav-link-icon"
                        />
                        <div className="single-nav-link-text">Dashboard</div>
                    </NavLink>
                    <NavLink style={navlinkstyle} to="/registration" className="single-nav-link-wrapper w-inline-block">
                        <img
                            src={registrationlogo}
                            loading="lazy"
                            alt=""
                            className="single-nav-link-icon"
                            style={mystyle}

                        />
                        <div className="single-nav-link-text">Registration</div>
                    </NavLink>
                    <NavLink style={navlinkstyle} to="/students" className="single-nav-link-wrapper w-inline-block">
                        <img
                            src={studentlogo}
                            loading="lazy"
                            alt=""
                            className="single-nav-link-icon"
                            style={mystyle}

                        />
                        <div className="single-nav-link-text">Students</div>
                    </NavLink>
                </div>
                <NavLink style={navlinkstyle} to="/tranactions" className="single-nav-link-wrapper w-inline-block">
                    <img
                        src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7cef5f00066b11ff9a458_Sidebar-Icon-5.svg"
                        loading="lazy"
                        alt=""
                        className="single-nav-link-icon"
                    />
                    <div className="single-nav-link-text">Transaction</div>
                </NavLink>
                <NavLink style={navlinkstyle} to="/teachers" className="single-nav-link-wrapper w-inline-block">
                    <img
                        src={teacherlogo}
                        loading="lazy"
                        alt=""
                        className="single-nav-link-icon"
                        style={mystyle}
                    />
                    <div className="single-nav-link-text">Teachers</div>
                </NavLink>
                <NavLink style={navlinkstyle} to="/reminder" className="single-nav-link-wrapper w-inline-block">
                    <img
                        src="https://api.iconify.design/mdi/cellphone-message.svg?color=%2385b6ff&width=30&height=30"
                        loading="lazy"
                        alt=""
                        className="single-nav-link-icon"
                    />
                    <div className="single-nav-link-text">Reminder</div>
                </NavLink>
                <NavLink style={navlinkstyle} to="/profile" className="single-nav-link-wrapper w-inline-block">
                    <img
                        src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61f7cef519a9c045d4db964d_Sidebar-Icon-7.svg"
                        loading="lazy"
                        alt=""
                        className="single-nav-link-icon"
                    />
                    <div className="single-nav-link-text">Profile</div>
                </NavLink>

            </div>
        </>
    )
}

export default Navbar