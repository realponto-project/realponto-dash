import React from 'react'
import { Modal, Form, Input } from 'antd'

const Edit = ({
  visible,
  onEdit,
  onCancel,
  userSelected,
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      width={350}
      visible={visible}
      title="ALTERAR UM USUÁRIO"
      okText="Editar Usuário"
      cancelText="Cancelar"
      onCancel={() => {
        form.resetFields()
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            onEdit(values)
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
        initialValues={userSelected}
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

export default Edit
