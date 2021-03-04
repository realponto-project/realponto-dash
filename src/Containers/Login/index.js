import React from 'react'
import { Row, Col, Form, Input, Button, Image, Typography } from 'antd'
import MeetsImage from './meets.svg'

const { Title } = Typography

const Login = ({
  authentication
}) => {

  const onFinish = values => {
    authentication(values)
  }

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col span={6} style={{
        background: "#f4f4f4",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <Image
          width='100%'
          height="auto"
          src={MeetsImage}
        />
      </Col>
      <Col span={18} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Title leve={5} style={{ fontSize: '22px', marginBottom: '4px' }}>Nova Dashboard RP!</Title>
        <p style={{ textAlign: 'center',  marginBottom: '14px' }}>A nova dashboard chegou para facilitar ainda mais a sua vida, <br /> com ela você visualiza métricas da sua operação <br />e muito mais.</p>
        <Form
          style={{
            width: '340px',
          }}
          name="login_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Campo obrigatório!' }]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit">
              Logar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
