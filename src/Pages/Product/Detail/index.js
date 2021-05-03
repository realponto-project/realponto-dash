import React, { useState, useEffect } from 'react'
import {
  add,
  always,
  applySpec,
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
  getTransactionsToChart,
  getAllImagesByProductId,
  addImage,
  removeImage
} from '../../../Services/Product'
import { message } from 'antd'

const colorsLabel = {
  Saída: 'rgb(23, 201, 178)',
  Entrada: 'rgb(93, 160, 252)'
}

const Detail = ({ match }) => {
  const [product, setProduct] = useState(null)
  const [productImages, setProductImages] = useState([])
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
      setSerialData(data.rows)
      setTotal(data.count)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const fetchImages = async () => {

    const formatFileList = applySpec({
      url: path(['url']),
      uid: path(['id']),
      name: path(['id']),
      status: always('done')
    })
    const { data } = await getAllImagesByProductId(match.params.id)
    setProductImages(map(formatFileList, data))
  }

    useEffect(() => {
      fetchImages()
    }, [])

  const handleRemoveImage = async (productImageId) => {
    try {
      await removeImage(productImageId)
      await fetchImages()
    }catch (err){
      console.error(err)
    }
  } 

  const handleChangeUpload = async(info) => {
    if(info.file.status === "removed") {
      await handleRemoveImage(info.file.uid)
      
      message.success(`Imagem deletada com sucesso`);
    }
    if (info.file.status === 'done') {
      message.success(`Imagem atualizada com sucesso`);
    } else if (info.file.status === 'error') {
      message.error(`Erro ao atualizar imagem`);
    }
  }

  const handleUpload =  async (file) => {
    const data = new FormData()
    data.append('file', file)
    data.append('productId', product.id)
    await addImage(data)
    await fetchImages()
  }

  return (
    <DetailContainer
      handleUpload={handleUpload}
      openSerial={openSerial}
      handleChangeUpload={handleChangeUpload}
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
      productImages={productImages}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(Detail)
