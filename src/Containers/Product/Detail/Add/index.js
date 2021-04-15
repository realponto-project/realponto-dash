import React, { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'

const Add = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  return (
    <Modal
      width={450}
      visible={visible}
      title="CRIAR UM N° SERIAL"
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
                onOk(values)
                setLoading(false)
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
                setLoading(false)
              })
          }}>
          Criar serial
        </Button>
      ]}>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="serialNumber"
          label="N° serial"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}>
          <Input placeholder="Insira um n° serial" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Add
