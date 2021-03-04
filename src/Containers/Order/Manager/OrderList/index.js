import React from 'react'
import { Button, Table, Tag } from 'antd'
import formattedDate from '../../../../utils/parserDate'

const columns = goToOrderDetail => ([
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    render: (_, record) => (
      <Tag color={record.status.color}>{record.status.value}</Tag>
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
    dataIndex: 'createdAt',
    key: 'createdAt',
    fixed: 'left',
    render: (text) => formattedDate(text, 'DD/MM/YY - HH:mm')
  },
  {
    title: 'Funcionário',
    dataIndex: 'user.name',
    key: 'user.name',
    fixed: 'left',
    render: (_, record) => record.user && record.user.name
  },
  {
    title: 'Revisar?',
    dataIndex: 'pendingReview',
    fixed: 'left',
    render: (text) => text ? 'Sim' : 'Não'
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'id',
    fixed: 'right',
    render: (_, record) => (
      <Button
        onClick={() => goToOrderDetail(record.id)}
      >
        Ver detalhes
      </Button>
    ),
  },
])

const OrderList = ({
  datasource,
  goToOrderDetail,
  handlePagination,
}) => {
  return (
    <Table
      columns={columns(goToOrderDetail)}
      dataSource={datasource}
      pagination={{ onChange: handlePagination }}
    />
  )
}

export default OrderList
