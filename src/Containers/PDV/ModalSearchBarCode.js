import React, { useState, useEffect } from 'react'
import { Col, Image, Input, Modal, Row, Typography, Form } from 'antd'

import barCodeScanner from '../../Assets/barCodeScanner.svg'

const { Text } = Typography

const ModalSearchBarCode = ({ isVisible, handleCancel, handleSearch }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue('')
  }, [])

  return (
    <Modal visible={isVisible} footer={null} onCancel={handleCancel}>
      <Row justify="center" gutter={[0, 20]}>
        <Col>
          <Image src={barCodeScanner} alt="bar code scanner" preview={false} />
        </Col>
        <Col span={24} align="center">
          <Text>
            Para utilizar a leitura por código de barras o cursor do mouse
            precisa estar dentro do campo abaixo!
          </Text>
        </Col>
        <Col span={24}>
          <Text>Scannear código de barras:</Text>
          <Input
            autoFocus
            style={{marginTop: '15px'}}
            value={value}
            onChange={({ target }) => setValue(target.value)}
            onPressEnter={() => handleSearch(value)}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalSearchBarCode
