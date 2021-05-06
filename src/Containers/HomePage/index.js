import React from 'react'
import { Row, Col, Image, Typography, Button, Card } from 'antd'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'

import styles from './style.module.css'
import logo from '../../Assets/logo.svg'
import resumo from '../../Assets/resume.svg'
import security from '../../Assets/security.svg'
import finance from '../../Assets/finance.svg'
import controlPanel from '../../Assets/controlPanel.svg'
import connectedWorldWuay from '../../Assets/connectedWorldWuay.svg'

const { Title, Paragraph } = Typography

const HomePage = ({ goToLogin }) => {
  return (
    <Row>
      <Col span={24} style={{ padding: '30px 30px 0' }}>
        <Image preview={false} width={160} src={logo} />
      </Col>

      <Row style={{ width: '100%', padding: '70px 70px' }}>
        <Col span={14} style={{ padding: '20px 100px' }}>
          <Title level={2}>Sistema de gestão</Title>
          <Paragraph style={{ margin: '50px 0' }}>
            O alxa é um sistema de gestão, ideal para pequenas e médias
            empresas. Comece agora a usar o sistema totalmente grátis por um
            período de 3 mêses e até 300 produtos cadastrados.
          </Paragraph>
          <Button type="primary" size="large" onClick={goToLogin}>
            Comece agora
          </Button>
        </Col>
        <Col span={10} align="end">
          <Image preview={false} width={'100%'} src={resumo} />
        </Col>
      </Row>

      <Row
        style={{ width: '100%', padding: '70px', backgroundColor: '#F2F2F3' }}>
        <Col span={8} align="center">
          <Card className={styles.card}>
            <Image preview={false} width={150} src={security} />
            <Title level={4} style={{ margin: '20px 0' }}>
              Segurança
            </Title>
            <Paragraph style={{ color: '#818181' }}>
              Toda transação no sistma é realizada por Api de externa bem
              consolidad no mercado, desta forma garantimos mais segurança aos
              nossos usuários.
            </Paragraph>
          </Card>
        </Col>

        <Col span={8} align="center">
          <Card className={styles.card}>
            <Image preview={false} width={150} src={connectedWorldWuay} />
            <Title level={4} style={{ margin: '20px 0' }}>
              Acessibilidade
            </Title>
            <Paragraph style={{ color: '#818181' }}>
              Acesso fácil ao sistema, havendo apenas a nessecidade de conexão
              com internet, sem necessidade de intalação.
            </Paragraph>
          </Card>
        </Col>

        <Col span={8} align="center">
          <Card className={styles.card}>
            <Image preview={false} width={150} src={controlPanel} />
            <Title level={4} style={{ margin: '20px 0' }}>
              Controle
            </Title>
            <Paragraph style={{ color: '#818181' }}>
              O alxa possui um exelente painel de controle, com indicadores de
              pedidos, vendas e muito mais.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row style={{ width: '100%', padding: '100px 70px' }} justify="middle">
        <Col span={8} align="center">
          <Image preview={false} width={250} src={finance} />
        </Col>
        <Col span={16}>
          <Title level={3}>Venda com a ajuda do Alxa</Title>
          <Title level={4} style={{ color: '#818181' }}>
            O alxa gera um catálogo de forma gratuíta com base em seus produtos
            cadastrados, basta ativar o campo referênte ao catálogo e o mesmo
            estara disponível em seu catálogo, que você poderá compartilhar com
            seus clientes.
          </Title>
        </Col>
      </Row>

      <Row
        justify="space-between"
        align="middle"
        style={{
          width: '100%',
          // height: '250px',
          backgroundColor: '#F2F2F3',
          padding: '30px 50px'
        }}>
        <Col>
          <Image preview={false} width={100} src={logo} />
        </Col>
        <Col>
          <Row gutter={20}>
            <Col>
              <Title level={5} style={{ color: '#818181' }}>
                <PhoneOutlined /> (11) 4126-2929
              </Title>
            </Col>

            <Col>
              <Title level={5} style={{ color: '#818181' }}>
                <MailOutlined /> suporte@alxa.com
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        align="center"
        justify="center"
        style={{ width: '100%', backgroundColor: '#1890FF' }}>
        <Col>
          <Paragraph style={{ color: '#fff', margin: '10px 0' }}>
            ® 2021 Copyright - Projetos Dev
          </Paragraph>
        </Col>
      </Row>
    </Row>
  )
}

export default HomePage
