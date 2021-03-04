import React, { useEffect, useState, useCallback } from 'react'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { connect } from 'react-redux'
import { compose, isEmpty } from 'ramda'

import ManagerContainer from '../../../Containers/Customer/Manager'
import { getAll } from '../../../Services/Customer'

const Manager = ({
  customerSearch,
  setCustomerSearch,
  cleanCustomerSearch,
}) => {
  const [source, setSource] = useState([])

  useEffect(() => {
    getAllCustomers()
  }, [])

  const getAllCustomers = async () => {
    const value = customerSearch.search_name_or_document
    let query = {}

    if (!isEmpty(value)) {
      query = {
        name: value,
      }

      const valueWithReplace = value
        .replace(/\./g,'')
        .replace(/\-/g, '')
        .replace(/\//g, '')

      if(cnpj.isValid(valueWithReplace) || cpf.isValid(valueWithReplace)) {
        query = {
          document: valueWithReplace
        }
      }
    }

    try {
      const { data } = await getAll(query)
      setSource(data.source)
    } catch (error) {

    }
  }

  const onChangeSearch = ({ target }) => {
    setCustomerSearch({ search_name_or_document: target.value })
  }

  const clearFilters = () => {
    cleanCustomerSearch()
  }

  return (
    <ManagerContainer
      source={source}
      handleFilter={getAllCustomers}
      onChangeSearch={onChangeSearch}
      filters={customerSearch}
      clearFilters={clearFilters}
    />
  )
}

const mapStateToProps = ({ customerSearch }) => ({
  customerSearch,
})

const mapDispatchToProps = dispatch => ({
  setCustomerSearch: payload => dispatch({ type: 'SET_CUSTOMER_GLOBAL_SEARCH', payload }),
  cleanCustomerSearch: () => dispatch({ type: 'CLEAN_CUSTOMER_GLOBAL_SEARCH' }),
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhanced(Manager)
