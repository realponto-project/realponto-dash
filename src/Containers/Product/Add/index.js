import React from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'

const Add = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()
  return (
    <Modal
      width={350}
      visible={visible}
      title="CRIA UM PRODUTO"
      okText="Criar Produto"
      cancelText="Cancelar"
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label="Descrição"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="minQuantity"
          label="Quantidade mínima"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Add
