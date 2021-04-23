import React, { useEffect } from 'react'
import {
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography
} from 'antd'
import { connect } from 'react-redux'
import { applySpec, compose, filter, map, pathOr, pipe } from 'ramda'

import { parseValuePTbr } from '../../../utils/Masks/myInfoMasks'

const { Option } = Select
const { Text } = Typography

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const Movement = ({
  handleCancel,
  handleSubmit,
  movementData,
  outputsStatus,
  userList,
  visible
}) => {
  const [form] = Form.useForm()

  const { productName, protocol } = applySpec({
    protocol: pipe(pathOr(0, ['protocol']), String, (value) =>
      value.padStart(6, '0')
    ),
    productName: pathOr('', ['productName'])
  })(movementData)

  useEffect(() => {
    form.setFieldsValue({
      price: pipe(pathOr(0, ['price']), String, parseValuePTbr)(movementData)
    })
  }, [movementData])

  useEffect(() => {
    if (!visible) form.resetFields()
  }, [visible])

  return (
    <Modal
      onOk={() => form.submit()}
      visible={visible}
      onCancel={handleCancel}
      title="Movimentação">
      <Row justify="space-between">
        <Text>
          Protocolo: <Text strong>{protocol}</Text>
        </Text>
        <Text>
          Produto: <Text strong>{productName}</Text>
        </Text>
      </Row>

      <Divider />

      <Form
        {...layout}
        form={form}
        defaultValue={{ quantity: 1 }}
        onFinish={(formData) => handleSubmit({ ...formData, ...movementData })}>
        <Form.Item label="Status" name="statusId">
          <Select>
            {map(
              ({ id, label }) => (
                <Option value={id}>{label}</Option>
              ),
              outputsStatus
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Usuário" name="userId">
          <Select>
            {map(
              ({ id, name }) => (
                <Option value={id}>{name}</Option>
              ),
              userList
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Qtd" name="quantity">
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item label="Preço" name="price">
          <Input
            placeholder="R$"
            onChange={({ target: { value } }) =>
              form.setFieldsValue({ price: `${parseValuePTbr(value)}` })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  const outputsStatus = pipe(
    pathOr([], ['status', 'source']),
    filter(({ type }) => type === 'inputs')
  )(state)
  return {
    outputsStatus
  }
}

const enhanced = compose(connect(mapStateToProps))

export default enhanced(Movement)
