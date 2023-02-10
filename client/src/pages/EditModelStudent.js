import React from 'react';
import { Form, Input, Select, Modal, Button } from 'antd';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const EditModelStudent = ({ open, onCreate, onCancel, form }) => {


    const handleOk = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onCreate(values);

        });




    };
    return (
        <Modal
            open={open}
            title="Edit Student"
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
                    rules={[{ required: true, message: 'Please Select a option' }]}
                >
                    <Select >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="class"
                    label="Class"

                    rules={[{ required: true, message: 'Please input the class!' }]}
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
                    name="batchname"
                    label="Batch Name"

                    rules={[{ required: true, message: 'Please input a Batch Name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"

                    rules={[{ required: true, message: 'Please type a Address!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="fee"
                    label="Fee"

                    rules={[{ required: true, message: 'Please enter a Fee!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModelStudent;
