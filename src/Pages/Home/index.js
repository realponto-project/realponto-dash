import React, { useEffect, useState } from 'react'
import HomeContainer from '../../Containers/Home'
import getDashboardValues from '../../Services/Home'

const Home = () => {
  const [homeState, setHomeState] = useState({
    customers: null,
    orders: null,
    ordersTotal: [],
    ordersToday: []
  })

  useEffect(() => {
    getValues()
  }, [])

  const getValues = async () => {
    try {
      const { data } = await getDashboardValues()
      setHomeState(data)
    } catch (error) {
      console.log('cannot find values of dashboard!')
    }
  }

  return (
    <HomeContainer
      dataBarChart={homeState.ordersTotal}
      dataPieChart={homeState.ordersToday}
      customers={homeState.customers}
      orders={homeState.orders}
    />
  )
}

export default Home
