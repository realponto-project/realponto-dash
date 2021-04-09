import React from 'react'
import { Modal, Typography, Image, Row, Col } from 'antd'
import Denied from '../../../Assets/denied.svg'

const { Title } = Typography

const Upgrade = ({ visible, onCancel }) => {

  return (
    <Modal
      width={450}
      visible={visible}
      title="LIMITE DE PRODUTO EXCEDIDO"
      onCancel={() => {
        onCancel()
      }}
      footer={false}>
      <Row>
        <Col align="center">
          <Title level={4}>A quantidade limite de produto do seu plano já chegou, contrate outro plano que te atenda! </Title>
          <Image width={300} src={Denied} preview={false} style={{margin: '30px 0'}}/>
        </Col>
      </Row>
    </Modal>
  )
}

export default Upgrade
