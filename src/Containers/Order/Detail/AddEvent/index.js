import React from 'react'
import { Modal, Form, InputNumber, Select } from 'antd'
const { Option } = Select

const deparaStatus = {
  pending_analysis: 'in_analysis',
  in_analysis: 'analysis_return',
}

const AddEvent = ({
  visible,
  onCreate,
  onCancel,
  users,
  productSelected,
  productTransaction,
  statusList,
}) => {
  const [form] = Form.useForm()
  let statusForm = []
  let quantityMax = productSelected.quantity
  const countTotalStatus = productTransaction
    .reduce((curr, prev) => {
      if (curr[prev.status.label]) {
        curr = {
          ...curr,
          [prev.status.label]: curr[prev.status.label] + prev.quantity
        }
      }

      if (!curr[prev.status.label]) {
        curr = {
          ...curr,
          [prev.status.label]: prev.quantity
        }
      }

      return curr
    }, {})

    if (countTotalStatus && productSelected.status.label === 'pending_analysis') {
      statusForm = statusList.filter(status => status.label === 'in_analysis' || status.label === 'analysis_return')
    }

    if (countTotalStatus && productSelected.status.label === 'pending_analysis' && !countTotalStatus.in_analysis) {
      statusForm = statusList.filter(status => status.label === 'in_analysis')
    }

    if (countTotalStatus && countTotalStatus.in_analysis === countTotalStatus.pending_analysis) {
      statusForm = statusList.filter(status => status.label === 'analysis_return')
    }

    if (productSelected.status.label === 'booking') {
      statusForm = statusList.filter(status =>
        status.label === 'booking_return'
        || status.label === 'delivery'
      )
    }

  return (
    <Modal
      width={350}
      visible={visible}
      title="ADICIONAR EVENTO"
      okText="Adicionar Evento"
      cancelText="Cancelar"
      onCancel={() => {
        onCancel()
        form.resetFields()
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            // form.resetFields()
            onCreate({
              ...values,
              productId: productSelected.productId,
              orderProductId: productSelected.id,
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
          name="statusId"
          label="Selecione o evento da ordem"
          hasFeedback
          style={{ marginBottom: '4px' }}
          required
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <Select
            placeholder="Selecione evento da ordem"
            // onChange={changeFormValue('statusId')}
            notFoundContent="Nenhum evento encontrado!"
          >
            {statusForm && statusForm.map(({ value, id }) => (
              <Option key={id} value={id}>{value}</Option>
            ))}
          </Select>
        </Form.Item>

        {
          productSelected.status.label !== 'booking' && (
          <Form.Item
            name="userId"
            label="Selecione o usuário da ordem"
            hasFeedback
            style={{ marginBottom: '4px' }}
            required
            rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
          >
            <Select
              placeholder="Selecione o usuário"
              // onChange={changeFormValue('statusId')}
              notFoundContent="Nenhum usuário encontrado!"
            >
              {users && users.map(({ name, id }) => (
                <Option key={id} value={id}>{name}</Option>
              ))}
            </Select>
          </Form.Item>
          )
        }

        <Form.Item
          name="quantity"
          label="Quantidade"
          rules={[{ required: true, message: 'Este campo é obrigatório!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} max={productSelected.quantity} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddEvent
