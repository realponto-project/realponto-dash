import React from "react"
import {
  Row,
  Col,
  Steps,
} from "antd"
import CustomerInfo from "./CustomerInfo"
import PaymentInfo from "./PaymentInfo"
import Detail from "./Detail"

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
}) => {
  const ComponentStep = steps[step]

  return (
    <Row>
      <Col span={16}>
        teste produtos
      </Col>
      <Col span={7}>
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
