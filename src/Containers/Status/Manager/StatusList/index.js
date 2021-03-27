import React from 'react'
import { Table, Tag, Button } from 'antd'

const columns = (chooseStatus) => [
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
    dataIndex: 'value',
    key: 'value',
    fixed: 'left'
  },

  {
    title: 'Tipo',
    dataIndex: 'typeLabel',
    key: 'typeLabel',
    fixed: 'left',
    render: (_, record) => (
      <Tag color={record.color}>
        {record.typeLabel}
      </Tag>
    )
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'left',
    render: (_, record) => (
      record.label !== 'initial_balance' && record.label !== 'sales' && (
        <Button type="link" onClick={() => chooseStatus(record)}>
          Editar
        </Button>
      )
    )
  }
]

const StatustList = ({ datasource, chooseStatus }) => {
  return <Table columns={columns(chooseStatus)} dataSource={datasource} />
}

export default StatustList
