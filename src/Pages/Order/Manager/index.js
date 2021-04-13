import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, isEmpty } from 'ramda'

import ManagerContainer from '../../../Containers/Order/Manager'
import { getAllOrder, getAllOrderSummary } from '../../../Services/Order'

const Manager = ({
  history,
  orderSearch,
  setOrderSearch,
  cleanOrderSearch
}) => {
  const [datasource, setDatasource] = useState({})
  const [datasourceChart, setDatasourceChart] = useState({
    source: [],
    chartSettings: []
  })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(10)

  useEffect(() => {
    handleGetAllOrders()
  }, [page])

  const handleGetAllOrders = async () => {

    setLoading(true)

    try {
      const { data } = await getAllOrder(buildOrderSearch(orderSearch))
      const { data: dataChart } = await getAllOrderSummary(
        buildOrderSearch(orderSearch)
      )
      setDatasourceChart(dataChart)
      setDatasource(data)
      setTotal(data.total)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const buildOrderSearch = (orderSearch) => {
    // eslint-disable-next-line camelcase
    const { user_name, dates, pendingReview } = orderSearch
   
    const datesSpec =
      dates[0] && dates[1]
        ? {
            initialDate: dates[0].toString(),
            finalyDate: dates[1].toString()
          }
        : {}
    const checkedName = isEmpty(user_name) ? {} : { user_name }

    return {
      ...checkedName,
      ...datesSpec,
      page,
      limit: 10
    }
  }

  const onChangeTable = ({current}) => {
    setPage(current)
  }

  const goToAddOrder = () => history.push('/logged/order-inputs')
  const goToOrderDetail = (id) => history.push(`/logged/order/detail/${id}`)
  const goToAddOrderOut = () => history.push('/logged/order-outputs')

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    if (name === 'pendingReview') {
      return setOrderSearch({
        [name]: value.length === 0 ? pendingReview : value
      })
    }

    return setOrderSearch({ [name]: value })
  }

  const clearFilters = () => {
    cleanOrderSearch()
  }

  const handleGetOrdersByFilters = () => {
    if(page !== 1){
      setPage(1)
    } else {
      handleGetAllOrders()
    }
  }

  return (
    <ManagerContainer
      datasource={datasource}
      goToAddOrder={goToAddOrder}
      goToOrderDetail={goToOrderDetail}
      goToAddOrderOut={goToAddOrderOut}
      handleGetOrdersByFilters={handleGetOrdersByFilters}
      datasourceChart={datasourceChart.source}
      chartSettings={datasourceChart.chartSettings}
      filters={orderSearch}
      handleOnChange={handleOnChange}
      clearFilters={clearFilters}
      dates={orderSearch.dates}
      loading={loading}
      onChangeTable={onChangeTable}
      total={total}
      page={page}
    />
  )
}

const mapStateToProps = ({ orderSearch }) => ({
  orderSearch
})

const mapDispatchToProps = (dispatch) => ({
  setOrderSearch: (payload) =>
    dispatch({ type: 'SET_ORDER_GLOBAL_SEARCH', payload }),
  cleanOrderSearch: () => dispatch({ type: 'CLEAN_ORDER_GLOBAL_SEARCH' })
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhanced(Manager)
