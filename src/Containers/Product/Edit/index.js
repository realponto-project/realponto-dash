import React from 'react'
import { Modal, Form, Input, InputNumber, Col, Row } from 'antd'

const Edit = ({ visible, onEdit, onCancel, productSelected }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      width={450}
      visible={visible}
      title="ALTERAR UM PRODUTO"
      okText="Editar Produto"
      cancelText="Cancelar"
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onEdit(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}>
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
        <Row align="space-between">
          <Col span={12}>
            <Form.Item
              name="balance"
              label="Qtd estoque"
              rules={[
                { required: true, message: 'Este campo é obrigatório!' }
              ]}>
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
          label="Código de barras"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input />
        </Form.Item>
        <Row align="space-between">
          <Col span={12}>
            <Form.Item
              name="buyPrice"
              label="Preço custo"
              rules={[
                { required: true, message: 'Este campo é obrigatório!' }
              ]}>
              <InputNumber min={1} style={{ width: '98%' }} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              name="salePrice"
              label="Preço venda"
              rules={[
                { required: true, message: 'Este campo é obrigatório!' }
              ]}>
              <InputNumber min={1} style={{ width: '98%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default Edit
