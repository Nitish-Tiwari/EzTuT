import { Button, Form, Input, Modal, notification, Select } from 'antd'
import axios from 'axios'
import "../css/createstudent.css"
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import useStateRef from 'react-usestateref'
const ExamPage = () => {
    const [visible, setVisible] = useState(false)
    const [addVisible, setAddvisible] = useState(false)
    const handeClickExam = () => {
        setVisible(true)
    }
    const [form] = Form.useForm();
    const [formadd] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [examData, setExamData] = useState(false)
    const [studentData, setStudentData] = useState([])
    const [selectedBatchname, setSelectedBatchname] = useState(null);
    const [batchnameStudentData, setBatchnameStudentData] = useState('')
    const [selectedStudents, setSelectedStudents] = useState("")
    const getStudentData = () => {
        axios.get("http://localhost:3001/students/getbatchname").then((data) => {
            setStudentData(data.data)
        })


    }
    const createExam = async (value) => {
        setLoading(true)
        axios.post("http://localhost:3001/students/exams", value).then((resp) => {
            notification.success({
                message: 'Success',
                description: `${resp.message}`,
                placement: "top"
            })
            setLoading(false)
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
    const getExam = async () => {
        setLoading(true)
        axios.get("http://localhost:3001/students/exams").then((resp) => {
            setExamData(resp.data)
            console.log(resp)

        })

        setLoading(false)
    }
    console.log(examData)
    useEffect(() => {

        getExam()
        getStudentData()

    }, [loading])
    const handleCreate = async () => {
        try {
            const values = await form.validateFields();


            createExam(values)
            form.resetFields();
            setVisible(false)
        } catch (err) {
            console.log('Error:', err);
        }
    };
    const handleCreateAdd = async () => {
        setLoading(true)
        try {
            const values = await formadd.validateFields();
            console.log(values, "values in the form")
            const updatedStudents = values.students.map((student, index) => ({
                ...student,
                marks: values[`marks${index}`],

            }));
            values.students.map((student, index) =>
                delete values[`marks${index}`]
            )


            const updatedValues = {
                ...values,
                students: updatedStudents,
            };

            console.log(updatedValues, "updatedValues");
            axios.post("http://localhost:3001/students/student-exams", updatedValues).then((resp) => {
                notification.success({
                    message: 'Success',
                    description: "Students Marks Added Successfully",
                    placement: "top"
                })
            }).catch((err) => {
                notification.error(
                    {
                        message: "Error",
                        description: err,
                        placement: "top"
                    }
                )
            })
            formadd.resetFields();
            form.resetFields();
            setAddvisible(false)
            setLoading(false)
        } catch (err) {
            console.log('Error:', err);
            setLoading(false)
        }

    }
    const handleOnFinish = (values) => {
        console.log(values, "valueshandleOnFinish")
    }
    const handleBatchnameSelect = (event) => {
        setLoading(false)
        setSelectedBatchname(event);
        const datastudent = studentData.find(data => data.batchname === event)
        console.log(datastudent, "data")
        setBatchnameStudentData(datastudent)
        setSelectedStudents(datastudent.students.map((e) => ({ StudentId: e.id })))
        setLoading(true)
    };
    console.log(batchnameStudentData, "batchnameStudentData")
    const onCancel = () => {
        setVisible(false)

    }
    console.log(selectedStudents, "selectedStudents")
    const handleClickAdd = (val) => {

        formadd.setFieldsValue({
            examId: val.id,
            students: selectedStudents

        })
        setAddvisible(true)
    }
    const onCancelAdd = () => {
        setAddvisible(false)

    }
    const getBatchnameOptions = () => {
        return studentData.map((data, index) => (
            <Select.Option key={index} value={data.batchname}>{data.batchname}</Select.Option>
        ));
    };
    const getStudentOptions = () => {


        const batchnameData = studentData.find(data => data.batchname === selectedBatchname);
        return batchnameData.students.map((student, index) => (<>
            <div className='formitem'>
                <Form.Item
                    name="students"
                    label="Student Name"


                >
                    <Input hidden />
                    <div>
                        <span className='spanname'>{student.name}</span>
                    </div>
                </Form.Item>

                <Form.Item
                    style={{ width: "50%" }}
                    name={`marks${index}`}
                    label="Marks"

                    rules={[{ required: true, message: 'Please enter the student marks' }]}
                >
                    <Input />
                </Form.Item>
            </div>

        </>
        ));
    };



    return (
        <div className="page-wrapper">
            <div className="dashboard-content-wrapper">
                <div className="dashboard-content-wrap">
                    <div className="page-title">
                        <h2 className="page-heading">Examination</h2>
                        <button className="submit" onClick={handeClickExam}>Create Exam</button>
                        <Modal
                            open={visible}
                            title="Create Exam"
                            okText={loading ? 'Loading...' : 'Add'}
                            onCancel={onCancel}
                            onOk={handleCreate}
                            confirmLoading={loading}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                name="exam-form"
                                initialValues={{ remember: true }}
                            >
                                <Form.Item
                                    name="name"
                                    label="Exam Name"
                                    rules={[{ required: true, message: 'Please input exam name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="createdBy"
                                    label="Examiner Name"
                                    rules={[{ required: true, message: 'Please input examiner name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    {examData && examData.map((e) => {
                        return (
                            <div className='examtable'>

                                <div className='examtitle'>
                                    <h3>Exam Name</h3>
                                    <p>{e.name}</p>
                                </div>
                                <div className='examcreatedby'>
                                    <h3>Created By</h3>
                                    <p>{e.createdBy}</p>
                                </div>
                                <div className='examcreatedat'>
                                    <h3>Created At</h3>
                                    <p>{moment(e.createdAt).format("DD/MM/YYYY")}</p>
                                </div>
                                <div className='examaction'>
                                    {e.studentExams.length !== 0 ? <Button >Update stundets</Button> : <Button onClick={() => handleClickAdd(e)}>Add stundets</Button>}
                                    <Button>View Result</Button>
                                    <Button>Delete Exam</Button>
                                </div>
                                <Modal
                                    open={addVisible}
                                    title="Enter Exam Marks"
                                    okText={loading ? 'Loading...' : 'Add'}
                                    onCancel={onCancelAdd}
                                    onOk={handleCreateAdd}
                                    confirmLoading={loading}>
                                    <Form
                                        form={formadd}
                                        layout="vertical"
                                        name="exam-form"
                                        onFinish={handleOnFinish}

                                    >
                                        <Form.Item
                                            name="examId"
                                            label="Exam Name"

                                        >
                                            <Input disabled />
                                        </Form.Item>
                                        <div style={{ marginBottom: "12px" }}>
                                            <div className="info_title">
                                                <h4>Batch Name</h4>
                                            </div>
                                            <Select style={{ width: "200px" }} value={selectedBatchname} onChange={handleBatchnameSelect}>
                                                <Select.Option value="">Select Batchname</Select.Option>
                                                {getBatchnameOptions()}
                                            </Select>
                                        </div>
                                        {selectedBatchname && (

                                            getStudentOptions()

                                        )}
                                    </Form>
                                </Modal>
                            </div>)
                    })}
                </div>
            </div>
        </div>

    )
}

export default ExamPage