import React from 'react'
import { Form, Input, Modal, Row } from 'antd'
import { map } from 'ramda'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import getAddress from '../../../Services/Address'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const customerFormItemsList = [
  { label: 'Nome do cliente', name: 'name', rules },
  { label: 'Nome Fantasia', name: 'socialName' },
  { label: 'CNPJ/CPF', name: 'document' },
  { label: 'Telefone', name: 'phone' }
]
const addressFormItemsList = [
  { label: 'CEP', name: 'zipcode', rules },
  { label: 'UF', name: 'state', rules },
  { label: 'Cidade', name: 'city', rules },
  { label: 'Bairro', name: 'neighborhood', rules },
  { label: 'Logradouro', name: 'street', rules },
  { label: 'Número', name: 'streetNumber', rules },
  { label: 'Complemento', name: 'complementary' },
  { label: 'Referência', name: 'reference' }
]

const renderFormItems = ({ label, name, rules }) => {
  return (
    <Form.Item 
      key={name}
      label={label}
      name={name}
      rules={rules}  
    >
      <Input name={name} />
    </Form.Item>
  )
}

const Add = ({
  expand,
  form,
  handleCancel,
  handleClickExpand,
  handleSubmit,
  visible
}) => {
  const getCustomerAddress = async ({ target }) => {
    const { name, value } = target
    if (name === 'zipcode' && value.length === 8) {
      const zipcode = await getAddress(value)
      form.setFieldsValue(zipcode)
    }
  }

  return (
    <Modal
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText='Cadastrar'
      title="Cadastro cliente"
      visible={visible}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={handleSubmit}
        onChange={getCustomerAddress}
      >
        <Form.Item name="id" noStyle />

        {map(renderFormItems, customerFormItemsList)}

        <Row justify="end">
          <a onClick={handleClickExpand}>
            {expand ? <MinusOutlined /> : <PlusOutlined />} Endereço
          </a>
        </Row>

        {expand ? map(renderFormItems, addressFormItemsList) : null}
      </Form>
    </Modal>
  )
}

export default Add
