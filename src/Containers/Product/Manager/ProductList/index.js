import React from 'react'
import { Table, Tag, Button } from 'antd'

const columns = chooseProduct => ([
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (text) => (
      <Tag color={text ? '#65A300' : '#DF285F'}>
        {text ? 'Ativo' : 'Inativo' }
      </Tag>
    )
  },
  {
    title: 'Descrição',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },

  {
    title: 'Quantidade mínima',
    dataIndex: 'minQuantity',
    key: 'minQuantity',
    fixed: 'left',
  },
  {
    title: 'Quantidade estoque',
    dataIndex: 'record.balances[0].quantity',
    key: 'balance',
    fixed: 'left',
    render: (_, record) => record.balances[0].quantity,
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button
        type="link"
        onClick={() => chooseProduct(record)}
      >
        Editar
      </Button>
    )
  },
])

const ProductList = ({
  datasource,
  chooseProduct,
}) => {
  return (
    <Table
      columns={columns(chooseProduct)}
      dataSource={datasource}
    />
  )
}

export default ProductList
