import React from 'react';
import { Form, Input, Select, Modal, Button } from 'antd';
const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const ReminderModel = ({ open, onCreate, onCancel, form }) => {


    const handleOk = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onCreate(values);

        });




    };
    return (
        <Modal
            open={open}
            title="Send Message"
            okText="Send"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={handleOk}

        >
            <Form {...layout} form={form} >
                <Form.Item
                    name="from"
                    label="From"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="to"
                    label="To"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="totalfee"
                    label="Total Fee"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="totalpaidfee"
                    label="Total Paid Fee"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="message"
                    label="Message"

                    rules={[{ required: true, message: 'Message can not be Empty' }]}
                >
                    <TextArea autoSize />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ReminderModel;
