import React from 'react'
import { Card, Typography, Row, Col, Input, Form, DatePicker, Button } from 'antd'

const { Title, Text } = Typography

const MyInfo = ({
  user,
  updateMyInfo,
}) => {
  const [form] = Form.useForm()
  const handleDocument = ({ target }) =>form.setFieldsValue({
    document: target.value
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{1}).*/,"$1-$2.$3-$4")
  })

  const handlePhone = ({ target }) => form.setFieldsValue({
    phone: target.value
      .replace(/^(\d{2})(\d{5})(\d{4}).*/,"+55 ($1) $2-$3")
  })

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={5}>Informações do usuário</Title>
            </Col>
            <Col span={12}>
              <Text>Nome Completo</Text>
              <p>{user && user.name}</p>
            </Col>
            <Col span={12}>
              <Text>Email</Text>
              <p>{user && user.email}</p>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            onFinish={updateMyInfo}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={5}>Informações pessoais</Title>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="document"
                  label="Identidade"
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                >
                  <Input onChange={handleDocument} maxLength={9} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phone"
                  label="Telefone"
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                >
                  <Input onChange={handlePhone} maxLength={17} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="birthday"
                  label="Data de Nascimento"
                  rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
                >
                  <DatePicker
                    format='DD/MM/YYYY'
                    style={{ width: '100%' }}
                    placeholder='Data de Nascimento'
                  />
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  htmlType='submit'
                  type="primary"
                >
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default MyInfo
