import React from 'react'
import {
  Button,
  Col,
  Form,
  InputNumber,
  Select,
  Row,
  Table,
  Typography,
} from 'antd'

const { Option } = Select
const { Title } = Typography
const requiredRule = [{
  required: true,
  message: 'Campo obrigatório!',
}]

const columns = handleRemoveItem => ([
  {
    title: 'Produto',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantity',
    key: 'quantity',
    fixed: 'left',
  },
  {
    title: '',
    key: 'operation',
    fixed: 'right',
    render: (_, record) => (
      <Button
        type="link"
        danger
        onClick={() => handleRemoveItem(record)}
      >
        Remover
      </Button>
    )
  },
])

const ProductStep = ({
  formData,
  handleAddProduct,
  handleRemoveItem,
  productList,
  form,
}) => {
  const OptionComponent = ({ id, name, balances }) => (
    <Option key={id} value={id}>{name} - quantidade: {balances[0].quantity}</Option>
  )

  return (
    <>
      <Title level={4}>PRODUTOS</Title>
      <p>Adicione os produtos que irão compor a ordem</p>
      <Form layout="vertical" onFinish={handleAddProduct} form={form}>
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <Form.Item
              name="productId"
              label="Produto"
              style={{ marginBottom: '4px' }}
              rules={requiredRule}
            >
              <Select
                placeholder="Selecione o produto"
                notFoundContent="Nenhum produto encontrado!"
                allowClear
              >
                {productList.map(OptionComponent)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Quantidade"
              name="quantity"
              style={{ marginBottom: '4px' }}
              rules={requiredRule}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label=" ">
              <Button htmlType="submit" type="primary">
                Adicionar Produto
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        style={{
          marginTop: 50,
          marginBottom: 50,
        }}
        columns={columns(handleRemoveItem)}
        dataSource={formData.products}
        locale={{ emptyText: "Nenhum produto adicionado a ordem" }}
        pagination={{ position: 'none' }}
      />
    </>
  )
}

export default ProductStep
