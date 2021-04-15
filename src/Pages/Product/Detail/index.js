import React, { useState, useEffect } from 'react'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'
import { createSerialNumbers, getAll, updateSerial } from '../../../Services/SerialNumber'

import DetailContainer from '../../../Containers/Product/Detail'
import { getProductById } from '../../../Services/Product'

const Detail = ({ match }) => {
  const [product, setProduct] = useState(null)
  const [serialVisible, setSerialVisible] = useState(false)
  const [serialVisibleEdit, setSerialVisibleEdit] = useState(false)
  const [serialData, setSerialData] = useState([])
  const [serialNumberSelected, setSerialNumberEdit] = useState({})

  useEffect(() => {
    getAllSerial()
    getProduct()
  }, [])

  const openSerial = () => {
    setSerialVisible(true)
  }

  const openSerialEdit = (serialNumber) => {
    setSerialNumberEdit(serialNumber)
    setSerialVisibleEdit(true)
  }

  const handleCancel = () => {
    setSerialVisible(false)
    setSerialVisibleEdit(false)
  }

  const getProduct = async () => {
    try {
      const { data } = await getProductById(match.params.id)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOkSerial = async (values) => {
    const serialNumbers = [values.serialNumber]
    try {
     await createSerialNumbers({serialNumbers, productId: match.params.id })
      setSerialVisible(false)
      await getAllSerial()
    } catch (error) {
      console.log(error)
    }
  }

  const handleOkSerialEdit = async (values) => {
    try {
      await updateSerial(serialNumberSelected.id, values)
      setSerialVisibleEdit(false)
      await getAllSerial()
    } catch (error) {
      console.log(error)
    }
  }

  const getAllSerial = async () => {
    try {
      const { data } = await getAll()
      setSerialData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DetailContainer
      openSerial={openSerial}
      openSerialEdit={openSerialEdit}
      serialVisible={serialVisible}
      serialVisibleEdit={serialVisibleEdit}
      handleCancel={handleCancel}
      handleOkSerial={handleOkSerial}
      product={product}
      serialData={serialData}
      serialNumberSelected={serialNumberSelected}
      handleOkSerialEdit={handleOkSerialEdit}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Detail)
