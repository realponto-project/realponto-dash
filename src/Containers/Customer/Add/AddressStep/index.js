import React from 'react'
import { Col, Form, Input, Row, Typography } from 'antd'
import { map } from 'ramda'

const { Title } = Typography

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const formItemList = [
  { span: 8, name: 'zipcode', label: 'CEP' },
  { span: 4, name: 'states', label: 'UF' },
  { span: 12, name: 'neighborhood', label: 'Bairro' },
  { span: 10, name: 'city', label: 'Cidade' },
  { span: 11, name: 'street', label: 'Logradouro' },
  { span: 3, name: 'streetNumber', label: 'Número' },
  { span: 12, name: 'complementary', label: 'Complemento' },
  { span: 12, name: 'reference', label: 'Ponto de referência' }
]

const renderFormItem = ({ label, name, span }) => (
  <Col key={name} span={span}>
    <Form.Item rules={rules} label={label} name={name}>
      <Input />
    </Form.Item>
  </Col>
)

const AddressStep = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Title level={4}>ENDEREÇO DO CLIENTE</Title>
        <p>Preencha-me se for capaz</p>
      </Col>
      <Col span={24}>
        <Form layout="vertical">
          <Row gutter={8}>{map(renderFormItem, formItemList)}</Row>
        </Form>
      </Col>
    </Row>
  )
}

export default AddressStep
