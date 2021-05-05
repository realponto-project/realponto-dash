import React from 'react'
import { Row, Col, Image, Typography, Button, Card } from 'antd'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

import styles from './style.module.css'
import logo from '../../Assets/logo.svg'
import resumo from '../../Assets/resume.svg'
import security from '../../Assets/security.svg'
import finance from '../../Assets/finance.svg'

const { Title, Paragraph } = Typography

const HomePage = ({goToLogin}) => {
  return (
    <Row >
      <Col span={24} style={{ padding: '30px' }}>
        <Image
          preview={false}
          width={160}
          src={logo}
        />
      </Col>

      <Row style={{ width: '100%', padding: '70px 70px' }} >
        <Col span={14} style={{ padding: '20px 100px' }} >
          <Title level={2}>Seu sistema de gestão</Title>
          <Paragraph style={{ margin: '50px 0' }}>
            is simply dummy text of the printing and typesetting industry
            Lorem Ipsum has been the industry's standard dummy text ever since
            is simply dummy text of the printing and typesetting industry
            Lorem Ipsum has been the industry's standard dummy tex
            is simply dummy text of the printing and typesetting industry
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Paragraph>
          <Button 
            type="primary" 
            size="large"
            onClick={goToLogin}>
            Comece agora
          </Button>
        </Col>
        <Col span={10} align="end">
          <Image
            preview={false}
            width={'100%'}
            src={resumo}
          />
        </Col>
      </Row>

      <Row style={{ width: '100%', padding: '70px', backgroundColor: '#F2F2F3' }} >
        <Col span={8} align="center">
          <Card className={styles.card}>
            <Image
              preview={false}
              width={150}
              src={security}
            />
            <Title level={4} style={{ margin: '20px 0' }}>Segurança</Title>
            <Paragraph style={{ color: '#818181' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Paragraph>
          </Card>
        </Col>

        <Col span={8} align="center">
          <Card className={styles.card}>
            <Image
              preview={false}
              width={150}
              src={security}
            />
            <Title level={4} style={{ margin: '20px 0' }}>Segurança</Title>
            <Paragraph style={{ color: '#818181' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Paragraph>
          </Card>
        </Col>

        <Col span={8} align="center">
          <Card className={styles.card}>
            <Image
              preview={false}
              width={150}
              src={security}
            />
            <Title level={4} style={{ margin: '20px 0' }}>Segurança</Title>
            <Paragraph style={{ color: '#818181' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row style={{ width: '100%', padding: '100px 70px'}} justify="middle">
        <Col span={8} align="center">
          <Image
            preview={false}
            width={250}
            src={finance}
          />
        </Col>
        <Col span={16}>
          <Title level={3}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </Title>
          <Title level={4} style={{color: '#818181'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas sed tempus urna et. 
            Enim tortor at auctor urna nunc id cursus metus. In massa tempor nec feugiat nisl.
          </Title>
        </Col>
      </Row>

      <Row style={{ width: '100%', height: '250px',backgroundColor: '#F2F2F3', padding: '40px 0 40px 40px'}} >
        <Col span={6}>
          <Image
            preview={false}
            width={100}
            src={logo}
          />
          <Title level={5} style={{margin: '30px 0', paddingRight: '70px', color: '#818181'}}>
            Especializada em controle da jornada de trabalho de modo eficiente e seguro
          </Title>
          <Button 
            style={{backgroundColor: '#F2F2F3'}}
            size="large"
            onClick={goToLogin}>
            Comece agora
          </Button>
        </Col>
        <Col span={6}>
          <Title level={4}>Contato</Title>
        </Col>
        <Col span={6}><Title level={4}>Contato</Title></Col>
        <Col span={6}>
          <Title level={4}>Contato</Title>
          <Row align="middle">
            <Col>
              <Title level={3} style={{ margin: 0, color: '#818181' }}><PhoneOutlined /></Title>
            </Col>
            <Col style={{marginLeft: '10px'}}>
              <Title level={5} style={{color: '#818181'}}>(11) 4332-4040</Title>
            </Col>
          </Row>

          <Row align="middle">
            <Col>
              <Title level={3} style={{ margin: 0, color: '#818181' }}><MailOutlined/></Title>
            </Col>
            <Col style={{marginLeft: '10px'}}>
              <Title level={5} style={{color: '#818181'}}>projetosdev@realponto.com.br</Title>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row align="center" justify="center" style={{width: '100%', backgroundColor: '#1890FF' }}>
        <Col>
          <Paragraph style={{color: '#fff', margin: '10px 0'}}>® 2021 Copyright - Projetos Dev</Paragraph>
        </Col>
      </Row>

    </Row>
  )
}

export default HomePage
