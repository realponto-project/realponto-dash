import React from 'react'
import { Modal, Form, Input } from 'antd'

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
      title="CRIA UM USUÁRIO"
      okText="Criar usuário"
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
          label="Nome do usuário"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email do usuário"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Add
