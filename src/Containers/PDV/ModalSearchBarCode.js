import React from 'react'
import { Col, Image, Input, Modal, Row, Typography } from 'antd'
import { ScanOutlined } from '@ant-design/icons'

import barCodeScanner from '../../Assets/barCodeScanner.svg'

const { Text } = Typography
const { Search } = Input

const ModalSearchBarCode = ({
  searchValue,
  isVisible,
  handleCancel,
  handleSearch,
  handleChangeSearchValue
}) => {
  return (
    <Modal visible={isVisible} footer={null} onCancel={handleCancel}>
      <Row justify="center" gutter={[0, 20]}>
        <Col>
          <Image src={barCodeScanner} alt="bar code scanner" preview={false} />
        </Col>
        <Col span={24}>
          <Text>
            Para utilizar a leitura por código de barras o cursor do mouse
            precisa estar dentro do campo abaixo!
          </Text>
        </Col>
        <Col span={24}>
          <Text>Scannear código de barra</Text>
          <Search
            value={searchValue}
            onChange={handleChangeSearchValue}
            enterButton={<ScanOutlined />}
            onSearch={handleSearch}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalSearchBarCode
