import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import { compose } from 'ramda'
import { connect } from 'react-redux'

import CreditsContainer from '../../Containers/Credits'
import { createCardHash } from '../../Services/pagarme'
import {
  CreateAlxaOperation,
  GetAllOperationService
} from '../../Services/AlxaOperation'
import { getAllAlxaProductService } from '../../Services/AlxaProduct'
import { getCompanyById } from '../../Services/Company'
import { buildCardUser, buildCredtisToBuy, buildOperations } from './specs'

const Credits = ({ company, setCompany }) => {
  const [form] = Form.useForm()
  const [credtisToBuy, setCredtisToBuy] = useState([])
  const [operations, setOperations] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [total, setTotal] = useState(10)
  const [current, setCurrent] = useState(1)

  const openModal = () => setIsVisible(true)
  const closeModal = () => {
    form.resetFields()
    setIsVisible(false)
  }

  const getAllOperation = async () => {
    const { data } = await GetAllOperationService({ limit: 10, page: current })

    setTotal(data.total)
    setOperations(buildOperations(data.source))
  }

  const handleSubmit = async (values) => {
    try {
      const cardHash = await createCardHash(buildCardUser(values))
      const { alxaProductId } = values

      await CreateAlxaOperation({ alxaProductId, cardHash })
      const { data } = await getCompanyById(company.id)

      await getAllOperation()
      setCompany(data)

      closeModal()
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = ({ current }) => setCurrent(current)

  useEffect(() => {
    const getAllAlxaProduct = async () => {
      const { data } = await getAllAlxaProductService({ type: 'credit_buy' })

      setCredtisToBuy(buildCredtisToBuy(data.source))
    }
    getAllAlxaProduct()
  }, [])

  useEffect(() => {
    getAllOperation()
  }, [current])

  return (
    <CreditsContainer
      dataSource={operations}
      credtisToBuy={credtisToBuy}
      formCreditsBuy={form}
      handleSubmit={handleSubmit}
      balance={company?.goldBalance ?? 0}
      isVisible={isVisible}
      openModal={openModal}
      closeModal={closeModal}
      total={total}
      handleChange={handleChange}
      current={current}
    />
  )
}

const mapStateToProps = ({ company }) => ({
  company
})
const mapDispatchToProps = (dispatch) => ({
  setCompany: (payload) => dispatch({ type: 'SET_COMPANY', payload })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Credits)
