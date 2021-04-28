import React, { useEffect, useState } from 'react'
import { applySpec, compose, isEmpty, map, path, pathOr, pipe } from 'ramda'

import CatalogDetailsContainer from '../../Containers/Catalog/Details'
import { parseValuePTbr } from '../../utils/Masks/myInfoMasks'
import { getProducts, getProductById } from '../../Services/Catalog'
import { withRouter } from 'react-router-dom'

const formatProduct = applySpec({
  imageUrl: path(['imageUrl']),
  name: pathOr('', ['name']),
  price: pipe(pathOr('', ['salePrice']), parseValuePTbr),
  description: pathOr('', ['description']),
  companyId: pathOr('', ['companyId'])
})

const formatOutherProducts = map(
  applySpec({
    id: path(['id']),
    price: pipe(pathOr(0, ['salePrice']), parseValuePTbr),
    name: path(['name']),
    description: pathOr('', ['description']),
    urlImage: pathOr(false, ['urlImage'])
  })
)

const CatalogDetails = ({ match, history }) => {
  const [product, setProduct] = useState({})
  const [company, setCompany] = useState({})
  const [outherProducts, setOutherProducts] = useState([])

  useEffect(() => {
    getProductById(match.params.productId)
      .then(({ data }) => {
        setProduct(formatProduct(data))
        setCompany(data.company)
      })
      .then((e) => console.log('::::>>', e))
  }, [])

  useEffect(() => {
    if (!isEmpty(product)) {
      getProducts(product.companyId, {
        limit: 4,
        category: product.category
      }).then(({ data }) => setOutherProducts(formatOutherProducts(data.rows)))
    }
  }, [product])

  const handleClickCard = (productId) => {
    history.go(`/catalog-product/${productId}`)
  }

  return (
    <CatalogDetailsContainer
      product={product}
      company={company}
      outherProducts={outherProducts}
      handleClickCard={handleClickCard}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(CatalogDetails)
