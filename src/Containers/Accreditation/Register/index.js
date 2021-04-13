import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Space,
  Typography
} from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import logo from '../../../Assets/logo.svg'
import allTheData from '../../../Assets/allTheData.svg'
import styles from './style.module.css'
import { validateCNPJ, validateEmail } from '../../../utils/validators'

const { Title, Text, Paragraph } = Typography
const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const Register = ({ handleClickContinue, loading }) => (
  <Row>
    <Col span={12}>
      <div className={styles.contentPublicity}>
        <Image width={160} src={logo} preview={false} />
        <h1>Tenha mais controle na sua empresa com o alxa!</h1>
        <h4>Aproveite todas as nossa funcionalidades</h4>
        <Space direction="vertical" style={{ margin: '0 0 170px 10px' }}>
          <Text>
            <CheckOutlined /> Gestão de estoque
          </Text>
          <Text>
            <CheckOutlined /> Controle de vendas
          </Text>
          <Text>
            <CheckOutlined /> Ponto de venda
          </Text>
          <Text>
            <CheckOutlined /> Controle de cliente
          </Text>
          <Text>
            <CheckOutlined /> Cupom não fiscal
          </Text>
        </Space>
        <Paragraph style={{ fontSize: '1.25em' }}>
          Finalize agora o seu cadastro e comece a gerenciar a sua empresa em
          poucos minutos.
        </Paragraph>
        <div className={styles.wrapperAllTheData}>
          <Image src={allTheData} preview={false} width={400} />
        </div>
      </div>
    </Col>

    <Col span={12}>
      <div className={styles.contentForm}>
        <Row
          style={{
            height: '100%'
          }}
          align="middle">
          <Col span={24}>
            <Row justify="center">
              <Title level={2}>Dados da Empresa</Title>
            </Row>
            <Form
              validateTrigger="onBlur"
              layout="vertical"
              onFinish={(formData) => handleClickContinue(formData)}>
              <Card>
                <Title level={5}>Dados da Empresa</Title>
                <Form.Item
                  rules={rules}
                  name="razaoSocial"
                  label="Nome da empresa">
                  <Input />
                </Form.Item>
                <Form.Item
                  rules={[
                    ...rules,
                    { validator: (_, value) => validateCNPJ(value) }
                  ]}
                  name="cnpj"
                  label="CPNJ">
                  <Input />
                </Form.Item>
                <br />
                <Title level={5}>Dados de acesso</Title>
                <Form.Item rules={rules} name="responsible" label="Responsável">
                  <Input />
                </Form.Item>
                <Form.Item
                  rules={[
                    ...rules,
                    { validator: (_, value) => validateEmail(value) }
                  ]}
                  name="email"
                  label="E-mail">
                  <Input />
                </Form.Item>
                <Form.Item rules={rules} name="password" label="Senha">
                  <Input.Password />
                </Form.Item>
              </Card>

              <br />

              <Row justify="center">
                <Form.Item style={{ width: '100%' }}>
                  <Button
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    type="primary"
                    style={{ width: '100%' }}>
                    Continuar
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
)

export default Register
