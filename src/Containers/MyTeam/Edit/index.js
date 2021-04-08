import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'

const Edit = ({ visible, onEdit, onCancel, userSelected }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  return (
    <Modal
      width={350}
      visible={visible}
      title="ALTERAR USUÁRIO"
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
          Editar Usuário
        </Button>
      ]}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={userSelected}>
        <Form.Item
          name="name"
          label="Nome do usuário"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email do usuário"
          rules={[
            { required: true, message: 'Este campo é obrigatório!' },
            {
              pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
              message: 'E-mail inválido!'
            }
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Edit
