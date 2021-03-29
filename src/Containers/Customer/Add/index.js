import React from 'react'
import { Form, Input, Modal, Row } from 'antd'
import { map } from 'ramda'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const customerFormItemsList = [
  { label: 'Nome', name: 'name', rules },
  { label: 'Razão Social', name: 'socialName', rules },
  { label: 'CNPJ/CPF', name: 'document', rules },
  { label: 'Telefone', name: 'phone', rules }
]
const addressFormItemsList = [
  { label: 'CEP', name: 'zipcode', rules },
  { label: 'UF', name: 'states', rules },
  { label: 'Cidade', name: 'city', rules },
  { label: 'Bairro', name: 'neighborhood', rules },
  { label: 'Logradouro', name: 'street', rules },
  { label: 'Número', name: 'streetNumber', rules },
  { label: 'Complemento', name: 'complementary' },
  { label: 'Referência', name: 'reference' }
]

const renderFormItems = ({ label, name, rules }) => {
  return (
    <Form.Item key={name} label={label} name={name} rules={rules}>
      <Input />
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
  return (
    <Modal
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title="Cadastro cliente"
      visible={visible}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={handleSubmit}>
        {map(renderFormItems, customerFormItemsList)}

        <Row justify="end">
          <a onClick={handleClickExpand}>
            {expand ? <UpOutlined /> : <DownOutlined />} Endereço
          </a>
        </Row>

        {expand ? map(renderFormItems, addressFormItemsList) : null}
      </Form>
    </Modal>
  )
}

export default Add
