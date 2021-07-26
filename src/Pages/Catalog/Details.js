import React, { useEffect, useState } from 'react'
import {
  always,
  append,
  applySpec,
  compose,
  isEmpty,
  map,
  path,
  pathOr,
  pipe
} from 'ramda'

import CatalogDetailsContainer from '../../Containers/Catalog/Details'
import { parseValuePTbr } from '../../utils/Masks/myInfoMasks'
import { getProducts, getProductById } from '../../Services/Catalog'
import { withRouter } from 'react-router-dom'

import emptySvg from '../../Assets/empty.svg'

const formatProduct = applySpec({
  images: pipe(
    pathOr([], ['productImages']),
    map(applySpec({ url: path(['url']), alt: path(['name']) }))
  ),
  name: pathOr('', ['name']),
  price: pipe(pathOr('', ['salePrice']), parseValuePTbr),
  description: pathOr('', ['description']),
  showOnCatalog: pathOr(false, ['showOnCatalog']),
  companyId: pathOr('', ['companyId'])
})

const formatOutherProducts = ({ history }) =>
  map(
    applySpec({
      id: path(['id']),
      price: pipe(pathOr(0, ['salePrice']), parseValuePTbr),
      name: path(['name']),
      description: always(''),
      images: pipe(
        pathOr([], ['productImages']),
        map(applySpec({ url: path(['url']), alt: path(['name']) })),
        append({ url: emptySvg, alt: 'empty' }),
        (images) => [images[0]]
      ),
      onClick: pipe(path(['id']), (id) => () =>
        history.push(`/catalog-product/${id}`)
      )
    })
  )

const CatalogDetails = ({ match, history }) => {
  const [product, setProduct] = useState(formatProduct({}))
  const [company, setCompany] = useState({})
  const [outherProducts, setOutherProducts] = useState([])

  useEffect(() => {
    getProductById(match.params.productId).then(({ data }) => {
      setProduct(formatProduct(data))
      setCompany(data.company)
    })
  }, [match])

  useEffect(() => {
    if (!isEmpty(product.name)) {
      if (!product.showOnCatalog) {
        return history.push(`/catalog/${product.companyId}`)
      }

      getProducts(product.companyId, {
        limit: 4,
        category: product.category,
        showOnCatalog: true
      }).then(({ data }) =>
        setOutherProducts(formatOutherProducts({ history })(data.rows))
      )
    }
  }, [product])
  return (
    <CatalogDetailsContainer
      product={product}
      company={company}
      outherProducts={outherProducts}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(CatalogDetails)
