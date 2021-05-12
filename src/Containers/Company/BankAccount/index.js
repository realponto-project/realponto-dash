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

const BankAccount = () => {
  return (
    <Card bordered={false}>
      <Title level={5}>Dados bancários</Title>
        <Form 
          layout='vertical'
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Form.Item label="Banco">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Agência">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Conta">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Titular">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item >
                <Button type="primary">Salvar</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
    </Card>
  )
}

export default BankAccount
