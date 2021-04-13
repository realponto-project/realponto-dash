import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose, filter, insert, isEmpty, length, map } from 'ramda'

import StatusContainer from '../../../Containers/Status/Manager'

import {
  createStatus,
  getAllStatus,
  updateStatus
} from '../../../Services/Status'

const initialFilterState = {
  activated: ['Ativo', 'Inativo'],
  name: ''
}

const Status = ({
  statusSearch,
  setStatusSearch,
  cleanStatusSearch,
  setNewStatusReducer
}) => {
  const [status, setStatus] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllStatuses()
  }, [page])

  const buildStatusSearch = (values) => {
    const { label, activated } = values
    const checkedActivated =
      activated && activated.length < 2 && activated.length !== 0
        ? {
            activated: activated[0] !== 'Inativo'
          }
        : {}

    const checkedName = isEmpty(label) ? {} : { label }

    return {
      ...checkedActivated,
      ...checkedName,
      page,
      limit: 10
    }
  }

  const onChangeTable = ({ current }) => {
    setPage(current)
  }

  const getAllStatuses = async () => {
    setLoading(true)

    try {
      const { data } = await getAllStatus(buildStatusSearch(statusSearch))
      setStatus(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleSubmit = async (values) => {
    try {
      const { data } = await createStatus({
        ...values,
        typeLabel: values.type === 'outputs' ? 'Saída' : 'Entrada',
        value: values.label
      })

      setNewStatusReducer(data)
      getAllStatuses()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSubmitUpdate = async (values) => {
    try {
      await updateStatus({
        ...values,
        typeLabel: values.type === 'outputs' ? 'Saída' : 'Entrada',
        value: values.label
      })
      getAllStatuses()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    if (name === 'activated') {
      return setStatusSearch({
        [name]: value.length === 0 ? initialFilterState.activated : value
      })
    }

    return setStatusSearch({ [name]: value })
  }

  const clearFilters = () => {
    cleanStatusSearch()
  }

  const handleGetStatusByFilters = () => {
    if (page !== 1) {
      setPage(1)
    } else {
      getAllStatuses()
    }
  }

  return (
    <StatusContainer
      status={status}
      handleSubmit={handleSubmit}
      handleSubmitUpdate={handleSubmitUpdate}
      handleGetStatusByFilters={handleGetStatusByFilters}
      handleOnChange={handleOnChange}
      filters={statusSearch}
      clearFilters={clearFilters}
      loading={loading}
      page={page}
      onChangeTable={onChangeTable}
    />
  )
}

const mapStateToProps = ({ statusSearch, status }) => ({
  statusSearch,
  statusReducer: status
})

const mapDispatchToProps = (dispatch) => ({
  setStatusSearch: (payload) =>
    dispatch({ type: 'SET_STATUS_GLOBAL_SEARCH', payload }),
  cleanStatusSearch: () => dispatch({ type: 'CLEAN_STATUS_GLOBAL_SEARCH' }),
  setNewStatusReducer: (payload) =>
    dispatch({ type: 'SET_NEW_STATUS', payload })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Status)
