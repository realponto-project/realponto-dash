import React from 'react'
import { Form, Input, Image, Button, Row, Col } from 'antd'
import ClassNames from 'classnames'
import TruckSvg from './truck.svg'
import TruckGraySvg from './truck-gray.svg'
import ShoppingSvg from './shopping.svg'
import ShoppingGraySvg from './shopping-gray.svg'
import styles from './style.module.css'

const CustomerInfo = ({
  handleNextStep,
  handleSaletype,
  saleType,
  formCustomer,
  getCustomerAddress
}) => {
  return (
    <>
      <div className={styles.contentFormCheckoutHeader}>
        <h2>Escolha o tipo de venda</h2>
      </div>
      <div className={styles.actionSale}>
        <Row gutter={[6, 0]}>
          <Col span={12}>
            <div
              role="button"
              onClick={() =>
                handleSaletype({
                  saleFast: !saleType.saleFast,
                  saleFull: !saleType.saleFull
                })
              }
              className={ClassNames(styles.cardSaleType, {
                [styles.activated]: saleType.saleFast
              })}>
              <Image
                width={80}
                src={saleType.saleFast ? ShoppingSvg : ShoppingGraySvg}
                alt="card sale type"
                preview={false}
              />
              <h3>Venda Rápida</h3>
            </div>
          </Col>
          <Col span={12}>
            <div
              onClick={() =>
                handleSaletype({
                  saleFast: !saleType.saleFast,
                  saleFull: !saleType.saleFull
                })
              }
              role="button"
              className={ClassNames(styles.cardSaleType, {
                [styles.activated]: saleType.saleFull
              })}>
              <Image
                width={80}
                src={saleType.saleFull ? TruckSvg : TruckGraySvg}
                alt="card sale type"
                preview={false}
              />
              <h3>Venda Completa</h3>
            </div>
          </Col>
        </Row>
      </div>

      <Form
        layout="vertical"
        style={{ marginTop: '14px' }}
        form={formCustomer}
        onChange={getCustomerAddress}
        name="customerForm"
        onFinish={handleNextStep}>
        <h3>
          <b>Dados do cliente</b>
        </h3>
        <Form.Item
          label="Nome do cliente"
          name="name"
          rules={[
            {
              required: !saleType.saleFast,
              message: 'Este campo é obrigatório!'
            }
          ]}>
          <Input disabled={saleType.saleFast} />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label="CPF"
            name="document"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} />
          </Form.Item>
          <Form.Item
            label="Telefone"
            name="phone"
            style={{
              display: 'inline-block',
              width: 'calc(50% - 8px)',
              margin: '0 0 0 14px'
            }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} />
          </Form.Item>
        </Form.Item>
        <h3>
          <b>Endereço do cliente</b>
        </h3>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label="Cep"
            name="zipcode"
            style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} name="zipcode" />
          </Form.Item>
          <Form.Item
            label="Endereço"
            name="street"
            style={{
              display: 'inline-block',
              width: 'calc(60% - 8px)',
              margin: '0 0 0 14px'
            }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} />
          </Form.Item>
          <Form.Item
            label="Número"
            name="streetNumber"
            style={{
              display: 'inline-block',
              width: 'calc(20% - 8px)',
              margin: '0 0 0 8px'
            }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label="Bairro"
            name="neighborhood"
            style={{ display: 'inline-block', width: 'calc(40% - 8px)' }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} />
          </Form.Item>
          <Form.Item
            label="Cidade"
            name="city"
            style={{
              display: 'inline-block',
              width: 'calc(40% - 8px)',
              margin: '0 0 0 14px'
            }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} />
          </Form.Item>
          <Form.Item
            label="UF"
            name="states"
            style={{
              display: 'inline-block',
              width: 'calc(20% - 8px)',
              margin: '0 0 0 8px'
            }}
            rules={[
              {
                required: !saleType.saleFast,
                message: 'Este campo é obrigatório!'
              }
            ]}>
            <Input disabled={saleType.saleFast} />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" block htmlType="submit">
            Continuar
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CustomerInfo
