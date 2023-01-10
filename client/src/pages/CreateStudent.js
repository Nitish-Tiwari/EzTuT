import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../css/createstudent.css';
import axios from 'axios';
function CreateStudent() {
    // const studentstyle = {
    //     display: "flex",
    //     marginLeft: "0px",
    //     flexDirection: "column",
    //     alignContent: "center",
    //     flexWrap: "wrap",
    //     alignItems: "flexStart",
    //     justifyContent: "Center",
    //     width: "150%"
    // }
    const initialValues = {
        Name: "",
        Age: "",
        Gender: "",
        Class: "",
        Address: "",
        Fee: "",

    };

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("Please input a Name"),
        Age: Yup.number().required("Please input a Age"),
        Gender: Yup.string().required("Please select Gender"),
        Class: Yup.number().required("Please input a Class"),
        Address: Yup.string(),
        Fee: Yup.number().required("Please insert Fee"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/students", data).then((respose) => {
            console.log("data")
        })
    };
    return (
        <div className="page-wrapper">
            <div className="dashboard-content-wrapper" >
                <div className="dashboard-content-wrap">
                    <div className="page-title">
                        <h2 className="page-heading">Registration</h2>
                    </div>
                    <div class="create-onvoice-form-wrapper">
                        <div className="personal-information-wrapper">
                            <h4 className="single-wrapper-common-tittle">Personal Details</h4>
                            <div className="personal-information-form-wrapper">
                                <div class="w-form">
                                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

                                        <Form className="personal-information-form">





                                            <div className="personal-information-single-wrap">
                                                <label className="personal-information-single-tittle">Full Name</label>
                                                <ErrorMessage name='Name' component="span" />
                                                <Field autoComplete="off" id="inputCreateStudent" name="Name" className="personal-information-single-field w-input"
                                                    placeholder="Nitish" />
                                            </div>

                                            <div className="personal-information-single-wrap">
                                                <label className="personal-information-single-tittle">Age</label>
                                                <ErrorMessage name='Age' component="span" />
                                                <Field autoComplete="off" id="inputCreateStudent" name="Age" className="personal-information-single-field w-input" placeholder="21" />
                                            </div>


                                            <div className="personal-information-single-wrap">
                                                <label className="personal-information-single-tittle">Gender</label>
                                                <ErrorMessage name='Gender' component="span" />
                                                <div className="genderoption">
                                                    <label>
                                                        <Field autoComplete="off" id="inputCreateStudent" className="" type="radio" name="Gender"
                                                            value="male" />
                                                        Male
                                                    </label>
                                                    <label>
                                                        <Field autoComplete="off" id="inputCreateStudent" className="" type="radio" name="Gender"
                                                            value="female" />
                                                        Female
                                                    </label>
                                                </div>


                                            </div>



                                            <div className="details address">
                                                <span className="title">Address Details</span>
                                                <div className="fields">
                                                    <div className="personal-information-single-wrap">
                                                        <label>Address</label>
                                                        <ErrorMessage name='Address' component="span" />
                                                        <Field autoComplete="off" id="inputCreateStudent" name="Address"
                                                            placeholder="(Ex. Vastral)..." />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="details admission">
                                                <span className="title">Admission Details</span>

                                                <div className="fields">
                                                    <div className="personal-information-single-wrap">
                                                        <label>Class</label>
                                                        <ErrorMessage name='Class' component="span" />
                                                        <Field autoComplete="off" id="inputCreateStudent" name="Class"
                                                            placeholder="(Ex. 12)..." />
                                                    </div>

                                                    <div className="personal-information-single-wrap">
                                                        <label>Fees</label>
                                                        <ErrorMessage name='Fee' component="span" />
                                                        <Field autoComplete="off" id="inputCreateStudent" name="Fee" placeholder="(Ex. 100000)..." />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateStudent