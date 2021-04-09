import React from 'react'
import { Table, Tag, Button, Empty, ConfigProvider, Image } from 'antd'
import { map } from 'ramda'
import NoData from '../../../../Assets/noData.svg'

const columns = (chooseProduct) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (text) => (
      <Tag color={text ? '#65A300' : '#DF285F'}>
        {text ? 'Ativo' : 'Inativo'}
      </Tag>
    )
  },
  {
    title: 'Descrição',
    dataIndex: 'name',
    key: 'name',
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
    dataIndex: 'record.balance',
    key: 'balance',
    fixed: 'left',
    render: (_, record) => record.balance
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      <Button type="link" onClick={() => chooseProduct(record)}>
        Editar
      </Button>
    )
  }
]

const ProductList = ({ datasource, chooseProduct, loading, onChangeTable, total, page }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty
      description="Não há dados"
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns(chooseProduct)} 
        loading={loading} 
        dataSource={map((dataArray) => ({ ...dataArray, key: dataArray.id }), datasource || [])} />
    </ConfigProvider>
  )
}

export default ProductList
