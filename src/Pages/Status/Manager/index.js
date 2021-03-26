import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose, isEmpty } from 'ramda'

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

const Status = ({ statusSearch, setStatusSearch, cleanStatusSearch }) => {
  const [status, setStatus] = useState({})
  const [page] = useState(1)

  useEffect(() => {
    getAllStatuses()
  }, [])

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
      limit: 25
    }
  }

  const getAllStatuses = async () => {
    try {
      const { data } = await getAllStatus(buildStatusSearch(statusSearch))
      setStatus(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createStatus({
        ...values,
        typeLabel: values.type === 'outputs' ? 'Saída' : 'Entrada',
        value: values.label
      })
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

  return (
    <StatusContainer
      status={status}
      handleSubmit={handleSubmit}
      handleSubmitUpdate={handleSubmitUpdate}
      handleGetStatusByFilters={getAllStatuses}
      handleOnChange={handleOnChange}
      filters={statusSearch}
      clearFilters={clearFilters}
    />
  )
}

const mapStateToProps = ({ statusSearch }) => ({
  statusSearch
})

const mapDispatchToProps = (dispatch) => ({
  setStatusSearch: (payload) =>
    dispatch({ type: 'SET_STATUS_GLOBAL_SEARCH', payload }),
  cleanStatusSearch: () => dispatch({ type: 'CLEAN_STATUS_GLOBAL_SEARCH' })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Status)
