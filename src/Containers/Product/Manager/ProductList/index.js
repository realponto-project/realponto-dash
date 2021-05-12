import React from 'react'
import { Table, Button, Switch } from 'antd'
import { map } from 'ramda'

const columns = (chooseProduct, handleSubmitUpdate, goToDetail) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (__, record) => (
      <Switch
        style={{
          width: '70px',
          backgroundColor: record.activated ? '#65A300' : 'rgba(0,0,0,.25)'
        }}
        checkedChildren="Ativo"
        unCheckedChildren="Inativo"
        defaultChecked={record.activated}
        onChange={(activated) =>
          handleSubmitUpdate({ ...record, activated, id: record.id })
        }
      />
    )
  },
  {
    title: 'Produto',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Categoria',
    dataIndex: 'category',
    key: 'category',
    fixed: 'left'
  },
  {
    title: 'Qtd mínima',
    dataIndex: 'minQuantity',
    key: 'minQuantity',
    fixed: 'left'
  },
  {
    title: 'Qtd estoque',
    dataIndex: 'balance',
    key: 'balance',
    fixed: 'left'
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <>
        <Button
          type="link"
          onClick={() => chooseProduct(record)}
          disabled={!record.activated}>
          Editar
        </Button>
        <Button type="primary" onClick={() => goToDetail(record.id)}>
          Detalhes
        </Button>
      </>
    )
  }
]

const ProductList = ({
  datasource,
  chooseProduct,
  loading,
  onChangeTable,
  total,
  page,
  handleSubmitUpdate,
  goToDetail
}) => {
  return (
    <Table
      pagination={{ total, current: page }}
      onChange={onChangeTable}
      columns={columns(chooseProduct, handleSubmitUpdate, goToDetail)}
      loading={loading}
      dataSource={map(
        (dataArray) => ({ ...dataArray, key: dataArray.id }),
        datasource || []
      )}
    />
  )
}

export default ProductList
