import React from 'react'
import { prop } from 'ramda'
import { Row, Col, Typography, Card, Button, Image } from 'antd'
import Goals from './goals.svg'
import Completed from './completed.svg'
import ButtonIcon from './button.svg'
import PlanInfo from '../../Components/PlanInfo'

import {
  PAGARME_ENCRYPTION_KEY,
  PAGARME_POSTBACK_URL
} from '../../utils/env'

const { Title } = Typography

const plans = [
  {
    description: 'Mensal',
    amount: '9,99',
    discount: null,
    color: 'transparent',
    image: Goals,
  },
  {
    description: 'Semestral',
    amount: '42,99',
    discount: '15%',
    color: 'rgb(255 0 9 / 70%)',
    image: Completed,
  },
  {
    description: 'Anual',
    amount: '81,90',
    discount: '25%',
    color: 'rgb(41 181 41 / 70%)',
    image: ButtonIcon,
  },
]

const Plan = () => {

  const handleSuccess = (amount, subscriptionType) => (data) => {
    const payload = {
      amount: amount.toString(),
      checkoutToken: prop('token', data),
      encryptionKey: PAGARME_ENCRYPTION_KEY,
      subscriptionType
    }
    console.log(payload)
  }

  const handleError = data => {
    console.log('Error', data)
  }

  const handleCheckout = (amount, title) => () => {
    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: PAGARME_ENCRYPTION_KEY,
      success: handleSuccess(amount, title),
      error: handleError
    })

    checkout.open({
      amount: Number(amount.replace(',', '')),
      maxInstallments: 1,
      defaultInstallment: 1,
      customerData: 'false',
      createToken: 'true',
      paymentMethods: 'credit_card',
      postback_url: PAGARME_POSTBACK_URL,
      items: [{
        id: `subscription-${title}`,
        title,
        unit_price: Number(amount.replace(',', '')),
        quantity: 1,
        tangible: false
      }]
    })
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PlanInfo />
      </Col>
      {plans.map(({
        description,
        amount,
        discount,
        color,
        image,
      }) => (
        <Col span={8} key={description} style={{ marginTop: '30px' }}>
          <Card bordered={false}>
           <Row>
             <Col span={24} style={{ textAlign: 'center' }}>
              <Title level={4}>{description}</Title>
              <span style={{ borderBottom: '2px solid   #1890FF', display: 'block', width: '20px', margin: 'auto'}} />
             </Col>
             {/* <Col span={24} style={{ height: 160, textAlign: 'center', padding: '16px'}}>
              <Image src={image} alt="plans" width={150} />
             </Col> */}
             <Col span={24} style={{ textAlign: 'center', height: '164px' }}>
                <h1 style={{ color: '#1890FF', fontSize: '40px', fontWeight: '600', padding: '40px 0 0 0', margin: '0' }}>
                  <span style={{
                    fontWeight: 'normal',
                    fontSize: '22px',
                  }}>R$ </span>{amount}
                </h1>
                  {discount && (
                    <span style={{
                      background: color,
                      width: '80px',
                      display: 'block',
                      borderRadius: '10px',
                      color: '#fff',
                      fontWeight: 'bold',
                      margin: 'auto',
                      marginBottom: '40px',
                    }}>{discount}</span>
                  )}
                  {!discount && (
                      <span style={{
                        background: color,
                        width: '80px',
                        display: 'block',
                        borderRadius: '10px',
                        color: '#fff',
                        fontWeight: 'bold',
                        margin: 'auto',
                        marginBottom: '40px',
                      }} />
                  )}
             </Col>
             <Col span={24} style={{ textAlign: 'center' }}>
                <Button onClick={handleCheckout(amount, description)} block>Assinar!</Button>
             </Col>
           </Row>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Plan
