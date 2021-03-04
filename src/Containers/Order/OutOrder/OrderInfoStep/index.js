import React from 'react'
import { Form, Select, Typography } from 'antd'

const { Option } = Select
const { Title, Text } = Typography

const OrderInfoStep = ({
  formData,
  formErrors,
  handleOnChange,
  customerList,
  userList,
}) => {
  const OptionComponent = ({ id, name }) => (
    <Option key={id} value={id}>{name}</Option>
  )

  const changeFormValue = name => value => handleOnChange({
    target: {
      name,
      value,
    }
  })

  return (
    <>
      <Title level={4}>IDENTIFICAÇÃO</Title>
      <p>Preecha os campos do usuário ou cliente para está ordem</p>
      <Form layout="vertical" initialValues={formData}>
        <div style={{ height: '88px', marginBottom: '20px'}}>
          <Form.Item
            name="userId"
            label="Usuário"
            validateStatus={formErrors && formErrors.userId ? 'error' : ''}
            style={{ marginBottom: '4px' }}
            hasFeedback
          >
            <Select
              placeholder="Selecione o usuário"
              onChange={changeFormValue('userId')}
              notFoundContent="Nenhum usuário encontrado!"
            >
              {userList.map(OptionComponent)}
            </Select>
          </Form.Item>
          <Text type="danger">
            {formErrors && formErrors.userId}
          </Text>
        </div>

        <Form.Item
          name="customerId"
          label="Cliente"
          hasFeedback
        >
          <Select
            placeholder="Selecione o cliente"
            onChange={changeFormValue('customerId')}
            notFoundContent="Nenhum cliente encontrado!"
            allowClear
          >
            {customerList.map(OptionComponent)}
          </Select>
        </Form.Item>
      </Form>
    </>
  )
}

export default OrderInfoStep
