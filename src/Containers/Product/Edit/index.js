import React, { useState } from 'react'
import { Modal, Form, Input, InputNumber, Col, Row, Button } from 'antd'
import { parseValuePTbr } from '../../../utils/Masks/myInfoMasks'

const Edit = ({ visible, onEdit, onCancel, productSelected }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  return (
    <Modal
      width={450}
      visible={visible}
      title="ALTERAR PRODUTO"
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            onCancel()
            form.resetFields()
          }}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {
            setLoading(true)
            form
              .validateFields()
              .then((values) => {
                form.resetFields()
                onEdit(values)
                setLoading(false)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
                setLoading(false)
              })
          }}>
          Editar produto
        </Button>
      ]}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={productSelected}>
        <Form.Item
          name="name"
          label="Descrição"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Categoria">
          <Input placeholder="Insira a categoria" />
        </Form.Item>
        <Form.Item
          name="minQuantity"
          label="Qtd mínima"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <InputNumber min={1} style={{ width: '98%' }} />
        </Form.Item>
        <Form.Item name="barCode" label="Código de barras">
          <Input placeholder="Insira o código de barras"/>
        </Form.Item>
        <Row align="space-between">
          <Col span={12}>
            <Form.Item name="buyPrice" label="Preço custo">
              <Input 
              style={{ width: '98%' }}
              onChange={({ target: { value }}) => form.setFieldsValue({ buyPrice: `${parseValuePTbr(value)}` })} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name="salePrice" label="Preço venda">
              <Input 
                style={{ width: '98%' }} 
                onChange={({ target: { value }}) => form.setFieldsValue({ salePrice: `${parseValuePTbr(value)}` })} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Edit
