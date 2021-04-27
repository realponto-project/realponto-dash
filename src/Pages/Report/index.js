import React, { useState, useEffect } from 'react'
import { applySpec, isEmpty, map, path, pathOr, pipe } from 'ramda'

import Report from '../../Containers/Report'
import { getAllOrder } from '../../Services/Order'
import { getAll } from '../../Services/User'
import { createTransactions } from '../../Services/Transaction'

const ReportManager = () => {
  const [movementData, setMovementData] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [datasource, setDatasource] = useState([])
  const [users, setUsers] = useState([])
  const [orderSearch, setOrderSearch] = useState({
    user_name: '',
    initialDate: '',
    finalyDate: '',
    date: '',
    userId: ''
  })

  useEffect(() => {
    getAllUsers()
  }, [])

  const handleGetAllOrders = async () => {
    try {
      const { data } = await getAllOrder(buildOrderSearch(orderSearch))
      setDatasource(data.source)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeSearch = (name, value) =>
    setOrderSearch({ ...orderSearch, [name]: value })

  const buildOrderSearch = (data) => {
    const { user_name, date, userId } = data
    const datesSpec = date
      ? {
          initialDate: date.toString(),
          finalyDate: date.toString()
        }
      : {}
    const checkedName = isEmpty(user_name) ? {} : { user_name }

    return {
      ...checkedName,
      ...datesSpec,
      userId
    }
  }

  const getAllUsers = async () => {
    try {
      const {
        data: { source }
      } = await getAll({ activated: true })
      setUsers(source)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickMovement = (transaction) => {
    setMovementData(
      applySpec({
        productId: pathOr('', ['product', 'id']),
        productName: pathOr('', ['product', 'name']),
        orderId: pathOr('', ['orderId']),
        protocol: pathOr('', ['protocol']),
        price: pathOr('', ['price'])
      })(transaction)
    )
    setIsVisible(true)
  }

  const handleSubmitMovement = async (values) => {
    try {
      await createTransactions(values)
      handleGetAllOrders()
      closeModal()
    } catch (err) {
      console.error(err)
      closeModal()
    }
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <Report
      closeModal={closeModal}
      datasource={datasource}
      handleChangeSearch={handleChangeSearch}
      handleClickMovement={handleClickMovement}
      handleGetAllOrders={handleGetAllOrders}
      handleSubmitMovement={handleSubmitMovement}
      isVisible={isVisible}
      movementData={movementData}
      orderSearch={orderSearch}
      users={users}
    />
  )
}

export default ReportManager
