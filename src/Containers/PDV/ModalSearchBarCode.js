import React, { useState, useEffect } from 'react'
import { Col, Image, Input, Modal, Row, Typography } from 'antd'

import barCodeScanner from '../../Assets/barCodeScanner.svg'

const { Text } = Typography

const ModalSearchBarCode = ({ handleCancel, handleSearch, isVisible }) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setSearchValue('')
  }, [isVisible])

  return (
    <Modal footer={null} onCancel={handleCancel} visible={isVisible}>
      <Row gutter={[0, 20]} justify="center">
        <Col>
          <Image alt="bar code scanner" preview={false} src={barCodeScanner} />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Text>
            Para utilizar a leitura por código de barras o cursor do mouse
            precisa estar dentro do campo abaixo!
          </Text>
        </Col>
        <Col span={24}>
          <Text>Scannear código de barra</Text>
          <Input
            allowClear
            onChange={({ target }) => setSearchValue(target.value)}
            onPressEnter={({ target }) => handleSearch(target.value)}
            value={searchValue}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalSearchBarCode
