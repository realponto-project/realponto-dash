import React from 'react'
import { Modal, Typography, Image, Row, Col } from 'antd'
import Denied from '../../../Assets/denied.svg'

const { Title } = Typography

const Upgrade = ({ visible, onCancel }) => {

  return (
    <Modal
      width={500}
      visible={visible}
      // title="LIMITE DE PRODUTO EXCEDIDO"
      onCancel={() => {
        onCancel()
      }}
      footer={false}>
      <Row justify="center">
        <Col align="center">
          <Title level={4}>
            A quantidade de produtos atingiu o limite!
            </Title>
          <Image width={300} src={Denied} preview={false} style={{margin: '30px 0'}}/>

          <Title level={5}>
            Para cadastrar mais produtos faça um upgrade no seu plano.
            </Title>
        </Col>
      </Row>
    </Modal>
  )
}

export default Upgrade
