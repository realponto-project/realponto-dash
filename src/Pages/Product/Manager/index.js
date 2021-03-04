import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose, isEmpty } from 'ramda'

import ManagerContainer from '../../../Containers/Product/Manager'
import {
  createProduct,
  getAll,
  updateProduct,
} from '../../../Services/Product'

const initialFilterState = {
  activated: ['Ativo', 'Inativo'],
  name: '',
}

const Manager = ({
  productSearch,
  setProductSearch,
  updateProductSearch,
  cleanProductSearch,
}) => {
  const [products, setProducts] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAllProducts()
  }, [])

  const buildProductSearch = (values) => {
    const { name, activated } = values
    const checkedActivated = (
      activated && activated.length < 2 && activated.length !== 0
       ? {
          activated: activated[0] === 'Inativo' ? false : true,
        }
       : { }
    )

    const checkedName = isEmpty(name) ? {} : { name }

    return ({
      ...checkedActivated,
      ...checkedName,
      page,
      limit: 25
    })
  }


  const getAllProducts = async () => {
    try {
      const { data } = await getAll(buildProductSearch(productSearch))
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createProduct(values)
      getAllProducts()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleSubmitUpdate = async (values) => {
    try {
      await updateProduct(values)
      getAllProducts()
    } catch (error) {
      console.log('error', error)
    }
  }


  const handleOnChange = ({ target }) => {
    const { name, value } = target
    if(name === 'activated') {
      return setProductSearch({
        [name]: (
          value.length === 0
          ? initialFilterState.activated
          : value
        )
      })
    }

    return setProductSearch({ [name]: value })
  }

  const clearFilters = () => {
    cleanProductSearch()
  }

  return (
    <ManagerContainer
      products={products}
      handleSubmit={handleSubmit}
      handleSubmitUpdate={handleSubmitUpdate}
      handleGetProductsByFilters={getAllProducts}
      handleOnChange={handleOnChange}
      filters={productSearch}
      clearFilters={clearFilters}
    />
  )
}

const mapStateToProps = ({ productSearch }) => ({
  productSearch,
})

const mapDispatchToProps = dispatch => ({
  setProductSearch: payload => dispatch({ type: 'SET_PRODUCT_GLOBAL_SEARCH', payload }),
  cleanProductSearch: () => dispatch({ type: 'CLEAN_PRODUCT_GLOBAL_SEARCH' }),
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhanced(Manager)
