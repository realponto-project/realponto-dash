import React, { useCallback, useEffect, useState } from 'react'
import print from 'print-js'
import {
  add,
  adjust,
  applySpec,
  compose,
  dec,
  equals,
  filter,
  findIndex,
  inc,
  insert,
  map,
  max,
  merge,
  min,
  multiply,
  pathOr,
  pipe,
  prop,
  propEq,
  reduce,
  __
} from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form } from 'antd'
import getAddress from '../../Services/Address'

import PDVContainer from '../../Containers/PDV'

const PDV = ({ }) => {
  const [step, setStep] = useState(0)
  const [saleType, setSaleType] = useState({
    saleFast: true,
    saleFull: false,
  })

  const [paymentType, setPaymentType] = useState({
    cash: true,
    creditCard: false,
  })
  
  const [formCustomer] = Form.useForm()
  const [formPayment] = Form.useForm()
  const [formData, setFormData] = useState({})

  const handleNextStep = async (values) => {
    if (step === 2) {
      return step 
    } 
    
   try {
    if (step === 0) {
      await formCustomer.validateFields()
      setFormData({
        ...formData,
        customers: values
      })
    }

    if (step === 1) {
      await formPayment.validateFields()
      setFormData({
        ...formData,
        payment: (
          paymentType.cash || values.paymentMethod === 'debit_card'
            ? { paymentMethod: paymentType.cash ? 'Dinheiro' :  'debit_card', installments: 1 } 
            : values
        )
      })
    }

    return setStep(step + 1)
   } catch (error) {
     console.log(error)
   }
  }
  const handlePrevStep = () => step === 0 ? step : setStep(step - 1)
  const handleSaletype = (values) => {
    if (values.saleFast) {
      formCustomer.resetFields()
    }
    setSaleType(values)
  }
  const handlePaymentType = (values) => {
    if (values.cash) {
      formPayment.resetFields()
    }
    setPaymentType(values)
  }

  const getCustomerAddress = async ({ target }) => {
    const { name, value } = target
    if (name === 'zipcode' && value.length === 8) {
      const address = await getAddress(value)
      formCustomer.setFieldsValue(address)
    }
  }

  const handleSubmit = () => {
    console.log(formData)
  }

  return (
    <PDVContainer 
      step={step}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      handleSaletype={handleSaletype}
      saleType={saleType}
      handlePaymentType={handlePaymentType}
      paymentType={paymentType}
      formCustomer={formCustomer}
      formPayment={formPayment}
      getCustomerAddress={getCustomerAddress}
      formData={formData}
      handleSubmit={handleSubmit}
    />
  )
}

const mapStateToProps = ({ formPdv, company }) => ({
  formPdv,
  company
})

const mapDispatchToProps = (dispatch) => ({
  setFormPdv: (payload) => dispatch({ type: 'SET_FORM_PDV', payload }),
  clearFormPdv: (payload) => dispatch({ type: 'CLEAR_FORM_PDV' })
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhanced(PDV)
