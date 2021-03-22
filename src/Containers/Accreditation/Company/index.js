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

const { Title, Text, Paragraph } = Typography

const Login = () => (
  <Row style={{ height: '100vh' }} align="middle">
    <Col span={12}>
      <div className={styles.contentPublicity}>
        <Image src={logo} preview={false} style={{ marginBottom: '50px' }} />
        <h1>Tenha mais controle na sua empresa com o alxa!</h1>
        <h4>Aproveite todas as nossa funcionalidades</h4>
        <Space direction="vertical" style={{ margin: '0 0 170px 10px' }}>
          <Text>
            <CheckOutlined style={{ color: '#7BDAAA' }} /> Gestão de estoque
          </Text>
          <Text>
            <CheckOutlined style={{ color: '#7BDAAA' }} /> Controle de vendas
          </Text>
          <Text>
            <CheckOutlined style={{ color: '#7BDAAA' }} /> Ponto de venda
          </Text>
          <Text>
            <CheckOutlined style={{ color: '#7BDAAA' }} /> Controle de cliente
          </Text>
          <Text>
            <CheckOutlined style={{ color: '#7BDAAA' }} /> Cupom não fiscal
          </Text>
        </Space>
        <Paragraph style={{ fontSize: '1.25em' }}>
          Finalize agora o seu cadastro e comece a gerenciar a sua empresa em
          poucos minutos.
        </Paragraph>
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: '10%'
          }}>
          <Image src={allTheData} preview={false} width={400} />
        </div>
      </div>
    </Col>

    <Col span={12} style={{ backgroundColor: '#F2F2F3', height: '100%' }}>
      <Row style={{ height: '100%' }} align="middle">
        <Col span={24}>
          <div style={{ margin: '0 10%' }}>
            <Row justify="center">
              <Title level={2}>Dados da Empresa</Title>
            </Row>
            <Form layout="vertical">
              <Card>
                <div style={{ marginBottom: '50px' }}>
                  <Title level={5}>Dados da Empresa</Title>
                  <Form.Item label="Nome da empresa">
                    <Input />
                  </Form.Item>
                  <Form.Item label="CPNJ">
                    <Input />
                  </Form.Item>
                </div>
                <div style={{ width: '100%' }}>
                  <Title level={5}>Dados de acesso</Title>
                  <Form.Item label="Responsável">
                    <Input />
                  </Form.Item>
                  <Form.Item label="E-mail">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Senha">
                    <Input />
                  </Form.Item>
                </div>
              </Card>

              <Row justify="center" style={{ marginTop: 20 }}>
                <Form.Item style={{ width: '100%' }}>
                  <Button
                    size="large"
                    htmlType="submit"
                    type="primary"
                    style={{ width: '100%' }}>
                    Continuar
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
)

export default Login
