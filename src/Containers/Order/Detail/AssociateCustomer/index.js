import React from 'react'
import { Modal, Form, Select } from 'antd'

const { Option } = Select

const AssociateSerialNumber = ({
  visible,
  onCreate,
  onCancel,
  customers,
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      width={350}
      visible={visible}
      title="ASSOCIAR CLIENTE"
      okText="Associar Cliente"
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
          .then(() => onCancel())
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
          name="customerId"
          label="Selecione o cliente da ordem"
          hasFeedback
          style={{ marginBottom: '4px' }}
          required
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <Select
            placeholder="Selecione o cliente"
            // onChange={changeFormValue('statusId')}
            notFoundContent="Nenhum usuário encontrado!"
          >
            {customers && customers.map(({ name, id }) => (
              <Option key={id} value={id}>{name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AssociateSerialNumber
