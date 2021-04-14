import React from 'react'
import { Form, Input, Image, Select, Button, Row, Col } from 'antd'
import ClassNames from 'classnames'
import DollarSvg from './dollar.svg'
import DollarGraySvg from './dollar-gray.svg'
import CreditCardSvg from './credit-card.svg'
import CreditCardGraySvg from './credit-card-gray.svg'

import styles from './style.module.css'

const { Option } = Select
const installments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const PaymentInfo = ({
  handleNextStep,
  handlePrevStep,
  handlePaymentType,
  paymentType,
  formPayment,
  formCustomer
}) => {
  return (
    <>
      <div className={styles.contentFormCheckoutHeader}>
        <h2>Escolha o tipo de pagamento</h2>
      </div>
      <div className={styles.actionSale}>
        <Row gutter={[6, 0]}>
          <Col span={12}>
            <div
              onClick={() =>
                handlePaymentType({
                  creditCard: !paymentType.creditCard,
                  cash: !paymentType.cash
                })
              }
              className={ClassNames(styles.cardSaleType, {
                [styles.activated]: paymentType.creditCard
              })}>
              <Image
                width={80}
                src={paymentType.creditCard ? CreditCardSvg : CreditCardGraySvg}
                alt="card sale type"
                preview={false}
              />
              <h3>Cartão</h3>
            </div>
          </Col>
          <Col span={12}>
            <div
              onClick={() =>
                handlePaymentType({
                  creditCard: !paymentType.creditCard,
                  cash: !paymentType.cash
                })
              }
              className={ClassNames(styles.cardSaleType, {
                [styles.activated]: paymentType.cash
              })}>
              <Image
                width={80}
                src={paymentType.cash ? DollarSvg : DollarGraySvg}
                alt="card sale type"
                preview={false}
              />
              <h3>Dinheiro</h3>
            </div>
          </Col>
        </Row>
      </div>

      <Form
        layout="vertical"
        style={{ marginTop: '14px' }}
        form={formPayment}
        name="paymentForm"
        onFinish={handleNextStep}>
        <h3>
          <b>Dados do pagamento</b>
        </h3>
        <Form.Item
          label="Tipo de cartão"
          name="paymentMethod"
          rules={[
            {
              required: !paymentType.cash,
              message: 'Este campo é obrigatório!'
            }
          ]}>
          <Select
            placeholder="Selecione o tipo do cartão"
            disabled={paymentType.cash}>
            <Option value="credit_card">Cartão de crédito</Option>
            <Option value="debit_card">Cartão de débito</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Quantidade de parcelas"
          name="installments"
          rules={[
            {
              required: !paymentType.cash,
              message: 'Este campo é obrigatório!'
            }
          ]}>
          <Select
            placeholder="Selecione o número de parcelas"
            disabled={paymentType.cash}>
            {installments.map((installment) => (
              <Option key={installment} value={installment}>
                {installment} {installment > 1 ? 'Parcelas' : 'Parcela'}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)'
            }}>
            <Button onClick={handlePrevStep} block>
              Voltar
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 0 0 8px',
              textAlign: 'right'
            }}>
            <Button type="primary" block htmlType="submit">
              Continuar
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  )
}

export default PaymentInfo
