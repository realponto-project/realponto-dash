import React from 'react'
import { Modal, Form, Input, InputNumber } from 'antd'

const Edit = ({
  visible,
  onEdit,
  onCancel,
  productSelected,
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      width={350}
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
        initialValues={productSelected}
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

export default Edit
