import React, { useState } from 'react'
import { Row, Col, Card, Image, Typography, Button } from 'antd'
import styles from './style.module.css'
import Welcome from './Welcome'
import Formulario from './Form'
import UpdatePass from './UpdatePassword'

import ImageOnboarding from './onboarding.svg'
import Logo from './alxa.svg'

const { Paragraph } = Typography

const Onboarding = ({ user, updateMyInfo, handleSubmit, errorMessage }) => {
  const [isWelcomeVisible, setWelcomeVisible] = useState(true)
  const [isFormVisible, setFormVisible] = useState(false)
  const [isUpdateVisible, setUpdateVisible] = useState(false)

  const onSubmitUpdateInfo = (values) => {
    updateMyInfo(user.id, { ...values, firstAccess: false }).then(() => {
      setFormVisible(false)
      setUpdateVisible(true)
    }).catch((err) => console.error(err))
  }

  const onSubmitUpdatePass = (values) => {
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
            overflow: 'auto',
            background: '#F2F2F3',
            padding: '50px 10px 0 20px'
          }}>
          <Paragraph className={styles.textWelcome}>
            Bem vindo, {user.name}
          </Paragraph>
          {isWelcomeVisible ? <> <Welcome /> <Button className={styles.buttonLetsGo} type="primary" onClick={next}>
            Vamos lá!
          </Button> </> : null}
          {isFormVisible ? <Formulario onEdit={onSubmitUpdateInfo} errorMessage={errorMessage} /> : null}
          {isUpdateVisible ? <UpdatePass onEdit={onSubmitUpdatePass} /> : null}

        </Card>
      </Col>
    </Row>
  )
}

export default Onboarding
