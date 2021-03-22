import React, { useState } from 'react'
import { Button, Card, Col, Row, Steps } from 'antd'
import { length } from 'ramda'

import StepButtons from './StepButtons'
import DataStep from './DataStep'
import AddressStep from './AddressStep'
import ContactStep from './ContactStep'

const { Step } = Steps

const steps = [DataStep, AddressStep, ContactStep]

const Add = ({ goToManager }) => {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent(current + 1)
  const prev = () => setCurrent(current - 1)
  const done = () => console.log('finish')

  const ComponentStep = steps[current]

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Steps current={current}>
            {steps.map((_, index) => (
              <Step key={index} />
            ))}
          </Steps>
        </Card>
      </Col>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <ComponentStep
              // form
              // formData={formData}
              // handleOnChange={handleOnChange}
              // handleAddProduct={handleAddProduct}
              // customerList={customerList}
              // userList={userList}
              // productList={productList}
              // formErrors={formErrors}
              // handleRemoveItem={handleRemoveItem}
              // form={form}
              // customerSelected={customerSelected}
              // statusList={statusList}
              // userSelected={userSelected}
              // navigationStep={navigationStep}
              />
            </Col>
          </Row>
          <Row justify="end">
            <Col span={12} style={{ textAlign: 'left' }}>
              <Button type="text" onClick={goToManager}>
                Cancelar
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <StepButtons
                current={current}
                steps={length(steps)}
                next={next}
                prev={prev}
                done={done}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Add
