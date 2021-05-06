import React, { useEffect, useState } from 'react'
import { applySpec, compose, isEmpty, isNil, not, pathEq, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Row, Col } from 'antd'
import getAddress from '../../Services/Address'
import {
  getAll,
  getProductById,
  getProductByBarCode
} from '../../Services/Product'
import { createOrder, getOrderById } from '../../Services/Order'
import PDVContainer from '../../Containers/PDV'
import Header from '../../Components/Header'
import rootRoutes from '../../Routes/root'

const PDV = ({ setFormPdv, company, formPdv, clearFormPdv }) => {
  const [step, setStep] = useState(0)
  const [saleType, setSaleType] = useState({
    saleFast: true,
    saleFull: false
  })

  const [paymentType, setPaymentType] = useState({
    cash: true,
    creditCard: false
  })
  const [productList, setProductList] = useState([])
  const [orderCreated, setOrderCreated] = useState(null)
  const [formCustomer] = Form.useForm()
  const [formPayment] = Form.useForm()
  const [formData, setFormData] = useState({
    customer: {}
  })

  const [searchProduct, setSearchProduct] = useState('')
  const [
    products
    // setProducts
  ] = useState([])
  const [optionSearch, setOptionSearch] = useState([])
  const [isVisibleModalBarcode, setIsVisibleModalBarcode] = useState(false)
  const [isVisibleModalNotFound, setIsVisibleModalNotFound] = useState(false)

  const handleNextStep = async (values) => {
    if (step === 2) {
      return step
    }

    try {
      if (step === 0) {
        await formCustomer.validateFields()
        setFormData({
          ...formData,
          customer: values
        })
      }

      if (step === 1) {
        await formPayment.validateFields()
        setFormData({
          ...formData,
          payment:
            paymentType.cash || values.paymentMethod === 'debit_card'
              ? {
                  paymentMethod: paymentType.cash ? 'Dinheiro' : 'debit_card',
                  installments: 1
                }
              : values
        })
      }
      return setStep(step + 1)
    } catch (error) {
      console.error(error)
    }
  }

  const handlePrevStep = () => (step === 0 ? step : setStep(step - 1))

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

  const handleSubmit = async () => {
    try {
      const { data } = await createOrder({
        ...formData,
        ...formData.payment,
        originType: 'pdv',
        products: productList.map(({ id, quantity, salePrice }) => ({
          productId: id,
          quantity,
          price: salePrice
        }))
      })
      setOrderCreated(data)
      setFormPdv({ orderId: data.id })
    } catch (err) {
      console.error('error', err)
    }
  }

  const onSearch = (value) => {
    // if (value.length > 3) {
    getAll({ name: value }).then(({ data }) => {
      const source = data.source.map((item) => ({
        label: `${item.name} - quantidade: ${item.balance}`,
        value: item.id
      }))
      setOptionSearch(source)
    })
    // }
  }

  const handleSearchByBarcode = async (value) => {
    setIsVisibleModalBarcode(false)
    try {
      const { data } = await getProductByBarCode(value)

      if (isNil(data)) {
        setIsVisibleModalNotFound(true)
      } else {
        onSelectProduct(data.id)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const removeProduct = (productId) => {
    setProductList(productList.filter((product) => product.id !== productId))
  }

  const onChange = (value) => {
    setSearchProduct(value)
  }

  const incrementQuantity = (productId) => {
    setProductList(
      productList.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  const decrementQuantity = (productId) => {
    setProductList(
      productList.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity:
                product.quantity === 1 ? product.quantity : product.quantity - 1
            }
          : product
      )
    )
  }

  const onSelectProduct = async (value) => {
    setSearchProduct('')
    const findProduct = productList.find((product) => product.id === value)
    if (findProduct) {
      return
    }

    try {
      const { data } = await getProductById(value)

      const balance = pathOr(false, ['balance'], data)

      if (!balance) throw new Error('insufficient balance')

      setProductList([
        ...productList,
        {
          ...data,
          quantity: 1
        }
      ])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setProductList(formPdv.productList)
    formCustomer.setFieldsValue(formPdv.customer)
    formPayment.setFieldsValue(formPdv.payment)

    if (not(isEmpty(formPdv.orderId))) {
      getOrderById(formPdv.orderId).then(({ data }) => {
        setStep(2)
        setOrderCreated(data)
        setFormData({
          payment: {
            installments: pathOr('', ['installments'], data),
            paymentMethod: pathOr('', ['payment'], data)
          },
          customer: applySpec({
            name: pathOr('', ['customer', 'name']),
            street: pathOr('', ['customer', 'address', 'street']),
            streetNumber: pathOr('', ['customer', 'address', 'streetNumber']),
            neighborhood: pathOr('', ['customer', 'address', 'neighborhood']),
            city: pathOr('', ['customer', 'address', 'city']),
            state: pathOr('', ['customer', 'address', 'state']),
            zipcode: pathOr('', ['customer', 'address', 'zipcode'])
          })(data)
        })
      })
    }

    if (
      !isEmpty(formPdv.payment) &&
      !pathEq(['payment', 'paymentMethod'], 'Dinheiro', formPdv)
    ) {
      setPaymentType({
        cash: false,
        creditCard: true
      })
    }

    if (!pathEq(['customer', 'name'], undefined, formPdv)) {
      setSaleType({
        saleFast: false,
        saleFull: true
      })
    }
  }, [])

  useEffect(() => {
    setFormPdv({
      ...formData,
      productList
    })
  }, [productList, formData])

  const resetAll = () => {
    setStep(0)
    formCustomer.resetFields()
    formPayment.resetFields()
    setFormData({
      customer: {}
    })
    setProductList([])
    setOrderCreated(null)
    clearFormPdv()
    setSaleType({
      saleFast: true,
      saleFull: false
    })
    setPaymentType({
      cash: true,
      creditCard: false
    })
  }

  const handlePressKey = (event) => {
    const { ctrlKey, shiftKey, key } = event

    if (ctrlKey && shiftKey) {
      if (key === 'S') setIsVisibleModalBarcode(true)
    }
  }

  useEffect(() => {
    window.document.addEventListener('keypress', handlePressKey)

    return () => {
      window.document.removeEventListener('keypress', handlePressKey)
    }
  }, [])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Header rootRoutes={rootRoutes} />
      </Col>
      <Col span={24}>
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
          formData={formData}
          getCustomerAddress={getCustomerAddress}
          handleSubmit={handleSubmit}
          onSearch={onSearch}
          onChange={onChange}
          searchProduct={searchProduct}
          products={products}
          optionSearch={optionSearch}
          onSelectProduct={onSelectProduct}
          productList={productList}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeProduct={removeProduct}
          orderCreated={orderCreated}
          company={company}
          handleSearchByBarcode={handleSearchByBarcode}
          isVisibleModalBarcode={isVisibleModalBarcode}
          setIsVisibleModalBarcode={setIsVisibleModalBarcode}
          isVisibleModalNotFound={isVisibleModalNotFound}
          setIsVisibleModalNotFound={setIsVisibleModalNotFound}
          resetAll={resetAll}
        />
      </Col>
    </Row>
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
