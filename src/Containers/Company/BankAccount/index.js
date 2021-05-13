import React from 'react'
import { 
  Card, 
  Typography, 
  Form, 
  Input,
  Button,
  Row, 
  Col
} from "antd"

const { Title } = Typography

const BankAccount = ({form, handleValueChange}) => {
  return (
    <Card bordered={false}>
      <Title level={5}>Dados bancários</Title>
        <Form 
          onValuesChange={handleValueChange}
          onFinish={(values)=>{console.log(values)}}
          form={form}
          layout='vertical'
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Form.Item label="Banco" name="bankCode" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input placeholder="Informe o banco"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Agência" name="agency" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input placeholder="Informe a agência"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Conta" name="bankAccount" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input placeholder="Informe a conta"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Titular" name="legalName" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input placeholder="Informe o nome do titular"/>
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item >
                <Button type="primary" htmlType="submit">Salvar</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
    </Card>
  )
}

export default BankAccount
