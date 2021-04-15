import React from 'react'
import { Button, Image, Row, Col, Divider } from 'antd'
import TruckGraySvg from './truck-gray.svg'
import { add, equals, length, map, multiply, pathOr, reduce } from 'ramda'
import styles from './style.module.css'
import { formatPrice } from '../../../utils'

const Detail = ({
  handlePrevStep,
  formData,
  handleSubmit,
  orderCreated,
  productList = [],
  resetAll
}) => {
  const name = pathOr(null, ['customer', 'name'], formData)
  const installments = pathOr(null, ['payment', 'installments'], formData)
  const paymentMethod = pathOr(null, ['payment', 'paymentMethod'], formData)
  const street = pathOr(null, ['customer', 'street'], formData)
  const streetNumber = pathOr(null, ['customer', 'streetNumber'], formData)
  const neighborhood = pathOr(null, ['customer', 'neighborhood'], formData)
  const city = pathOr(null, ['customer', 'city'], formData)
  const state = pathOr(null, ['customer', 'states'], formData)
  const zipcode = pathOr(null, ['customer', 'zipcode'], formData)
  const paymentMethodLabel = {
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    Dinheiro: 'Dinheiro'
  }

  const amount = length(productList)

  const subTotal = reduce(
    add,
    0,
    map(
      ({ quantity, salePrice }) => multiply(quantity, salePrice),
      productList || []
    )
  )

  return (
    <Row gutter={[6, 0]}>
      <Col span={24} style={{ paddingTop: '14px' }}>
        <h3>
          <b>Detalhe do Pedido</b>
        </h3>
      </Col>
      <Col span={24} style={{ paddingTop: '14px' }}>
        <h2>
          <b>{name || 'Venda Rápida!'}</b>
        </h2>
      </Col>
      <Col span={4} style={{ paddingTop: '14px' }}>
        {zipcode && (
          <Image
            style={{ display: 'block' }}
            width={50}
            src={TruckGraySvg}
            alt="delivery"
            preview={false}
          />
        )}
      </Col>
      <Col span={18} style={{ paddingTop: '14px' }}>
        {zipcode && (
          <p>
            <b>
              {street}, {streetNumber} - {neighborhood}, <br /> {city} - {state}{' '}
              , {zipcode}
            </b>
          </p>
        )}
      </Col>
      <Divider />
      <Col span={24} style={{ paddingTop: '14px' }}>
        <h3>
          <b>Detalhe do pagamento</b>
        </h3>
        <p>
          Segue as informações do pedido, nesta etapa confira os dados do
          cliente!
        </p>
      </Col>

      <Col span={12} style={{ paddingTop: '14px' }}>
        <h3>
          <b>Forma de pagamento</b>
        </h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h3>
          <b>
            {paymentMethod === 'Dinheiro' || paymentMethod === 'debit_card'
              ? ''
              : `${installments} x `}
            {paymentMethodLabel[paymentMethod]}
          </b>
        </h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px' }}>
        <h3>
          <b>Itens</b>
        </h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h3>
          <b>{amount}</b>
        </h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px' }}>
        <h3>
          <b>Subtotal</b>
        </h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h3>
          <b>R$ {formatPrice(subTotal)}</b>
        </h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px' }}>
        <h2>
          <b>Total</b>
        </h2>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h2>
          <b>R$ {formatPrice(subTotal)}</b>
        </h2>
      </Col>
      {!orderCreated && (
        <>
          <Col span={12}>
            <Button onClick={handlePrevStep} block>
              Voltar
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              disabled={equals(length(productList), 0)}
              onClick={handleSubmit}
              type="primary"
              block>
              Salvar
            </Button>
          </Col>
        </>
      )}
      {orderCreated && (
        <>
          <Col span={12}>
            <Button onClick={resetAll} block>
              Novo pedido
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button onClick={() => window.print()} type="primary" block>
              Imprimir
            </Button>
          </Col>
        </>
      )}
    </Row>
  )
}

export default Detail
