import React from 'react'
import { Modal, Form, Input, Select } from 'antd'

const { Option } = Select

const Edit = ({ visible, onEdit, onCancel, statusSelected }) => {
  const [form] = Form.useForm()

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <Modal
      width={450}
      visible={visible}
      title="ALTERAR UM STATUS"
      okText="Editar Status"
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
        initialValues={statusSelected}>
        <Form.Item
          name="label"
          label="Descrição"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="Tipo"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Select defaultValue="Selecionar tipo" onChange={handleChange}>
            <Option value="inputs">Entrada</Option>
            <Option value="outputs">Saída</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="color"
          label="Cor"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input type="color" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Edit
