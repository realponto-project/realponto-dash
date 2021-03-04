import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose, pathOr } from 'ramda'
import { withRouter } from 'react-router-dom'

import buildOrderSpec from './orderSpec'
import OutOrderContainer from '../../../Containers/Order/OutOrder'
import { getAll as getAllUserService } from '../../../Services/User'
import { getAll as getAllProductService } from '../../../Services/Product'
import { getAll as getAllCustomerService } from '../../../Services/Customer'
import { createOrder } from '../../../Services/Order'

const OutOrder = ({
  history,
  status,
}) => {
  const [userList, setUserList] = useState([])
  const [customerList, setCustomerList] = useState([])
  const [productList, setProductList] = useState([])
  const [key, setKey] = useState(0)

  useEffect(() => {
    getAllUser()
    getAllCustomer()
    getAllProduct()
  }, [])


  const getAllProduct = async () => {
    try {
      const { data: { source }} = await getAllProductService({ activated: true })
      setProductList(source)
    } catch (error) {

    }
  }

  const getAllUser = async () => {
    try {
      const { data: { source }} = await getAllUserService({ activated: true })
      setUserList(source)
    } catch (error) {

    }
  }

  const getAllCustomer = async () => {
    try {
      const { data: { source }} = await getAllCustomerService()
      setCustomerList(source)
    } catch (error) {

    }
  }

  const goToManagerOrder = () => {
    console.log('manager order')
  }

  const handleSubmit = async values => {
    try {
      await createOrder(buildOrderSpec(values))
      setKey(key + 1)
    } catch (error) {

    }
  }

  const goToOrder = () => history.push('/logged/order/manager')

  return (
    <OutOrderContainer
      key={key}
      customerList={customerList}
      userList={userList}
      productList={productList}
      statusList={status.filter(s => s.type === 'outputs')}
      goToManagerOrder={goToManagerOrder}
      handleSubmit={handleSubmit}
      goToOrder={goToOrder}
    />
  )
}

const mapStateToProps = (state) => {
  const status = pathOr([], ['status', 'source'], state)
  return ({
    status,
  })
}

const enhanced = compose(
  connect(mapStateToProps),
  withRouter,
)

export default enhanced(OutOrder)
