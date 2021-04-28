import React, { useEffect, useState } from 'react'
import { applySpec, compose, map, path, pathOr, pipe } from 'ramda'
import { withRouter, useLocation } from 'react-router-dom'

import CatalogManagerContainer from '../../Containers/Catalog/Manager'
import { getProducts } from '../../Services/Catalog'
import { getCompanyById } from '../../Services/Company'
import { parseValuePTbr } from '../../utils/Masks/myInfoMasks'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const formatProductList = map(
  applySpec({
    id: path(['id']),
    price: pipe(pathOr(0, ['salePrice']), parseValuePTbr),
    name: path(['name']),
    description: pathOr('', ['description']),
    urlImage: pathOr(false, ['urlImage'])
  })
)

const CatalogManager = ({ match, history }) => {
  const query = useQuery()

  const [productList, setProductList] = useState([])
  const [count, setCount] = useState(0)
  const [company, setCompany] = useState({})
  const [page, setPage] = useState(
    query.get('page') ? Number(query.get('page')) : 1
  )
  const [order, setOrder] = useState(
    query.get('order') ? JSON.parse(query.get('order')) : []
  )
  const [searchValue, setSearchValue] = useState(query.get('name') || '')

  useEffect(() => {
    const getCompany = async () => {
      const { data } = await getCompanyById(match.params.companyId)
      setCompany(data)
    }
    getCompany()
  }, [])

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const { data } = await getProducts(match.params.companyId, {
          limit: 24,
          page,
          order,
          name: searchValue
        })
        setProductList(data.rows)
        setCount(data.count)
      } catch (error) {
        console.error(error)
      }
    }

    history.push(
      `${match.params.companyId}?page=${page}&order=${JSON.stringify(
        order
      )}&name=${searchValue}`
    )

    getAllProducts()
  }, [page, order, searchValue])

  const handleClickFilter = (order) => {
    setOrder([order])
    setPage(1)
  }

  const handleClickCard = (productId) => {
    history.push(`/catalog-product/${productId}`)
  }

  return (
    <CatalogManagerContainer
      handleClickFilter={handleClickFilter}
      productList={formatProductList(productList)}
      company={company}
      count={count}
      searchValue={searchValue}
      handleSearch={setSearchValue}
      handleChangePage={(page) => setPage(page)}
      page={page}
      handleClickCard={handleClickCard}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(CatalogManager)
