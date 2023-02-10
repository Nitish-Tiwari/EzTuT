import React from 'react';
import { Form, Input, Select, Modal, Button } from 'antd';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const EditModelTeacher = ({ open, onCreate, onCancel, form }) => {


    const handleOk = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onCreate(values);

        });




    };
    return (
        <Modal
            open={open}
            title="Edit Teacher"
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleOk}

        >
            <Form {...layout} form={form} >
                <Form.Item
                    name="name"
                    label="Name"

                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please Select a Gender!' }]}
                >
                    <Select >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="subjects"
                    label="Subjects"

                    rules={[{ required: true, message: 'Please input the Subject!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phonenumber"
                    label="Phone Number"

                    rules={[{ required: true, message: 'Please input the Phone number!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"

                    rules={[{ required: true, message: 'Please enter a email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="salary"
                    label="Salary"

                    rules={[{ required: true, message: 'Please enter a Salary!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModelTeacher;
