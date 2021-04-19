import React, { useState } from 'react'
import { Modal, Form, Input, InputNumber, Row, Col, Button } from 'antd'
import { parseValuePTbr } from '../../../utils/Masks/myInfoMasks'

const Add = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  return (
    <Modal
      width={450}
      visible={visible}
      title="CRIAR UM PRODUTO"
      onCancel={() => {
        onCancel()
        form.resetFields()
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
                onCreate(values)
                setLoading(false)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
                setLoading(false)
              })
          }}>
          Criar produto
        </Button>
      ]}>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Descrição"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input placeholder="Insira o nome do produto" />
        </Form.Item>
        <Form.Item name="category" label="Categoria">
          <Input placeholder="Insira a categoria" />
        </Form.Item>
        <Row align="space-between">
          <Col span={12}>
            <Form.Item name="balance" label="Qtd estoque">
              <InputNumber
                min={1}
                style={{ width: '98%' }}
                placeholder="Ex: 88"
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="minQuantity"
              label="Qtd mínima"
              rules={[
                { required: true, message: 'Este campo é obrigatório!' }
              ]}>
              <InputNumber
                min={1}
                style={{ width: '98%' }}
                placeholder="Ex: 88"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="barCode" label="Código de barras">
          <Input placeholder="Insira o código de barras" />
        </Form.Item>
        <Row align="space-between">
          <Col span={12}>
            <Form.Item name="buyPrice" label="Preço custo">
              <Input
                min={1}
                style={{ width: '98%' }}
                placeholder="R$"
                onChange={({ target: { value }}) => form.setFieldsValue({ buyPrice: `${parseValuePTbr(value)}` })}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item name="salePrice" label="Preço venda">
              <Input
                min={1}
                style={{ width: '98%' }}
                placeholder="R$" 
                onChange={({ target: { value }}) => form.setFieldsValue({ salePrice: `${parseValuePTbr(value)}` })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Add
