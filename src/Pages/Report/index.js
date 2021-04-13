import React, { useState } from 'react'
import Report from '../../Containers/Report'
import { isEmpty } from 'ramda'
import { getAllOrder } from '../../Services/Order'

const ReportManager = () => {
  const [datasource, setDatasource] = useState([])
  const [orderSearch, setOrderSearch] = useState({
    user_name: '',
    initialDate: '',
    finalyDate:  '',
    date: ''
  })

  const handleGetAllOrders = async () => {
    console.log(buildOrderSearch(orderSearch))
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
    const { user_name, date } = data
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
    }
  }

  return(
    <Report 
      handleGetAllOrders={handleGetAllOrders}
      orderSearch={orderSearch}
      handleChangeSearch={handleChangeSearch}
      datasource={datasource}
    />
  )
}

export default ReportManager
