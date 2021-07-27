import React from 'react'
import { Button, Table, Tag } from 'antd'
import formattedDate from '../../../../utils/parserDate'

const columns = (goToOrderDetail) => [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    render: (_, record) => (
      <Tag color={record.status.color}>{record.status.label}</Tag>
    )
  },
  {
    title: 'Tipo de ordem',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    render: (_, record) => record.status.typeLabel
  },
  {
    title: 'Data da ordem',
    dataIndex: 'orderDate',
    key: 'orderDate',
    fixed: 'left',
    render: (text) => formattedDate(text, 'DD/MM/YY - HH:mm')
  },
  {
    title: 'Colaborador',
    dataIndex: 'user.name',
    key: 'user.name',
    fixed: 'left',
    render: (_, record) => record.user && record.user.name
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'right',
    render: (_, record) => (
      <Button onClick={() => goToOrderDetail(record.id)}>Ver detalhes</Button>
    )
  }
]

const OrderList = ({
  datasource,
  goToOrderDetail,
  onChangeTable,
  total,
  loading,
  page
}) => {
  return (
    <Table
      loading={loading}
      columns={columns(goToOrderDetail)}
      dataSource={datasource}
      pagination={{ total, current: page }}
      onChange={onChangeTable}
    />
  )
}

export default OrderList
