import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, pathOr } from 'ramda'

import DetailContainer from '../../../Containers/Order/Detail'
import { getOrderById, updateOrder, finished, customerAssocite } from '../../../Services/Order'
import { getAll } from '../../../Services/User'
import { getAll as getAllCustomers} from '../../../Services/Customer'

import {
  getBySerialNumber,
  createSerialNumbers,
  associateSerialNumber,
  getSerialOrderOutputs,
} from '../../../Services/SerialNumber'

const Detail = ({
  match,
  status,
}) => {
  const [order, setOrder] = useState({
    user: {
      name: ''
    },
    status: {
      color: '',
      value: '',
    },
    customer: {
      name: '',
      document: '',
      phone: '',
      address: {
        street: '',
        streetNumber: '',
        zipcode: '',
        city: '',
        state: '',
        neighborhood: '',
      }
    }
  })
  const [users, setUsers] = useState([])
  const [serialNumbersOuts, setSerialNumbersOuts] = useState([])
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    getOrder()
    getAllUsers()
    getAllCustomerPage()
  }, [])


  const getAllCustomerPage = async () => {
    try {
      const { data: { source } } = await getAllCustomers({ limit: 9999 })
      setCustomers(source)
    } catch (error) {
      console.log(error)
    }
  }


  const getAllUsers = async () => {
    try {
      const { data: { source } } = await getAll({})
      setUsers(source)
    } catch (error) {
      console.log(error)
    }
  }

  const getOrder = async () => {
    try {
      const { data } = await getOrderById(match.params.id)
      setOrder(data)
      if (order.status.type === 'outputs') {
        const { data } = await getSerialOrderOutputs({ transactionOutId: match.params.id, limit: 9999 })
        setSerialNumbersOuts(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateOrderDetail = async (values) => {
    try {
      const { data } = await updateOrder(match.params.id, values)
      setOrder(data)
    } catch (error) {
      console.log(error)
    }
  }


  const serialNumberExistOrActivated = async (serialNumber) => {
    const response = await getBySerialNumber({ activated: true, serialNumber })
    return response
  }

  const finishedOrder = async () => {
    try {
      const { data } = await finished(match.params.id)
      setOrder(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const addSerialNumbers = async (values) => {
    const response = await createSerialNumbers({ ...values, orderId: match.params.id })
    getOrder()
    return response
  }
  const addAssociateSerialNumbers = async (values) => {
    await associateSerialNumber({ ...values, orderId: match.params.id })
    getOrder()
  }

  const associateCustomerOrder = async (values) => {
    await customerAssocite(match.params.id, values)
    getOrder()
  }

  return (
    <DetailContainer
      order={order}
      users={users}
      statusList={status}
      updateOrderDetail={updateOrderDetail}
      finishedOrder={finishedOrder}
      serialNumberExistOrActivated={serialNumberExistOrActivated}
      addSerialNumbers={addSerialNumbers}
      addAssociateSerialNumbers={addAssociateSerialNumbers}
      serialNumbersOuts={serialNumbersOuts}
      customers={customers}
      associateCustomerOrder={associateCustomerOrder}
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

export default enhanced(Detail)
