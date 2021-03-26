import React from 'react'
import { Modal, Form, Input, Select } from 'antd'

const { Option } = Select

const Add = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <Modal
      width={450}
      visible={visible}
      title="CRIAR UM STATUS"
      okText="Criar Status"
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
          rules={[{ required: true, message: 'Trocar cor do campo!' }]}>
          <Input type="color" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Add