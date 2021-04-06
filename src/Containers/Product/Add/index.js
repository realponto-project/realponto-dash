import React from 'react'
import { Modal, Form, Input, InputNumber, Row, Col } from 'antd'

const Add = ({ visible, onCreate, onCancel, currencyBRL }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      width={450}
      visible={visible}
      title="CRIAR UM PRODUTO"
      okText="Criar Produto"
      cancelText="Cancelar"
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Descrição"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input />
        </Form.Item>
        <Row align="space-between">
          <Col span={12}>
            <Form.Item
              name="balance"
              label="Qtd estoque"
            >
              <InputNumber min={1} style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="minQuantity"
              label="Qtd mínima"
              rules={[
                { required: true, message: 'Este campo é obrigatório!' }
              ]}>
              <InputNumber min={1} style={{ width: '98%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="barCode"
          label="Código de barras">
          <Input />
        </Form.Item>
        <Row align="space-between">
          <Col span={12}>
            <Form.Item
              name="buyPrice"
              label="Preço custo">
              <InputNumber min={1} style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="salePrice"
              label="Preço venda">
              <InputNumber min={1} style={{ width: '98%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Add
