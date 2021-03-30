import React, { useState } from 'react'
import { Row, Col, Card, Image, Typography } from 'antd'
import styles from './style.module.css'
import Welcome from './Welcome'
// import Formulario from './Form'

import ImageOnboarding from './onboarding.svg'
import Logo from './alxa.svg'

const { Paragraph } = Typography

const Onboarding = () => {
  const [isWelcomeVisible] = useState('true')

  return (
    <Row>
      <Col span={14}>
        <Image
          preview={false}
          width={161}
          src={Logo}
          style={{ margin: '40px 0 0 50px' }}
        />
        <Card
          style={{
            height: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          bordered={false}>
          <Image preview={false} width={495} src={ImageOnboarding} />
        </Card>
      </Col>
      <Col span={10}>
        <Card
          style={{
            height: '100vh',
            background: '#F2F2F3',
            padding: '50px 10px 0 20px'
          }}>
          <Paragraph className={styles.textWelcome}>
            Bem vindo, ALEXANDRE
          </Paragraph>
          <Welcome visible={isWelcomeVisible} />
          {/* <Formulario /> */}
        </Card>
      </Col>
    </Row>
  )
}

export default Onboarding
