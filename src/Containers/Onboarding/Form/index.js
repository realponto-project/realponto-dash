import React from 'react'
// import styles from '../style.module.css'
import { Row, Col, Card, Form, Input, Button } from 'antd'

// const { Paragraph } = Typography

const Formulario = () => {
  return (
    <Card
      style={{
        background: '#FFFFFF'
      }}>
      <Row>
        <Col span={24}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

export default Formulario
