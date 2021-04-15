import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import DetailContainer from '../../../Containers/Product/Detail'
import { getProductById } from '../../../Services/Product'

const Detail = ({ match }) => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    getProduct()
  }, [])

  const getProduct = async () => {
    try {
      const { data } = await getProductById(match.params.id)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DetailContainer
      product={product}
      pieChartData={[]}
      serialNumberData={[]}
    /> 
  )
}

const enhanced = compose(withRouter)

export default enhanced(Detail)
