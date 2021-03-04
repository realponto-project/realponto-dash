import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { isEmpty } from 'ramda'

const { Option } = Select

const { TextArea } = Input
const AddSerialNumber = ({
  visible,
  onCreate,
  onCancel,
  users,
  serialNumbers,
  productSelected,
  serialNumberExistOrActivated,
}) => {
  const [form] = Form.useForm()
  const serialNumbersAdded = serialNumbers && serialNumbers.filter(product => product.product.id === productSelected.productId)
  const quantityMax = productSelected.quantity - (serialNumbersAdded && serialNumbersAdded.length) || 0
  const changeTextArea = async ({ target }) => {
    const { value } = target
    const currentTargetValue = value
    const currentValueSerialNumber = currentTargetValue.split(/\n/).filter(serialNumber => serialNumber)
    const lastPosition = currentValueSerialNumber.length - 1
    const findSerialNumber = (
      !isEmpty(currentValueSerialNumber[lastPosition])
      && currentValueSerialNumber.filter(serialNumber => serialNumber === currentValueSerialNumber[lastPosition] )
    )

    const setSerialNumberModal = (serialNumbersInput, position) => {
      return form.setFieldsValue({
        serialNumbers: serialNumbersInput.filter((_, index) => index !== position).join('\n')
      })
    }

    const { data } = (
      isEmpty(currentValueSerialNumber[lastPosition])
      && (await serialNumberExistOrActivated(currentValueSerialNumber[lastPosition]))
    )

    if (findSerialNumber && findSerialNumber.length > 1) {
      setSerialNumberModal(currentValueSerialNumber, lastPosition)
      return message.error('Número de série já foi adicionado!')
    }

    if (data && data.length > 0) {
      setSerialNumberModal(currentValueSerialNumber, lastPosition)
      return message.error('Número de série já registrado')
    }

    if (currentValueSerialNumber.length > quantityMax || quantityMax === 0) {
      setSerialNumberModal(currentValueSerialNumber, lastPosition)
      return message.error('Limite atingido!')
    }

  }

  return (
    <Modal
      width={350}
      visible={visible}
      title="ADICIONAR NÚMERO SÉRIE"
      okText="Adicionar Número Série"
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
            onCreate({
              ...values,
              productId: productSelected.productId,
              serialNumbers: values.serialNumbers.split(/\n/).filter(serialNumber => serialNumber),
            })
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
        <h3>{productSelected.productName}</h3>
        <Form.Item
          name="userId"
          label="Selecione o usuário"
          hasFeedback
          style={{ marginBottom: '4px' }}
          required
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <Select
            placeholder="Selecione o usuário"
            notFoundContent="Nenhum usuário encontrado!"
          >
            {users && users.map(({ name, id }) => (
              <Option key={id} value={id}>{name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="serialNumbers"
          label="Número Sérial"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <TextArea
            rows={4}
            onChange={changeTextArea}
            name='serialNumbers'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddSerialNumber
