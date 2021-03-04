import React from 'react'
import { Image, Typography, Row, Col } from 'antd'
import styles from './style.module.css'
import Box from './box.svg'

const { Title } = Typography

const PlanInfo = () => {
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
          <p style={{ margin: '0', padding: '0' }}>
            Gestão completa, estoque, clientes, equipe
            <b> e muito mais. </b>
          </p>
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

export default PlanInfo
