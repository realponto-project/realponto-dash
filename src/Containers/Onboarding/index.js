import React, { useState } from 'react'
import { Row, Col, Card, Image, Typography, Button } from 'antd'
import styles from './style.module.css'
import Welcome from './Welcome'
import Formulario from './Form'
import UpdatePass from './UpdatePassword'

import ImageOnboarding from './onboarding.svg'
import Logo from './alxa.svg'

const { Paragraph } = Typography

const Onboarding = ({ user, updateMyInfo, handleSubmit }) => {
  const [isWelcomeVisible, setWelcomeVisible] = useState(true)
  const [isFormVisible, setFormVisible] = useState(false)
  const [isUpdateVisible, setUpdateVisible] = useState(false)

  const onSubmitUpdateInfo = (values) => {
    updateMyInfo(user.id, { ...values, firstAccess: false })
    setFormVisible(false)
    setUpdateVisible(true)
  }

  const onSubmitUpdatePass = (values) => {
    console.log('valuesssss container', values)
    handleSubmit(values)
  }

  const next = () => {
    setWelcomeVisible(false)
    setFormVisible(true)
  }

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
            Bem vindo, {user.name}
          </Paragraph>
          {isWelcomeVisible ? <Welcome /> : null}
          {isFormVisible ? <Formulario onEdit={onSubmitUpdateInfo} /> : null}
          {isUpdateVisible ? <UpdatePass onEdit={onSubmitUpdatePass} /> : null}
          <Button className={styles.buttonLetsGo} type="primary" onClick={next}>
            Vamos lá!
          </Button>
        </Card>
      </Col>
    </Row>
  )
}

export default Onboarding
