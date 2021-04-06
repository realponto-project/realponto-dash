import React from 'react'
import { Form, Input, Modal, Row } from 'antd'
import { map, length } from 'ramda'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import getAddress from '../../../Services/Address'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]

const customerFormItemsList = [
  { label: 'Nome do cliente', name: 'name', placeholder: 'Insira a razão social', rules },
  { label: 'Nome Fantasia', name: 'socialName', placeholder: 'Insira o nome fantasia'},
  { label: 'CNPJ/CPF', name: 'document', placeholder: 'Insira o documento'},
  { label: 'Telefone', name: 'phone', placeholder: 'Insira o telefone'}
]
const addressFormItemsList = [
  { label: 'CEP', name: 'zipcode', placeholder: 'Insira o cep', rules },
  { label: 'UF', name: 'state', placeholder: 'Insira o uf',  rules },
  { label: 'Cidade', name: 'city', placeholder: 'Insira a cidade', rules },
  { label: 'Bairro', name: 'neighborhood', placeholder: 'Insira o bairro', rules },
  { label: 'Logradouro', name: 'street', placeholder: 'Insira a rua', rules },
  { label: 'Número', name: 'streetNumber', placeholder: 'Insira o número', rules },
  { label: 'Complemento', name: 'complementary', placeholder: 'Insira o complemento'},
  { label: 'Referência', name: 'reference', placeholder: 'Insira o ponto de referência'}
]

const renderFormItems = ({ label, name, rules, placeholder }) => {
  return (
    <Form.Item
      key={name}
      label={label}
      name={name}
      rules={rules}
    >
      <Input name={name} placeholder={placeholder}/>
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
  const getFieldAddress = async ({ target }) => {
    const { name, value } = target
    
    let valueMasked = value

    switch (name) {
      case 'document':
        if (length(value.replace(/\D/g, '')) > 11) {
          valueMasked = value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
        } else {
          valueMasked = value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
        }
        break
      case 'phone':
        if (length(value) <= 14) {
          valueMasked = value
            .replace(/\D/g, '')
            .replace(/(\d)/, '($1')
            .replace(/(\d{2})(\d)/, '$1) $2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
        } else {
          valueMasked = value
            .replace(/\D/g, '')
            .replace(/(\d)/, '($1')
            .replace(/(\d{2})(\d)/, '$1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
        }
        break
      case 'zipcode':
        valueMasked = value
          .replace(/\D/g, '')
          .replace(/(\d{5})(\d)/, '$1-$2')
          .replace(/(-\d{3})\d+?$/, '$1')
        try{
          if (name === 'zipcode' && value.length === 9) {
            const zipcode = await getAddress(value)
            form.setFieldsValue(zipcode)
          }
        }catch(error){
          console.error(error)
        }
        break
      default:
    }
    form.setFieldsValue({ [name]: valueMasked  })
  }


  return (
    <Modal
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText='Cadastrar'
      title="Cadastro cliente"
      centered={true}
      visible={visible}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={handleSubmit}
        onChange={getFieldAddress}
      >
        <Form.Item name="id" noStyle/>

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
