import React from 'react';
import { Modal, Form, Input, Button, Row, Col } from 'antd';

const LoginModal = ({ isModalVisible, handleModalCancel, handleModalSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      handleModalSubmit(values);
      form.resetFields();
    } catch (error) {
      console.log('Validation error:', error);
    }
  };

  return (
    <Modal
      title='Sign Up'
      visible={isModalVisible}
      onCancel={handleModalCancel}
      footer={[
        <Button
          key='cancel'
          onClick={handleModalCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={onFinish}>
          Sign Up
        </Button>,
      ]}>
      <Form
        form={form}
        layout='vertical'>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Please enter your email address' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters long' },
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default LoginModal;
