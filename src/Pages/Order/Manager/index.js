import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, isEmpty } from 'ramda'

import ManagerContainer from '../../../Containers/Order/Manager'
import { getAllOrder, getAllOrderSummary } from '../../../Services/Order'

const pendingReview = ['Sim', 'Não']

const Manager = ({
  history,
  orderSearch,
  setOrderSearch,
  cleanOrderSearch,
}) => {
  const [datasource, setDatasource] = useState({})
  const [datasourceChart, setDatasourceChart] = useState({
    source: [],
    chartSettings: [],
  })
  const [page, setPage] = useState(1)

  useEffect(() => {
    handleGetAllOrders()
  }, [])

  const handleGetAllOrders = async () => {
    try {
      const { data } = await getAllOrder(buildOrderSearch(orderSearch))
      const { data: dataChart } = await getAllOrderSummary(buildOrderSearch(orderSearch))
      setDatasourceChart(dataChart)
      setDatasource(data)
    } catch (error) {
      console.log(error)
    }
  }

  const buildOrderSearch = (orderSearch) => {
    const { user_name, dates, pendingReview } = orderSearch
    const checkedPendingReview = (
      pendingReview && pendingReview.length < 2 && pendingReview.length !== 0
       ? { pendingReview:  pendingReview[0] === 'Não' ? false : true }
       : {}
    )

    const datesSpec = dates[0] && dates[1] ? {
      initialDate: dates[0].toString(),
      finalyDate: dates[1].toString(),
    } : {}
    const checkedName = isEmpty(user_name) ? {} : { user_name }

    return ({
      ...checkedName,
      ...datesSpec,
      ...checkedPendingReview ,
      page,
      limit: 25
    })
  }

  const handlePagination = async (nextpage) => {
    try {
      const { data } = await getAllOrder({ page: nextpage, limit: 25 })
      setPage(nextpage)
      setDatasource(data)
    } catch (error) {

    }
  }

  const goToAddOrder = () => history.push('/logged/order-inputs')
  const goToOrderDetail = (id) => history.push(`/logged/order/detail/${id}`)
  const goToAddOrderOut = () => history.push('/logged/order-outputs')

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    if(name === 'pendingReview') {
      return setOrderSearch({
        [name]: (
          value.length === 0
          ? pendingReview
          : value
        )
      })
    }

    return setOrderSearch({ [name]: value })
  }

  const clearFilters = () => {
    cleanOrderSearch()
  }

  return (
    <ManagerContainer
      datasource={datasource}
      goToAddOrder={goToAddOrder}
      goToOrderDetail={goToOrderDetail}
      goToAddOrderOut={goToAddOrderOut}
      handleGetOrdersByFilters={handleGetAllOrders}
      handlePagination={handlePagination}
      datasourceChart={datasourceChart.source}
      chartSettings={datasourceChart.chartSettings}
      filters={orderSearch}
      handleOnChange={handleOnChange}
      clearFilters={clearFilters}
      dates={orderSearch.dates}
    />
  )
}

const mapStateToProps = ({ orderSearch }) => ({
  orderSearch,
})

const mapDispatchToProps = dispatch => ({
  setOrderSearch: payload => dispatch({ type: 'SET_ORDER_GLOBAL_SEARCH', payload }),
  cleanOrderSearch: () => dispatch({ type: 'CLEAN_ORDER_GLOBAL_SEARCH' }),
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)

export default enhanced(Manager)
