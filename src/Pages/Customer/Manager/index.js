import React, { useEffect, useState } from 'react'
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { connect } from 'react-redux'
import { compose, isEmpty, isNil, pathOr } from 'ramda'
import { Form } from 'antd'

import ManagerContainer from '../../../Containers/Customer/Manager'
import {
  getAll,
  getCusmtomerById,
  createCustomer,
  updateCustomer
} from '../../../Services/Customer'
import {
  buildAddCustomer,
  buildFormValuesCustomer
} from '../../../utils/Specs/Customer'

const Manager = ({
  cleanCustomerSearch,
  customerSearch,
  setCustomerSearch
}) => {
  const [expand, setExpand] = useState(false)
  const [formAdd] = Form.useForm()
  const [source, setSource] = useState([])
  const [visibleModalAdd, setVisibleModalAdd] = useState(false)

  useEffect(() => {
    getAllCustomers()
  }, [])

  const getAllCustomers = async () => {
    const value = customerSearch.search_name_or_document
    let query = {}

    if (!isEmpty(value)) {
      query = {
        name: value
      }

      const valueWithReplace = value
        .replace(/\./g, '')
        .replace(/-/g, '')
        .replace(/\//g, '')

      if (cnpj.isValid(valueWithReplace) || cpf.isValid(valueWithReplace)) {
        query = {
          document: valueWithReplace
        }
      }
    }

    try {
      const { data } = await getAll(query)
      setSource(data.source) // precisamos adicionar uma key
    } catch (error) {}
  }

  const onChangeSearch = ({ target }) => {
    setCustomerSearch({ search_name_or_document: target.value })
  }

  const clearFilters = () => {
    cleanCustomerSearch()
  }

  const closeModalAdd = () => {
    setExpand(false)
    setVisibleModalAdd(false)
    formAdd.resetFields()
  }

  const handleClickExpand = () => setExpand(!expand)

  const handleSubmitAdd = async (formData) => {
    const customerValues = buildAddCustomer(expand)(formData)
    try {
      if (isNil(customerValues.id)) {
        await createCustomer(customerValues)
      } else {
        await updateCustomer(customerValues)
      }

      getAllCustomers()
      closeModalAdd()
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickEdit = async (id) => {
    try {
      const { status, data } = await getCusmtomerById(id)

      if (status !== 200) throw new Error('Customer not found')

      setExpand(!isNil(pathOr(null, ['address'], data)))
      setVisibleModalAdd(true)
      formAdd.setFieldsValue(buildFormValuesCustomer(data))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ManagerContainer
      clearFilters={clearFilters}
      closeModalAdd={closeModalAdd}
      expand={expand}
      filters={customerSearch}
      formAdd={formAdd}
      handleClickEdit={handleClickEdit}
      handleClickExpand={handleClickExpand}
      handleFilter={getAllCustomers}
      handleSubmitAdd={handleSubmitAdd}
      onChangeSearch={onChangeSearch}
      openModalAdd={() => setVisibleModalAdd(true)}
      source={source}
      visibleModalAdd={visibleModalAdd}
    />
  )
}

const mapStateToProps = ({ customerSearch }) => ({
  customerSearch
})

const mapDispatchToProps = (dispatch) => ({
  setCustomerSearch: (payload) =>
    dispatch({ type: 'SET_CUSTOMER_GLOBAL_SEARCH', payload }),
  cleanCustomerSearch: () => dispatch({ type: 'CLEAN_CUSTOMER_GLOBAL_SEARCH' })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Manager)
