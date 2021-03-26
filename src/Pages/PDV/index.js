import React, { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  add,
  adjust,
  applySpec,
  compose,
  dec,
  findIndex,
  inc,
  insert,
  map,
  max,
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
import { getAll, getProductByBarCode } from '../../Services/Product'

const PDV = ({ history, formPdv, setFormPdv, clearFormPdv }) => {
  const [productList, setProductList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isVisibleSearchBarCode, setIsVisibleSearchBarCode] = useState(false)
  const [isVisibleNotFoundProduct, setIsVisibleNotFoundProduct] = useState(
    false
  )
  const [form] = Form.useForm()

  const getAllProduct = useCallback(async () => {
    const {
      data: { source }
    } = await getAll()

    setProductList(source)
  }, [])

  useEffect(() => {
    getAllProduct()
  }, [])

  useEffect(() => {
    form.setFieldsValue(formPdv)
  }, [formPdv])

  const updateAmount = (id, callback) => {
    const productsSelcts = pathOr([], ['productsSelcts'], formPdv)
    const index = findIndex(propEq('id', id), productsSelcts)

    if (index === -1) return

    return adjust(
      index,
      applySpec({
        id: prop('id'),
        amount: pipe(prop('amount'), Number, callback, max(1)),
        barCode: prop('barCode'),
        name: prop('name'),
        salePrice: prop('salePrice')
      }),
      productsSelcts
    )
  }

  const handleClickDown = (id) => {
    setFormPdv({ productsSelcts: updateAmount(id, dec) })
  }

  const handleClickUp = (id) => {
    setFormPdv({ productsSelcts: updateAmount(id, inc) })
  }

  const subTotal = reduce(
    add,
    0,
    map(
      ({ amount, salePrice }) => multiply(amount, salePrice),
      pathOr([], ['productsSelcts'], formPdv)
    )
  )

  const handleChangeSelect = (item, add) => {
    const index = findIndex(
      propEq('id', item.id),
      pathOr([], ['productsSelcts'], formPdv)
    )

    if (index !== -1) return

    add({ ...item, amount: 1 })
  }

  const handleSearchBarCode = async (barCode) => {
    handleCancelSearchBarCode()
    try {
      const { data } = await getProductByBarCode(barCode)
      console.log(data)
      const productsSelcts = form.getFieldValue('productsSelcts')
      // console.log(form.getInternalHooks)
      handleChangeSelect(
        data,
        pipe(
          insert(0, __, productsSelcts),
          (productsSelcts) => ({ productsSelcts }),
          setFormPdv
        )
      )
    } catch (error) {
      // console.error(error)
      setIsVisibleNotFoundProduct(true)
    }
  }

  const handleClickSearchBarCode = () => setIsVisibleSearchBarCode(true)
  const handleCancelSearchBarCode = () => {
    setIsVisibleSearchBarCode(false)
    setSearchValue('')
  }
  const handleCancelNotFountProduct = () => setIsVisibleNotFoundProduct(false)

  const handleClickTryAgain = () => {
    handleCancelNotFountProduct()
    handleClickSearchBarCode()
  }

  const handleClickClear = () => {
    clearFormPdv()
    form.resetFields()
  }

  return (
    <PDVContainer
      form={form}
      handleCancelNotFountProduct={handleCancelNotFountProduct}
      isVisibleSearchBarCode={isVisibleSearchBarCode}
      isVisibleNotFoundProduct={isVisibleNotFoundProduct}
      handleClickSearchBarCode={handleClickSearchBarCode}
      handleCancelSearchBarCode={handleCancelSearchBarCode}
      productList={productList}
      handleChangeSelect={handleChangeSelect}
      handleClickClear={handleClickClear}
      handleClickDown={handleClickDown}
      handleClickUp={handleClickUp}
      subTotal={subTotal}
      handleSearchBarCode={handleSearchBarCode}
      handleClickTryAgain={handleClickTryAgain}
      searchValue={searchValue}
      handleChangeSearchValue={({ target }) => setSearchValue(target.value)}
      onValuesChange={setFormPdv}
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
