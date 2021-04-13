import React, { useState } from 'react'
import { Row, Col, Steps } from 'antd'
import CustomerInfo from './CustomerInfo'
import PaymentInfo from './PaymentInfo'
import Detail from './Detail'
import ProductList from './ProductList'
import styles from './style.module.css'
import Cupom from '../../Components/Cupom'

import ModalNotFoundProduct from './ModalNotFoundProduct'
import ModalSearchBarCode from './ModalSearchBarCode'

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
  company,
  handleSearchByBarcode,
  isVisibleModalBarcode,
  setIsVisibleModalBarcode,
  isVisibleModalNotFound,
  setIsVisibleModalNotFound,
  resetAll
}) => {
  const ComponentStep = steps[step]

  console.log('>>', orderCreated)
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
          orderCreated={orderCreated}
          openModalBarcode={() => setIsVisibleModalBarcode(true)}
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
          productList={productList}
          orderCreated={orderCreated}
          resetAll={resetAll}
        />
      </Col>

      {orderCreated && (
        <Cupom
          className={styles.print}
          formData={formData}
          company={company}
          // customer={{ name: 'Venda Rápida', document: '-' }}
          customer={formData.customers}
          discount={0}
          items={orderCreated && orderCreated.transactions}
          payment={orderCreated && orderCreated.payment}
          installments={orderCreated && orderCreated.installments}
          createdAt={orderCreated && orderCreated.createdAt}
        />
      )}

      <ModalSearchBarCode
        isVisible={isVisibleModalBarcode}
        handleCancel={() => setIsVisibleModalBarcode(false)}
        handleSearch={handleSearchByBarcode}
      />

      <ModalNotFoundProduct
        isVisible={isVisibleModalNotFound}
        handleCancel={() => setIsVisibleModalNotFound(false)}
        handleClickTryAgain={() => {
          setIsVisibleModalNotFound(false)
          setIsVisibleModalBarcode(true)
        }}
      />
    </Row>
  )
}

export default PDV
