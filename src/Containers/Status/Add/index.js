import React, { useState } from 'react'
import { Modal, Form, Input, Select, Button } from 'antd'

const { Option } = Select

const Add = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <Modal
      width={450}
      visible={visible}
      title="CRIAR UM STATUS"
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
          Criar status
        </Button>
      ]}>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="label"
          label="Descrição"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input placeholder="Insira o status" />
        </Form.Item>
        <Form.Item
          name="type"
          label="Tipo"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Select placeholder="Selecionar tipo" onChange={handleChange}>
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
