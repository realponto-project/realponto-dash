import React, { useState, useEffect } from 'react'
import {
  add,
  compose,
  keys,
  map,
  path,
  pipe,
  reduceBy
} from 'ramda'
import { withRouter } from 'react-router-dom'
import {
  createSerialNumbers,
  getAll,
  updateSerial
} from '../../../Services/SerialNumber'

import DetailContainer from '../../../Containers/Product/Detail'
import {
  getProductById,
  getTransactionsToChart
} from '../../../Services/Product'

const colorsLabel = {
  Saída: 'rgb(23, 201, 178)',
  Entrada: 'rgb(93, 160, 252)'
}

const Detail = ({ match }) => {
  const [product, setProduct] = useState(null)
  const [serialVisible, setSerialVisible] = useState(false)
  const [serialVisibleEdit, setSerialVisibleEdit] = useState(false)
  const [serialData, setSerialData] = useState([])
  const [serialNumberSelected, setSerialNumberEdit] = useState({})
  const [pieChartData, setPieChartData] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(10)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllSerial()
    getProduct()
    getTransactions()
  }, [page])

  const getTransactions = async () => {
    try {
      const { data } = await getTransactionsToChart(match.params.id)

      setPieChartData(
        pipe(
          reduceBy(
            ({ count }, { countItems }) => ({ count: add(count, countItems) }),
            { count: 0 },
            path(['status.typeLabel'])
          ),
          (values) =>
            pipe(
              keys,
              map((name) => ({
                name,
                value: path([name, 'count'], values),
                color: colorsLabel[name]
              }))
            )(values)
        )(data)
        )
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeTable = ({current}) => {
    setPage(current)
  }

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
      await createSerialNumbers({ serialNumbers, productId: match.params.id })
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
    setLoading(true)
    try {
      const { data } = await getAll({ page, limit: 10 })
      console.log('data', data)
      setSerialData(data.rows)
      setTotal(data.count)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
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
      pieChartData={pieChartData}
      onChangeTable={onChangeTable}
      page={page}
      total={total}
      loading={loading}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Detail)
