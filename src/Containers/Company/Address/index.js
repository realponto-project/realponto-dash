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

const Address = ({
  handleValueChange,
  form
}) => {
  return (
    <Card bordered={false}>
      <Title level={5}>Endereço</Title>
        <Form 
          onFinish={(values)=>{console.log(values)}}
          form={form}
          onValuesChange={handleValueChange}
          layout='vertical'
        >
          <Row gutter={[8, 8]}>
            <Col span={4}>
              <Form.Item label="Cep" name="zipcode" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input placeholder="Insira o cep"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Rua" name="street" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input  placeholder="Insira o nome da rua"/>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label="Número" name="streetNumber" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Complemento" name="complement">
                <Input  placeholder="Insira o complemento"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bairro" name="neighborhood" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input  placeholder="Insira o bairro"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Cidade" name="city" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input  placeholder="Insira a cidade"/>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Estado" name="state" rules={[{ required: true, message: 'Campo obrigatório!' }]}>
                <Input  placeholder="Insira o estado"/>
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

export default Address
