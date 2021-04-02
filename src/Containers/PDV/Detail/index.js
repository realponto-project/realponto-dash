import React from 'react'
import { Button, Image, Row, Col, Divider  } from 'antd'
import TruckGraySvg from './truck-gray.svg'
import { pathOr } from 'ramda'
import styles from './style.module.css'

const Detail = ({
  handlePrevStep,
  formData,
  handleSubmit
}) => {
  const name = pathOr(null, ['customers', 'name'], formData)
  const installments = pathOr(null, ['payment', 'installments'], formData)
  const paymentMethod = pathOr(null, ['payment', 'paymentMethod'], formData)
  const street = pathOr(null, ['customers', 'street'], formData)
  const streetNumber = pathOr(null, ['customers', 'number'], formData)
  const neighborhood = pathOr(null, ['customers', 'neighborhood'], formData)
  const city = pathOr(null, ['customers', 'city'], formData)
  const state = pathOr(null, ['customers', 'state'], formData)
  const zipcode = pathOr(null, ['customers', 'zipcode'], formData)
  const paymentMethodLabel = {
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    Dinheiro: 'Dinheiro'
  }
  return (
    <Row gutter={[6, 0]}>
      <Col span={24} style={{ paddingTop: '14px' }}>
        <h3><b>Detalhe do Pedido</b></h3>
      </Col>
      <Col span={24} style={{ paddingTop: '14px' }}>
        <h2><b>{name || 'Venda Rápida!'}</b></h2>
      </Col>
      <Col span={4} style={{ paddingTop: '14px' }}>
       { zipcode && <Image style={{ display: 'block' }} width={50} src={TruckGraySvg} alt="delivery" preview={false} /> }
      </Col>
      <Col span={18} style={{ paddingTop: '14px' }}>
        {zipcode && <p><b>{street}, {streetNumber} - {neighborhood}, <br /> {city} - {state} , {zipcode}</b></p>}
      </Col>
      <Divider />
      <Col span={24} style={{ paddingTop: '14px' }}>
        <h3><b>Detalhe do pagamento</b></h3>
        <p>Segue as informações do pedido, nesta etapa confira os dados do cliente!</p>
      </Col>

      <Col span={12} style={{ paddingTop: '14px' }}>
        <h3><b>Forma de pagamento</b></h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h3><b>{paymentMethod === 'Dinheiro' || paymentMethod === 'debit_card' ? '' : `${installments} x `}{paymentMethodLabel[paymentMethod]}</b></h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px' }}>
        <h3><b>Itens</b></h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h3><b>14</b></h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px' }}>
        <h3><b>Subtotal</b></h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h3><b>R$ 200,00</b></h3>
      </Col>
      <Col span={12} style={{ paddingTop: '14px' }}>
        <h2><b>Total</b></h2>
      </Col>
      <Col span={12} style={{ paddingTop: '14px', textAlign: 'right' }}>
        <h2><b>R$ 200,00</b></h2>
      </Col>
      <Col span={12}>
        <Button onClick={handlePrevStep} block>Voltar</Button>
      </Col>
      <Col span={12} style={{ textAlign: 'right'}}>
        <Button onClick={handleSubmit} type="primary" block>Salvar</Button>
      </Col>
    </Row>
  )
}

export default Detail
