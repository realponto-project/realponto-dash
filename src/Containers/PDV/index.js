import React from 'react'
import { Row, Col, Steps } from 'antd'
import CustomerInfo from './CustomerInfo'
import PaymentInfo from './PaymentInfo'
import Detail from './Detail'
import ProductList from './ProductList'
import styles from './style.module.css'
import Cupom from '../../Components/Cupom'

const { Step } = Steps
const steps = [CustomerInfo, PaymentInfo, Detail]

const PDV = ({
  step,
  handleNextStep,
  handlePrevStep,
  handleSaletype,
  saleType,
  handlePaymentType,
  paymentType,
  formCustomer,
  formPayment,
  getCustomerAddress,
  formData,
  handleSubmit,
  onSearch,
  onChange,
  searchProduct,
  products,
  optionSearch,
  onSelectProduct,
  productList,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  orderCreated,
  company
}) => {
  const ComponentStep = steps[step]
  return (
    <Row
      gutter={[16, 16]}
      style={{ background: '#FFF', minHeight: '88vh', padding: '16px 12px' }}>
      <Col span={14} className={styles.noPrint}>
        <ProductList
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
        />
      </Col>
      <Col
        className={styles.noPrint}
        span={10}
        style={{
          background: '#f4f4f4',
          borderRadius: '3px',
          padding: '22px',
          boxSizing: 'border-box'
        }}>
        <Steps size="small" current={step}>
          <Step />
          <Step />
          <Step />
        </Steps>
        <ComponentStep
          className={styles.noPrint}
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
          orderCreated={orderCreated}
        />
      </Col>
      <Cupom
        className={styles.print}
        company={company}
        customer={{ name: 'Venda Rápida', document: '-' }}
        discount={0}
        items={orderCreated && orderCreated.transactions}
        payment={orderCreated && orderCreated.payment}
        installment={orderCreated && orderCreated.installments}
        createdAt={orderCreated && orderCreated.createdAt}
      />
    </Row>
  )
}

export default PDV
