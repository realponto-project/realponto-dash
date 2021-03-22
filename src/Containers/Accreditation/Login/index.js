import React from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'

import onlineResume from '../../../Assets/onlineResume.svg'
import logo from '../../../Assets/logo.svg'
import styles from './style.module.css'

const { Paragraph, Link } = Typography

const Login = () => (
  <Row gutter={10} style={{ height: '100vh', margin: 0 }} align="middle">
    <Col
      span={16}
      style={{
        height: '100%',
        backgroundColor: '#F2F2F3'
      }}>
      <Row style={{ height: '100%' }} align="middle">
        <Col>
          <Row justify="center" gutter={[0, 80]}>
            <Image width={362} src={onlineResume} preview={false} />
          </Row>
          <Row justify="center">
            <h1 className={styles.title}>Conheça o alxa dashboard!</h1>
          </Row>
          <Row justify="center">
            <Col span={16}>
              <Paragraph style={{ textAlign: 'center' }}>
                Gestão de verdade para o seu négocio, fácil, rápido e preço
                justo, com o alxa, você tem ao seu alcance, gestão de clientes,
                produtos, pedidos e muito mais!
              </Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
    <Col span={8}>
      <Row justify="center" gutter={[0, 87]}>
        <Image src={logo} preview={false} />
      </Row>

      <Row justify="center">
        <Col span={20}>
          <Form layout="vertical">
            <Form.Item label="E-mail">
              <Input />
            </Form.Item>
            <Form.Item label="Senha">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ width: '100%', marginTop: 35 }}>
                Acessar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Paragraph style={{ textAlign: 'center' }}>
          Ainda não possui conta no alxa?
        </Paragraph>
      </Row>

      <Row justify="center">
        <Link href="https://ant.design" target="_blank">
          Cadastre-se agora
        </Link>
      </Row>
    </Col>
  </Row>
)

export default Login
