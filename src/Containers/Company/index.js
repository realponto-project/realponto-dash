import React from 'react'
import { 
  Row, 
  Col
} from "antd" 
import Info from './Info'
import Address from './Address'
import BankAccount from './BankAccount'

const Company = ({handleValueChange, form}) => {
  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Info 
          handleValueChange={handleValueChange}
          form = {form}/>
      </Col>
      <Col span={24}>
        <Address 
          handleValueChange = {handleValueChange}
          form = {form}/>
      </Col>
      <Col span={24}>
        <BankAccount
          handleValueChange={handleValueChange}
          form = {form}/>
      </Col>
    </Row>
  )
}

export default Company
