import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import { isEmpty } from 'ramda'

const { TextArea } = Input
const AssociateSerialNumber = ({
  visible,
  onCreate,
  onCancel,
  serialNumbers,
  productSelected,
}) => {
  const [form] = Form.useForm()
  const serialNumbersAdded = serialNumbers && serialNumbers.filter(product => product.product.id === productSelected.productId)
  const quantityMax = productSelected.quantity - (serialNumbersAdded && serialNumbersAdded.length) || 0

  const changeTextArea = ({ target }) => {
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

    if (findSerialNumber && findSerialNumber.length > 1) {
      setSerialNumberModal(currentValueSerialNumber, lastPosition)
      return message.error('Número de série já foi adicionado!')
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
      title="ASSOCIAR NÚMERO SÉRIE"
      okText="Associar Número Série"
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

export default AssociateSerialNumber
