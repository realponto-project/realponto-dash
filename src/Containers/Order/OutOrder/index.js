import React, { useState } from 'react'
import {
  Card,
  Form,
  Row,
  Col,
  Steps,
  message,
  Button,
} from 'antd'
import {
  isEmpty,
  mergeRight,
  lte,
  length,
  find,
  propEq,
} from 'ramda'

import OrderInfoStep from './OrderInfoStep'
import TransactionStep from './TransctionStep'
import ProductStep from './ProductStep'
import ConfirmStep from './ConfirmStep'
import StepButtons from './StepButtons'
import validatorStep from './validatorForm'

const { Step } = Steps

const steps = [
  TransactionStep,
  OrderInfoStep,
  ProductStep,
  ConfirmStep,
]

const initialFormData = {
  customerId: '',
  userId: '',
  statusId: '',
  products: [],
}

const Add = ({
  productList,
  customerList,
  userList,
  statusList,
  handleSubmit,
  goToOrder,
}) => {
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState({})
  const [form] = Form.useForm();
  const [customerSelected, setCustomerSelected] = useState({})
  const [userSelected, setUserSelected] = useState({})

  const navigationStep = (step) => setCurrent(step)

  const next = () => {
    const errors = validatorStep(formData, current)
    if (errors && errors.products) {
      message.error('É necessário adicionar pelo menos um produto!')
    }

    setFormErrors(errors)
    isEmpty(errors) && setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const done = async () => {
   try {
    await handleSubmit(formData)
    message.success('Ordem criada com sucesso!')
   } catch (error) {
     message.error('Não foi possível criar ordem!')
   }
  }

  const ComponentStep = steps[current]

  const handleOnChange = ({ target }) => {
    let errors = {}
    const { name, value } = target
    const formPayload = mergeRight(formData, { [name]: value })
    setFormData(formPayload)

    if (name === 'userId') {
      setUserSelected(
        userList.find(user => user.id === value)
      )
    }

    if (name === 'customerId') {
      setCustomerSelected(
        customerList.find(customer => customer.id === value)
      )
    }

    errors = validatorStep(formPayload, current)
    setFormErrors(errors)
  }

  const handleAddProduct = (values) => {
    let errors = {}
    const findProduct = (
      lte(0, length(productList))
      && find(propEq('id', values.productId), productList)
    )

    errors = validatorStep(values)
    setFormErrors(errors)

    const findProductAdded = formData.products.find(product => (
      product.productId === values.productId
      && product.analysis === values.analysis
    ))

    if (findProductAdded) {
      isEmpty(errors) && setFormData({
        ...formData,
        products: formData.products.map(product => (
          product.productId === values.productId
          && product.analysis === values.analysis
            ? ({...product, quantity: product.quantity + values.quantity })
            : product
        ))
      })
    } else {
      isEmpty(errors) && setFormData({
        ...formData,
        products: [
          ...formData.products,
          {
            ...values,
            name: findProduct.name,
            key: `${values.quantity}-${values.productId}-${values.analysis}`,
          },
        ]
      })
    }


    return form.resetFields()
  }

  const handleRemoveItem = productRemove => {
    const notEqual = productItem => {
      if(
        productItem.productId === productRemove.productId
        && productItem.statusProduct === productRemove.statusProduct
      ) {
        return
      }
      return productItem
    }

    setFormData({
      ...formData,
      products: formData.products.filter(notEqual)
    })
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Steps current={current}>
            {steps.map((_, index) => (<Step key={index} />))}
          </Steps>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <ComponentStep
                formData={formData}
                handleOnChange={handleOnChange}
                handleAddProduct={handleAddProduct}
                customerList={customerList}
                userList={userList}
                productList={productList}
                formErrors={formErrors}
                handleRemoveItem={handleRemoveItem}
                form={form}
                customerSelected={customerSelected}
                statusList={statusList}
                userSelected={userSelected}
                navigationStep={navigationStep}
              />
            </Col>
          </Row>
          <Row justify="end">
            <Col span={12} style={{ textAlign: "left" }}>
              <Button type="text" onClick={goToOrder}>
                Cancelar
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <StepButtons
                current={current}
                steps={steps.length}
                next={next}
                prev={prev}
                done={done}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Add
