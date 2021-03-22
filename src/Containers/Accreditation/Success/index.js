import React from 'react'
import { Col, Image, Row, Typography } from 'antd'

import logo from '../../../Assets/logo.svg'
// trocar nome (congratulation)
import asArveresSomosNozes from '../../../Assets/asArveresSomosNozes.svg'
import styles from './style.module.css'

const { Link } = Typography

const Sucess = () => (
  <Row style={{ height: '100vh' }}>
    <Col span={10}>
      <div className={styles.contentText}>
        <Image src={logo} preview={false} />

        <p className={styles.title}>
          <strong>Parabéns,</strong> você acaba de completa o seu cadastro!
        </p>

        <p>
          Estamos validando os seus dados e preparando nossa dashboard para você
          em poucos instanteces você já pode começar a utilizar o alxa.
        </p>

        <p>
          Não perca tempo compartilhe com os seus amigos essa solução incrível{' '}
          <Link href="https://ant.design" target="_blank">
            compartilhar!
          </Link>
        </p>
      </div>
    </Col>
    <Col offset={2} span={12}>
      <Row style={{ height: '100vh' }} align="middle">
        <Image src={asArveresSomosNozes} preview={false} />
      </Row>
    </Col>
  </Row>
)

export default Sucess
