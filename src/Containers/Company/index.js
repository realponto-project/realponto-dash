import React from 'react'
import { 
  Row, 
  Col
} from "antd" 
import Info from './Info'
import Address from './Address'
import BankAccount from './BankAccount'

const Company = () => {
  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Info/>
      </Col>
      <Col span={24}>
        <Address/>
      </Col>
      <Col span={24}>
        <BankAccount/>
      </Col>
    </Row>
  )
}

export default Company
