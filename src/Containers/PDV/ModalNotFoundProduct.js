import React from 'react'
import { Button, Col, Image, Modal, Row, Typography } from 'antd'

import warninig from '../../Assets/warninig.svg'

const { Text } = Typography

const ModalNotFoundProduct = ({
  isVisible,
  handleCancel,
  handleClickTryAgain
}) => {
  return (
    <Modal visible={isVisible} footer={null} onCancel={handleCancel}>
      <Row justify="center" gutter={[0, 20]}>
        <Col>
          <Image src={warninig} alt="warninig" preview={false} />
        </Col>
        <Col style={{ textAlign: 'center' }} span={24}>
          <Text>
            Não foi possível buscar este item pelo{' '}
            <Text strong>
              código de barras, tente novamente ou digite um novo código!
            </Text>
          </Text>
        </Col>
        <Col span={24}>
          <Button
            onClick={handleClickTryAgain}
            style={{ width: '100%' }}
            type="primary">
            Tentar novamente
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalNotFoundProduct
