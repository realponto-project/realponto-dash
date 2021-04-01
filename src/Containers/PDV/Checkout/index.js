import React from 'react'
import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
  Radio,
  Row,
  Select
} from 'antd'
import { map } from 'ramda'

import styles from './style.module.css'
import { formatPrice } from '../../../utils'

const { Option } = Select

const listaTipoPagamento = [
  { value: 'money', label: 'Dinheiro' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'card_debit_master', label: 'Cartão débito Master' },
  { value: 'card_debit_visa', label: 'Cartão débito Visa' },
  { value: 'card_credit_master', label: 'Cartão crédito Master' },
  { value: 'card_credit_visa', label: 'Cartão crédito Visa' }
]
const ruleRequired = { required: true, message: 'Este campo é obrigatório!' }

const Checkout = ({
  form,
  handleClickClear,
  handleSubmit,
  isSaved,
  onSearch,
  onValuesChange,
  options,
  subTotal
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      onValuesChange={onValuesChange}>
      <div className={styles.checkoutInfo}>
        <h2 className={styles.checkoutSubtitle}>Checkout</h2>

        <Form.Item label="Tipo de venda" name="type" rules={[ruleRequired]}>
          <Radio.Group style={{ width: '100%' }} disabled={isSaved}>
            <Row justify="space-between">
              <Radio value="fast">Venda rápida</Radio>
              <Radio value="delivery">Venda com entrega</Radio>
            </Row>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, curValues) =>
            prevValues.type !== curValues.type
          }>
          {({ getFieldValue }) => (
            <>
              <span className={styles.checkoutLabelInputs}>Buscar cliente</span>
              <Form.Item
                name="customerId"
                rules={
                  getFieldValue('type') === 'delivery' ? [ruleRequired] : []
                }>
                <Select
                  disabled={isSaved || getFieldValue('type') !== 'delivery'}
                  onSearch={onSearch}
                  showSearch>
                  {map(
                    ({ value, label }) => (
                      <Option key={value} value={value}>
                        {label}
                      </Option>
                    ),
                    options
                  )}
                </Select>
              </Form.Item>
            </>
          )}
        </Form.Item>

        <Divider />

        <h2 className={styles.checkoutSubtitle}>Forma de Pagamento</h2>

        <Form.Item name="payment" rules={[ruleRequired]}>
          <Radio.Group style={{ width: '100%' }} disabled={isSaved}>
            <Row>
              {map(
                ({ value, label }) => (
                  <Col key={value} span={12}>
                    <Radio value={value}>{label}</Radio>
                  </Col>
                ),
                listaTipoPagamento
              )}
            </Row>
          </Radio.Group>
        </Form.Item>

        <Divider />

        <Row justify="space-between">
          <label className={styles.checkoutLabelSubTotal}>Subtotal</label>
          <label className={styles.checkoutValueSubTotal}>
            R$ {formatPrice(subTotal)}
          </label>
        </Row>

        <Row justify="space-between">
          <label className={styles.checkoutLabelSubTotal}>Desconto</label>
          <Form.Item name="discount">
            <InputNumber
              className={styles.checkoutDiscount}
              disabled={isSaved}
              formatter={
                (value) => `-R$ ${value}`
                // `-R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              max={subTotal}
              min={0}
              parser={(value) => value.replace(/-R\$\s?/g, '')}
              // parser={(value) => value.replace(/-R\$\s?|(,*)/g, '')}
              step={100}
            />
          </Form.Item>
        </Row>

        <Row justify="space-between">
          <Col>
            <h1 className={styles.checkoutLabelTotal}>Total</h1>
          </Col>
          <Col>
            <Form.Item
              shouldUpdate={(prevValues, curValues) =>
                prevValues.discount !== curValues.discount &&
                !isNaN(Number(curValues.discount))
              }>
              {({ getFieldValue }) => (
                <h1 className={styles.checkoutValueTotal}>
                  R$
                  {formatPrice(subTotal - getFieldValue('discount'))}
                </h1>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12} justify="space-between">
          <Col span={12}>
            <Button
              danger={!isSaved}
              onClick={handleClickClear}
              style={{ width: '100%' }}>
              {isSaved ? 'Novo pedido' : 'Limpar pedido'}
            </Button>
          </Col>
          <Col span={12}>
            <Button
              htmlType={!isSaved ? 'submit' : undefined}
              style={{ width: '100%' }}
              type="primary">
              {isSaved ? 'Imprimir' : 'Salvar'}
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  )
}

export default Checkout
