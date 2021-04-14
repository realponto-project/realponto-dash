import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Switch } from 'antd'
import { map } from 'ramda'
import NoData from '../../../../Assets/noData.svg'

const columns = (chooseProduct, handleSubmitUpdate) => [
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (__, record) => (
      <Switch 
        style={{width: '70px', backgroundColor: record.activated ? '#65A300' : 'rgba(0,0,0,.25)'}} 
        checkedChildren="Ativo" 
        unCheckedChildren="Inativo" 
        defaultChecked={record.activated}
        onChange={(activated) => handleSubmitUpdate({...record, activated, id: record.id})}
      />
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
      <Button type="link" onClick={() => chooseProduct(record)} disabled={!record.activated}>
        Editar
      </Button>
    )
  }
]

const ProductList = ({ datasource, chooseProduct, loading, onChangeTable, total, page, handleSubmitUpdate }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty
      description="Não há dados"
      image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total, current: page }}
        onChange={onChangeTable}
        columns={columns(chooseProduct, handleSubmitUpdate)} 
        loading={loading} 
        dataSource={map((dataArray) => ({ ...dataArray, key: dataArray.id }), datasource || [])} />
    </ConfigProvider>
  )
}

export default ProductList
