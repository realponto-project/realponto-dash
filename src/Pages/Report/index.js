import React, { useState, useEffect } from 'react'
import Report from '../../Containers/Report'
import { isEmpty } from 'ramda'
import { getAllOrder } from '../../Services/Order'
import { getAll } from '../../Services/User'

const ReportManager = () => {
  const [datasource, setDatasource] = useState([])
  const [users, setUsers] = useState([])
  const [orderSearch, setOrderSearch] = useState({
    user_name: '',
    initialDate: '',
    finalyDate:  '',
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

  const handleChangeSearch = (name, value) => setOrderSearch({...orderSearch, [name]: value })

  const buildOrderSearch = (data) => {
    // eslint-disable-next-line camelcase
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
      } = await getAll({activated: true})
      setUsers(source)
    }catch (error) {
      console.log(error)
    }
  }


  return(
    <Report 
      handleGetAllOrders={handleGetAllOrders}
      orderSearch={orderSearch}
      handleChangeSearch={handleChangeSearch}
      datasource={datasource}
      users={users}
    />
  )
}

export default ReportManager
