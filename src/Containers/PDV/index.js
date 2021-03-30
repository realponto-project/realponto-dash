import React from 'react'
import { Row, Col } from 'antd'
import styles from './style.module.css'
import Checkout from './Checkout'
import ProductList from './ProductList'

const PDV = ({}) => {
  return (
    <Row className={styles.checkoutContainer} gutter={[16, 16]}>
      <Col span={16}>
        <ProductList />
      </Col>
      <Col span={8}>
        <Checkout />
      </Col>
    </Row>
  )
}

export default PDV
