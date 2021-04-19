import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  applySpec,
  compose,
  isEmpty,
  pipe,
  pathOr,
  ifElse,
  always,
  prop
} from 'ramda'
import { withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Product/Manager'
import { createProduct, getAll, updateProduct } from '../../../Services/Product'

const initialFilterState = {
  activated: ['Ativo', 'Inativo'],
  name: ''
}

const parsePrice = (value) => value ? String(value).replace(/\D/g, '') : value
const productPayload = applySpec({
  id: ifElse(pathOr(false, ['id']), prop(['id']), always(undefined)),
  balance: pathOr(0, ['balance']),
  barCode: pathOr(null, ['barCode']),
  buyPrice: pipe(pathOr('0', ['buyPrice']), parsePrice),
  minQuantity: pathOr(null, ['minQuantity']),
  name: pathOr(null, ['name']),
  salePrice: pipe(pathOr('0', ['salePrice']), parsePrice),
  activated: pathOr(true, ['activated'])
})

const Manager = ({
  productSearch,
  setProductSearch,
  cleanProductSearch,
  history
}) => {
  const [products, setProducts] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllProducts()
  }, [page])

  const buildProductSearch = (values) => {
    const { name, activated } = values
    const checkedActivated =
      activated && activated.length < 2 && activated.length !== 0
        ? {
            activated: activated[0] !== 'Inativo'
          }
        : {}

    const checkedName = isEmpty(name) ? {} : { name }

    return {
      ...checkedActivated,
      ...checkedName,
      page,
      limit: 10
    }
  }

  const goToDetail = (productId) => {
    history.push(`/logged/product/detail/${productId}`)
  }

  const onChangeTable = ({current}) => {
    setPage(current)
  }

  const getAllProducts = async () => {

    setLoading(true)

    try {
      const { data } = await getAll(buildProductSearch(productSearch))
      setProducts(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleSubmit = async (values) => {
    try {
      await createProduct(productPayload(values))
      getAllProducts()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSubmitUpdate = async (values) => {
    console.log(values)
    try {
      await updateProduct(productPayload(values))
      getAllProducts()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    if (name === 'activated') {
      return setProductSearch({
        [name]: value.length === 0 ? initialFilterState.activated : value
      })
    }

    return setProductSearch({ [name]: value })
  }

  const currencyBRL = (value) => {
    const formattedValue = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return formattedValue
  }

  const clearFilters = () => {
    cleanProductSearch()
  }

  const handleGetProductsByFilters = () => {
    if(page !== 1){
      setPage(1)
    } else {
      getAllProducts()
    }
  }

  return (
    <ManagerContainer
      products={products}
      handleSubmit={handleSubmit}
      handleSubmitUpdate={handleSubmitUpdate}
      handleGetProductsByFilters={handleGetProductsByFilters}
      handleOnChange={handleOnChange}
      filters={productSearch}
      clearFilters={clearFilters}
      currencyBRL={currencyBRL}
      loading={loading}
      onChangeTable={onChangeTable}
      page={page}
      goToDetail={goToDetail}
    />
  )
}

const mapStateToProps = ({ productSearch }) => ({
  productSearch
})

const mapDispatchToProps = (dispatch) => ({
  setProductSearch: (payload) =>
    dispatch({ type: 'SET_PRODUCT_GLOBAL_SEARCH', payload }),
  cleanProductSearch: () => dispatch({ type: 'CLEAN_PRODUCT_GLOBAL_SEARCH' })
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhanced(Manager)
