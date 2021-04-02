import React from "react"
import {
  Row,
  Col,
  Steps,
} from "antd"
import CustomerInfo from "./CustomerInfo"
import PaymentInfo from "./PaymentInfo"
import Detail from "./Detail"
import ProductList from './ProductList'

PaymentInfo
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
}) => {
  const ComponentStep = steps[step]
  return (
    <Row gutter={[16, 16]} style={{ background: "#FFF", minHeight: '88vh', padding: '16px 12px' }}>
      <Col span={16}>
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
      <Col span={8} style={{ background: '#f4f4f4', borderRadius: '3px', padding: '22px', boxSizing: "border-box" }}>
        <Steps size="small" current={step}>
          <Step />
          <Step />
          <Step />
        </Steps>
        <ComponentStep
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
      </Col>
    </Row>
  );
};

export default PDV;
