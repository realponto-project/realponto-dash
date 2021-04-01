import React, { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  add,
  adjust,
  applySpec,
  compose,
  dec,
  equals,
  filter,
  findIndex,
  inc,
  insert,
  map,
  max,
  merge,
  min,
  multiply,
  pathOr,
  pipe,
  prop,
  propEq,
  reduce,
  __
} from 'ramda'
import { Form } from 'antd'

import PDVContainer from '../../Containers/PDV'
import {
  getAll,
  getProductByBarCode,
  getProductById
} from '../../Services/Product'
import { getAll as getAllCustomersService } from '../../Services/Customer'

const PDV = ({ history, formPdv, setFormPdv, clearFormPdv }) => {
  const [form] = Form.useForm()
  const [isSaved, setIsSaved] = useState(false)
  const [isVisibleNotFoundProduct, setIsVisibleNotFoundProduct] = useState(
    false
  )
  const [isVisibleSearchBarCode, setIsVisibleSearchBarCode] = useState(false)
  const [options, setOptions] = useState([])
  const [optionsCustomer, setOptionsCustomer] = useState([])

  const updateAmount = (id, callback) => {
    const productsSelcts = pathOr([], ['productsSelcts'], formPdv)
    const index = findIndex(propEq('id', id), productsSelcts)

    if (index === -1) return

    return adjust(
      index,
      (productsSelct) =>
        applySpec({
          id: prop('id'),
          amount: pipe(
            prop('amount'),
            Number,
            callback,
            max(1),
            min(prop('balance')(productsSelct))
          ),
          balance: prop('balance'),
          barCode: prop('barCode'),
          name: prop('name'),
          salePrice: prop('salePrice')
        })(productsSelct),
      productsSelcts
    )
  }

  const handleCancelNotFountProduct = () => setIsVisibleNotFoundProduct(false)

  const handleCancelSearchBarCode = () => setIsVisibleSearchBarCode(false)

  const handleClickClear = () => {
    clearFormPdv()
    form.resetFields()
    setIsSaved(false)
  }

  const handleClickDown = (id) =>
    setFormPdv({ productsSelcts: updateAmount(id, dec) })

  const handleClickDeleteProduct = (productId) => {
    const productsSelcts = filter(
      ({ id }) => id !== productId,
      pathOr([], ['productsSelcts'], formPdv)
    )

    setFormPdv({ productsSelcts })
  }

  const handleClickSearchBarCode = () => setIsVisibleSearchBarCode(true)

  const handleClickTryAgain = () => {
    handleCancelNotFountProduct()
    handleClickSearchBarCode()
  }

  const handleClickUp = (id) =>
    setFormPdv({ productsSelcts: updateAmount(id, inc) })

  const handleSearchBarCode = async (barCode) => {
    handleCancelSearchBarCode()
    try {
      const { data } = await getProductByBarCode(barCode)
      const productsSelcts = pathOr([], ['productsSelcts'], formPdv)

      const index = findIndex(
        propEq('id', data.id),
        pathOr([], ['productsSelcts'], formPdv)
      )

      if (index !== -1) return
      // if (index !== -1) throw new Error('Product already scannered')

      pipe(
        insert(0, __, productsSelcts),
        (productsSelcts) => ({ productsSelcts }),
        setFormPdv
      )(merge(data, { amount: 1 }))
    } catch (error) {
      console.error(error)
      setIsVisibleNotFoundProduct(true)
    }
  }

  const handleSubmit = (formData) => {
    const buildPdv = applySpec({
      customerId: prop('customerId'),
      discount: prop('discount'),
      payment: prop('payment'),
      type: prop('type'),
      products: pipe(
        prop('productsSelcts'),
        map(
          applySpec({
            id: prop('id'),
            amount: prop('amount')
          })
        )
      )
    })
    console.log(buildPdv(merge(formPdv, formData)))
    setIsSaved(true)
  }

  const getAllCustomers = async (name) => {
    try {
      const resp = await getAllCustomersService({
        name
      })
      setOptionsCustomer(
        map(
          applySpec({
            value: prop('id'),
            label: prop('name')
          }),
          resp.data.source
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const onSearch = async (name) => {
    try {
      const resp = await getAll({
        activated: true,
        name
      })
      setOptions(
        map(
          applySpec({
            value: prop('id'),
            label: prop('name')
          }),
          resp.data.source
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  const onSelect = async (productId) => {
    try {
      const { data } = await getProductById(productId)
      const productsSelcts = pathOr([], ['productsSelcts'], formPdv)

      const index = findIndex(
        propEq('id', data.id),
        pathOr([], ['productsSelcts'], formPdv)
      )

      if (index !== -1) return

      pipe(
        insert(0, __, productsSelcts),
        (productsSelcts) => ({ productsSelcts }),
        setFormPdv
      )(merge(data, { amount: 1 }))
    } catch (error) {
      console.error(error)
    }
  }

  const onValuesChange = (dataChanged) => {
    if (pipe(pathOr(false, ['type']), equals('fast'))(dataChanged)) {
      setFormPdv({ name: '' })
    }

    setFormPdv(dataChanged)
  }

  const getAllProduct = useCallback(async () => {
    const {
      data: { source }
    } = await getAll()

    setOptions(
      map(
        applySpec({
          label: prop('name'),
          value: prop('id')
        }),
        source
      )
    )
  }, [])

  useEffect(() => {
    getAllProduct()
    getAllCustomers()
  }, [])

  useEffect(() => {
    form.setFieldsValue(formPdv)
  }, [formPdv])

  const subTotal = reduce(
    add,
    0,
    map(
      ({ amount, salePrice }) => multiply(amount, salePrice),
      pathOr([], ['productsSelcts'], formPdv)
    )
  )

  return (
    <PDVContainer
      form={form}
      handleCancelNotFountProduct={handleCancelNotFountProduct}
      handleCancelSearchBarCode={handleCancelSearchBarCode}
      handleClickClear={handleClickClear}
      handleClickDown={handleClickDown}
      handleClickDeleteProduct={handleClickDeleteProduct}
      handleClickSearchBarCode={handleClickSearchBarCode}
      handleClickTryAgain={handleClickTryAgain}
      handleClickUp={handleClickUp}
      handleSearchBarCode={handleSearchBarCode}
      handleSubmit={handleSubmit}
      isSaved={isSaved}
      isVisibleNotFoundProduct={isVisibleNotFoundProduct}
      isVisibleSearchBarCode={isVisibleSearchBarCode}
      onSearchCustomer={getAllCustomers}
      onSearch={onSearch}
      onSelect={onSelect}
      onValuesChange={onValuesChange}
      options={options}
      optionsCustomer={optionsCustomer}
      products={formPdv.productsSelcts}
      subTotal={subTotal}
    />
  )
}
const mapStateToProps = ({ formPdv }) => ({
  formPdv
})

const mapDispatchToProps = (dispatch) => ({
  setFormPdv: (payload) => dispatch({ type: 'SET_FORM_PDV', payload }),
  clearFormPdv: (payload) => dispatch({ type: 'CLEAR_FORM_PDV' })
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhanced(PDV)
