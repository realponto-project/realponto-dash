import React from 'react'
import { Col, Form, Input, Row, Typography } from 'antd'

const { Title } = Typography

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const DataStep = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={4}>DADOS DO CLIENTE</Title>
        <p>Preencha os dados do cliente</p>
      </Col>
      <Col span={24}>
        <Form layout="vertical">
          <Form.Item rules={rules} label="Nome" name="name">
            <Input />
          </Form.Item>

          <Form.Item rules={rules} label="CNPJ/CPF" name="document">
            <Input />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default DataStep
