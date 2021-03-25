import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import PDVContainer from '../../Containers/PDV'
import { getAll } from '../../Services/Product'

const PDV = ({ history }) => {
  const [
    productList
    //  setProductList
  ] = useState([])

  useEffect(() => {
    getAll().then((resp) => console.log(resp))
  }, [])

  return <PDVContainer list={[]} productList={productList} />
}

export default withRouter(PDV)
