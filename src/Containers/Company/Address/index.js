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

const Address = () => {
  return (
    <Card bordered={false}>
      <Title level={5}>Endereço</Title>
        <Form 
          layout='vertical'
        >
          <Row gutter={[8, 8]}>
            <Col span={4}>
              <Form.Item label="Cep">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Rua">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label="Número">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Complemento">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bairro">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Cidade">
                <Input/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Estado">
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

export default Address
