import React from 'react'
import { Image, Typography, Button, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import styles from './style.module.css'
import Box from './box.svg'

const { Title } = Typography

const AdBanner = ({
  history
}) => {
  const gotoPlan = () => history.push('/logged/plans')
  return (
    <div
      className={styles.adBannerContainer}
    >
     <Row>
        <Col span={8}>
          <Title level={4}>Gestão completa!</Title>
          <p>
            Acesso completo e ilimitado, gerencie seu
            <b> estoque </b>
            de formar  <b>fácil!</b>
          </p>
          <Button onClick={gotoPlan} type="primary" >Assine Agora <b> R$9,99/mês</b></Button>
        </Col>
        <Col span={16} style={{
          textAlign: 'right',
          position: 'relative',
          top: '5px',
        }} >
          <Image
            width={300}
            src={Box}
          />
        </Col>
     </Row>
    </div>
  )
}

export default withRouter(AdBanner)
