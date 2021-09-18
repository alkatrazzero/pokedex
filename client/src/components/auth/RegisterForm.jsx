import React, {useState} from 'react'
import {Button, Drawer, Form, Input, Space, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {authAPI} from "../../api/api";


export const RegisterForm = () => {

  const onFinish = async ({email, password}) => {
    let response = await authAPI.register({email, password})
    if (response.data.message == "пользователь создан") {
      message.success(response.data.message);
      onClose()
    } else return message.error(response.data.message);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true)
  };
  const onClose = () => {
    setVisible(false)
  };

  return <div>
    <Button type="primary" onClick={showDrawer}>
      <PlusOutlined/> New account
    </Button>
    <Drawer
      title="Create a new account"
      width={400}
      onClose={onClose}
      visible={visible}
      bodyStyle={{paddingBottom: 80}}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
        </div>
      }
    >
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{required: true, message: 'Введите email', type:"email"}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{required: true, message: 'Минимальная длина пароля 6 символов',min:6}]}
        >
          <Input.Password/>

        </Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Space>
      </Form>
    </Drawer>
  </div>
}